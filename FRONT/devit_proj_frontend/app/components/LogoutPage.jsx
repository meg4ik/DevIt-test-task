"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const LogoutPage = () => {
  const router = useRouter();

  useEffect(() => {
    const logout = async () => {
      try {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');

        router.push('/login');
      } catch (error) {
        console.error('Logout failed:', error);
      }
    };

    logout();
  }, []);

  return null;
};

export default LogoutPage;
