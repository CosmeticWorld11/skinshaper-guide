
import { toast } from "sonner";
import { mongoDbService } from "./mongoDbService";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// JWT secret key (in a real app, this would be an environment variable)
const JWT_SECRET = "eco-skin-secure-jwt-secret-key";

export interface User {
  _id?: string;
  email: string;
  name: string;
  password?: string;
  createdAt: Date;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: Omit<User, "password">;
}

export class AuthService {
  private static instance: AuthService | null = null;
  
  static getInstance(): AuthService {
    if (!this.instance) {
      this.instance = new AuthService();
    }
    return this.instance;
  }
  
  async register(email: string, password: string, name: string): Promise<AuthResponse> {
    try {
      const usersCollection = await mongoDbService.getCollection("users");
      
      // Check if user already exists
      const existingUser = await usersCollection.findOne({ email: email.toLowerCase() });
      if (existingUser) {
        return { success: false, message: "Email already registered" };
      }
      
      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      
      // Create new user
      const newUser: User = {
        email: email.toLowerCase(),
        name,
        password: hashedPassword,
        createdAt: new Date()
      };
      
      const result = await usersCollection.insertOne(newUser);
      
      // Generate token
      const token = jwt.sign(
        { id: result.insertedId.toString(), email: newUser.email },
        JWT_SECRET,
        { expiresIn: "7d" }
      );
      
      const userWithoutPassword: Omit<User, "password"> = {
        _id: result.insertedId.toString(),
        email: newUser.email,
        name: newUser.name,
        createdAt: newUser.createdAt
      };
      
      return {
        success: true,
        message: "Registration successful",
        token,
        user: userWithoutPassword
      };
    } catch (error) {
      console.error("Registration error:", error);
      return { success: false, message: "Registration failed" };
    }
  }
  
  async login(email: string, password: string): Promise<AuthResponse> {
    try {
      const usersCollection = await mongoDbService.getCollection("users");
      
      // Find user
      const user = await usersCollection.findOne({ email: email.toLowerCase() });
      
      if (!user) {
        return { success: false, message: "Invalid credentials" };
      }
      
      // Check password
      const isMatch = await bcrypt.compare(password, user.password);
      
      if (!isMatch) {
        return { success: false, message: "Invalid credentials" };
      }
      
      // Generate token
      const token = jwt.sign(
        { id: user._id.toString(), email: user.email },
        JWT_SECRET,
        { expiresIn: "7d" }
      );
      
      const userWithoutPassword = {
        _id: user._id.toString(),
        email: user.email,
        name: user.name,
        createdAt: user.createdAt
      };
      
      return {
        success: true,
        message: "Login successful",
        token,
        user: userWithoutPassword
      };
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, message: "Login failed" };
    }
  }
  
  verifyToken(token: string): { valid: boolean; userId?: string } {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { id: string; email: string };
      return { valid: true, userId: decoded.id };
    } catch (error) {
      return { valid: false };
    }
  }
  
  getStoredToken(): string | null {
    return localStorage.getItem("eco-skin-auth-token");
  }
  
  setStoredToken(token: string): void {
    localStorage.setItem("eco-skin-auth-token", token);
  }
  
  clearStoredToken(): void {
    localStorage.removeItem("eco-skin-auth-token");
  }
  
  async getCurrentUser(): Promise<Omit<User, "password"> | null> {
    const token = this.getStoredToken();
    
    if (!token) {
      return null;
    }
    
    const { valid, userId } = this.verifyToken(token);
    
    if (!valid || !userId) {
      this.clearStoredToken();
      return null;
    }
    
    try {
      const usersCollection = await mongoDbService.getCollection("users");
      const user = await usersCollection.findOne({ _id: mongoDbService.toObjectId(userId) });
      
      if (!user) {
        this.clearStoredToken();
        return null;
      }
      
      const { password, ...userWithoutPassword } = user;
      return {
        ...userWithoutPassword,
        _id: user._id.toString()
      };
    } catch (error) {
      console.error("Error getting current user:", error);
      return null;
    }
  }
}

export const authService = AuthService.getInstance();
