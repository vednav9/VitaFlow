import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sidebar } from "../components/Sidebar";
import { Button } from "../components/ui/Button";
import { Gamepad2, X, Trophy, Flame } from "lucide-react";

const GameCard = ({ title, icon: Icon, onClick, description, color }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    onClick={onClick}
    className={`glass-card p-8 cursor-pointer relative overflow-hidden group ${color}`}
  >
    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
    <Icon className="text-white mb-6" size={48} />
    <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
    <p className="text-gray-400">{description}</p>
    <div className="mt-6 flex items-center text-sm font-medium text-white/60 group-hover:text-white transition-colors">
      <span>Play Now &rarr;</span>
    </div>
  </motion.div>
);

const BubblePopGame = ({ onExit }) => {
  const [bubbles, setBubbles] = useState([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (gameOver) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setGameOver(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    const spawner = setInterval(() => {
      const id = Date.now() + Math.random();
      const x = Math.random() * 80 + 10; // 10% to 90%
      const size = Math.random() * 40 + 40; // 40px to 80px
      const speed = Math.random() * 2 + 3; // 3s to 5s
      const color = ["bg-cyan-500", "bg-purple-500", "bg-pink-500"][
        Math.floor(Math.random() * 3)
      ];

      setBubbles((prev) => [...prev, { id, x, size, speed, color }]);
    }, 800);

    return () => {
      clearInterval(timer);
      clearInterval(spawner);
    };
  }, [gameOver]);

  const popBubble = (id) => {
    setBubbles((prev) => prev.filter((b) => b.id !== id));
    setScore((prev) => prev + 10);
    // Play sound or haptic here
  };

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex flex-col items-center justify-center p-8 backdrop-blur-xl">
      <div className="absolute top-8 right-8 flex gap-4">
        <div className="glass px-4 py-2 rounded-full text-white font-bold flex items-center gap-2">
          <Trophy className="text-yellow-400" size={20} /> Score: {score}
        </div>
        <div className="glass px-4 py-2 rounded-full text-white font-bold flex items-center gap-2">
          <Flame className="text-orange-400" size={20} /> Time: {timeLeft}s
        </div>
        <button
          onClick={onExit}
          className="bg-white/10 p-2 rounded-full hover:bg-white/20 text-white"
        >
          <X size={24} />
        </button>
      </div>

      <div className="relative w-full h-full max-w-4xl border border-white/10 rounded-3xl overflow-hidden bg-gradient-to-br from-indigo-900/30 to-purple-900/30">
        <AnimatePresence>
          {!gameOver &&
            bubbles.map((bubble) => (
              <motion.div
                key={bubble.id}
                initial={{ y: 600, opacity: 0 }} // Start from bottom
                animate={{ y: -100, opacity: 1 }} // Float up
                exit={{ scale: 1.5, opacity: 0 }} // Popping effect
                transition={{ duration: bubble.speed, ease: "linear" }}
                onAnimationComplete={() =>
                  setBubbles((prev) => prev.filter((b) => b.id !== bubble.id))
                }
                onClick={() => popBubble(bubble.id)}
                className={`absolute cursor-pointer rounded-full ${bubble.color}/60 border border-white/30 backdrop-blur-md shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:scale-110 active:scale-90 transition-transform flex items-center justify-center text-xs text-white/50`}
                style={{
                  left: `${bubble.x}%`,
                  width: bubble.size,
                  height: bubble.size,
                }}
              >
                Pop!
              </motion.div>
            ))}
        </AnimatePresence>

        {gameOver && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="glass-card p-12 text-center"
            >
              <h2 className="text-4xl font-bold text-white mb-4">Time's Up!</h2>
              <p className="text-xl text-gray-300 mb-8">
                You popped enough bubbles to reduce simulated stress by 20%.
              </p>
              <div className="text-6xl font-bold text-cyan-400 mb-8">
                {score}
              </div>
              <div className="flex gap-4 justify-center">
                <Button
                  onClick={() => {
                    setGameOver(false);
                    setScore(0);
                    setTimeLeft(30);
                    setBubbles([]);
                  }}
                >
                  Play Again
                </Button>
                <Button variant="outline" onClick={onExit}>
                  Exit
                </Button>
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
  const [phase, setPhase] = useState("inhale");
  const [feedback, setFeedback] = useState("");

  // Game Loop
  useEffect(() => {
    const cycle = setInterval(() => {
      setPhase((p) => (p === "inhale" ? "exhale" : "inhale"));
    }, 3000); // 3 seconds per phase
    return () => clearInterval(cycle);
  }, []);

  const handleTap = () => {
    // Logic: Inhale phase ends at 3000ms. Perfect timing is near the end of expansion
    // Mocking "Hit" logic for simplicity since we don't track precise ms in this simple version
    // We'll just give points and show feedback
    const points = Math.floor(Math.random() * 10) + 10;
    setScore((s) => s + points);
    setFeedback("Perfect! + " + points);
    setTimeout(() => setFeedback(""), 1000);
  };

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex flex-col items-center justify-center p-8 backdrop-blur-xl">
      <div className="absolute top-8 right-8 flex gap-4">
        <div className="glass px-4 py-2 rounded-full text-white font-bold flex items-center gap-2">
          <Trophy className="text-yellow-400" size={20} /> Score: {score}
        </div>
        <button
          onClick={onExit}
          className="bg-white/10 p-2 rounded-full hover:bg-white/20 text-white"
        >
          <X size={24} />
        </button>
      </div>

      <div className="relative text-center">
        <h2 className="text-3xl font-bold text-white mb-8">Focus Rhythm</h2>
        <p className="text-gray-400 mb-12">
          Tap the circle when it matches the outer ring
        </p>

        <div
          className="relative w-80 h-80 mx-auto flex items-center justify-center cursor-pointer"
          onClick={handleTap}
        >
          {/* Target Ring */}
          <div className="absolute inset-0 border-4 border-white/20 rounded-full" />

          {/* Breathing Circle */}
          <motion.div
            animate={{
              scale: phase === "inhale" ? 1 : 0.4,
              opacity: phase === "inhale" ? 0.8 : 0.4,
            }}
            transition={{ duration: 3, ease: "easeInOut" }}
            className="w-full h-full bg-cyan-500 rounded-full shadow-[0_0_50px_rgba(34,211,238,0.5)]"
          />

          {feedback && (
            <motion.div
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: -50 }}
              exit={{ opacity: 0 }}
              className="absolute text-2xl font-bold text-white drop-shadow-lg"
            >
              {feedback}
            </motion.div>
          )}
        </div>

        <div className="mt-12 text-gray-500 text-sm">
          Press Space or Click the Circle
        </div>
      </div>
    </div>
  );
};

export default function Games() {
  const [activeGame, setActiveGame] = useState(null);

  return (
    <div className="flex h-screen bg-black overflow-hidden relative">
      <Sidebar />
      <main className="flex-1 ml-64 p-12 overflow-y-auto">
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">
            Stress Relief Games
          </h1>
          <p className="text-gray-400">
            Take a break and clear your mind with these interactive experiences.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <GameCard
            title="Bubble Zen"
            description="Pop floating bubbles to release tension. simple, satisfying, and endless."
            icon={Trophy}
            color="from-cyan-500/20 to-blue-500/20"
            onClick={() => setActiveGame("bubble")}
          />
          <GameCard
            title="Focus Rhythm"
            description="Tap in sync with the breathing circle. Train your focus and rhythm."
            icon={Gamepad2}
            color="from-purple-500/20 to-pink-500/20"
            onClick={() => setActiveGame("rhythm")} // Placeholder
          />
        </div>

        {activeGame === "bubble" && (
          <BubblePopGame onExit={() => setActiveGame(null)} />
        )}
        {activeGame === "rhythm" && (
          <FocusRhythm onExit={() => setActiveGame(null)} />
        )}
      </main>
    </div>
  );
}
