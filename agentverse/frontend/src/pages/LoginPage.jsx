import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Eye, EyeOff, Loader2 } from 'lucide-react';

export default function LoginPage() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background py-12 px-4">
      {/* Background Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-accent-astrologer/15 rounded-full filter blur-[120px] animate-blob animate-pulse-slow" />
      <div className="absolute bottom-[-15%] right-[-10%] w-[45vw] h-[45vw] max-w-[550px] max-h-[550px] bg-accent-education/15 rounded-full filter blur-[120px] animate-blob" style={{ animationDelay: '3s' }} />

      <div className="glass-panel p-10 w-full max-w-md z-10 rounded-[28px] relative overflow-hidden border border-white/10 shadow-glass">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent-astrologer via-accent-makeup to-accent-finance" />
        
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold mb-3 tracking-tight font-heading">
            Welcome <span className="text-gradient bg-gradient-to-r from-accent-astrologer to-accent-makeup">Back</span>
          </h1>
          <p className="text-secondary text-[15px]">Access your decentralized AgentVerse</p>
        </div>
        
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl mb-6 text-sm flex items-center gap-2">
            <span>⚠️</span> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-white/70">Email Address</label>
            <input 
              type="email" 
              required
              className="input w-full p-4 focus:ring-accent-astrologer"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-white/70">Password</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                required
                className="input w-full p-4 pr-12 focus:ring-accent-astrologer"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-4 text-secondary hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-white text-black font-semibold p-4 rounded-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center shadow-lg disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin text-black" size={20} /> : 'Uplink Account'}
          </button>
        </form>

        <p className="text-center mt-8 text-secondary text-sm">
          New to the verse?{' '}
          <Link to="/register" className="text-white hover:underline font-medium transition-all">
            Create an identity
          </Link>
        </p>
      </div>
    </div>
  );
}
