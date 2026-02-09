import React from 'react';
import { motion } from 'framer-motion';
import { Sidebar } from '../components/Sidebar';
import { Check, Lock, Star, Trophy, MapPin, Flame } from 'lucide-react';
import metrics from '../data/metrics.json';

const Milestone = ({ id, label, completed, index, total }) => {
  const isLast = index === total - 1;
  return (
    <div className="relative flex flex-col items-center mb-16 w-full">
      {/* Connector Line */}
      {!isLast && (
        <div className="absolute top-12 left-1/2 w-1 h-40 -ml-0.5 bg-white/10 overflow-hidden z-0">
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: completed ? '100%' : '0%' }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="w-full h-full bg-gradient-to-b from-cyan-500 to-cyan-900 shadow-[0_0_10px_rgba(34,211,238,0.5)]"
          />
        </div>
      )}

      {/* Node */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: index * 0.1 }}
        className={`relative z-10 w-24 h-24 rounded-full flex items-center justify-center border-4 transition-all duration-500
          ${completed 
            ? 'bg-cyan-900/40 border-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.4)]' 
            : 'bg-white/5 border-white/10 grayscale'}
        `}
      >
        {completed ? (
          <Check size={32} className="text-cyan-400 drop-shadow-[0_0_5px_rgba(34,211,238,0.8)]" />
        ) : (
          <Lock size={24} className="text-gray-500" />
        )}
        
        {/* Floating Label */}
        <div className={`absolute ${index % 2 === 0 ? 'left-28' : 'right-28'} w-48 p-4 glass-card backdrop-blur-md`}>
          <h3 className={`font-bold ${completed ? 'text-white' : 'text-gray-500'}`}>{label}</h3>
          <p className="text-xs text-gray-400 mt-1">{completed ? 'Completed' : 'Locked'}</p>
        </div>
      </motion.div>
    </div>
  );
};

export default function Journey() {
  const milestones = metrics.milestones || [
    { id: 1, label: "Start Journey", completed: true },
    { id: 2, label: "First 5k Steps", completed: true },
    { id: 3, label: "7 Day Streak", completed: true },
    { id: 4, label: "Perfect Sleep Week", completed: false },
    { id: 5, label: "Meditation Master", completed: false }
  ];

  return (
    <div className="flex h-screen bg-black overflow-hidden relative">
      <Sidebar />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black pointer-events-none" />

      <main className="flex-1 ml-64 p-12 overflow-y-auto relative z-10 flex flex-col items-center">
        <header className="w-full max-w-4xl flex justify-between items-center mb-16">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">My Journey</h1>
            <p className="text-gray-400">Track your progress and unlock rewards.</p>
          </div>
          
          <div className="flex gap-6">
            <div className="glass px-6 py-3 rounded-full flex items-center gap-3">
              <Flame className="text-orange-500" />
              <div className="flex flex-col">
                <span className="text-xs text-gray-400 uppercase font-bold">Streak</span>
                <span className="text-xl font-bold text-white">{metrics.streak} Days</span>
              </div>
            </div>
            <div className="glass px-6 py-3 rounded-full flex items-center gap-3">
              <Trophy className="text-yellow-500" />
              <div className="flex flex-col">
                <span className="text-xs text-gray-400 uppercase font-bold">Badges</span>
                <span className="text-xl font-bold text-white">3 / 12</span>
              </div>
            </div>
          </div>
        </header>

        <div className="w-full max-w-2xl py-12 relative">
           {milestones.map((milestone, index) => (
             <Milestone 
               key={milestone.id} 
               {...milestone} 
               index={index} 
               total={milestones.length}
             />
           ))}
           
           {/* Finish Flag */}
           <div className="relative flex items-center justify-center w-full mt-8">
             <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(251,191,36,0.5)] animate-pulse">
               <Star className="text-white" size={28} />
             </div>
           </div>
        </div>

      </main>
    </div>
  );
}
