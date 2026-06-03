import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { 
  Search, Bell, LayoutDashboard, Bot, MessageSquare, 
  BookOpen, History, Star, Settings, ShieldCheck, 
  Activity, ArrowRight, PlusCircle, Upload, SearchCode, ArrowLeftRight
} from 'lucide-react';

const stats = [
  { label: 'ACTIVE AGENTS', value: '4', sub: 'Online & Ready', color: 'text-accent-green', icon: Bot },
  { label: 'TOTAL CHATS', value: '128', sub: 'This Week', color: 'text-sky-400', icon: MessageSquare },
  { label: 'KNOWLEDGE BASE', value: '2.4 GB', sub: 'Documents', color: 'text-accent-green', icon: BookOpen },
  { label: 'SUCCESS RATE', value: '98.7%', sub: 'Accuracy', color: 'text-emerald-400', icon: ShieldCheck },
];

const agents = [
  { 
    id: 'makeup', 
    name: 'BeautyAura', 
    title: 'Your Beauty & Makeup Expert',
    description: 'Personalized beauty tips, skincare advice, and makeup recommendations.',
    color: 'accent-makeup', 
    border: 'border-pink-500/20 hover:border-pink-500/50 hover:shadow-[0_0_25px_rgba(236,72,153,0.2)]',
    btnBg: 'bg-pink-500/10 hover:bg-pink-500 text-pink-400 hover:text-black border border-pink-500/20',
    avatar: (
      <svg className="w-24 h-24" viewBox="0 0 100 100" fill="none">
        <circle cx="50" cy="50" r="42" stroke="#EC4899" strokeWidth="2" className="animate-pulse" />
        <path d="M50 25C40 25 35 32 35 42C35 55 50 72 50 72C50 72 65 55 65 42C65 32 60 25 50 25Z" fill="url(#pink-grad)" opacity="0.6" />
        <circle cx="50" cy="40" r="8" fill="#EC4899" />
        <path d="M43 40C43 40 45 45 50 45C55 45 57 40 57 40" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
        <circle cx="53" cy="70" r="2" fill="#FFF" className="animate-ping" />
        <circle cx="32" cy="35" r="1.5" fill="#FFF" />
        <circle cx="68" cy="45" r="2.5" fill="#FFF" />
        <defs>
          <linearGradient id="pink-grad" x1="50" y1="25" x2="50" y2="72" gradientUnits="userSpaceOnUse">
            <stop stopColor="#EC4899" stopOpacity="0.8"/>
            <stop offset="1" stopColor="#8B5CF6" stopOpacity="0.2"/>
          </linearGradient>
        </defs>
      </svg>
    )
  },
  { 
    id: 'education', 
    name: 'EduAura', 
    title: 'Your Education & Learning Assistant',
    description: 'Study help, concept explanations, career guidance, and learning resources.',
    color: 'accent-education', 
    border: 'border-sky-500/20 hover:border-sky-500/50 hover:shadow-[0_0_25px_rgba(14,165,233,0.2)]',
    btnBg: 'bg-sky-500/10 hover:bg-sky-500 text-sky-400 hover:text-black border border-sky-500/20',
    avatar: (
      <svg className="w-24 h-24" viewBox="0 0 100 100" fill="none">
        <circle cx="50" cy="50" r="42" stroke="#0EA5E9" strokeWidth="2" className="animate-pulse" />
        <path d="M50 24L26 36L50 48L74 36L50 24Z" fill="url(#blue-grad)" />
        <path d="M34 42V58C34 62 42 66 50 66C58 66 66 62 66 58V42" stroke="#0EA5E9" strokeWidth="2" fill="none" />
        <path d="M70 38V54" stroke="#0EA5E9" strokeWidth="2" />
        <circle cx="70" cy="54" r="3" fill="#0EA5E9" />
        <circle cx="28" cy="65" r="2" fill="#FFF" className="animate-ping" />
        <defs>
          <linearGradient id="blue-grad" x1="50" y1="24" x2="50" y2="48" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0EA5E9" />
            <stop offset="1" stopColor="#3B82F6" stopOpacity="0.3" />
          </linearGradient>
        </defs>
      </svg>
    )
  },
  { 
    id: 'astrologer', 
    name: 'AstroAura', 
    title: 'Your Astrology & Guidance Expert',
    description: 'Horoscope readings, astrology insights, and personalized guidance.',
    color: 'accent-astrologer', 
    border: 'border-purple-500/20 hover:border-purple-500/50 hover:shadow-[0_0_25px_rgba(139,92,246,0.2)]',
    btnBg: 'bg-purple-500/10 hover:bg-purple-500 text-purple-400 hover:text-black border border-purple-500/20',
    avatar: (
      <svg className="w-24 h-24" viewBox="0 0 100 100" fill="none">
        <circle cx="50" cy="50" r="42" stroke="#8B5CF6" strokeWidth="2" className="animate-pulse" />
        <circle cx="50" cy="50" r="18" fill="url(#purple-grad)" stroke="#8B5CF6" strokeWidth="1" />
        <path d="M50 18L52 28L62 30L52 32L50 42L48 32L38 30L48 28L50 18Z" fill="#FFF" opacity="0.8" className="animate-pulse" />
        <circle cx="30" cy="68" r="1" fill="#FFF" />
        <circle cx="70" cy="68" r="1" fill="#FFF" />
        <circle cx="72" cy="30" r="1.5" fill="#FFF" />
        <defs>
          <radialGradient id="purple-grad" cx="50" cy="50" r="18" fx="50" fy="50" gradientUnits="userSpaceOnUse">
            <stop stopColor="#D8B4FE" />
            <stop offset="1" stopColor="#8B5CF6" stopOpacity="0.2" />
          </radialGradient>
        </defs>
      </svg>
    )
  },
  { 
    id: 'finance', 
    name: 'FinanceAura', 
    title: 'Your Finance & Stock Market Assistant',
    description: 'Financial literacy, stock market insights, investment guidance, and market analysis.',
    color: 'accent-finance', 
    border: 'border-emerald-500/20 hover:border-emerald-500/50 hover:shadow-[0_0_25px_rgba(16,185,129,0.2)]',
    btnBg: 'bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-black border border-emerald-500/20',
    avatar: (
      <svg className="w-24 h-24" viewBox="0 0 100 100" fill="none">
        <circle cx="50" cy="50" r="42" stroke="#10B981" strokeWidth="2" className="animate-pulse" />
        <path d="M30 65L42 50L52 58L70 34" stroke="#10B981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M58 34H70V46" stroke="#10B981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="30" cy="65" r="3" fill="#10B981" />
        <circle cx="70" cy="34" r="3" fill="#10B981" />
        <circle cx="38" cy="30" r="2" fill="#FFF" className="animate-ping" />
        <circle cx="62" cy="70" r="1" fill="#FFF" />
      </svg>
    )
  }
];

const menuItems = [
  { label: 'Dashboard', icon: LayoutDashboard, anim: 'group-hover:animate-hover-dashboard', active: true },
  { label: 'AI Agents', icon: Bot, anim: 'group-hover:animate-hover-bot' },
  { label: 'Conversations', icon: MessageSquare, anim: 'group-hover:animate-hover-chat' },
  { label: 'Knowledge Base', icon: BookOpen, anim: 'group-hover:animate-hover-book' },
  { label: 'History', icon: History, anim: 'group-hover:animate-hover-clock' },
  { label: 'Favorites', icon: Star, anim: 'group-hover:animate-hover-star' },
  { label: 'Settings', icon: Settings, anim: 'group-hover:animate-hover-settings' },
];

const quickActions = [
  { label: 'New Chat', desc: 'Start a conversation', icon: PlusCircle },
  { label: 'Upload Document', desc: 'Add to knowledge base', icon: Upload },
  { label: 'Research Mode', desc: 'Deep research & analysis', icon: SearchCode },
  { label: 'Compare Agents', desc: 'See agent capabilities', icon: ArrowLeftRight },
];

const activities = [
  { agent: 'BeautyAura', time: '2 min ago', text: 'Skincare routine advice', color: 'text-pink-400' },
  { agent: 'EduAura', time: '15 min ago', text: 'Math concept explanation', color: 'text-sky-400' },
  { agent: 'AstroAura', time: '30 min ago', text: 'Daily horoscope reading', color: 'text-purple-400' },
  { agent: 'FinanceAura', time: '45 min ago', text: 'Market analysis report', color: 'text-emerald-400' },
];

const DashboardPage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [searchVal, setSearchVal] = useState('');
  
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isActivated, setIsActivated] = useState(localStorage.getItem('multiaura_kb_activated') === 'true');
  const [transactionId, setTransactionId] = useState('');
  const [verificationStatus, setVerificationStatus] = useState('idle');
  const [toastMessage, setToastMessage] = useState('');

  // Extract initials
  const initials = user?.full_name 
    ? user.full_name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : 'SK';

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 4000);
  };

  const handleQuickAction = (label) => {
    if (label === 'Upload Document') {
      if (isActivated) {
        showToast('📁 Document Uploader active! Drag & drop custom docs to index.');
      } else {
        setIsPaymentModalOpen(true);
      }
    } else if (label === 'New Chat') {
      navigate('/chat/makeup');
    } else {
      showToast(`⚡ ${label} initialized successfully!`);
    }
  };

  const handleVerifyPayment = () => {
    if (!transactionId.trim() || transactionId.trim().length < 8) {
      setVerificationStatus('error');
      return;
    }
    setVerificationStatus('verifying');
    setTimeout(() => {
      setVerificationStatus('success');
      setTimeout(() => {
        setIsActivated(true);
        localStorage.setItem('multiaura_kb_activated', 'true');
        setIsPaymentModalOpen(false);
        setVerificationStatus('idle');
        setTransactionId('');
        showToast('🎉 Knowledge Base unlocked! Custom RAG document uploads are now active.');
      }, 1500);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background text-primary flex font-sans antialiased overflow-hidden">
      
      {/* 1. Left Sidebar - Desktop */}
      <aside className="w-64 bg-[#010503] border-r border-border shrink-0 hidden lg:flex flex-col justify-between p-6">
        <div>
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-accent-green/20 blur-md rounded-full" />
              <svg className="w-8 h-8 relative text-accent-green" viewBox="0 0 100 100" fill="none">
                <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="6" />
                <circle cx="50" cy="50" r="22" stroke="currentColor" strokeWidth="4" strokeDasharray="10 5" />
                <circle cx="50" cy="50" r="8" fill="currentColor" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-bold font-heading leading-tight text-white tracking-tight">MultiAura</h2>
              <span className="text-[10px] text-accent-green font-medium tracking-wider uppercase">AI Ecosystem</span>
            </div>
          </div>

          {/* Menu */}
          <nav className="space-y-1">
            {menuItems.map((item, idx) => (
              <button
                key={idx}
                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium transition-all group ${
                  item.active 
                    ? 'bg-accent-green/10 text-accent-green border-l-2 border-accent-green shadow-[inset_1px_0_10px_rgba(0,230,118,0.05)]' 
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <item.icon size={18} className={`transition-all duration-300 ${item.anim || ''}`} />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Sidebar Promo Box */}
        <div className="glass-panel p-4 rounded-2xl border border-accent-green/10 bg-accent-green/5 relative overflow-hidden mt-6">
          <div className="absolute -right-4 -top-4 w-16 h-16 bg-accent-green/10 rounded-full blur-xl" />
          
          {/* Smiling Robot Inline SVG */}
          <div className="w-12 h-12 bg-background border border-accent-green/20 rounded-xl flex items-center justify-center mb-3">
            <svg className="w-8 h-8 text-accent-green" viewBox="0 0 100 100" fill="none">
              <rect x="25" y="25" width="50" height="42" rx="8" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeWidth="4" />
              <rect x="35" y="37" width="10" height="10" rx="2" fill="currentColor" className="animate-pulse" />
              <rect x="55" y="37" width="10" height="10" rx="2" fill="currentColor" className="animate-pulse" />
              <path d="M42 54C42 54 45 58 50 58C55 58 58 54 58 54" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
              <path d="M50 15V25" stroke="currentColor" strokeWidth="4" />
              <circle cx="50" cy="15" r="4" fill="currentColor" />
            </svg>
          </div>
          
          <h4 className="text-xs font-bold text-white mb-0.5">MultiAura AI</h4>
          <span className="text-[10px] text-accent-green font-medium">All-in-one AI Assistant</span>
          <p className="text-[10px] text-slate-400 leading-tight my-2">Multiple domains. Unlimited possibilities.</p>
          
          <button className="w-full flex items-center justify-center gap-1.5 bg-accent-green hover:bg-emerald-400 text-black text-xs font-bold py-2 px-3 rounded-lg transition-colors">
            <span>Explore Agents</span>
            <ArrowRight size={12} />
          </button>
        </div>
      </aside>

      {/* Main Dashboard Layout */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {/* Main Content Pane */}
        <div className="p-6 lg:p-8 max-w-[1400px] mx-auto w-full space-y-8 flex-1">
          
          {/* Header Row */}
          <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold font-heading flex items-center gap-2">
                Hello, <span className="text-accent-green">{user?.full_name?.split(' ')[0] || 'Simran'}</span>! 👋
              </h1>
              <p className="text-slate-400 text-sm mt-1">Your Multi-Domain AI Assistant Ecosystem</p>
            </div>
            
            {/* Action Bar */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3.5 top-3.5 text-slate-500 w-4.5 h-4.5" />
                <input 
                  type="text" 
                  placeholder="Search anything..." 
                  value={searchVal}
                  onChange={(e) => setSearchVal(e.target.value)}
                  className="bg-[#051108] border border-border rounded-full pl-10 pr-4 py-2.5 text-sm w-60 lg:w-72 focus:outline-none focus:border-accent-green/30 focus:shadow-glow-green text-slate-200 placeholder-slate-500 transition-all duration-300"
                />
              </div>
              
              {/* Notification Bell */}
              <button className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/5 transition-all relative">
                <Bell size={18} />
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-accent-green shadow-[0_0_8px_#00E676]" />
              </button>
              
              {/* User Avatar Circle */}
              <button className="w-10 h-10 rounded-full bg-accent-green/10 border border-accent-green/30 flex items-center justify-center font-bold text-accent-green hover:shadow-glow-green transition-all">
                {initials}
              </button>
            </div>
          </header>

          {/* Stats/Metrics Cards Grid */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, idx) => (
              <div key={idx} className="glass-panel p-5 rounded-2xl flex items-center justify-between hover:border-slate-800 hover:shadow-lg group">
                <div>
                  <span className="text-[10px] text-slate-500 font-bold tracking-wider block uppercase">{stat.label}</span>
                  <span className="text-2xl font-bold font-heading text-white block mt-1">{stat.value}</span>
                  <span className={`text-[11px] font-medium block mt-0.5 ${stat.color}`}>{stat.sub}</span>
                </div>
                <div className="w-10 h-10 rounded-xl bg-slate-900/50 flex items-center justify-center text-slate-400 group-hover:text-accent-green transition-colors">
                  <stat.icon size={20} strokeWidth={1.5} />
                </div>
              </div>
            ))}
          </section>

          {/* Dashboard Main Grid (Split 3-column on XL screens) */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 items-start">
            
            {/* Center + Left Side (Middle Dashboard Columns) */}
            <div className="xl:col-span-3 space-y-8">
              
              {/* AI AGENTS GRID */}
              <section>
                <div className="flex items-center gap-2 mb-6">
                  <Bot className="text-accent-green" size={20} />
                  <div>
                    <h3 className="text-lg font-bold font-heading text-white">AI AGENTS</h3>
                    <span className="text-xs text-slate-500">Choose your specialized AI assistant</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {agents.map((agent) => (
                    <div 
                      key={agent.id}
                      onClick={() => navigate(`/chat/${agent.id}`)}
                      className={`glass-panel p-6 rounded-3xl cursor-pointer group flex flex-col justify-between ${agent.border}`}
                    >
                      <div>
                        {/* Agent Top Row */}
                        <div className="flex justify-between items-start mb-6">
                          {/* Illustrated Glowing SVG Avatar */}
                          <div className="transition-transform group-hover:scale-105 duration-300">
                            {agent.avatar}
                          </div>
                          
                          {/* Active Online Dot */}
                          <span className="flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                            <span>ONLINE</span>
                          </span>
                        </div>

                        {/* Title & Info */}
                        <h4 className="text-xl font-bold font-heading text-white flex items-center gap-1.5 group-hover:text-accent-green transition-colors">
                          {agent.name}
                        </h4>
                        <span className="text-xs text-slate-400 block mt-0.5 mb-2 font-medium">{agent.title}</span>
                        <p className="text-sm text-slate-500 leading-relaxed">{agent.description}</p>
                      </div>

                      {/* Chat Button */}
                      <button className={`w-full flex items-center justify-center gap-1.5 mt-6 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 ${agent.btnBg}`}>
                        <span>Chat Now</span>
                        <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  ))}
                </div>
              </section>

              {/* QUICK ACTIONS ROW */}
              <section>
                <div className="flex items-center gap-2 mb-6">
                  <div className="text-accent-green">⚡</div>
                  <div>
                    <h3 className="text-lg font-bold font-heading text-white">QUICK ACTIONS</h3>
                    <span className="text-xs text-slate-500">Access powerful features and tools</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {quickActions.map((act, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleQuickAction(act.label)}
                      className="glass-panel p-4.5 rounded-2xl hover:border-accent-green/20 hover:shadow-glow-green text-left flex items-center gap-4 transition-all group w-full"
                    >
                      <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-slate-400 group-hover:text-accent-green transition-colors shrink-0">
                        <act.icon size={18} />
                      </div>
                      <div>
                        <h5 className="text-sm font-bold text-white leading-tight">{act.label}</h5>
                        <p className="text-[11px] text-slate-500 leading-tight mt-0.5">{act.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </section>
            </div>

            {/* Right sidebar column (System Status & Activity Feed) */}
            <aside className="space-y-6">
              
              {/* SYSTEM STATUS PANEL */}
              <div className="glass-panel p-6 rounded-3xl border border-border space-y-6">
                <div>
                  <h4 className="text-sm font-bold font-heading tracking-wider text-slate-400 flex items-center gap-2">
                    <Activity size={16} className="text-accent-green animate-pulse" />
                    <span>SYSTEM STATUS</span>
                  </h4>
                </div>

                {/* All Systems Green Banner */}
                <div className="flex items-start gap-3 bg-emerald-500/10 border border-emerald-500/20 p-4.5 rounded-2xl">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 text-xs">✓</div>
                  <div>
                    <h5 className="text-xs font-bold text-emerald-400">All Systems Operational</h5>
                    <p className="text-[10px] text-slate-400 mt-0.5 leading-tight">MultiAura ecosystem is running smoothly.</p>
                  </div>
                </div>

                {/* Status List */}
                <div className="space-y-3.5 text-xs">
                  <div className="flex justify-between items-center text-slate-300">
                    <span className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span>AI Agents</span>
                    </span>
                    <span className="text-emerald-400 font-semibold text-[10px]">Online</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-300">
                    <span className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span>Knowledge Base</span>
                    </span>
                    <span className="text-emerald-400 font-semibold text-[10px]">Online</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-300">
                    <span className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span>Database</span>
                    </span>
                    <span className="text-emerald-400 font-semibold text-[10px]">Online</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-300">
                    <span className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span>API Services</span>
                    </span>
                    <span className="text-emerald-400 font-semibold text-[10px]">Online</span>
                  </div>
                </div>
              </div>

              {/* RECENT ACTIVITY FEED */}
              <div className="glass-panel p-6 rounded-3xl border border-border space-y-6">
                <div>
                  <h4 className="text-sm font-bold font-heading tracking-wider text-slate-400 flex items-center gap-2">
                    <History size={16} />
                    <span>RECENT ACTIVITY</span>
                  </h4>
                </div>

                {/* Activity List */}
                <div className="space-y-4.5">
                  {activities.map((act, idx) => (
                    <div key={idx} className="flex justify-between items-start gap-2">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-slate-900/80 flex items-center justify-center text-sm border border-white/5 shrink-0">
                          🤖
                        </div>
                        <div>
                          <h5 className="text-xs font-bold text-white">{act.agent}</h5>
                          <p className="text-[10px] text-slate-500 mt-0.5 leading-tight">{act.text}</p>
                        </div>
                      </div>
                      <span className="text-[9px] text-slate-500 font-medium shrink-0 pt-0.5">{act.time}</span>
                    </div>
                  ))}
                </div>

                {/* View All Activity Button */}
                <button className="w-full flex items-center justify-center gap-1 bg-white/5 hover:bg-white/10 text-white text-xs font-semibold py-2.5 rounded-xl transition-all">
                  <span>View All Activity</span>
                  <ArrowRight size={12} />
                </button>
              </div>
            </aside>
          </div>
        </div>

        {/* Footer */}
        <footer className="py-6 border-t border-border mt-auto shrink-0 bg-[#010302]">
          <p className="text-center text-[10px] text-slate-500 tracking-wider uppercase font-semibold">
            MultiAura AI Ecosystem &bull; Powered by Generative AI &amp; Advanced Agents
          </p>
        </footer>
      </div>

      {/* Payment Modal */}
      {isPaymentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="glass-panel p-6 rounded-[28px] border border-accent-green/20 max-w-sm w-full relative overflow-hidden shadow-2xl space-y-5 animate-in zoom-in-95 duration-200">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent-green via-emerald-500 to-green-600" />
            
            <div className="text-center">
              <h3 className="text-lg font-bold font-heading text-white">Unlock Knowledge Base</h3>
              <p className="text-xs text-slate-400 mt-1">One-time activation fee to upload custom RAG files</p>
            </div>

            {/* Scanner Image */}
            <div className="bg-black/50 p-4 rounded-2xl border border-white/5 flex flex-col items-center">
              <img 
                src="/scanner.jpeg" 
                alt="UPI Scanner" 
                className="w-44 h-44 object-contain rounded-xl shadow-glow-green border border-accent-green/10" 
              />
              <div className="mt-3 text-center">
                <span className="text-xs font-bold text-accent-green bg-accent-green/10 px-3.5 py-1.5 rounded-full">₹99 One-Time</span>
              </div>
            </div>

            {/* Instructions */}
            <div className="space-y-2 text-[11px] text-slate-400">
              <p className="flex gap-2">
                <span className="text-accent-green font-bold">1.</span>
                <span>Scan the QR code with any UPI app (GPay, Paytm, etc.).</span>
              </p>
              <p className="flex gap-2">
                <span className="text-accent-green font-bold">2.</span>
                <span>Send the amount of ₹99.</span>
              </p>
              <p className="flex gap-2">
                <span className="text-accent-green font-bold">3.</span>
                <span>Enter the 12-digit transaction UTR / Ref ID below.</span>
              </p>
            </div>

            {/* Input */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-500 tracking-wider uppercase block">Transaction UTR / Ref ID</label>
              <input 
                type="text" 
                placeholder="e.g. 340912345678" 
                value={transactionId}
                onChange={(e) => {
                  setTransactionId(e.target.value);
                  if (verificationStatus === 'error') setVerificationStatus('idle');
                }}
                className="input w-full px-4.5 py-3 text-xs"
                disabled={verificationStatus === 'verifying'}
              />
            </div>

            {/* Verification message / error */}
            {verificationStatus === 'error' && (
              <p className="text-[10px] text-red-400 text-center font-medium animate-pulse">⚠️ Please enter a valid UPI transaction Ref ID</p>
            )}
            {verificationStatus === 'verifying' && (
              <div className="flex items-center justify-center gap-2 text-[10px] text-accent-green font-medium">
                <svg className="animate-spin h-3.5 w-3.5 text-accent-green" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Verifying with bank servers...</span>
              </div>
            )}
            {verificationStatus === 'success' && (
              <p className="text-[10px] text-emerald-400 text-center font-bold">✓ Payment Verified! Activating Knowledge Base...</p>
            )}

            {/* Actions */}
            <div className="flex gap-3">
              <button 
                onClick={() => setIsPaymentModalOpen(false)}
                className="flex-1 bg-white/5 hover:bg-white/10 text-white text-xs font-semibold py-2.5 rounded-xl transition-all"
                disabled={verificationStatus === 'verifying'}
              >
                Cancel
              </button>
              <button 
                onClick={handleVerifyPayment}
                className="flex-1 bg-accent-green hover:bg-emerald-400 text-black text-xs font-bold py-2.5 rounded-xl transition-all shadow-glow-green"
                disabled={verificationStatus === 'verifying'}
              >
                Verify Payment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#05180f] border border-accent-green/30 text-white text-xs font-medium px-5 py-3.5 rounded-2xl shadow-glow-green flex items-center gap-2 animate-in slide-in-from-bottom-5 duration-300">
          <span>🔔</span>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
