import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosClient from '../api/axiosClient';
import ChatWindow from '../components/ChatWindow';

const agentInfo = {
  astrologer: { name: 'Astrologer' },
  education: { name: 'Education Guide' },
  finance: { name: 'Finance Advisor' },
  makeup: { name: 'Makeup Artist' },
};

export default function ChatPage() {
  const { agentName } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState('');
  const messagesEndRef = useRef(null);
  
  const agent = agentInfo[agentName];

  useEffect(() => {
    if (!agent) {
      navigate('/dashboard');
      return;
    }
    document.title = `AgentVerse — ${agent.name}`;
    fetchHistory();
  }, [agentName, agent, navigate]);

  const fetchHistory = async () => {
    try {
      const res = await axiosClient.get(`/chat/history/${agentName}`);
      setMessages(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMsg = { role: 'user', content: input, timestamp: new Date().toISOString() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);
    setError('');

    try {
      const res = await axiosClient.post(`/chat/${agentName}`, { message: userMsg.content });
      const aiMsg = { role: 'assistant', content: res.data.response, timestamp: new Date().toISOString() };
      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      const errorMsg = err.response?.data?.detail || err.message || 'Unknown error';
      setError(`⚠️ Error: ${errorMsg}`);
    } finally {
      setIsTyping(false);
    }
  };

  const handleClearChat = () => setMessages([]);

  if (!agent) return null;

  return (
    <div className="h-screen bg-background overflow-hidden relative">
      {error && (
        <div className="absolute top-0 w-full z-50 bg-red-500/10 border-b border-red-500/50 text-red-400 p-3 text-sm text-center backdrop-blur-md">
          {error}
        </div>
      )}

      <ChatWindow 
        messages={messages} 
        agentName={agentName} 
        isTyping={isTyping}
        navigate={navigate}
        handleClearChat={handleClearChat}
        handleSend={handleSend}
        input={input}
        setInput={setInput}
        messagesEndRef={messagesEndRef}
      />
    </div>
  );
}
