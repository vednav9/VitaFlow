import { motion } from 'framer-motion';

export const Loader = () => (
  <motion.div
    initial={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl"
  >
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-24 h-24">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            times: [0, 0.5, 1],
            repeat: Infinity,
          }}
          className="absolute inset-0 rounded-full border-4 border-t-cyan-500 border-r-transparent border-b-purple-500 border-l-transparent"
        />
        <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 blur-md animate-pulse" />
      </div>
      <motion.p
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="text-sm font-medium tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 uppercase"
      >
        Initializing VitaFlow...
      </motion.p>
    </div>
  </motion.div>
);

export const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
    exit={{ opacity: 0, scale: 1.02, filter: "blur(10px)" }}
    transition={{ duration: 0.4, ease: "easeOut" }}
    className="w-full h-full"
  >
    {children}
  </motion.div>
);
