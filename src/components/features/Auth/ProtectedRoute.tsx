'use client';

import { useAuth } from '@/context/AuthContext';

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-[#003081] to-[#001a3d] flex flex-col items-center justify-center p-4">
        {/* Your beautiful loading spinner here */}
        <div className="max-w-md w-full space-y-6 text-center">
          {/* Animated Logo/Icon */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-white/10 animate-ping"></div>
              <div className="relative w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                {/* SVG icon */}
              </div>
            </div>
          </div>

          {/* Loading Text */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-white">Loading ...</h1>
            <p className="text-blue-100/80">Preparing everything for you!</p>
          </div>

          {/* Animated Loader */}
          <div className="pt-4">
            {/* Spinner Icon */}
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-white/10 rounded-full h-2">
            <div className="bg-white h-2 rounded-full animate-pulse" style={{ width: '70%' }}></div>
          </div>
        </div>
      </div>
    );
  }

  // No need to check accessToken or role again here!
  return <>{children}</>;
}
