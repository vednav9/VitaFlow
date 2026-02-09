import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sidebar } from '../components/Sidebar';
import { Button } from '../components/ui/Button';
import { Play, Pause, Wind } from 'lucide-react';

export default function Relax() {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState('Ready'); // Ready, Inhale, Hold, Exhale
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let interval;
    if (isActive) {
      interval = setInterval(() => {
        setTimer((t) => t + 1);
        const cycle = timer % 19; // 4s in, 7s hold, 8s out = 19s (4-7-8 breathing)
        // Simplified: 4s In, 4s Hold, 4s Out = 12s
        const t = timer % 12;
        if (t < 4) setPhase('Inhale');
        else if (t < 8) setPhase('Hold');
        else setPhase('Exhale');
      }, 1000);
    } else {
      setPhase('Ready');
      setTimer(0);
    }
    return () => clearInterval(interval);
  }, [isActive, timer]);

  return (
    <div className="flex h-screen bg-black overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-teal-900/20 via-black to-black transition-colors duration-[10s]" />
      <Sidebar />
      <main className="flex-1 ml-64 flex flex-col items-center justify-center relative z-10">
        
        <motion.div
          animate={{
            scale: phase === 'Inhale' ? 1.5 : phase === 'Exhale' ? 1 : 1.5,
            opacity: phase === 'Hold' ? 0.8 : 0.5,
          }}
          transition={{ duration: 4, ease: "easeInOut" }}
          className="absolute w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[100px]"
        />

        <div className="text-center space-y-12 relative z-20">
          <motion.h2 
            key={phase}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-5xl font-extralight tracking-[0.2em] text-cyan-100 uppercase"
          >
            {phase}
          </motion.h2>

          <div className="relative w-96 h-96 flex items-center justify-center">
            {/* Main Breathing Circle */}
            <motion.div
              animate={{
                scale: phase === 'Inhale' ? 1.5 : phase === 'Exhale' ? 1 : 1.5,
                borderColor: phase === 'Hold' ? 'rgba(255,255,255,0.8)' : 'rgba(34,211,238,0.5)',
              }}
              transition={{ duration: 4, ease: "easeInOut" }}
              className="w-48 h-48 rounded-full border-4 border-cyan-500/30 flex items-center justify-center backdrop-blur-sm relative"
            >
               <motion.div
                  animate={{
                    scale: phase === 'Inhale' ? 1.2 : phase === 'Exhale' ? 0.8 : 1.2,
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
                  className="w-32 h-32 bg-cyan-400/20 rounded-full blur-xl absolute"
               />
               <Wind className="text-cyan-200 opacity-80" size={48} />
            </motion.div>
            
            {/* Ripples */}
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                animate={{
                  scale: phase === 'Inhale' ? [1, 2] : [2, 1],
                  opacity: phase === 'Inhale' ? [0.5, 0] : [0, 0.5],
                }}
                transition={{ 
                  duration: 4, 
                  ease: "easeInOut", 
                  delay: i * 0.5,
                  repeat: Infinity 
                }}
                className="absolute inset-0 border border-cyan-500/10 rounded-full"
              />
            ))}
          </div>

          <div className="flex gap-6 justify-center">
            <Button 
              variant={isActive ? "outline" : "primary"}
              onClick={() => setIsActive(!isActive)}
              className="w-40"
            >
              {isActive ? <><Pause size={20} /> Pause</> : <><Play size={20} /> Start</>}
            </Button>
          </div>
          
          <p className="text-gray-500 max-w-sm mx-auto text-sm leading-relaxed">
            Follow the rhythm. Inhale for 4 seconds, Hold for 4, Exhale for 4.
            Reset your nervous system.
          </p>
        </div>
      </main>
    </div>
  );
}
