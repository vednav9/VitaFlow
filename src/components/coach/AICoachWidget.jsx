import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Cpu, Sparkles, User, BrainCircuit } from 'lucide-react';
import { Button } from '../ui/Button';

const predefinedResponses = [
  "Based on your recent sleep data, I recommend a 10-minute wind-down routine tonight. 🌙",
  "Hydration is key! You're slightly behind your target. Drink a glass now. 💧",
  "Great job on active minutes! Maybe try a quick stretch to avoid stiffness. 🧘",
  "I sense a bit of stress. How about a quick breathing exercise in the Relax tab? 🌬️",
  "Your focus score is excellent today! Keep up the momentum. 🚀",
  "Have you taken a screen break recently? Your eyes might need a rest. 👀",
  "Consistency is key. You're on a 3-day streak! Keep going! 🔥",
  "Remember to eat some greens today! Your nutrition score could use a boost. 🥗",
  "Need a quick energy boost? Try 20 jumping jacks! ⚡",
  "Sleep quality > Sleep duration. Try to avoid screens 30 mins before bed. 📱🚫"
];

const LoadingDots = () => (
  <div className="flex space-x-1 items-center h-6 px-2">
    {[0, 1, 2].map((i) => (
      <motion.div
        key={i}
        className="w-1.5 h-1.5 bg-cyan-400 rounded-full"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
      />
    ))}
  </div>
);

export const AICoachWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Hello! I am Vita, your personal wellness AI. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping, isOpen]);

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking delay
    setTimeout(() => {
      const response = predefinedResponses[Math.floor(Math.random() * predefinedResponses.length)];
      setMessages(prev => [...prev, { role: 'ai', text: response }]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000); // Random delay between 1.5s and 2.5s
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(6,182,212,0.6)] hover:shadow-[0_0_50px_rgba(6,182,212,0.8)] z-50 transition-all border border-white/20 group"
      >
        <div className="absolute inset-0 rounded-full bg-white/20 animate-ping opacity-20 group-hover:opacity-40" />
        {isOpen ? <X className="text-white" size={28} /> : <MessageSquare className="text-white" size={28} />}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-black animate-bounce" />
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9, rotateX: 10 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-28 right-8 w-[90vw] md:w-[400px] h-[600px] glass-card flex flex-col overflow-hidden z-50 border border-white/20 shadow-2xl backdrop-blur-3xl bg-black/80"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 bg-white/5 flex justify-between items-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-transparent" />
              <div className="flex items-center gap-3 relative z-10">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg">
                  <BrainCircuit size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white flex items-center gap-2">
                    VitaCoach AI
                    <span className="px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 text-[10px] font-bold uppercase border border-green-500/30">Online</span>
                  </h3>
                  <p className="text-xs text-cyan-200/70">Powered by VitaFlow OS</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>
            
            {/* Chat Area */}
            <div 
              ref={scrollRef}
              className="flex-1 p-4 overflow-y-auto space-y-6 scroll-smooth custom-scrollbar"
            >
              {messages.map((msg, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-end gap-2 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${msg.role === 'user' ? 'bg-indigo-600' : 'bg-cyan-600'}`}>
                      {msg.role === 'user' ? <User size={14} /> : <Sparkles size={14} />}
                    </div>
                    <div className={`
                      p-4 rounded-2xl text-sm leading-relaxed shadow-lg backdrop-blur-md border border-white/5
                      ${msg.role === 'user' 
                        ? 'bg-gradient-to-br from-indigo-600 to-purple-700 text-white rounded-br-sm' 
                        : 'bg-white/10 text-gray-100 rounded-bl-sm'}
                    `}>
                      {msg.text}
                    </div>
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex justify-start"
                >
                  <div className="flex items-center gap-2">
                     <div className="w-8 h-8 rounded-full bg-cyan-600 flex items-center justify-center">
                        <Sparkles size={14} />
                     </div>
                     <div className="bg-white/10 p-3 rounded-2xl rounded-bl-sm border border-white/5">
                        <LoadingDots />
                     </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-white/10 bg-white/5 backdrop-blur-md">
              <div className="relative flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about your health..."
                  className="flex-1 bg-black/40 border border-white/10 rounded-full px-6 py-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:bg-black/60 transition-all shadow-inner"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="p-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-white shadow-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-cyan-500/30 transition-all"
                >
                  <Send size={18} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
