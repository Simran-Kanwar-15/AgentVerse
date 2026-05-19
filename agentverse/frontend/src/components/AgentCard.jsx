import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, BookOpen, TrendingUp, Sparkle } from 'lucide-react';

const icons = {
  astrologer: Sparkles,
  education: BookOpen,
  finance: TrendingUp,
  makeup: Sparkle,
};

const AgentCard = ({ agent }) => {
  const navigate = useNavigate();
  const Icon = icons[agent.id] || Sparkles;

  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -5 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => navigate(`/chat/${agent.id}`)}
      className={`glass-panel p-8 rounded-[24px] cursor-pointer group relative overflow-hidden`}
    >
      <div className={`absolute inset-0 bg-accent-${agent.id} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
      
      <div className={`w-16 h-16 rounded-[16px] flex items-center justify-center mb-6 bg-accent-${agent.id}/10 text-accent-${agent.id} group-hover:shadow-glow-${agent.id} transition-all duration-500`}>
        <Icon size={32} strokeWidth={1.5} />
      </div>
      
      <h3 className="text-2xl font-bold mb-3">{agent.name}</h3>
      <p className="text-secondary leading-relaxed">{agent.description}</p>
      
      <div className="mt-8 flex items-center text-sm font-medium text-white/40 group-hover:text-white transition-colors duration-300">
        <span>Initialize uplink</span>
        <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </div>
    </motion.div>
  );
};

export default AgentCard;
