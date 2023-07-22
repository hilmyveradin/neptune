'use client';

/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-constructed-context-values */
import { useState, useEffect, useContext, createContext } from 'react';

import firebase from '../lib/utils/firebaseClient';

import type { AuthContextType, AuthProviderProps } from './interfaces';

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<firebase.User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
      setIsLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const signUp = async (
    email: string,
    password: string,
    displayName: string
  ) => {
    const { user } = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    if (user) {
      await user.updateProfile({ displayName });
    }
  };

  const signIn = async (email: string, password: string) => {
    await firebase.auth().signInWithEmailAndPassword(email, password);
  };

  const signOut = async () => {
    await firebase.auth().signOut();
  };

  const signInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    await firebase.auth().signInWithPopup(provider);
  };

  const value: AuthContextType = {
    user,
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
