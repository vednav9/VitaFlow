import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Check, Info, AlertCircle } from 'lucide-react';

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = useCallback((message, type = 'info', duration = 5000) => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, duration);
  }, []);

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <NotificationContext.Provider value={{ addNotification }}>
      {children}
      <div className="fixed top-24 right-8 z-50 flex flex-col gap-4 pointer-events-none">
        <AnimatePresence>
          {notifications.map(({ id, message, type }) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.9 }}
              layout
              className="pointer-events-auto min-w-[300px] glass-card p-4 flex items-center gap-3 shadow-2xl border-l-4 border-l-cyan-400 bg-black/60 backdrop-blur-xl"
            >
              <div className={`
                p-2 rounded-full 
                ${type === 'success' ? 'bg-green-500/20 text-green-400' : 
                  type === 'alert' ? 'bg-red-500/20 text-red-400' : 
                  'bg-cyan-500/20 text-cyan-400'}
              `}>
                {type === 'success' ? <Check size={20} /> : 
                 type === 'alert' ? <AlertCircle size={20} /> : 
                 <Bell size={20} />}
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-bold text-white uppercase tracking-wide opacity-80">
                  {type === 'info' ? 'Reminder' : type}
                </h4>
                <p className="text-sm text-gray-300">{message}</p>
              </div>
              <button 
                onClick={() => removeNotification(id)}
                className="text-gray-500 hover:text-white transition-colors"
              >
                &times;
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </NotificationContext.Provider>
  );
};
