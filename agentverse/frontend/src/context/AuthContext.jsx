import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [apiProvider, setApiProvider] = useState('groq');
  const [apiKey, setApiKey] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedProvider = localStorage.getItem('api_provider') || 'groq';
    const storedKey = localStorage.getItem('api_key') || '';
    setApiProvider(storedProvider);
    setApiKey(storedKey);
    setLoading(false);
  }, []);

  const saveSettings = (provider, key) => {
    setApiProvider(provider);
    setApiKey(key);
    localStorage.setItem('api_provider', provider);
    localStorage.setItem('api_key', key);
  };

  const logout = () => {
    setApiKey('');
    localStorage.removeItem('api_key');
  };

  return (
    <AuthContext.Provider value={{ 
      apiProvider, 
      apiKey, 
      loading, 
      saveSettings, 
      logout, 
      isAuthenticated: !!apiKey,
      user: { full_name: "Agent Explorer" }
    }}>
      {children}
    </AuthContext.Provider>
  );
};
