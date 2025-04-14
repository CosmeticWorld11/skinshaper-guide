
import { toast } from "sonner";
import { mongoDbService } from "./mongoDbService";

// JWT secret key (in a real app, this would be an environment variable)
const JWT_SECRET = "eco-skin-secure-jwt-secret-key";

// Simple JWT implementation for browser
const jwtCompat = {
  sign: (payload: any, secret: string, options?: { expiresIn: string }): string => {
    const header = { alg: 'HS256', typ: 'JWT' };
    const now = Math.floor(Date.now() / 1000);
    const exp = options?.expiresIn ? now + (parseInt(options.expiresIn) * 86400) : now + 604800; // Default 7 days
    const tokenPayload = { ...payload, iat: now, exp };
    
    const stringifiedHeader = btoa(JSON.stringify(header));
    const stringifiedPayload = btoa(JSON.stringify(tokenPayload));
    
    const signature = btoa(stringifiedHeader + stringifiedPayload + secret);
    
    return `${stringifiedHeader}.${stringifiedPayload}.${signature}`;
  },
  
  verify: (token: string, secret: string): any => {
    try {
      const [headerStr, payloadStr] = token.split('.');
      if (!headerStr || !payloadStr) throw new Error('Invalid token format');
      
      const payload = JSON.parse(atob(payloadStr));
      const now = Math.floor(Date.now() / 1000);
      
      if (payload.exp && payload.exp < now) {
        throw new Error('Token expired');
      }
      
      return payload;
    } catch (error) {
      throw new Error('Invalid token');
    }
  }
};

// Simple password hashing for browser (not as secure as bcrypt but works for demo)
const bcryptCompat = {
  async genSalt(rounds = 10): Promise<string> {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let salt = '';
    for (let i = 0; i < 16; i++) {
      salt += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return `$2b$${rounds}$${salt}`;
  },
  
  async hash(password: string, salt: string): Promise<string> {
    // Simple hashing function (not secure as real bcrypt, just for demo)
    const encoder = new TextEncoder();
    const data = encoder.encode(salt + password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return `${salt}.${hashHex}`;
  },
  
  async compare(password: string, hash: string): Promise<boolean> {
    const [salt, _] = hash.split('.');
    const newHash = await this.hash(password, salt);
    return newHash === hash;
  }
};

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
      const salt = await bcryptCompat.genSalt(10);
      const hashedPassword = await bcryptCompat.hash(password, salt);
      
      // Create new user
      const newUser: User = {
        email: email.toLowerCase(),
        name,
        password: hashedPassword,
        createdAt: new Date()
      };
      
      const result = await usersCollection.insertOne(newUser);
      
      // Generate token
      const token = jwtCompat.sign(
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
      const isMatch = await bcryptCompat.compare(password, user.password);
      
      if (!isMatch) {
        return { success: false, message: "Invalid credentials" };
      }
      
      // Generate token
      const token = jwtCompat.sign(
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
      const decoded = jwtCompat.verify(token, JWT_SECRET) as { id: string; email: string };
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
      const user = await usersCollection.findOne({ _id: userId });
      
      if (!user) {
        this.clearStoredToken();
        return null;
      }
      
      // Ensure we return a proper User object without the password
      return {
        _id: user._id.toString(),
        email: user.email,
        name: user.name,
        createdAt: user.createdAt
      };
    } catch (error) {
      console.error("Error getting current user:", error);
      return null;
    }
  }
}

export const authService = AuthService.getInstance();
