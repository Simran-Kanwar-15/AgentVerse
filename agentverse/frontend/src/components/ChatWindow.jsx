import React, { useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';

export default function ChatWindow({ messages, agentName, isTyping, navigate, handleClearChat, handleSend, input, setInput, messagesEndRef }) {
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  if (messages.length === 0 && !isTyping) {
    return (
      <div className="flex-1 flex items-center justify-center text-secondary">
        <p>No messages yet — say hello!</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] max-w-5xl mx-auto p-4 md:p-6 relative">
      <div className={`absolute top-0 left-[20%] w-[60%] h-[30%] bg-accent-${agentName}/10 rounded-full mix-blend-screen filter blur-[120px] pointer-events-none`} />
      
      <div className="flex justify-between items-center mb-6 z-10 relative">
        <button onClick={() => navigate('/dashboard')} className="flex items-center text-secondary hover:text-white transition-colors">
          Back
        </button>
        <h2 className="text-2xl font-bold flex items-center capitalize">
          <span className={`w-3 h-3 rounded-full bg-accent-${agentName} mr-3 shadow-glow-${agentName} animate-pulse-slow`}></span>
          {agentName} Expert
        </h2>
        <button onClick={handleClearChat} className="flex items-center text-red-400/70 hover:text-red-400 transition-colors text-sm px-4 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20">
          Clear
        </button>
      </div>

      <div className="flex-1 overflow-y-auto mb-6 p-6 glass-panel rounded-3xl relative z-10 space-y-6">
        {messages.map((msg, index) => (
          <MessageBubble key={index} message={msg} agentName={agentName} />
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className={`glass-panel border-white/5 py-4 px-6 rounded-2xl rounded-tl-sm text-secondary flex items-center space-x-2`}>
              <div className={`w-2 h-2 bg-accent-${agentName} rounded-full animate-bounce`} style={{ animationDelay: '0ms' }} />
              <div className={`w-2 h-2 bg-accent-${agentName} rounded-full animate-bounce`} style={{ animationDelay: '150ms' }} />
              <div className={`w-2 h-2 bg-accent-${agentName} rounded-full animate-bounce`} style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      <form onSubmit={handleSend} className="relative z-10 group">
        <div className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="input w-full p-5 pr-16 bg-black/40 border-white/10 rounded-2xl focus:border-white/30 focus:bg-black/60 shadow-xl"
            disabled={isTyping}
          />
          <button 
            type="submit" 
            disabled={isTyping || !input.trim()}
            className={`absolute right-3 p-3 rounded-xl bg-accent-${agentName} text-black disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95 transition-all shadow-glow-${agentName}`}
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
