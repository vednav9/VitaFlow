import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sidebar } from "../components/Sidebar";
import { Button } from "../components/ui/Button";
import {
  Play,
  Pause,
  Wind,
  Volume2,
  VolumeX,
  CloudRain,
  Music,
  Waves,
} from "lucide-react";

const techniques = [
  {
    id: "box",
    name: "Box Breathing",
    subtitle: "Focus & Clarity",
    pattern: [4, 4, 4, 4],
    color: "cyan",
  },
  {
    id: "relax",
    name: "4-7-8 Relax",
    subtitle: "Calm & Sleep",
    pattern: [4, 7, 8, 0],
    color: "indigo",
  },
  {
    id: "energy",
    name: "Energy Boost",
    subtitle: "Awake & Alert",
    pattern: [4, 0, 4, 0],
    color: "orange",
  },
];

const soundscapes = [
  { id: "rain", name: "Soft Rain", icon: CloudRain },
  { id: "waves", name: "Ocean Waves", icon: Waves },
  { id: "ambient", name: "Deep Space", icon: Music },
];

export default function Relax() {
  const [isActive, setIsActive] = useState(false);
  const [selectedTechnique, setSelectedTechnique] = useState(techniques[0]);
  const [phase, setPhase] = useState("Ready");
  const [timer, setTimer] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [activeSound, setActiveSound] = useState(soundscapes[0]);

  // Breathing Logic
  useEffect(() => {
    let interval;
    if (isActive) {
      const [inhale, hold1, exhale, hold2] = selectedTechnique.pattern;
      const cycleLength = inhale + hold1 + exhale + hold2;

      interval = setInterval(() => {
        setTimer((t) => t + 1);
        const t = timer % cycleLength;

        if (t < inhale) setPhase("Inhale");
        else if (t < inhale + hold1) setPhase("Hold");
        else if (t < inhale + hold1 + exhale) setPhase("Exhale");
        else setPhase("Sustain");
      }, 1000);
    } else {
      setPhase("Ready");
      setTimer(0);
    }
    return () => clearInterval(interval);
  }, [isActive, timer, selectedTechnique]);

  return (
    <div className="relative flex h-screen overflow-hidden bg-black font-sans">
      <Sidebar />

      <div
        className={`absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-${selectedTechnique.color}-900/30 via-black to-black transition-colors duration-1000`}
      />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay brightness-100 contrast-150" />

      <main className="relative z-10 ml-64 flex flex-1 flex-col items-center justify-center p-8">
        {/* Top Controls */}
        <div className="absolute right-8 top-8 flex gap-4">
          {soundscapes.map((sound) => (
            <button
              key={sound.id}
              onClick={() => setActiveSound(sound)}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                activeSound.id === sound.id
                  ? "bg-white/10 text-white"
                  : "text-gray-500 hover:text-white"
              }`}
            >
              <sound.icon size={14} />
              {sound.name}
            </button>
          ))}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="ml-4 rounded-full bg-white/5 p-2 text-white hover:bg-white/10"
          >
            {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </button>
        </div>

        {/* Breathing Visualization */}
        <div className="relative flex flex-col items-center">
          <motion.div
            animate={{
              scale:
                phase === "Inhale"
                  ? 1.5
                  : phase === "Exhale"
                    ? 1
                    : phase === "Hold" || phase === "Sustain"
                      ? 1.5
                      : 1,
              rotate: isActive ? 360 : 0,
            }}
            transition={{
              duration:
                phase === "Ready"
                  ? 0
                  : phase === "Inhale"
                    ? selectedTechnique.pattern[0]
                    : phase === "Exhale"
                      ? selectedTechnique.pattern[2]
                      : phase === "Hold"
                        ? 0
                        : 0,
              ease: "easeInOut",
            }}
            className="relative mb-12 flex h-64 w-64 items-center justify-center"
          >
            {/* Core Circle */}
            <div
              className={`absolute inset-0 rounded-full border-2 border-${selectedTechnique.color}-500/30 bg-${selectedTechnique.color}-500/10 backdrop-blur-sm`}
            />

            {/* Expanding Ring */}
            <motion.div
              animate={{ scale: phase === "Inhale" ? 1.2 : 1 }}
              transition={{ duration: selectedTechnique.pattern[0] }}
              className={`absolute inset-0 rounded-full border border-${selectedTechnique.color}-400/50`}
            />

            {/* Particles/Orbs */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  scale: phase === "Inhale" ? [1, 1.5, 1] : [1, 0.5, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{ duration: 10, repeat: Infinity, delay: i * 0.5 }}
                className={`absolute h-4 w-4 rounded-full bg-${selectedTechnique.color}-400/40 blur-md`}
                style={{
                  top: "50%",
                  left: "50%",
                  transform: `rotate(${i * 60}deg) translate(100px)`,
                }}
              />
            ))}

            <motion.div
              key={phase}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="z-10 text-center"
            >
              <h2 className="text-4xl font-light uppercase tracking-widest text-white">
                {phase}
              </h2>
              {isActive && (
                <p className="mt-2 text-sm font-bold text-gray-400">
                  {timer % selectedTechnique.pattern.reduce((a, b) => a + b, 0)}
                  s
                </p>
              )}
            </motion.div>
          </motion.div>

          {/* Technique Selector */}
          <div className="mb-12 grid grid-cols-3 gap-4">
            {techniques.map((tech) => (
              <button
                key={tech.id}
                onClick={() => {
                  setIsActive(false);
                  setSelectedTechnique(tech);
                }}
                className={`group relative overflow-hidden rounded-2xl border p-4 text-left transition-all ${
                  selectedTechnique.id === tech.id
                    ? `border-${tech.color}-500 bg-${tech.color}-900/20`
                    : "border-white/10 bg-white/5 hover:border-white/20"
                }`}
              >
                <div className="relative z-10">
                  <h3
                    className={`font-bold ${selectedTechnique.id === tech.id ? "text-white" : "text-gray-300"}`}
                  >
                    {tech.name}
                  </h3>
                  <p className="text-xs text-gray-500">{tech.subtitle}</p>
                </div>
                {selectedTechnique.id === tech.id && (
                  <motion.div
                    layoutId="active-bg"
                    className={`absolute inset-0 bg-${tech.color}-500/10`}
                  />
                )}
              </button>
            ))}
          </div>

          <Button
            variant={isActive ? "outline" : "primary"}
            onClick={() => setIsActive(!isActive)}
            className="w-48 text-lg"
          >
            {isActive ? (
              <>
                <Pause size={20} /> Pause Session
              </>
            ) : (
              <>
                <Play size={20} /> Begin Breathe
              </>
            )}
          </Button>
        </div>
      </main>
    </div>
  );
}
