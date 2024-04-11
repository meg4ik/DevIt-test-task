'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const fetchAuthentication = async () => {
  try {
    const response = await fetch('http://127.0.0.1:8088/check-authentication', {mode: 'no-cors',});
    if (response.ok) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error('Failed to check authentication:', error);
    return false;
  }
};

const RequireAuthentication = ({ children, invert }) => {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  
  useEffect(() => {
    const checkAuthentication = async () => {
      const isAuthenticated = await fetchAuthentication();
      setAuthenticated(isAuthenticated);
    };

    checkAuthentication();
  }, []);

  if (invert) {
    return authenticated ? null : <>{children}</>;
  } else {
    return authenticated ? <>{children}</> : null;
  }
};

export default RequireAuthentication;