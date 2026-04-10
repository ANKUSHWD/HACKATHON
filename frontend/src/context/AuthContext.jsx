import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load user from localStorage on mount
    const initializeAuth = () => {
      const stored = localStorage.getItem('optihire_user');
      if (stored) {
        try {
          const parsedUser = JSON.parse(stored);
          setUser(parsedUser);
        } catch (error) {
          console.warn('Failed to parse stored user data:', error);
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const signup = (userData) => {
    const newUser = {
      id: Date.now().toString(),
      ...userData,
      createdAt: new Date().toISOString(),
      onboardingComplete: false,
      isAdmin: userData.email === 'admin@optihire.com',
    };
    localStorage.setItem('optihire_user', JSON.stringify(newUser));
    setUser(newUser);
    return newUser;
  };

  const login = (email, password) => {
    // Check if user exists in storage
    const stored = localStorage.getItem('optihire_user');
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed.email === email) {
        setUser(parsed);
        return { success: true, user: parsed };
      }
    }
    // Demo admin login
    if (email === 'admin@optihire.com' && password === 'admin123') {
      const adminUser = {
        id: 'admin',
        name: 'Admin',
        email: 'admin@optihire.com',
        isAdmin: true,
        onboardingComplete: true,
      };
      localStorage.setItem('optihire_user', JSON.stringify(adminUser));
      setUser(adminUser);
      return { success: true, user: adminUser };
    }
    return { success: false, error: 'Invalid credentials' };
  };

  const logout = () => {
    localStorage.removeItem('optihire_user');
    setUser(null);
  };

  const updateUser = (updates) => {
    const updated = { ...user, ...updates };
    localStorage.setItem('optihire_user', JSON.stringify(updated));
    setUser(updated);
    return updated;
  };

  return (
    <AuthContext.Provider value={{ user, loading, signup, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
