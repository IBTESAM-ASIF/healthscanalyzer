import { Sparkles, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";

export const TokenLaunch = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-2xl mx-auto mt-8 p-4"
    >
      <div className="glass-effect border border-purple-500/20 rounded-xl p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-purple-500/10 animate-pulse-slow" />
        
        <div className="relative z-10">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-primary animate-pulse" />
            <span className="text-lg font-semibold text-primary">$HEALTH Token Launch!</span>
            <Sparkles className="w-5 h-5 text-primary animate-pulse" />
          </div>
          
          <p className="text-purple-200/90 text-center mb-6">
            The $HEALTH token is now live! Power our AI-driven food analysis system and be part of the future of consumer safety.
          </p>
          
          <div className="flex justify-center gap-4">
            <Button
              variant="default"
              className="bg-primary/90 hover:bg-primary group transition-all duration-300"
              onClick={() => window.open("https://pump.fun/coin/6X7fYP74DFsu3tj5oB4j8okBbLoDevZ2twXp3gNhpump", "_blank")}
            >
              <span>Buy $HEALTH</span>
              <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button
              variant="outline"
              className="border-primary/20 hover:border-primary/40 group"
              onClick={() => window.open("https://www.healthscanalyzer.com/", "_blank")}
            >
              <span>Visit Website</span>
              <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};