import React, { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  token: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  const login = async (username: string, password: string): Promise<boolean> => {
    // Input validation
    if (!username.trim() || !password.trim()) {
      return false;
    }

    // Basic security checks
    if (username.length < 3 || password.length < 6) {
      return false;
    }

    try {
      // Simulate secure API call with proper validation
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
        credentials: 'include', // Important for cookies
      });

      if (response.ok) {
        const data = await response.json();
        
        // Store token securely (in this case, we'll use a more secure approach)
        // In a real app, this would be handled by HttpOnly cookies from the backend
        if (data.token) {
          setToken(data.token);
          // Store in sessionStorage instead of localStorage (shorter lived)
          sessionStorage.setItem('auth_token', data.token);
          setIsAuthenticated(true);
          return true;
        }
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setToken(null);
    sessionStorage.removeItem('auth_token');
    
    // Clear all session storage
    sessionStorage.clear();
    
    // In a real app, you'd also make a logout API call
    fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
    }).catch(console.error);
  };

  // Check sessionStorage on initial load
  React.useEffect(() => {
    const storedToken = sessionStorage.getItem('auth_token');
    if (storedToken) {
      // Validate token with backend
      fetch('/api/auth/validate', {
        headers: {
          'Authorization': `Bearer ${storedToken}`,
        },
        credentials: 'include',
      })
      .then(response => {
        if (response.ok) {
          setToken(storedToken);
          setIsAuthenticated(true);
        } else {
          // Token is invalid, clear it
          sessionStorage.removeItem('auth_token');
        }
      })
      .catch(() => {
        sessionStorage.removeItem('auth_token');
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, token }}>
      {children}
    </AuthContext.Provider>
  );
};