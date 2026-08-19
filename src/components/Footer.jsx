"use client";
import { Utensils, ArrowUp } from 'lucide-react';

export default function Footer() {
  const socialIcons = [
    { 
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
        </svg>
      ), 
      href: 'https://facebook.com', 
      label: 'Facebook' 
    },
    { 
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
      ), 
      href: 'https://instagram.com', 
      label: 'Instagram' 
    },
    { 
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ), 
      href: 'https://twitter.com', 
      label: 'Twitter' 
    },
    { 
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.507a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.87.507 9.388.507 9.388.507s7.518 0 9.388-.507a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      ), 
      href: 'https://youtube.com', 
      label: 'Youtube' 
    },
  ];

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollTo = (e, id) => {
    e.preventDefault();
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-primary-dark pt-16 pb-8 border-t border-gold/15 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center text-center md:text-left">
          
          {/* Logo & Tagline */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <a href="#home" onClick={(e) => handleScrollTo(e, '#home')} className="flex items-center gap-3 group">
              <img 
                src="/images/logo.png" 
                alt="Kanary Restaurant Logo" 
                className="w-16 h-16 object-contain"
              />
              <div className="flex flex-col text-left">
                <span className="font-serif text-xl sm:text-2xl font-bold tracking-wide text-white group-hover:text-gold transition-colors duration-300">
                  KANARY
                </span>
                <span className="text-[10px] tracking-[0.25em] text-gold uppercase -mt-1 font-sans">
                  Restaurant
                </span>
              </div>
            </a>
            <p className="text-gray-400 text-xs sm:text-sm max-w-xs leading-relaxed mt-2">
              Thrissur's premier multi-cuisine dining experience, serving authentic culinary delicacies made with premium A2 milk and ghee since 2022.
            </p>
          </div>

          {/* Quick Nav Links */}
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="flex flex-wrap justify-center gap-6">
              {['Home', 'About', 'Menu', 'Gallery', 'Why Us', 'Reviews', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  onClick={(e) => handleScrollTo(e, `#${item.toLowerCase().replace(' ', '-')}`)}
                  className="text-gray-400 hover:text-gold text-xs sm:text-sm font-semibold tracking-wider transition-colors duration-200"
                >
                  {item.toUpperCase()}
                </a>
              ))}
            </div>
            <div className="w-16 h-[1px] bg-gold/20" />
            <span className="text-gold font-sans text-xs tracking-widest font-semibold uppercase">
              Monday – Sunday | 8:00 AM – 1:00 AM
            </span>
          </div>

          {/* Socials & Back To Top */}
          <div className="flex flex-col items-center md:items-end gap-6">
            <div className="flex gap-4">
              {socialIcons.map((social, index) => {
                return (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-10 h-10 rounded-full border border-gold/20 hover:border-gold text-gray-400 hover:text-primary-dark hover:bg-gold flex items-center justify-center transition-all duration-300 shadow-md hover:-translate-y-1"
                  >
                    {social.icon}
                  </a>
                );
              })}
            </div>

            <button
              onClick={handleScrollToTop}
              className="group bg-primary-light hover:bg-gold text-gold hover:text-primary-dark border border-gold/30 hover:border-gold w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg cursor-pointer"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

        </div>

        {/* Bottom copyright and policies */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>
            Copyright ©️ 2026 Kanary Restaurant. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#privacy" className="hover:text-gold transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-gold transition-colors">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
