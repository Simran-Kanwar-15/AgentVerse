import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Eye, EyeOff, Loader2 } from 'lucide-react';

export default function LoginPage() {
  const { saveSettings } = useContext(AuthContext);
  const navigate = useNavigate();
  const [provider, setProvider] = useState('groq');
  const [key, setKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!key.trim()) {
      return setError('Please enter a valid API Key');
    }
    setError('');
    setLoading(true);
    
    try {
      saveSettings(provider, key.trim());
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to configure API key');
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
            API <span className="text-gradient bg-gradient-to-r from-accent-astrologer to-accent-makeup">Uplink</span>
          </h1>
          <p className="text-secondary text-[15px]">Configure your secure client keys</p>
        </div>
        
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl mb-6 text-sm flex items-center gap-2">
            <span>⚠️</span> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-white/70">AI Provider</label>
            <select 
              className="input w-full p-4 appearance-none bg-black/40 focus:bg-black/60 focus:ring-accent-astrologer" 
              value={provider} 
              onChange={(e) => setProvider(e.target.value)}
            >
              <option value="groq" className="bg-[#111122]">Groq (Llama 3.1)</option>
              <option value="gemini" className="bg-[#111122]">Gemini (1.5 Flash)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-white/70">API Key</label>
            <div className="relative">
              <input 
                type={showKey ? "text" : "password"} 
                required
                className="input w-full p-4 pr-12 focus:ring-accent-astrologer"
                value={key}
                onChange={(e) => setKey(e.target.value)}
                placeholder={provider === 'groq' ? "gsk_..." : "AIzaSy..."}
              />
              <button 
                type="button" 
                onClick={() => setShowKey(!showKey)}
                className="absolute right-4 top-4 text-secondary hover:text-white transition-colors"
              >
                {showKey ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <p className="text-[11px] text-secondary mt-2 flex items-center gap-1">🔒 Stored in your local secure browser sandbox only</p>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-white text-black font-semibold p-4 rounded-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center shadow-lg disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin text-black" size={20} /> : 'Connect API'}
          </button>
        </form>
      </div>
    </div>
  );
}
