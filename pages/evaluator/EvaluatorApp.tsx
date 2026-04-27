import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { onAuthStateChanged, signOut, sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth';
import { auth } from '../../firebase';
import Dashboard from './Dashboard';
import EvaluationForm from './EvaluationForm';

const EvaluatorApp = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50">Loading...</div>;
  }

  if (!user) {
    return <Login onLogin={() => navigate('/evaluator')} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-blue-900 text-white p-4 flex justify-between items-center shadow-md">
        <h1 className="text-xl font-bold">RE Evaluator</h1>
        <button 
          onClick={() => signOut(auth)}
          className="text-sm bg-blue-800 px-3 py-1 rounded hover:bg-blue-700"
        >
          Logout
        </button>
      </header>
      <main className="flex-grow p-4 max-w-3xl mx-auto w-full">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/new" element={<EvaluationForm />} />
          <Route path="/edit/:id" element={<EvaluationForm />} />
          <Route path="*" element={<Navigate to="/evaluator" replace />} />
        </Routes>
      </main>
    </div>
  );
};

const Login = ({ onLogin }: { onLogin: () => void }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const completeSignIn = async () => {
      if (isSignInWithEmailLink(auth, window.location.href)) {
        let emailForSignIn = window.localStorage.getItem('emailForSignIn');
        if (!emailForSignIn) {
          emailForSignIn = window.prompt('Please provide your email for confirmation');
        }
        if (emailForSignIn) {
          setLoading(true);
          try {
            await signInWithEmailLink(auth, emailForSignIn, window.location.href);
            window.localStorage.removeItem('emailForSignIn');
            onLogin();
          } catch (err: any) {
            setError(err.message || 'Failed to sign in with link');
          } finally {
            setLoading(false);
          }
        }
      }
    };
    completeSignIn();
  }, [onLogin]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);
    try {
      const actionCodeSettings = {
        url: window.location.href,
        handleCodeInApp: true,
      };
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      window.localStorage.setItem('emailForSignIn', email);
      setMessage('A sign-in link has been sent to your email address. Please check your inbox.');
    } catch (err: any) {
      setError(err.message || 'Failed to send sign-in link');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">HB</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Evaluator Login</h2>
          <p className="text-gray-500 mt-2">Sign in without a password</p>
        </div>

        {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">{error}</div>}
        {message && <div className="bg-green-50 text-green-700 p-3 rounded-lg mb-4 text-sm">{message}</div>}

        {!message && (
          <form onSubmit={handleAuth} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
                placeholder="Enter your email address"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Send Login Link'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default EvaluatorApp;