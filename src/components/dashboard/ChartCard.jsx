import { motion } from 'framer-motion';

export const ChartCard = ({ title, children, delay }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
    transition={{ delay, duration: 0.6, ease: "easeOut" }}
    className="glass-card p-6 md:p-8 col-span-1 md:col-span-2 h-[400px] flex flex-col backdrop-blur-3xl border-t border-l border-white/5 bg-gradient-to-br from-white/5 to-black/20"
  >
    <div className="flex justify-between items-center mb-6">
      <h3 className="text-xl font-medium text-gray-200 tracking-wide bg-clip-text bg-gradient-to-r from-gray-100 to-gray-400">{title}</h3>
      <div className="flex gap-2">
        <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
        <span className="text-xs text-gray-500 uppercase tracking-widest">Live</span>
      </div>
    </div>
    <div className="flex-1 w-full relative z-10 text-xs">
      {children}
    </div>
  </motion.div>
);
