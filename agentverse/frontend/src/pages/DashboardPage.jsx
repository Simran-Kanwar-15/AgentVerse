import React from 'react';
import AgentCard from '../components/AgentCard';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';

const agents = [
  { id: 'astrologer', name: 'Astrologer', description: 'Cosmic guidance for your soul\'s journey.' },
  { id: 'education', name: 'Education Guide', description: 'Your personal mentor for academic excellence.' },
  { id: 'finance', name: 'Finance Advisor', description: 'Smart wealth management and market insights.' },
  { id: 'makeup', name: 'Makeup Artist', description: 'Bespoke beauty advice and glamorous looks.' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 80, damping: 20 } }
};

const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col">
      <Navbar />
      <div className="flex-1 p-4 md:p-8 relative overflow-hidden">
        {/* Dynamic Background Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-accent-astrologer/20 rounded-full mix-blend-screen filter blur-[120px] animate-blob" />
      <div className="absolute top-[20%] right-[-10%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-accent-makeup/20 rounded-full mix-blend-screen filter blur-[100px] animate-blob" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-[-20%] left-[20%] w-[45vw] h-[45vw] max-w-[550px] max-h-[550px] bg-accent-education/20 rounded-full mix-blend-screen filter blur-[120px] animate-blob" style={{ animationDelay: '4s' }} />
      
      <div className="max-w-6xl mx-auto relative z-10 pt-12 pb-24">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-sm font-medium text-white/70">
            Select an autonomous agent
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Welcome to <span className="text-gradient bg-gradient-to-r from-accent-astrologer via-accent-makeup to-accent-finance">AgentVerse</span>
          </h1>
          <p className="text-xl text-secondary max-w-2xl mx-auto">
            Experience next-generation RAG AI. Choose an expert domain below to begin your personalized session.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
        >
          {agents.map((agent) => (
            <motion.div key={agent.id} variants={itemVariants}>
              <AgentCard agent={agent} />
            </motion.div>
          ))}
        </motion.div>
      </div>
      </div>
    </div>
  );
};

export default DashboardPage;
