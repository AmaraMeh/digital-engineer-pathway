
import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { User } from "firebase/auth";
import { auth, signIn, signUp, logout } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useToast } from "@/components/ui/use-toast";

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<User>;
  register: (email: string, password: string, displayName: string) => Promise<User>;
  logOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const user = await signIn(email, password);
      toast({
        title: "Login successful!",
        description: "Welcome back to Code Pathway!",
      });
      return user;
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: error.message || "Failed to sign in.",
      });
      throw error;
    }
  };

  const register = async (email: string, password: string, displayName: string) => {
    try {
      const user = await signUp(email, password, displayName);
      toast({
        title: "Account created!",
        description: "Welcome to Code Pathway!",
      });
      return user;
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: error.message || "Failed to create account.",
      });
      throw error;
    }
  };

  const logOut = async () => {
    try {
      await logout();
      toast({
        title: "Logged out successfully",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Logout failed",
        description: error.message || "Failed to log out.",
      });
      throw error;
    }
  };

  const value = {
    currentUser,
    loading,
    login,
    register,
    logOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
