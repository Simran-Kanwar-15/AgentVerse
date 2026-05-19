import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Eye, EyeOff, Loader2 } from 'lucide-react';

export default function RegisterPage() {
  const { register } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
    confirmPassword: '',
    api_provider: 'gemini',
    api_key: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }
    setError('');
    setLoading(true);
    try {
      const { confirmPassword, ...dataToSend } = formData;
      await register(dataToSend);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to register');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background py-16 px-4">
      {/* Background Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-accent-makeup/15 rounded-full filter blur-[120px] animate-blob animate-pulse-slow" />
      <div className="absolute bottom-[-15%] right-[-10%] w-[45vw] h-[45vw] max-w-[550px] max-h-[550px] bg-accent-finance/15 rounded-full filter blur-[120px] animate-blob" style={{ animationDelay: '3s' }} />

      <div className="glass-panel p-10 w-full max-w-md z-10 rounded-[28px] relative overflow-hidden border border-white/10 shadow-glass">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent-makeup via-accent-education to-accent-finance" />
        
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold mb-3 tracking-tight font-heading">
            Create <span className="text-gradient bg-gradient-to-r from-accent-makeup to-accent-education">Identity</span>
          </h1>
          <p className="text-secondary text-[15px]">Establish credentials on AgentVerse</p>
        </div>
        
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl mb-6 text-sm flex items-center gap-2">
            <span>⚠️</span> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1.5 text-white/70">Full Name</label>
            <input name="full_name" required className="input w-full p-3.5 focus:ring-accent-education" value={formData.full_name} onChange={handleChange} placeholder="John Doe" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5 text-white/70">Email Address</label>
            <input type="email" name="email" required className="input w-full p-3.5 focus:ring-accent-education" value={formData.email} onChange={handleChange} placeholder="you@example.com" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5 text-white/70">Password</label>
            <div className="relative">
              <input type={showPassword ? "text" : "password"} name="password" required className="input w-full p-3.5 pr-10 focus:ring-accent-education" value={formData.password} onChange={handleChange} placeholder="••••••••" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-3.5 text-secondary hover:text-white">
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5 text-white/70">Confirm Password</label>
            <input type="password" name="confirmPassword" required className="input w-full p-3.5 focus:ring-accent-education" value={formData.confirmPassword} onChange={handleChange} placeholder="••••••••" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5 text-white/70">AI Provider</label>
            <select name="api_provider" className="input w-full p-3.5 appearance-none bg-black/40 focus:bg-black/60 focus:ring-accent-education" value={formData.api_provider} onChange={handleChange}>
              <option value="gemini" className="bg-[#111122]">Gemini</option>
              <option value="groq" className="bg-[#111122]">Groq</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5 text-white/70">API Key</label>
            <div className="relative mb-1">
              <input type={showApiKey ? "text" : "password"} name="api_key" required className="input w-full p-3.5 pr-10 focus:ring-accent-education" value={formData.api_key} onChange={handleChange} placeholder="gsk_..." />
              <button type="button" onClick={() => setShowApiKey(!showApiKey)} className="absolute right-3.5 top-3.5 text-secondary hover:text-white">
                {showApiKey ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <p className="text-[11px] text-secondary mt-1.5 flex items-center gap-1">🔒 Fully encrypted in local secure storage</p>
          </div>

          <button type="submit" disabled={loading} className="w-full bg-white text-black font-semibold p-4 rounded-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center shadow-lg disabled:opacity-50 mt-6">
            {loading ? <Loader2 className="animate-spin text-black" size={20} /> : 'Generate Credentials'}
          </button>
        </form>

        <p className="text-center mt-6 text-secondary text-sm">
          Already registered?{' '}
          <Link to="/login" className="text-white hover:underline font-medium transition-all">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
