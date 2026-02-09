import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import {
  Check,
  ChevronRight,
  User,
  Moon,
  Activity,
  Zap,
  Brain,
  Coffee,
  Utensils,
} from 'lucide-react';

const questions = [
  {
    id: 'sleep',
    category: 'Physical',
    icon: Moon,
    text: 'How did you sleep last night?',
    options: [
      { label: '< 5h', score: 20, feedback: 'Rest is vital!' },
      { label: '5-7h', score: 60, feedback: 'Getting there.' },
      { label: '7-9h', score: 100, feedback: 'Perfect!' },
      { label: '> 9h', score: 80, feedback: 'Hibernating?' },
    ],
  },
  {
    id: 'energy',
    category: 'Physical',
    icon: Zap,
    text: 'How is your energy level right now?',
    options: [
      { label: 'Exhausted', score: 20, feedback: 'Take it slow.' },
      { label: 'Low', score: 40, feedback: 'Need a boost?' },
      { label: 'Good', score: 80, feedback: 'Great!' },
      { label: 'Unstoppable', score: 100, feedback: 'Let’s go!' },
    ],
  },
  {
    id: 'stress',
    category: 'Mental',
    icon: Brain,
    text: 'How are you feeling mentally?',
    options: [
      { label: 'Overwhelmed', score: 20, feedback: 'Breathe...' },
      { label: 'Stressed', score: 40, feedback: 'One thing at a time.' },
      { label: 'Okay', score: 70, feedback: 'Dependent on the moment.' },
      { label: 'Zen', score: 100, feedback: 'Inner peace.' },
    ],
  },
  {
    id: 'diet',
    category: 'Lifestyle',
    icon: Utensils,
    text: 'How was your nutrition today?',
    options: [
      { label: 'Fast Food', score: 20, feedback: 'Treat yourself better.' },
      { label: 'Mixed', score: 60, feedback: 'Balance is key.' },
      { label: 'Balanced', score: 90, feedback: 'Fueling correctly!' },
      { label: 'Super Clean', score: 100, feedback: 'Clean energy.' },
    ],
  },
];

const archetypes = {
  balanced: {
    title: 'The Balanced Sage',
    desc: 'You have found a great rhythm. Keep nurturing this harmony.',
  },
  warrior: {
    title: 'The Resilient Warrior',
    desc: 'You push through challenges, but remember to rest as hard as you work.',
  },
  seeker: {
    title: 'The Wellness Seeker',
    desc: 'You are on the path, but need more consistency to reach your peak.',
  },
  restless: {
    title: 'The Restless Achiever',
    desc: 'High energy but high stress. Prioritize grounding yourself.',
  },
};

const getArchetype = (score, stress) => {
  if (score > 80) return archetypes.balanced;
  if (stress < 50) return archetypes.restless;
  if (score > 50) return archetypes.warrior;
  return archetypes.seeker;
};

export default function Assessment() {
  const [step, setStep] = useState(-1); // -1 for Name Input
  const [name, setName] = useState('');
  const [answers, setAnswers] = useState({});
  const [totalScore, setTotalScore] = useState(0);
  const [isCalculating, setIsCalculating] = useState(false);
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  const handleStart = () => {
    if (name.trim()) setStep(0);
  };

  const handleSelect = (questionId, option) => {
    setAnswers({ ...answers, [questionId]: option });
    setTotalScore((prev) => prev + option.score);

    if (step < questions.length - 1) {
      setTimeout(() => setStep(step + 1), 400);
    } else {
      finishAssessment(option.score);
    }
  };

  const finishAssessment = (lastScore) => {
    setIsCalculating(true);
    setTimeout(() => {
      const finalScore = Math.min(
        100,
        Math.round((totalScore + lastScore) / questions.length)
      );
      setIsCalculating(false);
      setResult({
        score: finalScore,
        archetype: getArchetype(finalScore, answers['stress']?.score || 50),
      });
    }, 2000);
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black p-6 font-sans">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/40 via-black to-black" />

      <div className="relative z-10 w-full max-w-2xl">
        <AnimatePresence mode="wait">
          {/* Step -1: Name Input */}
          {step === -1 && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -20 }}
              className="glass-card flex flex-col items-center p-12 text-center"
            >
              <div className="mb-6 rounded-full bg-cyan-500/20 p-6">
                <User size={48} className="text-cyan-300" />
              </div>
              <h1 className="mb-2 text-4xl font-bold text-white">
                Welcome to VitaFlow
              </h1>
              <p className="mb-8 text-gray-400">
                Let's start by getting to know you.
              </p>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleStart()}
                placeholder="What's your name?"
                className="mb-8 w-full border-b-2 border-white/20 bg-transparent px-4 py-3 text-center text-3xl font-light text-white placeholder-white/20 focus:border-cyan-500 focus:outline-none"
                autoFocus
              />

              <Button
                onClick={handleStart}
                disabled={!name.trim()}
                className="w-full max-w-xs"
              >
                Begin Journey <ChevronRight />
              </Button>
            </motion.div>
          )}

          {/* Quiz Steps */}
          {step >= 0 && !isCalculating && !result && (
            <motion.div
              key={questions[step].id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ bg: 'easeOut', duration: 0.3 }}
              className="w-full"
            >
              {/* Progress */}
              <div className="mb-8">
                <div className="mb-2 flex justify-between text-xs font-medium uppercase tracking-widest text-gray-500">
                  <span>{questions[step].category}</span>
                  <span>
                    {step + 1} / {questions.length}
                  </span>
                </div>
                <div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    className="h-full bg-gradient-to-r from-cyan-400 to-purple-500"
                    initial={{ width: `${(step / questions.length) * 100}%` }}
                    animate={{
                      width: `${((step + 1) / questions.length) * 100}%`,
                    }}
                  />
                </div>
              </div>

              <div className="glass-card p-10">
                <div className="mb-8 flex items-center justify-center">
                  <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                    {React.createElement(questions[step].icon, {
                      size: 32,
                      className: 'text-cyan-300',
                    })}
                  </div>
                </div>

                <h2 className="mb-12 text-center text-3xl font-light leading-snug text-white">
                  {step === 0 ? `${name}, ` : ''}
                  {questions[step].text.toLowerCase()}
                </h2>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {questions[step].options.map((option, idx) => (
                    <motion.button
                      key={idx}
                      whileHover={{
                        scale: 1.02,
                        backgroundColor: 'rgba(255,255,255,0.08)',
                      }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleSelect(questions[step].id, option)}
                      className="group relative flex flex-col items-start rounded-xl border border-white/10 bg-white/5 p-6 text-left transition-all hover:border-cyan-500/50"
                    >
                      <span className="text-xl font-medium text-white transition-colors group-hover:text-cyan-300">
                        {option.label}
                      </span>
                      {/* Hover Feedback Reveal */}
                      <span className="absolute right-6 top-6 text-xs font-bold uppercase tracking-wider text-cyan-500 opacity-0 transition-opacity group-hover:opacity-100 mt-2">
                        Select
                      </span>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Calculating State */}
          {isCalculating && (
            <motion.div
              key="calculating"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center text-center"
            >
              <div className="relative mb-8 h-32 w-32">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0 rounded-full border-4 border-cyan-500/30 border-t-cyan-400"
                />
                <motion.div
                  animate={{ rotate: -180 }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-4 rounded-full border-4 border-purple-500/30 border-t-purple-400"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Activity className="animate-pulse text-white" size={32} />
                </div>
              </div>
              <h2 className="text-2xl font-light text-white">
                Analyzing your profile, {name}...
              </h2>
              <p className="mt-2 text-gray-400">
                Building your personalized dashboard
              </p>
            </motion.div>
          )}

          {/* Results */}
          {result && (
            <motion.div
              key="result"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="glass-card overflow-hidden p-0"
            >
              <div className="bg-gradient-to-br from-indigo-900/50 to-purple-900/50 p-10 text-center">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-cyan-300">
                  Optimization Complete
                </div>

                <div className="relative mx-auto my-8 h-40 w-40">
                  <svg className="h-full w-full -rotate-90">
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      className="text-black/20"
                    />
                    <motion.circle
                      cx="80"
                      cy="80"
                      r="70"
                      stroke="url(#resGradient)"
                      strokeWidth="8"
                      fill="transparent"
                      strokeLinecap="round"
                      initial={{ strokeDasharray: 440, strokeDashoffset: 440 }}
                      animate={{
                        strokeDashoffset: 440 - (440 * result.score) / 100,
                      }}
                      transition={{ duration: 1.5, ease: 'circOut' }}
                    />
                    <defs>
                      <linearGradient
                        id="resGradient"
                        x1="0"
                        y1="0"
                        x2="1"
                        y2="1"
                      >
                        <stop offset="0%" stopColor="#22d3ee" />
                        <stop offset="100%" stopColor="#a855f7" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-bold text-white">
                      {result.score}
                    </span>
                    <span className="text-xs text-gray-300">Score</span>
                  </div>
                </div>

                <h2 className="mb-2 text-3xl font-bold text-white">
                  {result.archetype.title}
                </h2>
                <p className="mx-auto max-w-sm text-gray-300">
                  {result.archetype.desc}
                </p>
              </div>

              <div className="bg-black/20 p-8">
                <div className="mb-6 grid grid-cols-3 gap-4 text-center">
                  <div className="rounded-lg bg-white/5 p-3">
                    <div className="text-xs text-gray-400">Sleep</div>
                    <div
                      className={`font-bold ${answers['sleep']?.score > 50 ? 'text-green-400' : 'text-orange-400'}`}
                    >
                      {answers['sleep']?.label}
                    </div>
                  </div>
                  <div className="rounded-lg bg-white/5 p-3">
                    <div className="text-xs text-gray-400">Stress</div>
                    <div
                      className={`font-bold ${answers['stress']?.score > 50 ? 'text-green-400' : 'text-orange-400'}`}
                    >
                      {answers['stress']?.label}
                    </div>
                  </div>
                  <div className="rounded-lg bg-white/5 p-3">
                    <div className="text-xs text-gray-400">Diet</div>
                    <div
                      className={`font-bold ${answers['diet']?.score > 50 ? 'text-green-400' : 'text-orange-400'}`}
                    >
                      {answers['diet']?.label}
                    </div>
                  </div>
                </div>

                <Button
                  onClick={() => navigate('/dashboard')}
                  className="w-full"
                >
                  Enter Dashboard <ChevronRight size={18} />
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}