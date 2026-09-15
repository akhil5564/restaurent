"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(null);

  const images = [
    {
      src: '/images/dish_fish_curry.png',
      title: 'Kerala Fish Curry',
      tag: 'Signature Main Course',
      desc: 'Cooked slowly in traditional clay pots with kudampuli and fresh coconut.'
    },
    {
      src: '/images/parallax_img.jpeg',
      title: 'Warm Ambience',
      tag: 'Fine Dining Room',
      desc: 'Elegant forest green decor, custom gold fixtures, and cozy booth seating.'
    },
    {
      src: '/images/dish_butter_chicken.png',
      title: 'Butter Chicken',
      tag: 'Tandoori Special',
      desc: 'Creamy tomato-butter gravy with marinated roasted chicken chunks.'
    },
    {
      src: '/images/dish_garlic_prawns.png',
      title: 'Garlic Prawns',
      tag: 'Gourmet Starter',
      desc: 'Sizzling prawns cooked in white butter, herbs, and caramelized garlic.'
    },
    {
      src: '/images/about_img.jpeg',
      title: 'Dining Experience',
      tag: 'Family & Friends',
      desc: 'Sharing smiles and authentic food in a welcoming, luxurious environment.'
    },
    {
      src: '/images/dish_brownie.png',
      title: 'Chocolate Brownie',
      tag: 'Decadent Dessert',
      desc: 'Warm fudge brownie topped with rich chocolate sauce and vanilla ice cream.'
    }
  ];

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setSelectedImage(images[index]);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    setCurrentIndex(null);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    const nextIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(nextIndex);
    setSelectedImage(images[nextIndex]);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    setCurrentIndex(prevIndex);
    setSelectedImage(images[prevIndex]);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedImage) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') handleNext(e);
      if (e.key === 'ArrowLeft') handlePrev(e);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, selectedImage]);

  return (
    <section id="gallery" className="py-24 bg-primary-bg relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-gold font-sans font-semibold tracking-widest text-sm uppercase block">VISUAL JOURNEY</span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Kanary Restaurant Gallery
          </h2>
          <div className="w-20 h-1 bg-gold mx-auto" />
          <p className="text-gray-300 font-sans text-sm sm:text-base">
            Take a visual tour of our culinary creations, elegant interiors, and the warm, inviting atmosphere that awaits you.
          </p>
        </div>

        {/* Gallery Grid (6 Images) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => openLightbox(index)}
              className="group relative h-80 rounded-2xl overflow-hidden border border-gold/15 cursor-pointer shadow-lg bg-primary-dark"
            >
              {/* Image */}
              <img
                src={img.src}
                alt={img.title}
                className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-700"
              />

              {/* Dark Ambient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary-bg via-primary-bg/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

              {/* Hover content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                <div className="glass-panel p-4 rounded-xl border border-gold/20 shadow-lg">
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-gold font-sans text-[10px] tracking-wider font-bold uppercase">
                      {img.tag}
                    </span>
                    <Maximize2 className="w-4 h-4 text-gold/70" />
                  </div>
                  <h4 className="font-serif text-white text-lg font-bold">
                    {img.title}
                  </h4>
                  <p className="text-gray-300 text-xs mt-1 leading-relaxed">
                    {img.desc}
                  </p>
                </div>
              </div>

              {/* Subtle hover icon indicators */}
              <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-primary-dark/80 border border-gold/20 flex items-center justify-center opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                <Maximize2 className="w-4 h-4 text-gold" />
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-gold hover:text-primary-dark text-white flex items-center justify-center transition-all duration-300 border border-white/10 cursor-pointer"
              aria-label="Close Lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation buttons */}
            <button
              onClick={handlePrev}
              className="absolute left-6 w-12 h-12 rounded-full bg-white/5 hover:bg-gold hover:text-primary-dark text-white flex items-center justify-center transition-all duration-300 border border-white/5 cursor-pointer"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-6 w-12 h-12 rounded-full bg-white/5 hover:bg-gold hover:text-primary-dark text-white flex items-center justify-center transition-all duration-300 border border-white/5 cursor-pointer"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Lightbox Content Container */}
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-4xl w-full flex flex-col items-center gap-4"
            >
              <div className="relative w-full max-h-[70vh] rounded-2xl overflow-hidden border border-gold/30 shadow-2xl bg-primary-dark">
                <img
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  className="w-full h-full max-h-[70vh] object-contain mx-auto"
                />
              </div>

              {/* Info panel */}
              <div className="text-center max-w-2xl px-4">
                <span className="text-gold font-sans text-xs tracking-widest font-bold uppercase block mb-1">
                  {selectedImage.tag}
                </span>
                <h3 className="font-serif text-white text-2xl font-bold">
                  {selectedImage.title}
                </h3>
                <p className="text-gray-400 text-sm mt-2 leading-relaxed">
                  {selectedImage.desc}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
