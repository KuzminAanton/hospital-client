import { useState, useEffect, useCallback } from 'react';

export const useAuth = () => {
  const [token, setToken] = useState(null);
  const [isReady, setIsReady] = useState(false);

  const login = useCallback((jwtToken) => {
    setToken(jwtToken);
    localStorage.setItem('userData', jwtToken);
  }, []);

  const logout = () => {
    setToken(null);
    localStorage.removeItem('userData');
  };

  useEffect(() => {
    const data = localStorage.getItem('userData');
    if (data) {
      login(data);
    }
    setIsReady(true);
  }, [login]);

  return {
    login, logout, token, isReady,
  };
};
