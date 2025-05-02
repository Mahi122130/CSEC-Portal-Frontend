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
    const initializeAuth = async () => {
      const token = Cookies.get('accessToken');
      const savedRole = Cookies.get('role');

      if (token && savedRole && !isTokenExpired(token)) {
        setAccessToken(token);
        setRole(savedRole);
        setIsAuthenticated(true);
      } else {
        await logout();
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string, rememberMe: boolean) => {
    try {
      const { data } = await api.post('/auth/login', { email, password });
      const { accessToken, refreshToken, role } = data;

      // Set cookies (keeping your existing implementation)
      if (rememberMe) {
        Cookies.set('accessToken', accessToken, { expires: 7 });
        if (refreshToken) Cookies.set('refreshToken', refreshToken, { expires: 7 });
        Cookies.set('role', role, { expires: 7 });
      } else {
        Cookies.set('accessToken', accessToken);
        Cookies.set('role', role);
      }

      setAccessToken(accessToken);
      setRole(role);
      setIsAuthenticated(true);
      router.push('/dashboard');
    } catch (error) {
      console.log("Login error:", error);
      throw error;
    }
  };

  const logout = () => {
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
    Cookies.remove('role');
    localStorage.removeItem('user');
    setAccessToken(null);
    setRole(null);
    setIsAuthenticated(false);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ 
      role, 
      loading, 
      isAuthenticated, 
      accessToken, 
      login, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);