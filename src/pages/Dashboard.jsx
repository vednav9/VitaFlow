import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts';
import { Sidebar } from '../components/Sidebar';
import { Button } from '../components/ui/Button';
import { Activity, Moon, Zap, Flame, MessageSquare, Search, Bell, Smartphone } from 'lucide-react';
import metrics from '../data/metrics.json';
import tips from '../data/tips.json';

const StatCard = ({ title, value, subtext, icon: Icon, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    className="glass-card p-6 relative overflow-hidden group hover:border-white/20"
  >
    <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity ${color}`}>
      <Icon size={80} />
    </div>
    
    <div className="relative z-10">
      <div className={`flex items-center gap-3 mb-4 ${color}`}>
        <div className="p-2 rounded-lg bg-white/5 backdrop-blur-sm">
          <Icon size={24} />
        </div>
        <h3 className="font-medium text-gray-300">{title}</h3>
      </div>
      
      <div className="flex items-baseline gap-2">
        <span className="text-4xl font-bold text-white tracking-tight">{value}</span>
        <span className="text-sm text-gray-400 font-medium">{subtext}</span>
      </div>
    </div>
    
    <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent w-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
  </motion.div>
);

const ChartCard = ({ title, children, delay }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration: 0.5 }}
    className="glass-card p-6 col-span-1 md:col-span-2 h-[300px] flex flex-col"
  >
    <h3 className="text-lg font-medium text-gray-300 mb-6">{title}</h3>
    <div className="flex-1 w-full relative z-10">
      {children}
    </div>
  </motion.div>
);

const CoachWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Hello Vedant! I noticed your sleep was a bit short last night. Try a 10-min meditation from the Relax tab.' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: 'user', text: input }]);
    setInput('');
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'ai', text: 'That sounds like a great plan. Hydration is key too!' }]);
    }, 1000);
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-cyan-500/50 z-50 transition-all border border-white/20"
      >
        <MessageSquare className="text-white" size={28} />
      </motion.button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          className="fixed bottom-28 right-8 w-96 h-[500px] glass-card flex flex-col overflow-hidden z-50 border border-white/20 shadow-2xl"
        >
          <div className="p-4 border-b border-white/10 bg-white/5 flex justify-between items-center">
            <h3 className="font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              VitaCoach AI
            </h3>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">&times;</button>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`
                  max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed
                  ${msg.role === 'user' 
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-br-none' 
                    : 'bg-white/10 text-gray-200 rounded-bl-none border border-white/5'}
                `}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-white/10 bg-white/5">
            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask for advice..."
                className="w-full bg-black/40 border border-white/10 rounded-full px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-colors"
              />
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default function Dashboard() {
  const [data, setData] = useState(metrics);
  const [moodValue, setMoodValue] = useState(80);
  const [tip, setTip] = useState(tips[0]);

  useEffect(() => {
    // Pick random tip on mount
    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    setTip(randomTip);
  }, []);

  return (
    <div className="flex h-screen bg-black overflow-hidden relative">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/20 via-black to-black pointer-events-none" />
      
      <Sidebar />
      
      <main className="flex-1 ml-64 p-8 overflow-y-auto h-full relative z-10 w-full scroll-smooth">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold text-white mb-1">
              Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">{data.user}</span>
            </h1>
            <p className="text-gray-400 text-sm">Your vital signs are looking good today.</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search metrics..." 
                className="bg-white/5 border border-white/10 rounded-full pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-white/20 w-64 transition-all"
              />
              <Search className="absolute left-3 top-2.5 text-gray-500" size={16} />
            </div>
            <button className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            title="Overview Score" 
            value={data.score} 
            subtext="/ 100" 
            icon={Activity} 
            color="text-emerald-400" 
            delay={0.1} 
          />
          <StatCard 
            title="Calories Burned" 
            value={data.calories.current} 
            subtext="kcal" 
            icon={Flame} 
            color="text-orange-400" 
            delay={0.2} 
          />
          <StatCard 
            title="Sleep Duration" 
            value="7.5" 
            subtext="hours" 
            icon={Moon} 
            color="text-indigo-400" 
            delay={0.3} 
          />
          <StatCard 
            title="Active Minutes" 
            value={data.activity.activeMinutes} 
            subtext="min" 
            icon={Zap} 
            color="text-yellow-400" 
            delay={0.4} 
          />
          <StatCard 
            title="Screen Time" 
            value={data.screenTime.hours} 
            subtext="hrs" 
            icon={Smartphone} 
            color="text-blue-400" 
            delay={0.5} 
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <ChartCard title="Sleep Trends" delay={0.5}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.sleep}>
                <defs>
                  <linearGradient id="colorSleep" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#818cf8" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#818cf8" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" stroke="#525252" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="hours" stroke="#818cf8" strokeWidth={3} fillOpacity={1} fill="url(#colorSleep)" />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Stress Level Analysis" delay={0.6}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.stress}>
                <XAxis dataKey="day" stroke="#525252" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Line type="monotone" dataKey="level" stroke="#fb7185" strokeWidth={3} dot={{ r: 4, fill: '#fb7185', strokeWidth: 0 }} activeDot={{ r: 6, strokeWidth: 0 }} />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className="glass-card p-6 relative overflow-hidden"
          >
            <h3 className="font-medium text-gray-300 mb-4">Detox Tracker</h3>
            <div className="flex items-center justify-center p-4">
              <div className="relative w-40 h-40 flex items-center justify-center">
                <svg className="w-full h-full rotate-[-90deg]">
                  <circle cx="80" cy="80" r="70" stroke="#333" strokeWidth="8" fill="transparent" />
                  <motion.circle 
                    cx="80" cy="80" r="70" 
                    stroke="#22d3ee" strokeWidth="8" 
                    fill="transparent" strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: data.detox.daysLeft / data.detox.total }}
                    transition={{ duration: 1.5, delay: 1 }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold text-white">{data.detox.daysLeft}</span>
                  <span className="text-xs text-gray-400 uppercase">Days Left</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
             className="glass-card p-6 relative overflow-hidden flex flex-col"
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.75 }}
          >
             <h3 className="font-medium text-gray-300 mb-4">Mood Check-in</h3>
             <div className="flex-1 flex flex-col items-center justify-center gap-6">
               <motion.div 
                 key={moodValue}
                 initial={{ scale: 0.5, opacity: 0 }}
                 animate={{ scale: 1, opacity: 1 }}
                 className="text-6xl filter drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]"
               >
                 {moodValue > 75 ? '🤩' : moodValue > 50 ? '🙂' : moodValue > 25 ? '😐' : '😔'}
               </motion.div>
               <input 
                 type="range" 
                 min="0" max="100" 
                 value={moodValue}
                 className="w-full accent-cyan-500 h-2 bg-white/10 rounded-lg appearance-none cursor-pointer hover:bg-white/20 transition-colors"
                 onChange={(e) => setMoodValue(parseInt(e.target.value))}
               />
               <span className="text-xs text-gray-400 uppercase tracking-widest">
                 {moodValue > 75 ? 'Excellent' : moodValue > 50 ? 'Good' : moodValue > 25 ? 'Okay' : 'Low'}
               </span>
             </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            className="glass-card p-6 lg:col-span-2 bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border-purple-500/20"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-medium text-white text-lg">Daily Insight</h3>
              <span className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">AI Generated</span>
            </div>
            <p className="text-gray-300 leading-relaxed text-lg">
              "{tip}"
            </p>
            <div className="mt-6 flex gap-3">
              <Button variant="outline" className="text-sm px-4 py-2">View Activity Log</Button>
              <Button variant="primary" className="text-sm px-4 py-2">Start Detox Games</Button>
            </div>
          </motion.div>
        </div>

        <CoachWidget />
      </main>
    </div>
  );
}
