"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, ExternalLink, X, Flame } from 'lucide-react';

export default function ShortsSection() {
  const [activeModalVideo, setActiveModalVideo] = useState(null);

  const shorts = [
    {
      id: "5sv3Q0GbLXU",
      title: "Sizzling Culinary Craft",
      tag: "Chef's Special",
      shortUrl: "https://youtube.com/shorts/5sv3Q0GbLXU?feature=share",
      embedUrl: "https://www.youtube.com/embed/5sv3Q0GbLXU"
    },
    {
      id: "YBvq0ug5he0",
      title: "Traditional Kerala Flavors",
      tag: "Authentic Taste",
      shortUrl: "https://youtube.com/shorts/YBvq0ug5he0?feature=share",
      embedUrl: "https://www.youtube.com/embed/YBvq0ug5he0"
    },
    {
      id: "RNF8jTSFEQg",
      title: "Fresh Gourmet Delight",
      tag: "Signature Dish",
      shortUrl: "https://youtube.com/shorts/RNF8jTSFEQg?feature=share",
      embedUrl: "https://www.youtube.com/embed/RNF8jTSFEQg"
    },
    {
      id: "N10f7lSLuHw",
      title: "Chef's Special Creation",
      tag: "Must Try",
      shortUrl: "https://youtube.com/shorts/N10f7lSLuHw?feature=share",
      embedUrl: "https://www.youtube.com/embed/N10f7lSLuHw"
    }
  ];

  return (
    <section id="shorts" className="py-24 bg-[#0B0C10] relative overflow-hidden border-t border-white/5">
      {/* Ambient background glows */}
      <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-gold/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-red-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs font-semibold uppercase tracking-widest"
          >
            <Flame className="w-4 h-4 text-gold animate-pulse" />
            <span>Kanary Shorts</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight"
          >
            Watch Our <span className="gold-gradient-text">Kitchen In Action</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-sans text-gray-400 text-sm sm:text-base leading-relaxed"
          >
            Bite-sized stories, sizzling preparations, and mouth-watering moments straight from our kitchen.
          </motion.p>
        </div>

        {/* Shorts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-7xl mx-auto">
          {shorts.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="group relative flex flex-col bg-primary-dark/60 border border-white/10 hover:border-gold/40 rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.15)]"
            >
              {/* YouTube Shorts Badge Header */}
              <div className="px-5 py-3 flex items-center justify-between bg-black/40 border-b border-white/5">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-red-500 tracking-wide uppercase">
                  <svg className="w-4 h-4 fill-red-600" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                  Shorts
                </span>
                <span className="text-[11px] font-sans font-medium text-gold bg-gold/10 px-2.5 py-0.5 rounded-full border border-gold/20">
                  {item.tag}
                </span>
              </div>

              {/* Vertical 9:16 Frame */}
              <div className="relative aspect-[9/16] w-full bg-black overflow-hidden group">
                <iframe
                  className="w-full h-full object-cover border-0"
                  src={`${item.embedUrl}?rel=0&modestbranding=1&loop=1`}
                  title={item.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>

              {/* Video Title & Actions */}
              <div className="p-5 bg-gradient-to-t from-black via-black/90 to-primary-dark/80 space-y-3 flex flex-col justify-between flex-grow">
                <h3 className="font-serif text-lg font-bold text-white group-hover:text-gold transition-colors duration-300">
                  {item.title}
                </h3>
                
                <div className="flex items-center justify-between pt-2 border-t border-white/10">
                  <button
                    onClick={() => setActiveModalVideo(item)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-gold hover:text-white transition-colors duration-200 cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    Expand Video
                  </button>

                  <a
                    href={item.shortUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-red-400 transition-colors duration-200"
                  >
                    Watch on YouTube
                    <ExternalLink className="w-3 h-3 ml-0.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Full-screen Lightbox Modal */}
      <AnimatePresence>
        {activeModalVideo && (
          <motion.div
            className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop click to close */}
            <div className="absolute inset-0 cursor-pointer" onClick={() => setActiveModalVideo(null)} />

            {/* Vertical Video Container */}
            <motion.div
              className="relative w-full max-w-sm sm:max-w-md aspect-[9/16] max-h-[85vh] bg-black rounded-3xl overflow-hidden border border-gold/30 shadow-2xl z-10"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveModalVideo(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/70 hover:bg-gold hover:text-primary-dark text-gold border border-gold/20 flex items-center justify-center transition-all duration-300 cursor-pointer shadow-lg"
                aria-label="Close video player"
              >
                <X className="w-5 h-5" />
              </button>

              <iframe
                className="w-full h-full object-cover border-0"
                src={`${activeModalVideo.embedUrl}?autoplay=1&rel=0&modestbranding=1`}
                title={activeModalVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
