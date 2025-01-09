"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/signup');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return null; 
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}