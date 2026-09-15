"use client";
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X, Film, Clock, ChevronLeft, ChevronRight } from 'lucide-react';

export default function DocumentarySeries() {
  const [activeEpisode, setActiveEpisode] = useState(null);
  const scrollRef = useRef(null);

  const episodes = [
    {
      id: 1,
      videoUrl: "https://www.youtube.com/embed/vV77Gf9s948",
      type: "youtube",
      thumbnail: "/images/doc_thumb_1.png",
      episodeNumber: "01",
      title: "The Vision & Heritage",
      duration: "2:30",
      description: "How our founder transitioned from traditional family cooking to building Thrissur's premier dining destination."
    },
    {
      id: 2,
      videoUrl: "https://www.youtube.com/embed/Vz2y34pW4uU",
      type: "youtube",
      thumbnail: "/images/doc_thumb_2.png",
      episodeNumber: "02",
      title: "Mastering the Spices",
      duration: "3:15",
      description: "A deep dive into our spice-selection process, highlighting our partnership with local micro-farms."
    },
    {
      id: 3,
      videoUrl: "https://www.youtube.com/embed/t5A1PZ1a33c",
      type: "youtube",
      thumbnail: "/images/doc_thumb_3.png",
      episodeNumber: "03",
      title: "Sourcing Local Ingredients",
      duration: "4:05",
      description: "Follow us to the early morning markets to source fresh seafood, vegetables, and authentic A2 dairy."
    },
    {
      id: 4,
      videoUrl: "/video/kanary%20web%20v2.mp4",
      type: "local",
      thumbnail: "/images/doc_thumb_4.png",
      episodeNumber: "04",
      title: "The Art of Slow Cooking",
      duration: "1:45",
      description: "Unveiling the traditional techniques behind our 24-hour slow-cooked signature meat and seafood curries."
    },
    {
      id: 5,
      videoUrl: "/video/kanary%20web%20v3.mp4",
      type: "local",
      thumbnail: "/images/doc_thumb_5.png",
      episodeNumber: "05",
      title: "Crafting Signature Flavors",
      duration: "2:00",
      description: "Master Chef reveals the secrets behind Kanary's famous Sizzling Garlic Prawns and Fish Curry."
    },
    {
      id: 6,
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      type: "youtube",
      thumbnail: "/images/doc_thumb_6.png",
      episodeNumber: "06",
      title: "The Kitchen Crew's Heartbeat",
      duration: "3:32",
      description: "Meet the hard-working kitchen brigade who maintain the strict standard of hygiene and culinary excellence."
    }
  ];

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      // Scroll by card width + gap (card is 380px on desktop + 24px gap = 404px; 300px + 24px = 324px on mobile)
      const scrollDistance = clientWidth < 640 ? 324 : 404;
      const scrollTo = direction === 'left' 
        ? scrollLeft - scrollDistance 
        : scrollLeft + scrollDistance;
      
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <section id="documentary" className="py-24 bg-[#08090C] relative overflow-hidden border-t border-b border-white/5">
      {/* Decorative background vectors */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-gold/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-gold/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs font-semibold uppercase tracking-widest">
              <Film className="w-3.5 h-3.5" />
              Our Story In Motion
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Founder's <span className="gold-gradient-text">Documentary Series</span>
            </h2>
            <p className="font-sans text-gray-400 text-sm max-w-xl leading-relaxed">
              Go behind the scenes of Kanary Group. Watch our journey, from our humble beginnings to standardizing state-of-the-art kitchens and local gourmet spaces.
            </p>
          </div>
          
          {/* Navigation Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scroll('left')}
              className="w-12 h-12 rounded-full border border-gold/20 hover:border-gold text-gold hover:bg-gold hover:text-primary-dark flex items-center justify-center transition-all duration-300 cursor-pointer shadow-lg bg-primary-dark/60 backdrop-blur-sm"
              aria-label="Previous video"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-12 h-12 rounded-full border border-gold/20 hover:border-gold text-gold hover:bg-gold hover:text-primary-dark flex items-center justify-center transition-all duration-300 cursor-pointer shadow-lg bg-primary-dark/60 backdrop-blur-sm"
              aria-label="Next video"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Video Card Slider */}
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto scroll-smooth scrollbar-none gap-6 pb-8 px-4 -mx-4"
        >
          {episodes.map((episode, index) => (
            <motion.div
              key={episode.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="w-[300px] sm:w-[380px] flex-shrink-0 bg-primary-dark/40 border border-white/5 hover:border-gold/30 rounded-2xl overflow-hidden shadow-xl hover:shadow-[0_10px_30px_rgba(212,175,55,0.05)] transition-all duration-300 flex flex-col group cursor-pointer"
              onClick={() => setActiveEpisode(episode)}
            >
              {/* Thumbnail Container */}
              <div className="relative aspect-video w-full overflow-hidden bg-black flex-shrink-0">
                {/* Local Thumbnail Image */}
                <img
                  src={episode.thumbnail}
                  alt={episode.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                
                {/* Glassmorphic Play Overlay */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-gold/10 border border-gold/30 group-hover:bg-gold group-hover:text-primary-dark text-gold flex items-center justify-center transition-all duration-300 shadow-md">
                    <Play className="w-6 h-6 fill-current ml-0.5" />
                  </div>
                </div>

                {/* Duration Badge */}
                <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded bg-black/75 text-[10px] font-bold text-gray-200 tracking-wider">
                  <Clock className="w-3 h-3 text-gold" />
                  {episode.duration}
                </div>

                {/* Episode Badge */}
                <div className="absolute top-3 left-3 px-3 py-1 rounded-md bg-gold text-primary-dark font-sans font-bold text-xs uppercase tracking-wider">
                  EP {episode.episodeNumber}
                </div>
              </div>

              {/* Text details */}
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="font-serif text-xl font-bold text-white group-hover:text-gold transition-colors duration-300">
                    {episode.title}
                  </h3>
                  <p className="font-sans text-gray-400 text-xs sm:text-sm leading-relaxed">
                    {episode.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Full Screen Video Lightbox Modal */}
      <AnimatePresence>
        {activeEpisode && (
          <motion.div
            className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop click to close */}
            <div className="absolute inset-0 cursor-pointer" onClick={() => setActiveEpisode(null)} />

            {/* Video Container */}
            <motion.div
              className="relative w-full max-w-4xl bg-black rounded-3xl overflow-hidden border border-gold/30 shadow-2xl z-10"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveEpisode(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-gold hover:text-primary-dark text-gold border border-gold/20 flex items-center justify-center transition-all duration-300 cursor-pointer"
                aria-label="Close video player"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Hybrid Video Player */}
              <div className="aspect-video w-full bg-black">
                {activeEpisode.type === "youtube" ? (
                  <iframe
                    className="w-full h-full object-contain"
                    src={`${activeEpisode.videoUrl}?autoplay=1&rel=0`}
                    title={activeEpisode.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <video
                    autoPlay
                    controls
                    playsInline
                    className="w-full h-full object-contain"
                  >
                    <source src={activeEpisode.videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
