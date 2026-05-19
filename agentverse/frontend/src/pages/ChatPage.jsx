import React, { useState, useEffect, useRef, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ChatWindow from '../components/ChatWindow';
import { AuthContext } from '../context/AuthContext';
import { AGENT_SYSTEM_PROMPTS } from '../api/agentPrompts';

const agentInfo = {
  astrologer: { name: 'Astrologer' },
  education: { name: 'Education Guide' },
  finance: { name: 'Finance Advisor' },
  makeup: { name: 'Makeup Artist' },
};

export default function ChatPage() {
  const { agentName } = useParams();
  const navigate = useNavigate();
  const { apiProvider, apiKey } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState('');
  const messagesEndRef = useRef(null);
  
  const [pendingMessage, setPendingMessage] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  
  const agent = agentInfo[agentName];

  useEffect(() => {
    if (!agent) {
      navigate('/dashboard');
      return;
    }
    document.title = `AgentVerse — ${agent.name}`;
    fetchHistory();
  }, [agentName, agent, navigate]);

  const fetchHistory = () => {
    try {
      const history = localStorage.getItem(`chat_history_${agentName}`);
      const savedLang = localStorage.getItem(`chat_lang_${agentName}`);
      if (history) {
        setMessages(JSON.parse(history));
      } else {
        setMessages([]);
      }
      if (savedLang) {
        setSelectedLanguage(savedLang);
      } else {
        setSelectedLanguage(null);
      }
    } catch (err) {
      console.error('Failed to load chat history:', err);
    }
  };

  const saveHistory = (updatedMessages) => {
    try {
      localStorage.setItem(`chat_history_${agentName}`, JSON.stringify(updatedMessages));
    } catch (err) {
      console.error('Failed to save chat history:', err);
    }
  };

  const handleSelectLanguage = async (lang) => {
    setSelectedLanguage(lang);
    localStorage.setItem(`chat_lang_${agentName}`, lang);

    // Replace the language selector message in history with a confirmation message
    const updatedMessages = messages.map(msg => {
      if (msg.isLanguageSelector) {
        return {
          role: 'assistant',
          content: lang === 'english' ? '🌐 Preferred Language: English' : '🌐 पसंदीदा भाषा: हिंदी',
          timestamp: new Date().toISOString()
        };
      }
      return msg;
    });

    setMessages(updatedMessages);
    saveHistory(updatedMessages);
    
    // Now trigger the actual API response for the pendingMessage (or fallback to the last user message)
    let queryText = pendingMessage;
    if (!queryText) {
      const lastUserMsg = [...messages].reverse().find(m => m.role === 'user');
      if (lastUserMsg) {
        queryText = lastUserMsg.content;
      }
    }

    if (queryText) {
      setIsTyping(true);
      setError('');
      
      try {
        let responseText = '';
        
        // Filter out status messages from history for LLM
        const historyForAPI = updatedMessages.filter(m => !m.content.startsWith('🌐'));
        
        const langInstruction = lang === 'hindi' 
          ? "\n\nCRITICAL: You must answer and interact ENTIRELY in Hindi (using Devanagari script). Keep the tone and style of the agent." 
          : "\n\nCRITICAL: You must answer and interact ENTIRELY in English. Keep the tone and style of the agent.";

        if (apiProvider === 'groq') {
          const groqHistory = historyForAPI.slice(-10).map(m => ({
            role: m.role === 'assistant' ? 'assistant' : 'user',
            content: m.content
          }));

          const res = await axios.post(
            'https://api.groq.com/openai/v1/chat/completions',
            {
              model: 'llama-3.1-8b-instant',
              messages: [
                { role: 'system', content: AGENT_SYSTEM_PROMPTS[agentName] + langInstruction },
                ...groqHistory
              ]
            },
            {
              headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
              }
            }
          );
          responseText = res.data.choices[0].message.content;

        } else if (apiProvider === 'gemini') {
          const conversationContext = historyForAPI
            .slice(-10)
            .map(m => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`)
            .join('\n');

          const promptText = `System Instructions: ${AGENT_SYSTEM_PROMPTS[agentName] + langInstruction}\n\nHere is our conversation history:\n${conversationContext}\n\nAssistant:`;

          const res = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
            {
              contents: [
                {
                  parts: [
                    { text: promptText }
                  ]
                }
              ]
            },
            {
              headers: {
                'Content-Type': 'application/json'
              }
            }
          );
          responseText = res.data.candidates[0].content.parts[0].text;
        }

        const aiMsg = { role: 'assistant', content: responseText, timestamp: new Date().toISOString() };
        const finalMessages = [...updatedMessages, aiMsg];
        setMessages(finalMessages);
        saveHistory(finalMessages);

      } catch (err) {
        console.error('API Error:', err);
        const errorMsg = err.response?.data?.error?.message || err.message || 'Verification or API Connection Failed';
        setError(`⚠️ Error: ${errorMsg}`);
      } finally {
        setIsTyping(false);
        setPendingMessage(null);
      }
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const currentInput = input.trim();
    setInput('');

    // If language is not selected yet, prompt the user
    if (!selectedLanguage) {
      const userMsg = { role: 'user', content: currentInput, timestamp: new Date().toISOString() };
      setPendingMessage(currentInput);
      
      const langPromptMsg = {
        role: 'assistant',
        content: 'Which language would you prefer for our conversation? / आप बातचीत के लिए कौन सी भाषा पसंद करेंगे?',
        isLanguageSelector: true,
        timestamp: new Date().toISOString()
      };
      
      const updatedMessages = [...messages, userMsg, langPromptMsg];
      setMessages(updatedMessages);
      saveHistory(updatedMessages);
      return;
    }

    const userMsg = { role: 'user', content: currentInput, timestamp: new Date().toISOString() };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    saveHistory(updatedMessages);
    
    setIsTyping(true);
    setError('');

    try {
      let responseText = '';
      
      // Filter out status messages from history for LLM
      const historyForAPI = updatedMessages.filter(m => !m.content.startsWith('🌐'));

      const langInstruction = selectedLanguage === 'hindi' 
        ? "\n\nCRITICAL: You must answer and interact ENTIRELY in Hindi (using Devanagari script). Keep the tone and style of the agent." 
        : "\n\nCRITICAL: You must answer and interact ENTIRELY in English. Keep the tone and style of the agent.";

      if (apiProvider === 'groq') {
        const groqHistory = historyForAPI.slice(-10).map(m => ({
          role: m.role === 'assistant' ? 'assistant' : 'user',
          content: m.content
        }));

        const res = await axios.post(
          'https://api.groq.com/openai/v1/chat/completions',
          {
            model: 'llama-3.1-8b-instant',
            messages: [
              { role: 'system', content: AGENT_SYSTEM_PROMPTS[agentName] + langInstruction },
              ...groqHistory
            ]
          },
          {
            headers: {
              'Authorization': `Bearer ${apiKey}`,
              'Content-Type': 'application/json'
            }
          }
        );
        responseText = res.data.choices[0].message.content;

      } else if (apiProvider === 'gemini') {
        const conversationContext = historyForAPI
          .slice(-10)
          .map(m => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`)
          .join('\n');

        const promptText = `System Instructions: ${AGENT_SYSTEM_PROMPTS[agentName] + langInstruction}\n\nHere is our conversation history:\n${conversationContext}\n\nAssistant:`;

        const res = await axios.post(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
          {
            contents: [
              {
                parts: [
                  { text: promptText }
                ]
              }
            ]
          },
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );
        responseText = res.data.candidates[0].content.parts[0].text;
      }

      const aiMsg = { role: 'assistant', content: responseText, timestamp: new Date().toISOString() };
      const finalMessages = [...updatedMessages, aiMsg];
      setMessages(finalMessages);
      saveHistory(finalMessages);

    } catch (err) {
      console.error('API Error:', err);
      const errorMsg = err.response?.data?.error?.message || err.message || 'Verification or API Connection Failed';
      setError(`⚠️ Error: ${errorMsg}`);
    } finally {
      setIsTyping(false);
    }
  };

  const handleClearChat = () => {
    setMessages([]);
    setSelectedLanguage(null);
    setPendingMessage(null);
    localStorage.removeItem(`chat_history_${agentName}`);
    localStorage.removeItem(`chat_lang_${agentName}`);
  };

  if (!agent) return null;

  return (
    <div className="h-screen bg-background overflow-hidden relative">
      {error && (
        <div className="absolute top-0 left-0 right-0 z-50 bg-red-500/10 border-b border-red-500/30 text-red-400 p-3 text-sm text-center backdrop-blur-md">
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
        onSelectLanguage={handleSelectLanguage}
      />
    </div>
  );
}
