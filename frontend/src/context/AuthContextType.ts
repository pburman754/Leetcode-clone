import { createContext } from 'react';
import type { Submission } from '../types';

export interface User {
  id: number;
  username: string;
  email: string;
  points: number;
  solvedProblems?: number[];
  solvedCount?: number;
  recentSubmissions?: Submission[];
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
  refreshUser: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);