import React from 'react';
import { User, Languages } from 'lucide-react';

const MessageBubble = ({ message, agentName, onSelectLanguage }) => {
  const isUser = message.role === 'user';
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} w-full`}>
      <div className={`flex max-w-[85%] ${isUser ? 'flex-row-reverse' : 'flex-row'} items-end gap-3`}>
        {/* Avatar */}
        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${isUser ? 'bg-white/10 text-white' : `bg-accent-${agentName}/20 text-accent-${agentName}`}`}>
          {isUser ? <User size={16} /> : <span className="font-bold text-xs uppercase">{agentName[0]}</span>}
        </div>
        
        {/* Bubble */}
        <div className={`
          relative px-6 py-4 rounded-2xl
          ${isUser 
            ? 'bg-white text-black rounded-br-sm shadow-md' 
            : 'glass-panel border-white/5 rounded-bl-sm text-primary shadow-lg'}
        `}>
          <p className="whitespace-pre-wrap leading-relaxed text-[15px]">{message.content}</p>

          {/* Interactive language buttons */}
          {message.isLanguageSelector && onSelectLanguage && (
            <div className="mt-4 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => onSelectLanguage('english')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl border border-white/10 bg-accent-${agentName}/20 hover:bg-accent-${agentName}/40 text-accent-${agentName} font-semibold transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 shadow-glow-${agentName}`}
              >
                <Languages size={15} />
                <span>English</span>
              </button>
              <button
                type="button"
                onClick={() => onSelectLanguage('hindi')}
                className="flex items-center space-x-2 px-4 py-2 rounded-xl border border-white/10 bg-amber-500/20 hover:bg-amber-500/40 text-amber-300 font-semibold transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 shadow-lg"
              >
                <Languages size={15} />
                <span>Hindi (हिंदी)</span>
              </button>
            </div>
          )}

          <span className={`text-[10px] mt-2 block opacity-50 ${isUser ? 'text-right' : 'text-left'}`}>
            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
