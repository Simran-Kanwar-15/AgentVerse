import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [apiProvider, setApiProvider] = useState('groq');
  const [apiKey, setApiKey] = useState('');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedProvider = localStorage.getItem('api_provider') || 'groq';
    const storedKey = localStorage.getItem('api_key') || '';
    const storedUser = localStorage.getItem('user');
    
    setApiProvider(storedProvider);
    setApiKey(storedKey);
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const saveSettings = (provider, key) => {
    setApiProvider(provider);
    setApiKey(key);
    localStorage.setItem('api_provider', provider);
    localStorage.setItem('api_key', key);
    if (!user) {
      const defaultUser = { full_name: 'Agent Explorer', email: 'explorer@agentverse.ai' };
      setUser(defaultUser);
      localStorage.setItem('user', JSON.stringify(defaultUser));
    }
  };

  const register = (fullName, email, password, provider, key) => {
    const newUser = { full_name: fullName, email: email };
    setUser(newUser);
    setApiProvider(provider);
    setApiKey(key);
    
    // Store credentials and profile locally
    localStorage.setItem('user', JSON.stringify(newUser));
    localStorage.setItem('api_provider', provider);
    localStorage.setItem('api_key', key);
    
    // Save email & password credentials in client database simulation
    localStorage.setItem(`user_creds_${email.toLowerCase()}`, JSON.stringify({ 
      password, 
      fullName, 
      provider, 
      key 
    }));
  };

  const login = (email, password) => {
    const credsStr = localStorage.getItem(`user_creds_${email.toLowerCase()}`);
    if (!credsStr) {
      throw new Error('No identity found with this email. Please register first.');
    }
    
    const creds = JSON.parse(credsStr);
    if (creds.password !== password) {
      throw new Error('Incorrect password. Please try again.');
    }
    
    const loggedUser = { full_name: creds.fullName, email: email };
    setUser(loggedUser);
    setApiProvider(creds.provider);
    setApiKey(creds.key);
    
    localStorage.setItem('user', JSON.stringify(loggedUser));
    localStorage.setItem('api_provider', creds.provider);
    localStorage.setItem('api_key', creds.key);
  };

  const logout = () => {
    setApiKey('');
    setUser(null);
    localStorage.removeItem('api_key');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ 
      apiProvider, 
      apiKey, 
      loading, 
      saveSettings, 
      register,
      login,
      logout, 
      isAuthenticated: !!apiKey && !!user,
      user
    }}>
      {children}
    </AuthContext.Provider>
  );
};
