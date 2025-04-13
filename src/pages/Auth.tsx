
import React, { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Key, Mail, User } from "lucide-react";

const Auth = () => {
  const { isAuthenticated, login, register, isLoading } = useAuth();
  const navigate = useNavigate();
  
  const [loginValues, setLoginValues] = useState({
    email: "",
    password: ""
  });
  
  const [registerValues, setRegisterValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [registerError, setRegisterError] = useState("");
  
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    
    if (!loginValues.email || !loginValues.password) {
      setLoginError("Please fill in all fields");
      return;
    }
    
    setIsProcessing(true);
    
    try {
      const response = await login(loginValues.email, loginValues.password);
      
      if (response.success) {
        navigate("/");
      } else {
        setLoginError(response.message);
      }
    } catch (error) {
      setLoginError("An unexpected error occurred");
    } finally {
      setIsProcessing(false);
    }
  };
  
  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterError("");
    
    if (!registerValues.name || !registerValues.email || !registerValues.password || !registerValues.confirmPassword) {
      setRegisterError("Please fill in all fields");
      return;
    }
    
    if (registerValues.password !== registerValues.confirmPassword) {
      setRegisterError("Passwords do not match");
      return;
    }
    
    if (registerValues.password.length < 6) {
      setRegisterError("Password must be at least 6 characters");
      return;
    }
    
    setIsProcessing(true);
    
    try {
      const response = await register(
        registerValues.email,
        registerValues.password,
        registerValues.name
      );
      
      if (response.success) {
        navigate("/");
      } else {
        setRegisterError(response.message);
      }
    } catch (error) {
      setRegisterError("An unexpected error occurred");
    } finally {
      setIsProcessing(false);
    }
  };
  
  // Redirect if already logged in and not loading
  if (isAuthenticated && !isLoading) {
    return <Navigate to="/" replace />;
  }
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto py-12 px-4 flex items-center justify-center">
        <div className="w-full max-w-md">
          <Card className="shadow-md">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-serif">Welcome to ECO-Skin</CardTitle>
              <CardDescription>Login or create an account to continue</CardDescription>
            </CardHeader>
            
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid grid-cols-2 mb-6 mx-4">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <form onSubmit={handleLoginSubmit}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="email"
                          placeholder="Email"
                          className="pl-10"
                          value={loginValues.email}
                          onChange={(e) => setLoginValues({ ...loginValues, email: e.target.value })}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="relative">
                        <Key className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="password"
                          placeholder="Password"
                          className="pl-10"
                          value={loginValues.password}
                          onChange={(e) => setLoginValues({ ...loginValues, password: e.target.value })}
                        />
                      </div>
                    </div>
                    
                    {loginError && (
                      <div className="text-sm text-red-500 mt-2">{loginError}</div>
                    )}
                  </CardContent>
                  
                  <CardFooter>
                    <Button 
                      type="submit" 
                      className="w-full bg-skin-600 hover:bg-skin-700" 
                      disabled={isProcessing}
                    >
                      {isProcessing ? "Logging in..." : "Login"}
                    </Button>
                  </CardFooter>
                </form>
              </TabsContent>
              
              <TabsContent value="register">
                <form onSubmit={handleRegisterSubmit}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="text"
                          placeholder="Full Name"
                          className="pl-10"
                          value={registerValues.name}
                          onChange={(e) => setRegisterValues({ ...registerValues, name: e.target.value })}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="email"
                          placeholder="Email"
                          className="pl-10"
                          value={registerValues.email}
                          onChange={(e) => setRegisterValues({ ...registerValues, email: e.target.value })}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="relative">
                        <Key className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="password"
                          placeholder="Password"
                          className="pl-10"
                          value={registerValues.password}
                          onChange={(e) => setRegisterValues({ ...registerValues, password: e.target.value })}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="relative">
                        <Key className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="password"
                          placeholder="Confirm Password"
                          className="pl-10"
                          value={registerValues.confirmPassword}
                          onChange={(e) => setRegisterValues({ ...registerValues, confirmPassword: e.target.value })}
                        />
                      </div>
                    </div>
                    
                    {registerError && (
                      <div className="text-sm text-red-500 mt-2">{registerError}</div>
                    )}
                  </CardContent>
                  
                  <CardFooter>
                    <Button 
                      type="submit" 
                      className="w-full bg-skin-600 hover:bg-skin-700" 
                      disabled={isProcessing}
                    >
                      {isProcessing ? "Creating Account..." : "Create Account"}
                    </Button>
                  </CardFooter>
                </form>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Auth;
