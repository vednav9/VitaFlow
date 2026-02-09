import { motion } from "framer-motion";

export const Button = ({
  children,
  onClick,
  className = "",
  variant = "primary",
}) => {
  const baseStyle =
    "px-8 py-3 rounded-full font-semibold transition-all duration-300 transform flex items-center justify-center gap-2";
  const variants = {
    primary:
      "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-400 hover:via-purple-400 hover:to-pink-400 text-white shadow-lg shadow-purple-500/30",
    outline:
      "border border-white/20 hover:bg-white/10 text-white backdrop-blur-sm",
    glow: "bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${baseStyle} ${variants[variant]} ${className}`}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
};
