import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInWithPopup,
  signOut, 
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db, googleProvider, githubProvider, facebookProvider } from '../lib/firebase';

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
  loginWithGoogle: () => Promise<void>;
  loginWithGithub: () => Promise<void>;
  loginWithFacebook: () => Promise<void>;
  logout: () => Promise<void>;
  openAuthModal: (view?: AuthModalView) => void;
  closeAuthModal: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalView, setAuthModalView] = useState<AuthModalView>('initial');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // We have a user in Firebase Auth. Let's fetch their data from Firestore
        try {
          const userDocRef = doc(db, 'users', firebaseUser.uid);
          const userDocSnap = await getDoc(userDocRef);
          
          if (userDocSnap.exists()) {
            const data = userDocSnap.data();
            setUser({
              id: firebaseUser.uid,
              name: data.name || firebaseUser.displayName || '',
              email: firebaseUser.email || '',
            });
          } else {
            // Fallback if they somehow don't have a Firestore document
            setUser({
              id: firebaseUser.uid,
              name: firebaseUser.displayName || '',
              email: firebaseUser.email || '',
            });
          }
        } catch (error) {
          console.error("Error fetching user data from Firestore:", error);
          // Still set the user based on Auth data if Firestore fails
          setUser({
            id: firebaseUser.uid,
            name: firebaseUser.displayName || '',
            email: firebaseUser.email || '',
          });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Check for first visit to show the initial modal
    const hasSeenModal = localStorage.getItem('has_seen_auth_modal');
    // Only show if we've loaded auth state and there is no user
    if (!loading && !hasSeenModal && !user) {
      const timer = setTimeout(() => {
        setAuthModalView('initial');
        setIsAuthModalOpen(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [loading, user]);

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
    closeAuthModal();
  };

  const signup = async (name: string, email: string, password: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;
    
    // Update Auth Profile
    await updateProfile(firebaseUser, { displayName: name });
    
    // Create Firestore document with user info
    await setDoc(doc(db, 'users', firebaseUser.uid), {
      name,
      email,
      createdAt: serverTimestamp()
    });
    
    closeAuthModal();
  };

  const handleOAuthProvider = async (provider: any) => {
    try {
      const userCredential = await signInWithPopup(auth, provider);
      const firebaseUser = userCredential.user;
      
      const userDocRef = doc(db, 'users', firebaseUser.uid);
      const userDocSnap = await getDoc(userDocRef);
      
      if (!userDocSnap.exists()) {
        await setDoc(userDocRef, {
          name: firebaseUser.displayName || 'OAuth User',
          email: firebaseUser.email || '',
          createdAt: serverTimestamp()
        });
      }
      closeAuthModal();
    } catch (error: any) {
      console.error("OAuth error:", error);
      throw error;
    }
  };

  const loginWithGoogle = () => handleOAuthProvider(googleProvider);
  const loginWithGithub = () => handleOAuthProvider(githubProvider);
  const loginWithFacebook = () => handleOAuthProvider(facebookProvider);

  const logout = async () => {
    await signOut(auth);
  };

  const openAuthModal = (view: AuthModalView = 'login') => {
    setAuthModalView(view);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
    localStorage.setItem('has_seen_auth_modal', 'true');
  };

  return (
    <AuthContext.Provider value={{ 
      user, isAuthModalOpen, authModalView, login, signup, 
      loginWithGoogle, loginWithGithub, loginWithFacebook,
      logout, openAuthModal, closeAuthModal, loading 
    }}>
      {!loading && children}
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
