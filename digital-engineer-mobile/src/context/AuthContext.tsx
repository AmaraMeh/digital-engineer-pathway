import React, { createContext, useState, useEffect, useContext } from 'react';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBtv9tiAg4dGG2MfVj-nS-CzoNEUIR_14Y",
  authDomain: "sample-firebase-ai-apph-48570.firebaseapp.com",
  projectId: "sample-firebase-ai-apph-48570",
  storageBucket: "sample-firebase-ai-apph-48570.firebasestorage.app",
  messagingSenderId: "560740686768",
  appId: "1:560740686768:web:2b61a3a13069cfecef5475"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Set persistence to local
setPersistence(auth, browserLocalPersistence);

// Store the auth token in AsyncStorage
const storeAuthToken = async (token: string) => {
  try {
    await AsyncStorage.setItem('@auth_token', token);
  } catch (error) {
    console.error('Error storing auth token:', error);
  }
};

// Get the auth token from AsyncStorage
const getAuthToken = async () => {
  try {
    return await AsyncStorage.getItem('@auth_token');
  } catch (error) {
    console.error('Error getting auth token:', error);
    return null;
  }
};

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored token on mount
    getAuthToken().then((token) => {
      if (token) {
        // If we have a token, we can initialize auth state
        onAuthStateChanged(auth, (user) => {
          setUser(user);
          setLoading(false);
        });
      } else {
        setLoading(false);
      }
    });

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Store the new token when user signs in
        currentUser.getIdToken().then((token) => {
          storeAuthToken(token);
        });
      }
    });

    return () => unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken();
      await storeAuthToken(token);
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken();
      await storeAuthToken(token);
      
      // Create user document in Firestore
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        name,
        email,
        createdAt: new Date(),
      });
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await signOut(auth);
      await AsyncStorage.removeItem('@auth_token');
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    signIn,
    signUp,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 