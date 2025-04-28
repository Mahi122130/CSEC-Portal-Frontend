'use client';

import { useAuth } from '@/context/AuthContext';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { role, loading, accessToken } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      // If no role is set or the access token is expired, redirect to login
      if (!role || !accessToken) {
        console.log(accessToken, role);
        router.push('/login');
      }
    }
  }, [role, loading, accessToken, router]);

  return <>{children}</>;
}
