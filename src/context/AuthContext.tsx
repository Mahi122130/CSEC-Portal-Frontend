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
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const router = useRouter();

  const isTokenExpired = (token: string | null) => {
    if (!token) return true;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return Date.now() >= payload.exp * 1000;
    } catch {
      return true;
    }
  };

  useEffect(() => {
    const token = Cookies.get('accessToken');
    const savedRole = Cookies.get('role');

    if (token && savedRole && !isTokenExpired(token)) {
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
        ...(rememberMe ? { expires: 7 } : {}),
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

  const logout = (redirect = true) => {
    Cookies.remove('accessToken', { path: '/' });
    Cookies.remove('refreshToken', { path: '/' });
    Cookies.remove('role', { path: '/' });
    localStorage.removeItem('user');
    setAccessToken(null);
    setRole(null);
    setIsAuthenticated(false);
    if (redirect) router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ role, loading, isAuthenticated, accessToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
