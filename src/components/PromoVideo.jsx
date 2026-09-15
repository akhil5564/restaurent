"use client";
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, animate } from 'framer-motion';
import { Play, X, Utensils, ChefHat, Users } from 'lucide-react';

function AnimatedCounter({ value, suffix }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, value, {
        duration: 2,
        ease: "easeOut",
        onUpdate: (latest) => {
          setCount(Math.floor(latest));
        },
      });
      return () => controls.stop();
    }
  }, [isInView, value]);

  return (
    <span ref={ref} className="font-sans text-4xl sm:text-5xl font-light text-white tracking-wide group-hover:text-gold transition-colors duration-300">
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export default function PromoVideo() {
  const [isOpen, setIsOpen] = useState(false);

  const stats = [
    {
      id: 1,
      count: 1500,
      suffix: '+',
      label: 'Daily Orders',
      icon: Utensils,
    },
    {
      id: 2,
      count: 30,
      suffix: '+',
      label: 'Special Foods',
      icon: ChefHat,
    },
    {
      id: 4,
      count: 15,
      suffix: '+',
      label: 'Expert Chefs',
      icon: Users,
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-primary-bg border-t border-white/5">
      {/* Ambient luxury light glow behind play button */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-gold/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Header */}
        <div className="max-w-2xl mx-auto mb-10 space-y-3">
          <span className="text-gold font-sans font-semibold tracking-widest text-sm uppercase block">
            EXPERIENCE KANARY
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
            A Culinary Journey of <span className="gold-gradient-text">Pure Senses</span>
          </h2>
          <p className="font-sans text-gray-400 text-sm max-w-lg mx-auto leading-relaxed">
            Take a virtual tour of our kitchen and dining hall. Watch our master chefs craft traditional Kerala delicacies and international masterpieces.
          </p>
        </div>

        {/* Pulsing Play Button Only */}
        <div className="flex flex-col items-center justify-center">
          <div className="relative flex items-center justify-center cursor-pointer" onClick={() => setIsOpen(true)}>
            {/* Double pulsing rings */}
            <div className="absolute w-28 h-28 rounded-full bg-gold/10 animate-ping opacity-75" />
            <div className="absolute w-20 h-20 rounded-full bg-gold/25 animate-pulse" />
            
            {/* Main Play Button */}
            <motion.button
              className="relative w-16 h-16 rounded-full bg-gold text-primary-dark flex items-center justify-center shadow-lg border border-gold/50 cursor-pointer"
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
            >
              <Play className="w-6 h-6 fill-primary-dark ml-1" />
            </motion.button>
          </div>
          
          <span className="text-gold font-sans text-xs uppercase tracking-widest mt-4 opacity-80">
            Play Promo Video
          </span>

          {/* Center vertical print-style line divider */}
          <div className="w-[1px] h-20 bg-gradient-to-b from-gold/60 via-gold/30 to-transparent my-8" />
        </div>

        {/* Minimalist Stats Counters */}
        <div className="grid grid-cols-3 gap-4 md:gap-8 items-center justify-center max-w-3xl mx-auto">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={stat.id} className="relative flex flex-col items-center justify-center space-y-2 group">
                {/* Stats Value */}
                <AnimatedCounter value={stat.count} suffix={stat.suffix} />
                
                {/* Icon & Label */}
                <div className="flex items-center gap-1.5 justify-center">
                  <Icon className="w-3.5 h-3.5 text-gold/75" />
                  <span className="font-sans text-gray-400 font-bold text-xs tracking-wider uppercase">
                    {stat.label}
                  </span>
                </div>

                {/* Vertical Divider line on Desktop (except last item) */}
                {index < stats.length - 1 && (
                  <div className="hidden md:block absolute -right-2 md:-right-4 top-1/2 -translate-y-1/2 w-[1px] h-10 bg-gold/20" />
                )}
              </div>
            );
          })}
        </div>

      </div>

      {/* Video Lightbox Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Close handler on backdrop click */}
            <div className="absolute inset-0 cursor-pointer" onClick={() => setIsOpen(false)} />

            {/* Video Container */}
            <motion.div 
              className="relative w-full max-w-4xl bg-primary-dark rounded-3xl overflow-hidden border border-gold/30 shadow-2xl z-10"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-gold hover:text-primary-dark text-gold border border-gold/20 flex items-center justify-center transition-all duration-300 cursor-pointer"
                aria-label="Close video player"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Video Player */}
              <div className="aspect-video w-full bg-black">
                <video 
                  autoPlay 
                  controls 
                  playsInline
                  className="w-full h-full object-contain"
                >
                  <source src="/video/hero_bg.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
