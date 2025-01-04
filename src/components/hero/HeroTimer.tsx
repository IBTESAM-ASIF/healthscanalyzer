import { useState, useEffect } from "react";
import { Zap } from "lucide-react";
import { motion } from "framer-motion";

export const HeroTimer = () => {
  const [timeLeft, setTimeLeft] = useState('10:00');

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();
      const nextCycleMinutes = 10 - (minutes % 10);
      const nextCycleSeconds = 60 - seconds;
      
      if (nextCycleMinutes === 10 && nextCycleSeconds === 60) {
        setTimeLeft('10:00');
      } else {
        const displayMinutes = nextCycleMinutes - (nextCycleSeconds === 60 ? 0 : 1);
        const displaySeconds = nextCycleSeconds === 60 ? 0 : nextCycleSeconds;
        setTimeLeft(`${displayMinutes}:${displaySeconds.toString().padStart(2, '0')}`);
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-purple-200/70 text-sm mt-6 glass-effect px-4 sm:px-6 py-2 rounded-full inline-flex items-center gap-2"
    >
      <Zap className="w-4 h-4 text-primary animate-pulse" />
      <span className="font-medium">Next analysis in: </span>
      <span className="text-primary font-mono">{timeLeft}</span>
    </motion.div>
  );
};