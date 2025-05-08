'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import api from '@/lib/axios';

interface AuthContextType {
  role: string | null;
  loading: boolean;
  isAuthenticated: boolean;
  accessToken: string | null;
  login: (email: string, password: string, rememberMe: boolean) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('accessToken');
    const savedRole = Cookies.get('role');

    if (token && savedRole) {
      setAccessToken(token);
      setRole(savedRole);
      setIsAuthenticated(true);
    }

    setLoading(false);
  }, []);

  const login = async (email: string, password: string, rememberMe: boolean) => {
    try {
      const { data } = await api.post('/auth/login', { email, password });
      const { accessToken, refreshToken, role } = data;

      const cookieOptions = {
        path: '/',
        sameSite: 'lax' as const,
        secure: process.env.NODE_ENV === 'production',
        ...(rememberMe ? { expires: 7 } : { expires: 1 }),
      };

      Cookies.set('accessToken', accessToken, cookieOptions);
      Cookies.set('role', role, cookieOptions);
      if (refreshToken) {
        Cookies.set('refreshToken', refreshToken, cookieOptions);
      }

      setAccessToken(accessToken);
      setRole(role);
      setIsAuthenticated(true);
      router.push('/dashboard');
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ role, loading, isAuthenticated, accessToken, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
