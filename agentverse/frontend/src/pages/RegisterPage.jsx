import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Eye, EyeOff, Loader2, User, Mail, Lock, ShieldCheck, KeyRound } from 'lucide-react';

export default function RegisterPage() {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    provider: 'groq',
    apiKey: ''
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }
    if (!formData.apiKey.trim()) {
      return setError('Please enter a valid API Key');
    }
    
    setError('');
    setLoading(true);
    
    try {
      // Simulate registration lag for premium feel
      await new Promise((resolve) => setTimeout(resolve, 800));
      
      register(
        formData.fullName.trim(),
        formData.email.trim(),
        formData.password,
        formData.provider,
        formData.apiKey.trim()
      );
      
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Failed to create user identity.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background py-16 px-4">
      {/* Background Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-accent-makeup/15 rounded-full filter blur-[120px] animate-blob animate-pulse-slow" />
      <div className="absolute bottom-[-15%] right-[-10%] w-[45vw] h-[45vw] max-w-[550px] max-h-[550px] bg-accent-finance/15 rounded-full filter blur-[120px] animate-blob" style={{ animationDelay: '3s' }} />

      <div className="glass-panel p-10 w-full max-w-lg z-10 rounded-[28px] relative overflow-hidden border border-white/10 shadow-glass">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent-makeup via-accent-education to-accent-finance" />
        
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold mb-3 tracking-tight font-heading">
            Create <span className="text-gradient bg-gradient-to-r from-accent-makeup to-accent-education">Identity</span>
          </h1>
          <p className="text-secondary text-[15px]">Establish secure credentials on AgentVerse</p>
        </div>
        
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl mb-6 text-sm flex items-center gap-2">
            <span>⚠️</span> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium mb-1.5 text-white/70">Full Name</label>
            <div className="relative">
              <span className="absolute left-4 top-4 text-secondary"><User size={18} /></span>
              <input 
                type="text"
                name="fullName" 
                required 
                className="input w-full p-4 pl-12 focus:ring-accent-education" 
                value={formData.fullName} 
                onChange={handleChange} 
                placeholder="Simran Kanwar" 
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1.5 text-white/70">Email Address</label>
            <div className="relative">
              <span className="absolute left-4 top-4 text-secondary"><Mail size={18} /></span>
              <input 
                type="email" 
                name="email" 
                required 
                className="input w-full p-4 pl-12 focus:ring-accent-education" 
                value={formData.email} 
                onChange={handleChange} 
                placeholder="you@example.com" 
              />
            </div>
          </div>

          {/* Password Fields Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1.5 text-white/70">Password</label>
              <div className="relative">
                <span className="absolute left-4 top-4 text-secondary"><Lock size={18} /></span>
                <input 
                  type={showPassword ? "text" : "password"} 
                  name="password" 
                  required 
                  className="input w-full p-4 pl-12 pr-10 focus:ring-accent-education" 
                  value={formData.password} 
                  onChange={handleChange} 
                  placeholder="••••••••" 
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)} 
                  className="absolute right-3 top-4 text-secondary hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5 text-white/70">Confirm Password</label>
              <div className="relative">
                <span className="absolute left-4 top-4 text-secondary"><ShieldCheck size={18} /></span>
                <input 
                  type="password" 
                  name="confirmPassword" 
                  required 
                  className="input w-full p-4 pl-12 focus:ring-accent-education" 
                  value={formData.confirmPassword} 
                  onChange={handleChange} 
                  placeholder="••••••••" 
                />
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-white/5"></div>
            <span className="flex-shrink mx-4 text-[10px] text-white/30 tracking-wider uppercase font-semibold">LLM Configuration</span>
            <div className="flex-grow border-t border-white/5"></div>
          </div>

          {/* Provider and API Key */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-1">
              <label className="block text-sm font-medium mb-1.5 text-white/70">Provider</label>
              <select 
                name="provider" 
                className="input w-full p-4 appearance-none bg-black/40 focus:bg-black/60 focus:ring-accent-education" 
                value={formData.provider} 
                onChange={handleChange}
              >
                <option value="groq" className="bg-[#111122]">Groq</option>
                <option value="gemini" className="bg-[#111122]">Gemini</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium mb-1.5 text-white/70">API Key</label>
              <div className="relative">
                <span className="absolute left-4 top-4 text-secondary"><KeyRound size={18} /></span>
                <input 
                  type={showApiKey ? "text" : "password"} 
                  name="apiKey" 
                  required 
                  className="input w-full p-4 pl-12 pr-10 focus:ring-accent-education" 
                  value={formData.apiKey} 
                  onChange={handleChange} 
                  placeholder={formData.provider === 'groq' ? "gsk_..." : "AIzaSy..."} 
                />
                <button 
                  type="button" 
                  onClick={() => setShowApiKey(!showApiKey)} 
                  className="absolute right-3.5 top-4 text-secondary hover:text-white transition-colors"
                >
                  {showApiKey ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
          </div>
          
          <p className="text-[11px] text-secondary mt-1 flex items-center gap-1">🔒 Credentials and key are kept securely in browser local sandbox</p>

          <button 
            type="submit" 
            disabled={loading} 
            className="w-full bg-white text-black font-semibold p-4 rounded-xl hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center shadow-lg disabled:opacity-50 mt-6"
          >
            {loading ? <Loader2 className="animate-spin text-black" size={20} /> : 'Generate Secure ID'}
          </button>
        </form>

        <p className="text-center mt-6 text-secondary text-sm">
          Already registered?{' '}
          <Link to="/login" className="text-white hover:underline font-medium transition-all">
            Connect Identity
          </Link>
        </p>
      </div>
    </div>
  );
}
