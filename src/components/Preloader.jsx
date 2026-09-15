"use client";
import { motion } from 'framer-motion';

export default function Preloader() {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0a0a0a]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      {/* Animated Glowing Ambient Background */}
      <div className="absolute w-[350px] h-[350px] bg-gold/10 rounded-full blur-[80px] pointer-events-none animate-pulse" />

      <div className="relative flex flex-col items-center justify-center space-y-8 z-10">
        
        {/* Spinner Container */}
        <div className="relative w-24 h-24 flex items-center justify-center">
          {/* Double Spinning Rings */}
          <motion.div
            className="absolute inset-0 rounded-full border-t-2 border-r-2 border-gold/80"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
          />
          <motion.div
            className="absolute w-20 h-20 rounded-full border-b-2 border-l-2 border-gold/40"
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'linear' }}
          />

          {/* Center Glowing Gold Core */}
          <div className="w-4 h-4 rounded-full bg-gold shadow-[0_0_15px_#d4af37] animate-pulse" />
        </div>

        {/* Restaurant Name */}
        <div className="text-center space-y-1">
          <motion.h1 
            className="font-serif text-3xl sm:text-4xl font-bold tracking-wide text-white"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            KANARY
          </motion.h1>
          <motion.span 
            className="font-sans text-xs font-bold tracking-[0.25em] text-gold uppercase block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            GROUP OF RESTAURANTS
          </motion.span>
        </div>

      </div>
    </motion.div>
  );
}
