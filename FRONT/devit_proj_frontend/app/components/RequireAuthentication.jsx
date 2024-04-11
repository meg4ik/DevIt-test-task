'use client'
import { useEffect, useState } from 'react';

const fetchAuthentication = async () => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    return false;
  }

  try {
    const response = await fetch('http://127.0.0.1:8088/api/check-authentication/', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    return response.ok;
  } catch (error) {
    console.error('Failed to check authentication:', error);
    return false;
  }
};

const RequireAuthentication = ({ children, invert }) => {
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
