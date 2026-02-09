import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, X, RefreshCw } from 'lucide-react';
import { Button } from '../ui/Button';

const CARDS = [
  '🌙', '🌙', 
  '💧', '💧', 
  '🧘', '🧘', 
  '🥗', '🥗', 
  '🏃', '🏃', 
  '🧠', '🧠'
];

export const MemoryGame = ({ onExit }) => {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);
  const [moves, setMoves] = useState(0);
  const [won, setWon] = useState(false);

  useEffect(() => {
    shuffleCards();
  }, []);

  const shuffleCards = () => {
    const shuffled = [...CARDS].sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({ id: index, emoji }));
    setCards(shuffled);
    setFlipped([]);
    setSolved([]);
    setMoves(0);
    setWon(false);
  };

  const handleCardClick = (index) => {
    if (flipped.length === 2 || flipped.includes(index) || solved.includes(index)) return;

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      const [first, second] = newFlipped;
      if (cards[first].emoji === cards[second].emoji) {
        setSolved(prev => [...prev, first, second]);
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  };

  useEffect(() => {
    if (solved.length === CARDS.length && CARDS.length > 0) {
      setWon(true);
    }
  }, [solved]);

  return (
    <div className="fixed inset-0 bg-black/95 z-50 flex flex-col items-center justify-center p-8 backdrop-blur-xl">
      <div className="absolute top-8 right-8 flex gap-4">
        <div className="glass px-4 py-2 rounded-full text-white font-bold flex items-center gap-2">
           <RefreshCw size={16} /> Moves: {moves}
        </div>
        <button onClick={onExit} className="bg-white/10 p-2 rounded-full hover:bg-white/20 text-white">
          <X size={24} />
        </button>
      </div>

      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Memory Zenith</h2>
        <p className="text-gray-400">Match the wellness symbols to clear your mind.</p>
      </div>

      <div className="grid grid-cols-4 gap-4 max-w-md w-full">
        {cards.map((card, index) => (
          <motion.div
            key={card.id}
            initial={{ rotateY: 0 }}
            animate={{ 
              rotateY: flipped.includes(index) || solved.includes(index) ? 180 : 0,
              opacity: solved.includes(index) ? 0.5 : 1
            }}
            transition={{ duration: 0.3 }}
            onClick={() => handleCardClick(index)}
            className="aspect-square relative cursor-pointer perspective-1000"
          >
            <div className={`
              w-full h-full rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 shadow-lg flex items-center justify-center text-3xl
              absolute backface-hidden transition-all hover:bg-white/20
            `}>
              ?
            </div>
            <div className={`
              w-full h-full rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 border border-cyan-400/50 shadow-cyan-500/20 shadow-lg flex items-center justify-center text-3xl
              absolute backface-hidden rotate-y-180
            `}
            style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}
            >
              {card.emoji}
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {won && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-md z-50"
          >
            <div className="glass-card p-12 text-center border-cyan-500/50 shadow-[0_0_50px_rgba(6,182,212,0.3)]">
              <Trophy size={64} className="text-yellow-400 mx-auto mb-6 animate-bounce" />
              <h2 className="text-4xl font-bold text-white mb-4">Mind Cleared!</h2>
              <p className="text-xl text-gray-300 mb-8">Completed in {moves} moves.</p>
              <div className="flex gap-4 justify-center">
                <Button onClick={shuffleCards}>Play Again</Button>
                <Button variant="outline" onClick={onExit}>Exit</Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
