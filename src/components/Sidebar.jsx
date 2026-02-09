import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Moon, Gamepad2, Map, User, Bell } from 'lucide-react';
import { motion } from 'framer-motion';

const SidebarItem = ({ to, icon: Icon, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) => `
      relative flex items-center gap-4 px-6 py-4 transition-all duration-300
      ${isActive ? 'text-white' : 'text-gray-500 hover:text-gray-300'}
    `}
  >
    {({ isActive }) => (
      <>
        {isActive && (
          <motion.div
            layoutId="active-pill"
            className="absolute inset-0 bg-white/5 border-r-2 border-cyan-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
        <Icon size={24} className={isActive ? 'text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]' : ''} />
        <span className="font-medium text-sm tracking-wide">{label}</span>
      </>
    )}
  </NavLink>
);

export const Sidebar = () => {
  return (
    <div className="w-64 h-screen border-r border-white/5 backdrop-blur-xl bg-black/40 flex flex-col fixed left-0 top-0 z-50">
      <div className="p-8">
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
          VitaFlow
        </h1>
      </div>

      <nav className="flex-1 space-y-2 mt-4">
        <SidebarItem to="/dashboard" icon={LayoutDashboard} label="Dashboard" />
        <SidebarItem to="/relax" icon={Moon} label="Relax & Breathe" />
        <SidebarItem to="/games" icon={Gamepad2} label="Games" />
        <SidebarItem to="/journey" icon={Map} label="My Journey" />
      </nav>

      <div className="p-6 border-t border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center text-sm font-bold">
            VN
          </div>
          <div>
            <p className="text-sm font-medium text-white">Vedant N.</p>
            <p className="text-xs text-gray-500">Premium User</p>
          </div>
        </div>
      </div>
    </div>
  );
};
