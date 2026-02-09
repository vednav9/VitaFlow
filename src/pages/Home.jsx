import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { ArrowRight, Activity, Moon, Zap } from 'lucide-react';

const FloatingIcon = ({ icon: Icon, color, x, y, delay }) => (
  <motion.div
    initial={{ opacity: 0, x: 0, y: 0 }}
    animate={{ 
      opacity: [0.4, 1, 0.4],
      x: [x, x + 30, x],
      y: [y, y - 30, y],
    }}
    transition={{ 
      duration: 5, 
      repeat: Infinity,
      delay: delay,
      ease: "easeInOut"
    }}
    className={`absolute top-1/2 left-1/2 ${color} filter drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]`}
  >
    <Icon size={48} strokeWidth={1.5} />
  </motion.div>
);

export default function Home() {
  const navigate = useNavigate();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.8 }}
      className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-black"
    >
      {/* Background Animated Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-purple-900/30 rounded-full blur-[120px]"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.5, 1],
            x: [0, 100, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-20%] right-[-10%] w-[700px] h-[700px] bg-indigo-900/30 rounded-full blur-[120px]"
        />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
      </div>

      <div className="z-10 text-center space-y-8 p-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative inline-block"
        >
          <div className="absolute -inset-8 blur-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-20 rounded-full"></div>
          <h1 className="text-7xl md:text-9xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 drop-shadow-2xl relative z-10 tracking-tighter">
            VitaFlow OS
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto font-light leading-relaxed tracking-wide"
        >
          The Operating System for your <span className="text-white font-medium">Wellness Journey</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, type: "spring", stiffness: 100 }}
          className="flex justify-center gap-6 pt-12"
        >
          <Button 
            variant="primary" 
            onClick={() => navigate('/assessment')}
            className="text-lg px-12 py-4"
          >
            Start Journey <ArrowRight size={24} />
          </Button>
        </motion.div>

        {/* Floating Icons */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[150%] pointer-events-none">
           <FloatingIcon icon={Activity} color="text-pink-400" x={-350} y={-250} delay={0} />
           <FloatingIcon icon={Moon} color="text-purple-400" x={450} y={150} delay={1.5} />
           <FloatingIcon icon={Zap} color="text-yellow-400" x={-450} y={250} delay={2.5} />
        </div>
      </div>
    </motion.div>
  );
}
