import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Structure to hold demo user data. Easy to swap with Firebase User later.
export interface User {
  id: string;
  name: string;
  email: string;
}

export type AuthModalView = 'initial' | 'login' | 'signup' | 'required';

interface AuthContextType {
  user: User | null;
  isAuthModalOpen: boolean;
  authModalView: AuthModalView;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  openAuthModal: (view?: AuthModalView) => void;
  closeAuthModal: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalView, setAuthModalView] = useState<AuthModalView>('initial');

  // Check for existing session on load
  useEffect(() => {
    const storedUser = localStorage.getItem('demo_user_session');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse user session");
      }
    }

    // Check for first visit
    const hasSeenModal = localStorage.getItem('has_seen_auth_modal');
    if (!hasSeenModal && !storedUser) {
      // Small delay for better UX
      const timer = setTimeout(() => {
        setAuthModalView('initial');
        setIsAuthModalOpen(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Simulated API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Retrieve fake users from local storage
    const usersStr = localStorage.getItem('demo_users');
    const users = usersStr ? JSON.parse(usersStr) : {};

    if (users[email] && users[email].password === password) {
      const loggedInUser: User = {
        id: users[email].id,
        name: users[email].name,
        email: email,
      };
      setUser(loggedInUser);
      localStorage.setItem('demo_user_session', JSON.stringify(loggedInUser));
      closeAuthModal();
    } else {
      throw new Error('Invalid email or password');
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    // Simulated API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const usersStr = localStorage.getItem('demo_users');
    const users = usersStr ? JSON.parse(usersStr) : {};

    if (users[email]) {
      throw new Error('Email already exists');
    }

    const newUser = {
      id: Math.random().toString(36).substring(2, 9),
      name,
      email,
      password, // In a real app, never store plain text passwords!
    };

    users[email] = newUser;
    localStorage.setItem('demo_users', JSON.stringify(users));

    const loggedInUser: User = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    };
    
    setUser(loggedInUser);
    localStorage.setItem('demo_user_session', JSON.stringify(loggedInUser));
    closeAuthModal();
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('demo_user_session');
  };

  const openAuthModal = (view: AuthModalView = 'login') => {
    setAuthModalView(view);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
    // Mark that they have seen it so it doesn't pop up again
    localStorage.setItem('has_seen_auth_modal', 'true');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthModalOpen, authModalView, login, signup, logout, openAuthModal, closeAuthModal }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
