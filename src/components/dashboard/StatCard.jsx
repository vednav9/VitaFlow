import { motion } from 'framer-motion';

export const StatCard = ({ title, value, subtext, icon: Icon, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    whileHover={{ y: -5, scale: 1.02 }}
    className="glass-card p-6 relative overflow-hidden group border border-white/5 bg-gradient-to-br from-white/5 to-transparent hover:border-white/20 hover:shadow-cyan-500/10 hover:shadow-2xl transition-all duration-500"
  >
    <div className={`absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity duration-500 transform group-hover:scale-110 ${color}`}>
      <Icon size={100} />
    </div>
    
    <div className="relative z-10">
      <div className={`flex items-center gap-3 mb-4 ${color}`}>
        <div className="p-2 rounded-lg bg-white/5 backdrop-blur-sm group-hover:bg-white/10 transition-colors">
          <Icon size={24} />
        </div>
        <h3 className="font-medium text-gray-300 tracking-wide">{title}</h3>
      </div>
      
      <div className="flex items-baseline gap-2">
        <motion.span 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: delay + 0.2 }}
          className="text-4xl lg:text-5xl font-bold text-white tracking-tight"
        >
          {value}
        </motion.span>
        <span className="text-sm text-gray-400 font-medium uppercase tracking-wider">{subtext}</span>
      </div>
    </div>
    
    <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent w-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <div className={`absolute inset-0 bg-gradient-to-br ${color.replace('text-', 'from-')}/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
  </motion.div>
);
