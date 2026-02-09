import React from 'react';
import { motion } from 'framer-motion';
import { Sidebar } from '../components/Sidebar';
import { PageTransition } from '../components/ui/Loader';
import { Check, Lock, Star, Trophy, MapPin, Flame } from 'lucide-react';
import metrics from '../data/metrics.json';

const Milestone = ({ id, label, completed, index, total }) => {
  const isLast = index === total - 1;
  return (
    <div className="relative flex flex-col items-center mb-16 w-full group">
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
        whileHover={{ scale: 1.1 }}
        className={`relative z-10 w-24 h-24 rounded-full flex items-center justify-center border-4 transition-all duration-500
          ${completed 
            ? 'bg-cyan-900/40 border-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.4)] cursor-pointer' 
            : 'bg-white/5 border-white/10 grayscale cursor-not-allowed'}
        `}
      >
        {completed ? (
          <Check size={32} className="text-cyan-400 drop-shadow-[0_0_5px_rgba(34,211,238,0.8)]" />
        ) : (
          <Lock size={24} className="text-gray-500" />
        )}
        
        {/* Floating Label */}
        <div className={`absolute ${index % 2 === 0 ? 'left-28' : 'right-28'} w-48 p-4 glass-card backdrop-blur-md transition-transform group-hover:scale-105 border-l-4 ${completed ? 'border-l-cyan-400' : 'border-l-gray-600'}`}>
          <h3 className={`font-bold ${completed ? 'text-white' : 'text-gray-500'}`}>{label}</h3>
          <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider">{completed ? 'Completed' : 'Locked'}</p>
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
    <PageTransition>
      <div className="flex h-screen bg-black overflow-hidden relative selection:bg-purple-500/30">
        <Sidebar />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black pointer-events-none" />

        <main className="flex-1 ml-64 p-12 overflow-y-auto relative z-10 flex flex-col items-center custom-scrollbar">
          <header className="w-full max-w-4xl flex justify-between items-center mb-24">
            <div>
              <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-5xl font-bold text-white mb-2"
              >
                My Journey
              </motion.h1>
              <p className="text-gray-400 text-lg">Your path to a better self.</p>
            </div>
            
            <div className="flex gap-6">
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="glass px-8 py-4 rounded-2xl flex items-center gap-4 border border-white/10"
              >
                <div className="p-3 bg-orange-500/10 rounded-full">
                  <Flame className="text-orange-500" size={24} />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-400 uppercase font-bold tracking-wider">Streak</span>
                  <span className="text-2xl font-bold text-white">{metrics.streak} <span className="text-sm font-normal text-gray-500">Days</span></span>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="glass px-8 py-4 rounded-2xl flex items-center gap-4 border border-white/10"
              >
                <div className="p-3 bg-yellow-500/10 rounded-full">
                  <Trophy className="text-yellow-500" size={24} />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-400 uppercase font-bold tracking-wider">Badges</span>
                  <span className="text-2xl font-bold text-white">3 <span className="text-sm font-normal text-gray-500">/ 12</span></span>
                </div>
              </motion.div>
            </div>
          </header>

          <div className="w-full max-w-2xl pb-24 relative">
            <div className="absolute top-0 bottom-0 left-1/2 w-px bg-gradient-to-b from-cyan-500/50 via-purple-500/50 to-transparent -translate-x-1/2 opacity-30" />
             {milestones.map((milestone, index) => (
               <Milestone 
                 key={milestone.id} 
                 {...milestone} 
                 index={index} 
                 total={milestones.length}
               />
             ))}
             
             {/* Finish Flag */}
             <motion.div 
               initial={{ scale: 0 }}
               animate={{ scale: 1 }}
               transition={{ delay: 1, type: "spring" }}
               className="relative flex items-center justify-center w-full mt-8"
             >
               <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(251,191,36,0.6)] animate-pulse border-4 border-black">
                 <Star className="text-white fill-white" size={32} />
               </div>
             </motion.div>
          </div>

        </main>
      </div>
    </PageTransition>
  );
}
