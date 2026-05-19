import React from 'react';
import { User } from 'lucide-react';

const MessageBubble = ({ message, agentName }) => {
  const isUser = message.role === 'user';
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} w-full`}>
      <div className={`flex max-w-[80%] ${isUser ? 'flex-row-reverse' : 'flex-row'} items-end gap-3`}>
        {/* Avatar */}
        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${isUser ? 'bg-white/10 text-white' : `bg-accent-${agentName}/20 text-accent-${agentName}`}`}>
          {isUser ? <User size={16} /> : <span className="font-bold text-xs uppercase">{agentName[0]}</span>}
        </div>
        
        {/* Bubble */}
        <div className={`
          relative px-6 py-4 rounded-2xl
          ${isUser 
            ? 'bg-white text-black rounded-br-sm' 
            : 'glass-panel border-white/5 rounded-bl-sm text-primary'}
        `}>
          <p className="whitespace-pre-wrap leading-relaxed text-[15px]">{message.content}</p>
          <span className={`text-[10px] mt-2 block opacity-50 ${isUser ? 'text-right' : 'text-left'}`}>
            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
