"use client";
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, Flame, ArrowLeft, Utensils, Search, Sparkles, Milk, Phone, MapPin, X, HelpCircle } from 'lucide-react';
import Link from 'next/link';
import { menuData } from '../data/menuData';

// Map categories to user-friendly titles and icons
const categories = [
  { id: 'chefSpecials', name: "Chef's Specials", icon: "👑" },
  { id: 'starters', name: "Starters & Soups", icon: "🍲" },
  { id: 'mains', name: "Mains & Seafood", icon: "🍛" },
  { id: 'grills', name: "Al Faham & Grills", icon: "🍗" },
  { id: 'dosas', name: "A2 Ghee Dosas", icon: "🥞" },
  { id: 'burgers', name: "Burgers & Pizza", icon: "🍔" },
  { id: 'salads', name: "Salads & Meals", icon: "🥗" },
  { id: 'beverages', name: "Mocktails & Shakes", icon: "🥤" },
  { id: 'smoothies', name: "Juices & Smoothies", icon: "🍹" },
  { id: 'desserts', name: "Sweet Endings & Teas", icon: "🍰" },
];

export default function FullMenuPage() {
  const [activeTab, setActiveTab] = useState('chefSpecials');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all'); // all, veg, spicy, dairy
  const [isSticky, setIsSticky] = useState(false);
  const tabsRef = useRef(null);

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Track scroll position to make the tab bar sticky and update active tab
  useEffect(() => {
    const handleScroll = () => {
      if (!tabsRef.current) return;
      const tabOffset = tabsRef.current.offsetTop;
      
      // Make sticky when reaching tab offset minus header offset (typically 80px)
      setIsSticky(window.scrollY > tabOffset - 80);
      
      // Update active tab based on scroll position of sections
      const scrollPosition = window.scrollY + 220;
      
      for (const cat of categories) {
        const section = document.getElementById(cat.id);
        if (section) {
          const top = section.offsetTop;
          const height = section.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveTab(cat.id);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 140; // Height of sticky headers
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveTab(id);
    }
  };

  // Helper to filter items based on search query and selected filter type
  const getFilteredItems = (catId, categoryItems) => {
    // If it's salads category, we also merge meals items
    let items = [...categoryItems];
    if (catId === 'salads' && menuData.meals) {
      items = [...items, ...menuData.meals];
    }

    return items.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            item.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesFilter = 
        filterType === 'all' ||
        (filterType === 'veg' && item.veg) ||
        (filterType === 'spicy' && item.spicy) ||
        (filterType === 'dairy' && item.dairy);
        
      return matchesSearch && matchesFilter;
    });
  };

  return (
    <div className="pt-20 bg-primary-bg min-h-screen text-gray-200">
      
      {/* 1. Hero / Header Banner */}
      <div 
        className="relative h-[45vh] flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/interior_1.png')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-primary-dark/95 via-primary-dark/80 to-primary-bg backdrop-blur-[1px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(197,168,128,0.12),transparent_70%)]" />

        <div className="relative text-center max-w-3xl px-4 space-y-4 z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-12 h-12 rounded-full border border-gold flex items-center justify-center bg-primary-dark/60 mx-auto"
          >
            <Utensils className="w-5 h-5 text-gold" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-wide"
          >
            The Culinary Menu
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gold font-sans font-medium tracking-widest text-xs sm:text-sm uppercase"
          >
            Crafted with A2 Ghee, Traditional Heritage Spices & Modern Gastronomy
          </motion.p>
        </div>
      </div>

      {/* 2. Interactive Search & Filters Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-[-40px] relative z-20">
        <div className="glass-panel rounded-2xl p-6 shadow-2xl flex flex-col md:flex-row gap-4 items-center justify-between">
          
          {/* Search Box */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-3.5 w-4 h-4 text-gold/60" />
            <input
              type="text"
              placeholder="Search dishes (e.g. Beef, Dosa, Penne...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-primary-dark/50 border border-gold/20 rounded-full py-3 pl-12 pr-10 text-white font-sans text-sm outline-none focus:border-gold transition-all duration-300 placeholder-gray-500"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-3.5 text-gray-500 hover:text-gold transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Dietary Filters */}
          <div className="flex flex-wrap gap-2 justify-center w-full md:w-auto">
            {[
              { id: 'all', label: 'All Dishes', icon: <Sparkles className="w-3.5 h-3.5" /> },
              { id: 'veg', label: 'Vegetarian', icon: <Leaf className="w-3.5 h-3.5" />, color: 'text-green-500 border-green-500/20 bg-green-950/10' },
              { id: 'spicy', label: 'Spicy Selection', icon: <Flame className="w-3.5 h-3.5" />, color: 'text-red-500 border-red-500/20 bg-red-950/10' },
              { id: 'dairy', label: 'Dairy Rich', icon: <Milk className="w-3.5 h-3.5" />, color: 'text-blue-400 border-blue-400/20 bg-blue-950/10' }
            ].map((filter) => (
              <button
                key={filter.id}
                onClick={() => setFilterType(filter.id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold tracking-wider font-sans border transition-all duration-300 cursor-pointer ${
                  filterType === filter.id 
                    ? 'bg-gold text-primary-dark border-gold font-bold shadow-lg shadow-gold/10' 
                    : 'bg-primary-dark/30 border-gold/10 text-gray-400 hover:border-gold/30 hover:text-white'
                }`}
              >
                {filter.icon}
                {filter.label}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* 3. Sticky Category Tab Bar */}
      <div 
        ref={tabsRef}
        className={`z-30 transition-all duration-300 ${
          isSticky 
            ? 'fixed top-16 left-0 right-0 bg-primary-bg/95 backdrop-blur-md border-b border-gold/10 py-3 shadow-xl' 
            : 'mt-8 py-4'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 overflow-x-auto scrollbar-none flex gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => scrollToSection(cat.id)}
              className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-bold tracking-wider font-sans uppercase border transition-all duration-300 cursor-pointer ${
                activeTab === cat.id 
                  ? 'bg-gold/10 text-gold border-gold/40 shadow-inner' 
                  : 'bg-primary-light/50 border-transparent text-gray-400 hover:text-white hover:bg-primary-light'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 4. Menu Items Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        
        {categories.map((cat) => {
          const rawItems = menuData[cat.id] || [];
          const filteredItems = getFilteredItems(cat.id, rawItems);

          // Skip section if query yields no results
          if (filteredItems.length === 0 && searchQuery) return null;

          return (
            <section 
              id={cat.id} 
              key={cat.id} 
              className="mb-24 scroll-mt-36"
            >
              {/* Category Title */}
              <div className="flex items-center gap-4 mb-10">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{cat.icon}</span>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gold tracking-wide">
                    {cat.name}
                  </h2>
                </div>
                <div className="flex-grow border-b border-gold/10" />
                <span className="text-xs font-sans text-gray-500 tracking-widest uppercase">
                  {filteredItems.length} {filteredItems.length === 1 ? 'Dish' : 'Dishes'}
                </span>
              </div>

              {/* Grid Layout depending on Category */}
              {cat.id === 'chefSpecials' ? (
                // 👑 Chef Specials Grid (Gilded, Premium Highlight Cards)
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {filteredItems.map((item, idx) => (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.05 }}
                      whileHover={{ y: -6 }}
                      key={idx}
                      className="relative rounded-2xl p-6 glass-panel border border-gold/30 hover:border-gold/60 shadow-[0_10px_35px_-10px_rgba(197,168,128,0.08)] bg-gradient-to-br from-primary-dark/80 to-primary-light/40 overflow-hidden flex flex-col justify-between group transition-all duration-300"
                    >
                      {/* Glimmer Overlay */}
                      <div className="absolute top-0 right-0 bg-gold/10 text-gold text-[10px] font-bold tracking-widest px-3.5 py-1.5 rounded-bl-xl uppercase flex items-center gap-1 border-l border-b border-gold/20">
                        <Sparkles className="w-3 h-3 text-gold-accent" /> Signature
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between items-baseline gap-4 pr-16">
                          <h3 className="font-serif text-lg sm:text-xl font-bold text-white group-hover:text-gold transition-colors duration-200 flex items-center gap-2">
                            {item.name}
                          </h3>
                        </div>
                        
                        <p className="text-gray-400 text-sm leading-relaxed pr-4">
                          {item.description}
                        </p>
                      </div>

                      <div className="mt-6 pt-4 border-t border-gold/10 flex justify-between items-center">
                        <div className="flex gap-2">
                          {item.veg && (
                            <span className="flex items-center gap-1 text-[10px] uppercase font-bold text-green-500 bg-green-950/20 border border-green-500/20 px-2 py-0.5 rounded-full">
                              <Leaf className="w-2.5 h-2.5" /> Veg
                            </span>
                          )}
                          {!item.veg && (
                            <span className="flex items-center gap-1 text-[10px] uppercase font-bold text-red-500 bg-red-950/20 border border-red-500/20 px-2 py-0.5 rounded-full">
                              Non-Veg
                            </span>
                          )}
                          {item.spicy && (
                            <span className="flex items-center gap-1 text-[10px] uppercase font-bold text-red-400 bg-red-950/20 border border-red-400/20 px-2 py-0.5 rounded-full">
                              <Flame className="w-2.5 h-2.5" /> Spicy
                            </span>
                          )}
                          {item.dairy && (
                            <span className="flex items-center gap-1 text-[10px] uppercase font-bold text-blue-400 bg-blue-950/20 border border-blue-400/20 px-2 py-0.5 rounded-full">
                              <Milk className="w-2.5 h-2.5" /> Dairy
                            </span>
                          )}
                        </div>
                        <span className="text-gold font-sans font-bold text-xl">
                          {typeof item.price === 'number' ? `₹${item.price}` : item.price}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                // 🍽️ Standard Menu Card Layout
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                  {filteredItems.map((item, idx) => (
                    <motion.div 
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: idx * 0.02 }}
                      key={idx} 
                      className="space-y-1.5 group p-2 rounded-lg hover:bg-primary-light/20 transition-all duration-200"
                    >
                      <div className="flex items-baseline justify-between gap-4">
                        <h3 className="font-serif text-base sm:text-lg font-bold text-white group-hover:text-gold transition-colors duration-200 flex items-center flex-wrap gap-2">
                          {item.name}
                          <span className="inline-flex gap-1">
                            {item.veg && <Leaf className="w-3.5 h-3.5 text-green-500" />}
                            {item.spicy && <Flame className="w-3.5 h-3.5 text-red-500" />}
                            {item.dairy && <Milk className="w-3.5 h-3.5 text-blue-400" />}
                          </span>
                        </h3>
                        <div className="flex-grow border-b border-dotted border-gray-800 mx-2" />
                        <span className="text-gold font-sans font-bold text-base whitespace-nowrap">
                          {typeof item.price === 'number' ? `₹${item.price}` : item.price}
                        </span>
                      </div>
                      
                      {item.description && (
                        <p className="text-gray-400 text-xs sm:text-sm leading-relaxed pr-6">
                          {item.description}
                        </p>
                      )}
                    </motion.div>
                  ))}
                </div>
              )}
            </section>
          );
        })}

        {/* Empty Search Result State */}
        {searchQuery && categories.every(cat => getFilteredItems(cat.id, menuData[cat.id] || []).length === 0) && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 space-y-4"
          >
            <div className="w-16 h-16 rounded-full bg-primary-light flex items-center justify-center mx-auto border border-gold/10">
              <HelpCircle className="w-8 h-8 text-gold/60" />
            </div>
            <h3 className="font-serif text-xl font-semibold text-white">No dishes match your search</h3>
            <p className="text-gray-400 max-w-sm mx-auto text-sm">
              We couldn't find anything matching "{searchQuery}". Try searching for categories or clear the search to see all options.
            </p>
            <button 
              onClick={() => { setSearchQuery(''); setFilterType('all'); }}
              className="bg-gold hover:bg-gold-dark text-primary-dark font-sans font-bold py-2 px-6 rounded-full text-xs tracking-wider transition-all duration-300"
            >
              Clear Filters
            </button>
          </motion.div>
        )}

        {/* 5. Branch Reservations & Dining Inquiry Panel */}
        <div className="mt-24 border-t border-gold/15 pt-16">
          <div className="glass-panel rounded-3xl p-8 sm:p-12 relative overflow-hidden bg-gradient-to-r from-primary-dark to-primary-light">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(197,168,128,0.08),transparent_50%)]" />
            
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              
              <div className="lg:col-span-2 space-y-4">
                <span className="text-gold font-sans font-bold tracking-widest text-xs uppercase block">Fine Dining & Table Reservations</span>
                <h3 className="font-serif text-3xl font-bold text-white">Experience Luxury Dining</h3>
                <p className="text-gray-300 font-sans text-sm max-w-2xl leading-relaxed">
                  Call our branch desks directly to secure your table, coordinate premium group dining, or inquire about custom culinary requests at our luxury restaurant locations.
                </p>
                
                {/* Branch Contacts list */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                  {[
                    { branch: "M.G. Road", phone: "70456 71111", area: "Thrissur Town" },
                    { branch: "Ayyanthole", phone: "70456 72222", area: "Collectorate Junction" },
                    { branch: "Koorkenchery", phone: "70456 73333", area: "Elite Hospital Road" }
                  ].map((branch, idx) => (
                    <div key={idx} className="bg-primary-dark/60 p-4 rounded-xl border border-gold/10 hover:border-gold/20 transition-all">
                      <div className="flex items-center gap-2 text-gold font-serif font-bold text-sm mb-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {branch.branch}
                      </div>
                      <a href={`tel:${branch.phone.replace(/\s/g, '')}`} className="text-white hover:text-gold font-sans font-extrabold text-sm block transition-colors">
                        {branch.phone}
                      </a>
                      <span className="text-[10px] text-gray-500 block uppercase font-sans tracking-wide mt-1">
                        {branch.area}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Back to home buttons */}
              <div className="flex flex-col gap-3 w-full sm:w-auto sm:mx-auto lg:w-full items-center lg:items-end">
                <Link
                  href="/"
                  className="w-full sm:w-60 text-center bg-transparent hover:bg-gold border-2 border-gold text-gold hover:text-primary-dark font-sans font-bold py-4 px-8 rounded-full text-xs tracking-wider transition-all duration-300 shadow-[0_4px_20px_rgba(212,175,55,0.05)] cursor-pointer"
                >
                  RETURN TO HOME
                </Link>
                <Link
                  href="/contact"
                  className="w-full sm:w-60 text-center bg-gold hover:bg-gold-light text-primary-dark font-sans font-bold py-4 px-8 rounded-full text-xs tracking-wider transition-all duration-300 shadow-[0_4px_20px_rgba(212,175,55,0.15)] cursor-pointer"
                >
                  GET IN TOUCH
                </Link>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
