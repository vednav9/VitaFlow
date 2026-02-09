import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Check, ChevronRight } from 'lucide-react';

const questions = [
  { id: 'sleep', text: 'How many hours did you sleep?', options: ['< 5h', '5-7h', '7-9h', '> 9h'] },
  { id: 'calories', text: 'How was your diet today?', options: ['Heavy', 'Moderate', 'Balanced', 'Light'] },
  { id: 'stress', text: 'Current stress level?', options: ['High', 'Moderate', 'Low', 'Zen'] },
  { id: 'screen', text: 'Screen time today?', options: ['> 8h', '6-8h', '4-6h', '< 4h'] },
  { id: 'mood', text: 'How do you feel?', options: ['😔', '😐', '🙂', '🤩'] },
  { id: 'activity', text: 'Activity level?', options: ['Sedentary', 'Light', 'Moderate', 'Intense'] },
];

export default function Assessment() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isCalculating, setIsCalculating] = useState(false);
  const [score, setScore] = useState(null);
  const navigate = useNavigate();

  const handleSelect = (option) => {
    setAnswers({ ...answers, [questions[step].id]: option });
    if (step < questions.length - 1) {
      setTimeout(() => setStep(step + 1), 300);
    } else {
      setIsCalculating(true);
      setTimeout(() => {
        setIsCalculating(false);
        setScore(85); // Mock score
      }, 2500);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-black">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-black to-purple-900/20" />
      
      <div className="w-full max-w-2xl relative z-10">
        <AnimatePresence mode="wait">
          {!isCalculating && score === null && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="flex justify-between items-end mb-8">
                <h2 className="text-3xl font-light text-white/80">
                  <span className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                    {step + 1}
                  </span>
                  <span className="text-white/40 text-xl ml-2">/ {questions.length}</span>
                </h2>
                <div className="h-2 w-32 bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-cyan-400"
                    initial={{ width: 0 }}
                    animate={{ width: `${((step + 1) / questions.length) * 100}%` }}
                  />
                </div>
              </div>

              <div className="glass-card p-10 min-h-[400px] flex flex-col justify-center">
                <h3 className="text-3xl font-medium mb-12 text-center text-white">
                  {questions[step].text}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {questions[step].options.map((option, index) => (
                    <motion.button
                      key={option}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => handleSelect(option)}
                      className={`
                        p-6 text-xl rounded-xl border border-white/10 text-left transition-all
                        ${answers[questions[step].id] === option 
                          ? 'bg-gradient-to-r from-cyan-600 to-blue-600 border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.3)]' 
                          : 'bg-white/5 hover:bg-white/10 hover:border-white/30'}
                      `}
                    >
                      {option}
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {isCalculating && (
            <motion.div
              key="calculating"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
              <div className="relative w-32 h-32 mx-auto mb-8">
                <motion.div
                  className="absolute inset-0 border-4 border-t-cyan-500 border-r-transparent border-b-purple-500 border-l-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute inset-2 border-4 border-t-transparent border-r-pink-500 border-b-transparent border-l-blue-500 rounded-full"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
              </div>
              <h2 className="text-2xl font-light animate-pulse">Analyzing Vital Signs...</h2>
            </motion.div>
          )}

          {score !== null && (
             <motion.div
               key="result"
               initial={{ scale: 0.8, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               className="text-center space-y-8"
             >
               <h2 className="text-4xl font-bold text-white mb-2">Wellness Score</h2>
               
               <div className="relative w-64 h-64 mx-auto flex items-center justify-center">
                 {/* Glowing Rings */}
                 <div className="absolute inset-0 rounded-full border border-white/10 animate-pulse-slow" />
                 <div className="absolute inset-4 rounded-full border border-cyan-500/30 blur-md" />
                 
                 <svg className="w-full h-full rotate-[-90deg]">
                   <circle
                     cx="128"
                     cy="128"
                     r="120"
                     stroke="currentColor"
                     strokeWidth="8"
                     fill="transparent"
                     className="text-white/5"
                   />
                   <motion.circle
                     cx="128"
                     cy="128"
                     r="120"
                     stroke="url(#gradient)"
                     strokeWidth="8"
                     fill="transparent"
                     strokeLinecap="round"
                     initial={{ pathLength: 0 }}
                     animate={{ pathLength: score / 100 }}
                     transition={{ duration: 2, ease: "easeOut" }}
                   />
                   <defs>
                     <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                       <stop offset="0%" stopColor="#22d3ee" />
                       <stop offset="100%" stopColor="#a855f7" />
                     </linearGradient>
                   </defs>
                 </svg>
                 
                 <div className="absolute inset-0 flex flex-col items-center justify-center">
                   <motion.span 
                     initial={{ opacity: 0, y: 10 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: 1 }}
                     className="text-6xl font-bold text-white"
                   >
                     {score}
                   </motion.span>
                   <span className="text-gray-400 text-sm uppercase tracking-widest mt-2">Excellent</span>
                 </div>
               </div>

               <Button 
                 variant="primary" 
                 onClick={() => navigate('/dashboard')}
                 className="w-full max-w-sm mx-auto"
               >
                 Enter Dashboard <ChevronRight />
               </Button>
             </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
