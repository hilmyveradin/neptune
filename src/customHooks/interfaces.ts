import type { ReactNode } from 'react';

import type firebase from '../lib/utils/firebaseClient';

export interface AuthProviderProps {
  children: ReactNode;
}

export interface AuthContextType {
  user: firebase.User | null;
  signUp: (
    email: string,
    password: string,
    displayName: string
  ) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  isLoading: boolean;
}
