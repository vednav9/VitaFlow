import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sidebar } from '../components/Sidebar';
import { Button } from '../components/ui/Button';
import { PageTransition } from '../components/ui/Loader';
import { Gamepad2, X, Trophy, Flame, Brain, MousePointerClick, Wind } from 'lucide-react';

const GameCard = ({ title, icon: Icon, onClick, description, color }) => (
  <motion.div
    whileHover={{ scale: 1.05, y: -5 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className={`glass-card p-8 cursor-pointer relative overflow-hidden group ${color} border-t border-l border-white/10 shadow-lg hover:shadow-2xl transition-all duration-500`}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <div className="absolute -right-8 -top-8 opacity-10 group-hover:opacity-20 transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-12">
      <Icon size={120} />
    </div>
    
    <div className="relative z-10">
      <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-6 text-white backdrop-blur-md shadow-inner group-hover:scale-110 transition-transform duration-300">
        <Icon size={32} />
      </div>
      <h3 className="text-2xl font-bold text-white mb-2 tracking-tight group-hover:text-cyan-200 transition-colors">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">{description}</p>
      
      <div className="mt-8 flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-widest text-white/40 group-hover:text-cyan-400 transition-colors">Start Session</span>
        <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-cyan-500 group-hover:border-cyan-500 transition-all">
          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </div>
      </div>
    </div>
  </motion.div>
);

/* --- Mini Games --- */

const BubblePopGame = ({ onExit }) => {
  const [bubbles, setBubbles] = useState([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameOver, setGameOver] = useState(false);

  React.useEffect(() => {
    if (gameOver) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setGameOver(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    const spawner = setInterval(() => {
      const id = Date.now() + Math.random();
      const x = Math.random() * 80 + 10; 
      const size = Math.random() * 40 + 40; 
      const speed = Math.random() * 2 + 3;
      const color = ['bg-cyan-500', 'bg-purple-500', 'bg-pink-500', 'bg-emerald-500'][Math.floor(Math.random() * 4)];
      
      setBubbles(prev => [...prev, { id, x, size, speed, color }]);
    }, 600);

    return () => {
      clearInterval(timer);
      clearInterval(spawner);
    };
  }, [gameOver]);

  const popBubble = (id) => {
    setBubbles(prev => prev.filter(b => b.id !== id));
    setScore(prev => prev + 10);
  };

  return (
    <div className="fixed inset-0 bg-black/95 z-50 flex flex-col items-center justify-center p-8 backdrop-blur-3xl">
      <div className="absolute top-8 right-8 flex gap-4">
        <div className="glass px-6 py-2 rounded-full text-white font-bold flex items-center gap-2 border border-white/10">
           <Trophy className="text-yellow-400" size={20} /> Score: {score}
        </div>
        <div className="glass px-6 py-2 rounded-full text-white font-bold flex items-center gap-2 border border-white/10">
           <Flame className="text-orange-400" size={20} /> Time: {timeLeft}s
        </div>
        <button onClick={onExit} className="bg-white/10 p-3 rounded-full hover:bg-white/20 text-white transition-colors">
          <X size={24} />
        </button>
      </div>

      <div className="relative w-full h-full max-w-6xl border border-white/5 rounded-[3rem] overflow-hidden bg-gradient-to-br from-indigo-900/20 to-black shadow-2xl">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        <AnimatePresence>
          {!gameOver && bubbles.map(bubble => (
            <motion.div
              key={bubble.id}
              initial={{ y: 800, opacity: 0, scale: 0 }}
              animate={{ y: -200, opacity: 1, scale: 1 }}
              exit={{ scale: 2, opacity: 0 }}
              transition={{ duration: bubble.speed, ease: "linear" }}
              onAnimationComplete={() => setBubbles(prev => prev.filter(b => b.id !== bubble.id))}
              onClick={() => popBubble(bubble.id)}
              className={`absolute cursor-pointer rounded-full ${bubble.color} backdrop-blur-md shadow-[0_0_30px_rgba(255,255,255,0.4)] hover:scale-110 active:scale-95 transition-transform flex items-center justify-center text-xs font-bold text-white/80 border border-white/30`}
              style={{ 
                left: `${bubble.x}%`, 
                width: bubble.size, 
                height: bubble.size 
              }}
            >
              Pop!
            </motion.div>
          ))}
        </AnimatePresence>

        {gameOver && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-md z-50">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="glass-card p-12 text-center max-w-md w-full border-cyan-500/30 shadow-[0_0_100px_rgba(6,182,212,0.2)]"
            >
              <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 mb-6">Time's Up!</h2>
              <p className="text-xl text-gray-300 mb-8">You reduced simulated stress by popping {score/10} bubbles.</p>
              <div className="text-8xl font-black text-white mb-10 drop-shadow-2xl">{score}</div>
              <div className="flex gap-4 justify-center">
                <Button onClick={() => {
                  setGameOver(false);
                  setScore(0);
                  setTimeLeft(30);
                  setBubbles([]);
                }} className="flex-1">Play Again</Button>
                <Button variant="outline" onClick={onExit} className="flex-1">Exit</Button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

const FocusRhythm = ({ onExit }) => {
  const [score, setScore] = useState(0);
  const [phase, setPhase] = useState('inhale');
  const [feedback, setFeedback] = useState('');
  
  useEffect(() => {
    const cycle = setInterval(() => {
      setPhase(p => p === 'inhale' ? 'exhale' : 'inhale');
    }, 4000); 
    return () => clearInterval(cycle);
  }, []);

  const handleTap = () => {
    const points = Math.floor(Math.random() * 50) + 50;
    setScore(s => s + points);
    setFeedback('Perfect! +' + points);
    setTimeout(() => setFeedback(''), 800);
  };

  return (
    <div className="fixed inset-0 bg-black/95 z-50 flex flex-col items-center justify-center p-8 backdrop-blur-3xl">
      <div className="absolute top-8 right-8 flex gap-4">
        <div className="glass px-6 py-2 rounded-full text-white font-bold flex items-center gap-2 border border-white/10">
           <Trophy className="text-yellow-400" size={20} /> Score: {score}
        </div>
        <button onClick={onExit} className="bg-white/10 p-3 rounded-full hover:bg-white/20 text-white transition-colors">
          <X size={24} />
        </button>
      </div>

      <div className="relative text-center max-w-2xl">
        <h2 className="text-4xl font-bold text-white mb-6">Focus Rhythm</h2>
        <p className="text-gray-400 mb-16 text-lg">Tap the circle when it matches the outer ring breath.</p>

        <div className="relative w-96 h-96 mx-auto flex items-center justify-center cursor-pointer group" onClick={handleTap}>
          {/* Outer Ring */}
          <div className="absolute inset-0 border-2 border-white/10 rounded-full" />
          <motion.div 
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-[-20px] bg-cyan-500/10 rounded-full blur-xl"
          />
          
          {/* Breathing Circle */}
          <motion.div
            animate={{
              scale: phase === 'inhale' ? 1 : 0.4,
              opacity: phase === 'inhale' ? 1 : 0.6,
              borderColor: phase === 'inhale' ? 'rgba(34,211,238,1)' : 'rgba(168,85,247,1)',
            }}
            transition={{ duration: 4, ease: "easeInOut" }}
            className="w-full h-full bg-gradient-to-br from-cyan-900/50 to-purple-900/50 rounded-full shadow-[0_0_50px_rgba(34,211,238,0.3)] border-4 flex items-center justify-center backdrop-blur-sm group-hover:scale-[1.02] transition-transform"
          >
            <span className="text-2xl font-light text-white/50 tracking-[0.2em] uppercase">{phase}</span>
          </motion.div>

          {feedback && (
            <motion.div 
              initial={{ opacity: 0, y: 0, scale: 0.5 }}
              animate={{ opacity: 1, y: -80, scale: 1.2 }}
              exit={{ opacity: 0 }}
              className="absolute text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-500 drop-shadow-xl z-50"
            >
              {feedback}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

// Simple Memory Game Inline
const MemoryGame = ({ onExit }) => {
  const CARDS = ['🌙', '🌙', '💧', '💧', '🧘', '🧘', '🥗', '🥗', '🏃', '🏃', '🧠', '🧠'];
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);
  const [moves, setMoves] = React.useState(0);

  React.useEffect(() => {
    setCards([...CARDS].sort(() => Math.random() - 0.5).map((emoji, id) => ({ id, emoji })));
  }, []);

  const handleClick = (index) => {
    if (flipped.length === 2 || flipped.includes(index) || solved.includes(index)) return;
    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);
    
    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      const [a, b] = newFlipped;
      if (cards[a].emoji === cards[b].emoji) {
        setSolved([...solved, a, b]);
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/95 z-50 flex flex-col items-center justify-center p-8 backdrop-blur-3xl">
      <div className="absolute top-8 right-8">
        <button onClick={onExit} className="bg-white/10 p-3 rounded-full hover:bg-white/20 text-white"><X /></button>
      </div>
      <h2 className="text-3xl font-bold text-white mb-2">Memory Zenith</h2>
      <p className="text-gray-400 mb-8">Moves: {moves}</p>
      <div className="grid grid-cols-4 gap-4">
        {cards.map((card, i) => (
          <motion.div
            key={i}
            initial={{ rotateY: 0 }}
            animate={{ rotateY: flipped.includes(i) || solved.includes(i) ? 180 : 0 }}
            className="w-24 h-24 relative perspective-1000 cursor-pointer"
            onClick={() => handleClick(i)}
          >
            <div className={`absolute inset-0 bg-white/10 rounded-xl flex items-center justify-center text-2xl backface-hidden ${flipped.includes(i) || solved.includes(i) ? 'opacity-0' : 'opacity-100'}`}>?</div>
            <div className={`absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center text-4xl backface-hidden ${flipped.includes(i) || solved.includes(i) ? 'opacity-100' : 'opacity-0'}`} style={{ transform: 'rotateY(180deg)' }}>{card.emoji}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};


export default function Games() {
  const [activeGame, setActiveGame] = useState(null);

  return (
    <PageTransition>
      <div className="flex h-screen bg-black overflow-hidden relative selection:bg-cyan-500/30">
        <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-indigo-900/20 via-black to-black pointer-events-none" />
        <Sidebar />
        <main className="flex-1 ml-64 p-12 overflow-y-auto custom-scrollbar h-full relative z-10">
          <header className="mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-5xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 w-fit">Stress Relief Zone</h1>
              <p className="text-xl text-gray-400 max-w-2xl font-light">
                Immersive experiences designed to lower cortisol levels and improve focus through gamified interactions.
              </p>
            </motion.div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <GameCard 
              title="Bubble Zen" 
              description="Pop floating bubbles in a zero-gravity environment. Satisfying physics meets calming audio."
              icon={MousePointerClick}
              color="from-cyan-500/10 to-blue-500/10 text-cyan-400"
              onClick={() => setActiveGame('bubble')}
            />
            <GameCard 
              title="Focus Rhythm" 
              description="Synchronize your breathing with visual cues. Train your nervous system for deep focus."
              icon={Wind}
              color="from-purple-500/10 to-pink-500/10 text-purple-400"
              onClick={() => setActiveGame('rhythm')} 
            />
            <GameCard 
              title="Memory Zenith" 
              description="Match wellness symbols to sharpen your mind and improve short-term retention."
              icon={Brain}
              color="from-emerald-500/10 to-teal-500/10 text-emerald-400"
              onClick={() => setActiveGame('memory')}
            />
          </div>

          {activeGame === 'bubble' && <BubblePopGame onExit={() => setActiveGame(null)} />}
          {activeGame === 'rhythm' && <FocusRhythm onExit={() => setActiveGame(null)} />}
          {activeGame === 'memory' && <MemoryGame onExit={() => setActiveGame(null)} />}
        </main>
      </div>
    </PageTransition>
  );
}
