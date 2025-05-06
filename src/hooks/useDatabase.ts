import { useEffect, useState } from 'react';
import { ref, onValue, get, set, push, remove } from 'firebase/database';
import { db } from '@/lib/firebase';

// Generic type for the data
type DatabaseData<T> = {
  data: T | null;
  loading: boolean;
  error: Error | null;
};

export function useDatabase<T>(path: string) {
  const [state, setState] = useState<DatabaseData<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const dbRef = ref(db, path);

    const unsubscribe = onValue(dbRef, 
      (snapshot) => {
        setState({
          data: snapshot.val(),
          loading: false,
          error: null,
        });
      },
      (error) => {
        setState({
          data: null,
          loading: false,
          error: error as Error,
        });
      }
    );

    return () => unsubscribe();
  }, [path]);

  // Function to get data once
  const getData = async () => {
    try {
      const dbRef = ref(db, path);
      const snapshot = await get(dbRef);
      return snapshot.val();
    } catch (error) {
      console.error('Error getting data:', error);
      throw error;
    }
  };

  // Function to set data
  const setData = async (data: T) => {
    try {
      const dbRef = ref(db, path);
      await set(dbRef, data);
    } catch (error) {
      console.error('Error setting data:', error);
      throw error;
    }
  };

  // Function to push new data to a list
  const pushData = async (data: T) => {
    try {
      const dbRef = ref(db, path);
      const newRef = await push(dbRef, data);
      return newRef.key;
    } catch (error) {
      console.error('Error pushing data:', error);
      throw error;
    }
  };

  // Function to remove data
  const removeData = async () => {
    try {
      const dbRef = ref(db, path);
      await remove(dbRef);
    } catch (error) {
      console.error('Error removing data:', error);
      throw error;
    }
  };

  return {
    ...state,
    getData,
    setData,
    pushData,
    removeData,
  };
}

// Example types based on your database structure
export interface User {
  createdAt: string;
  email: string;
  fullName: string;
  matricule: string;
  phoneNumber: string;
  specialty: string;
  year: string;
}

export interface UserDocument {
  [key: string]: User;
} 