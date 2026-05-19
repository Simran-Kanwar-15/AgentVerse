import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { LogOut } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();
  
  const getActiveAgentColor = () => {
    if (location.pathname.includes('/chat/astrologer')) return 'bg-accent-astrologer';
    if (location.pathname.includes('/chat/education')) return 'bg-accent-education';
    if (location.pathname.includes('/chat/finance')) return 'bg-accent-finance';
    if (location.pathname.includes('/chat/makeup')) return 'bg-accent-makeup';
    return null;
  };

  const activeColor = getActiveAgentColor();

  return (
    <nav className="bg-surface border-b border-border p-4 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/dashboard" className="text-xl font-bold font-heading flex items-center gap-2">
          AgentVerse
          {activeColor && <span className={`w-2.5 h-2.5 rounded-full ${activeColor} animate-pulse`}></span>}
        </Link>
        <div className="flex items-center gap-4">
          <span className="text-sm text-secondary hidden sm:inline-block">
            Welcome, <span className="text-primary font-medium">{user?.full_name}</span>
          </span>
          <button 
            onClick={logout}
            className="flex items-center gap-2 text-secondary hover:text-red-400 transition-colors text-sm"
          >
            <LogOut size={18} />
            <span className="hidden sm:inline-block">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
