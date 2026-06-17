import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth, AuthModalView } from '../contexts/AuthContext';
import { X, Eye, EyeOff, Mail, Lock, User as UserIcon, AlertCircle } from 'lucide-react';

export function AuthModal() {
  const { isAuthModalOpen, authModalView, closeAuthModal, openAuthModal, login, signup } = useAuth();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isAuthModalOpen) return null;

  const resetForm = () => {
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setError(null);
  };

  const handleSwitchView = (view: AuthModalView) => {
    resetForm();
    openAuthModal(view);
  };

  const handleClose = () => {
    resetForm();
    closeAuthModal();
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      await login(email, password);
    } catch (err: any) {
      setError(err.message || 'Failed to login');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setIsLoading(true);
    try {
      await signup(name, email, password);
    } catch (err: any) {
      setError(err.message || 'Failed to sign up');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 cursor-pointer"
          onClick={handleClose}
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden p-8"
        >
          <button
            onClick={handleClose}
            className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <X size={20} />
          </button>

          {/* INITIAL VISIT VIEW */}
          {authModalView === 'initial' && (
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-500/10 text-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <UserIcon size={32} />
              </div>
              <h2 className="text-2xl font-bold mb-3">Welcome to My Portfolio!</h2>
              <p className="text-slate-600 dark:text-slate-400 mb-8">
                Join the community to unlock premium features, save your progress, and get in touch with me directly.
              </p>
              
              <div className="space-y-4">
                <button
                  onClick={() => handleSwitchView('signup')}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold hover:opacity-90 transition-opacity"
                >
                  Create an Account
                </button>
                <button
                  onClick={() => handleSwitchView('login')}
                  className="w-full py-4 rounded-xl border border-slate-200 dark:border-slate-700 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  I already have an account
                </button>
                <button
                  onClick={handleClose}
                  className="w-full py-3 text-slate-500 font-medium hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
                >
                  Maybe Later
                </button>
              </div>
            </div>
          )}

          {/* LOGIN REQUIRED VIEW */}
          {authModalView === 'required' && (
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-500/10 text-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Lock size={32} />
              </div>
              <h2 className="text-2xl font-bold mb-3">Authentication Required</h2>
              <p className="text-slate-600 dark:text-slate-400 mb-8">
                Please login or create an account to send me a message.
              </p>
              
              <div className="space-y-4">
                <button
                  onClick={() => handleSwitchView('login')}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold hover:opacity-90 transition-opacity"
                >
                  Login Component
                </button>
                <button
                  onClick={() => handleSwitchView('signup')}
                  className="w-full py-4 rounded-xl border border-slate-200 dark:border-slate-700 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  Create an Account
                </button>
                <button
                  onClick={handleClose}
                  className="w-full py-3 text-slate-500 font-medium hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* LOGIN & SIGNUP VIEWS */}
          {(authModalView === 'login' || authModalView === 'signup') && (
            <div>
              <h2 className="text-2xl font-bold mb-2">
                {authModalView === 'login' ? 'Welcome Back' : 'Create Account'}
              </h2>
              <p className="text-slate-500 dark:text-slate-400 mb-6">
                {authModalView === 'login' 
                  ? 'Enter your credentials to access your account.' 
                  : 'Sign up to unlock premium features and contact me.'}
              </p>

              {error && (
                <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-3">
                  <AlertCircle className="text-red-500 shrink-0 mt-0.5" size={18} />
                  <p className="text-red-500 text-sm font-medium">{error}</p>
                </div>
              )}

              <form onSubmit={authModalView === 'login' ? handleLogin : handleSignup} className="space-y-5">
                
                {authModalView === 'signup' && (
                  <div>
                    <label className="block text-sm font-medium mb-1.5 opacity-80">Full Name</label>
                    <div className="relative">
                      <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                        placeholder="Deepanshu Kumar"
                        required
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium mb-1.5 opacity-80">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5 opacity-80">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-11 pr-11 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                      placeholder="••••••••"
                      required
                      minLength={6}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {authModalView === 'signup' && (
                  <div>
                    <label className="block text-sm font-medium mb-1.5 opacity-80">Confirm Password</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full pl-11 pr-11 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                        placeholder="••••••••"
                        required
                      />
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold hover:opacity-90 transition-opacity disabled:opacity-50 mt-4"
                >
                  {isLoading 
                    ? 'Please wait...' 
                    : authModalView === 'login' ? 'Sign In' : 'Create Account'}
                </button>
              </form>

              <div className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
                {authModalView === 'login' ? "Don't have an account? " : "Already have an account? "}
                <button
                  onClick={() => handleSwitchView(authModalView === 'login' ? 'signup' : 'login')}
                  className="font-bold text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  {authModalView === 'login' ? 'Sign Up' : 'Log In'}
                </button>
              </div>
            </div>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
