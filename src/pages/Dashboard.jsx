import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';
import { Sidebar } from '../components/Sidebar';
import { Button } from '../components/ui/Button';
import {
  Activity,
  Moon,
  Zap,
  Flame,
  MessageSquare,
  Search,
  Bell,
  Smartphone,
  Droplets,
  Trophy,
  Target,
  ChevronRight,
  Plus,
} from 'lucide-react';
import metrics from '../data/metrics.json';
import tips from '../data/tips.json';

const GlassCard = ({ children, className = '', delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    className={`glass-card relative overflow-hidden p-6 hover:border-white/20 hover:shadow-cyan-500/10 ${className}`}
  >
    {children}
  </motion.div>
);

const StatCard = ({ title, value, subtext, icon: Icon, color, delay }) => (
  <GlassCard delay={delay} className="group">
    <div
      className={`absolute right-0 top-0 p-4 opacity-5 transition-transform duration-500 group-hover:scale-110 group-hover:opacity-10 ${color}`}
    >
      <Icon size={100} />
    </div>

    <div className="relative z-10">
      <div className={`mb-4 flex items-center gap-3 ${color}`}>
        <div className="rounded-xl bg-white/5 p-2 ring-1 ring-white/10 backdrop-blur-sm">
          <Icon size={24} />
        </div>
        <h3 className="font-medium text-gray-300">{title}</h3>
      </div>

      <div className="flex items-baseline gap-2">
        <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-4xl font-bold tracking-tight text-transparent">
          {value}
        </span>
        <span className="text-sm font-medium text-gray-500">{subtext}</span>
      </div>
    </div>
  </GlassCard>
);

const ChartCard = ({ title, children, delay, className = '' }) => (
  <GlassCard delay={delay} className={`flex flex-col ${className}`}>
    <div className="mb-6 flex items-center justify-between">
      <h3 className="text-lg font-medium text-gray-200">{title}</h3>
      <Button variant="ghost" size="sm" className="h-8 w-8 rounded-full p-0">
        <ChevronRight size={16} className="text-gray-400" />
      </Button>
    </div>
    <div className="relative z-10 w-full flex-1">{children}</div>
  </GlassCard>
);

const CoachWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'ai',
      text: 'Hello Alex! I noticed your sleep was a bit short last night. Try a 10-min meditation from the Relax tab.',
    },
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: 'user', text: input }]);
    setInput('');
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: 'ai',
          text: 'That sounds like a great plan. Hydration is key too!',
        },
      ]);
    }, 1000);
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 z-50 flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-gradient-to-r from-cyan-500 to-blue-600 shadow-lg transition-all hover:shadow-cyan-500/50"
      >
        <MessageSquare className="text-white" size={28} />
      </motion.button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          className="glass-card fixed bottom-28 right-8 z-50 flex h-[500px] w-96 flex-col overflow-hidden border border-white/20 shadow-2xl backdrop-blur-xl"
        >
          <div className="flex items-center justify-between border-b border-white/10 bg-white/5 p-4">
            <h3 className="flex items-center gap-2 font-bold text-white">
              <span className="h-2 w-2 animate-pulse rounded-full bg-green-400"></span>
              VitaCoach AI
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white"
            >
              &times;
            </button>
          </div>

          <div className="scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10 flex-1 space-y-4 overflow-y-auto p-4">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl p-3 text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'rounded-br-none bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg'
                      : 'rounded-bl-none border border-white/5 bg-white/10 text-gray-200'
                  } `}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-white/10 bg-white/5 p-4">
            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask for advice..."
                className="w-full rounded-full border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder-gray-500 transition-colors focus:border-cyan-500/50 focus:outline-none"
              />
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default function Dashboard() {
  const [data, setData] = useState(metrics);
  const [hydration, setHydration] = useState(metrics.hydration.current);
  const [moodValue, setMoodValue] = useState(80);
  const [tip, setTip] = useState(tips[0]);

  useEffect(() => {
    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    setTip(randomTip);
  }, []);

  const addWater = () => {
    setHydration((prev) => Math.min(prev + 250, data.hydration.target));
  };

  return (
    <div className="relative flex h-screen overflow-hidden bg-black font-sans text-gray-100">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/40 via-black to-black" />

      <Sidebar />

      <main className="relative z-10 ml-64 h-full w-full flex-1 overflow-y-auto scroll-smooth p-8">
        {/* Header */}
        <header className="mb-10 flex items-center justify-between">
          <div>
            <h1 className="mb-1 text-3xl font-bold text-white">
              Welcome back,{' '}
              <span className="animate-pulse-slow bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                {data.user}
              </span>
            </h1>
            <p className="flex items-center gap-2 text-sm text-gray-400">
              <Zap size={14} className="text-yellow-400" />
              {data.streak} Day Streak! Keep it up.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="group relative">
              <input
                type="text"
                placeholder="Search metrics..."
                className="w-64 rounded-full border border-white/10 bg-white/5 py-2 pl-10 pr-4 text-sm text-white transition-all focus:w-72 focus:border-cyan-500/50 focus:bg-white/10 focus:outline-none"
              />
              <Search
                className="absolute left-3 top-2.5 text-gray-500 transition-colors group-focus-within:text-cyan-400"
                size={16}
              />
            </div>
            <button className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-400 transition-colors hover:border-cyan-500/50 hover:bg-white/10 hover:text-cyan-400">
              <Bell size={20} />
              <span className="absolute right-2 top-2 h-2 w-2 animate-pulse rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]"></span>
            </button>
            <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-white/10 bg-gradient-to-br from-cyan-500 to-purple-600 p-0.5">
              <div className="h-full w-full rounded-full bg-black/50 backdrop-blur-sm" />
            </div>
          </div>
        </header>

        {/* Bento Grid Layout */}
        <div className="grid auto-rows-min grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Health Score - Large Card */}
          <GlassCard
            delay={0.1}
            className="col-span-1 row-span-2 flex flex-col items-center justify-center bg-gradient-to-b from-white/5 to-transparent"
          >
            <div className="relative mb-6 flex h-48 w-48 items-center justify-center">
              {/* Outer Glow */}
              <div className="absolute inset-0 animate-pulse-slow rounded-full bg-emerald-500/20 blur-3xl" />

              {/* SVG Progress Ring */}
              <svg className="h-full w-full -rotate-90 transform">
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="currentColor"
                  strokeWidth="12"
                  fill="transparent"
                  className="text-white/5"
                />
                <motion.circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="url(#scoreGradient)"
                  strokeWidth="12"
                  fill="transparent"
                  strokeLinecap="round"
                  strokeDasharray="552"
                  initial={{ strokeDashoffset: 552 }}
                  animate={{ strokeDashoffset: 552 - (552 * data.score) / 100 }}
                  transition={{ duration: 2, ease: 'easeOut' }}
                />
                <defs>
                  <linearGradient
                    id="scoreGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#34d399" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-5xl font-bold text-white">
                  {data.score}
                </span>
                <span className="text-xs uppercase tracking-widest text-emerald-400">
                  Health Score
                </span>
              </div>
            </div>
            <p className="max-w-[80%] text-center text-sm text-gray-400">
              Your vitality is in the top{' '}
              <span className="text-cyan-400">15%</span> of users this week.
            </p>
          </GlassCard>

          {/* Quick Stats */}
          <StatCard
            title="Calories Burned"
            value={data.calories.current}
            subtext={`/ ${data.calories.target}`}
            icon={Flame}
            color="text-orange-400"
            delay={0.2}
          />
          <StatCard
            title="Sleep Duration"
            value="7.5"
            subtext="hours"
            icon={Moon}
            color="text-indigo-400"
            delay={0.3}
          />
          <GlassCard delay={0.4} className="group relative overflow-hidden">
            <div className="absolute -right-6 -top-6 h-32 w-32 rounded-full bg-blue-500/20 blur-2xl transition-all group-hover:bg-blue-500/30" />
            <div className="mb-4 flex items-start justify-between">
              <div className="flex items-center gap-3 text-blue-400">
                <div className="rounded-xl bg-blue-500/20 p-2">
                  <Droplets size={24} />
                </div>
                <h3 className="font-medium text-gray-300">Hydration</h3>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={addWater}
                className="h-8 w-8 rounded-full bg-blue-500/20 text-blue-400 hover:bg-blue-500/40"
              >
                <Plus size={16} />
              </Button>
            </div>
            <div className="mb-2 flex items-end justify-between">
              <span className="text-4xl font-bold text-white">{hydration}</span>
              <span className="text-sm font-medium text-gray-500">
                / {data.hydration.target} ml
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-600 to-cyan-400"
                initial={{ width: 0 }}
                animate={{
                  width: `${(hydration / data.hydration.target) * 100}%`,
                }}
                transition={{ type: 'spring', stiffness: 50 }}
              />
            </div>
          </GlassCard>

          {/* Activity & Screen Time */}
          <StatCard
            title="Active Minutes"
            value={data.activity.activeMinutes}
            subtext="min"
            icon={Zap}
            color="text-yellow-400"
            delay={0.5}
          />
          <StatCard
            title="Screen Time"
            value={data.screenTime.hours}
            subtext="hrs"
            icon={Smartphone}
            color="text-purple-400"
            delay={0.6}
          />

          {/* Charts Row */}
          <ChartCard
            title="Sleep Trends"
            delay={0.7}
            className="col-span-1 h-[320px] md:col-span-2"
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.sleep}>
                <defs>
                  <linearGradient id="colorSleep" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#818cf8" stopOpacity={0.5} />
                    <stop offset="95%" stopColor="#818cf8" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="day"
                  stroke="#525252"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#000',
                    border: '1px solid #333',
                    borderRadius: '12px',
                    boxShadow: '0 10px 30px -10px rgba(0,0,0,0.5)',
                  }}
                  itemStyle={{ color: '#fff' }}
                  cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 2 }}
                />
                <Area
                  type="monotone"
                  dataKey="hours"
                  stroke="#818cf8"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorSleep)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard
            title="Stress Analysis"
            delay={0.8}
            className="col-span-1 h-[320px] md:col-span-2"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.stress}>
                <XAxis
                  dataKey="day"
                  stroke="#525252"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#000',
                    border: '1px solid #333',
                    borderRadius: '12px',
                  }}
                  itemStyle={{ color: '#fff' }}
                />
                <Line
                  type="monotone"
                  dataKey="level"
                  stroke="#fb7185"
                  strokeWidth={3}
                  dot={{
                    r: 4,
                    fill: '#000',
                    stroke: '#fb7185',
                    strokeWidth: 2,
                  }}
                  activeDot={{ r: 8, strokeWidth: 0, fill: '#fff' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Bottom Row - Detox, Mood, Milestones */}
          <GlassCard
            delay={0.9}
            className="flex flex-col items-center justify-center"
          >
            <h3 className="mb-4 w-full text-left font-medium text-gray-300">
              Detox Tracker
            </h3>
            <div className="relative">
              <svg className="h-40 w-40 -rotate-90">
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  stroke="#333"
                  strokeWidth="8"
                  fill="transparent"
                />
                <motion.circle
                  cx="80"
                  cy="80"
                  r="70"
                  stroke="#22d3ee"
                  strokeWidth="8"
                  fill="transparent"
                  strokeLinecap="round"
                  strokeDasharray="440"
                  initial={{ strokeDashoffset: 440 }}
                  animate={{
                    strokeDashoffset:
                      440 - (440 * data.detox.daysLeft) / data.detox.total,
                  }}
                  transition={{ duration: 1.5, delay: 1 }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-white">
                  {data.detox.daysLeft}
                </span>
                <span className="text-xs uppercase text-gray-400">
                  Days Left
                </span>
              </div>
            </div>
          </GlassCard>

          <GlassCard delay={1.0} className="flex flex-col">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-medium text-gray-300">Mood Check-in</h3>
              <span
                className={`text-sm font-bold ${
                  moodValue > 75
                    ? 'text-green-400'
                    : moodValue > 50
                      ? 'text-yellow-400'
                      : 'text-red-400'
                }`}
              >
                {moodValue}%
              </span>
            </div>
            <div className="flex flex-1 flex-col items-center justify-center gap-6">
              <motion.div
                key={moodValue}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-7xl drop-shadow-lg filter"
              >
                {moodValue > 75
                  ? '🤩'
                  : moodValue > 50
                    ? '🙂'
                    : moodValue > 25
                      ? '😐'
                      : '😔'}
              </motion.div>
              <input
                type="range"
                min="0"
                max="100"
                value={moodValue}
                onChange={(e) => setMoodValue(parseInt(e.target.value))}
                className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-white/10 accent-cyan-400"
              />
            </div>
          </GlassCard>

          <GlassCard
            delay={1.1}
            className="col-span-1 border-purple-500/30 bg-gradient-to-br from-indigo-900/40 to-purple-900/40 md:col-span-2"
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="flex items-center gap-2 font-medium text-white">
                <Target size={18} className="text-purple-400" />
                Milestones
              </h3>
              <span className="rounded-full bg-purple-500/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-purple-300">
                {data.milestones.filter((m) => m.completed).length} /{' '}
                {data.milestones.length}
              </span>
            </div>
            <div className="space-y-3">
              {data.milestones.slice(0, 3).map((milestone) => (
                <div
                  key={milestone.id}
                  className="flex items-center gap-3 rounded-lg bg-white/5 p-3 transition-colors hover:bg-white/10"
                >
                  <div
                    className={`flex h-6 w-6 items-center justify-center rounded-full border ${
                      milestone.completed
                        ? 'border-green-500 bg-green-500/20 text-green-400'
                        : 'border-gray-600 bg-transparent text-gray-600'
                    }`}
                  >
                    {milestone.completed && <Trophy size={12} />}
                  </div>
                  <span
                    className={`text-sm ${milestone.completed ? 'text-gray-200 line-through opacity-50' : 'text-white'}`}
                  >
                    {milestone.label}
                  </span>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        <CoachWidget />
      </main>
    </div>
  );
}