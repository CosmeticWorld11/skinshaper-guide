
import * as React from "react";
import { authService, User, AuthResponse } from "../services/authService";
import { toast } from "sonner";

interface AuthContextType {
  user: Omit<User, "password"> | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<AuthResponse>;
  register: (email: string, password: string, name: string) => Promise<AuthResponse>;
  logout: () => void;
}

const AuthContext = React.createContext<AuthContextType>({
  user: null,
  isLoading: true,
  isAuthenticated: false,
  login: async () => ({ success: false, message: "Auth context not initialized" }),
  register: async () => ({ success: false, message: "Auth context not initialized" }),
  logout: () => {},
});

export const useAuth = () => React.useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = React.useState<Omit<User, "password"> | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const loadUser = async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error("Error loading user:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (email: string, password: string) => {
    const response = await authService.login(email, password);
    
    if (response.success && response.token && response.user) {
      authService.setStoredToken(response.token);
      setUser(response.user);
      toast.success("Logged in successfully");
    } else {
      toast.error(response.message);
    }
    
    return response;
  };

  const register = async (email: string, password: string, name: string) => {
    const response = await authService.register(email, password, name);
    
    if (response.success && response.token && response.user) {
      authService.setStoredToken(response.token);
      setUser(response.user);
      toast.success("Account created successfully");
    } else {
      toast.error(response.message);
    }
    
    return response;
  };

  const logout = () => {
    authService.clearStoredToken();
    setUser(null);
    toast.info("Logged out successfully");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
