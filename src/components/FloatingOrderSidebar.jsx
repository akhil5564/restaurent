"use client";
import React from 'react';
import { motion } from 'framer-motion';

export default function FloatingOrderSidebar() {
  const channels = [
    {
      name: "Zomato",
      url: "https://www.zomato.com",
      color: "#e23744",
      glowColor: "rgba(226, 55, 68, 0.4)",
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#e23744] transition-transform duration-300 group-hover:scale-110">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      )
    },
    {
      name: "Swiggy",
      url: "https://www.swiggy.com",
      color: "#fc8019",
      glowColor: "rgba(252, 128, 25, 0.4)",
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#fc8019] transition-transform duration-300 group-hover:scale-110">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
      )
    },
    {
      name: "WhatsApp",
      url: "https://wa.me/917872225222?text=Hi!%20I%20would%20like%20to%20place%20an%20order%20at%20Kanary%20Restaurant.",
      color: "#25d366",
      glowColor: "rgba(37, 211, 102, 0.4)",
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#25d366] transition-transform duration-300 group-hover:scale-110">
          <path d="M19.001 4.908A9.817 9.817 0 0 0 11.992 2c-5.396 0-9.786 4.39-9.788 9.788 0 1.725.449 3.41 1.304 4.89L2 22l5.482-1.437a9.747 9.747 0 0 0 4.509 1.113h.004c5.396 0 9.79-4.394 9.792-9.792 0-2.617-1.02-5.078-2.871-6.928zM11.992 20.12h-.003a8.12 8.12 0 0 1-4.14-1.135l-.297-.176-3.078.807.82-3.002-.194-.308a8.093 8.093 0 0 1-1.246-4.341c.002-4.484 3.65-8.132 8.136-8.132a8.082 8.082 0 0 1 5.753 2.385 8.077 8.077 0 0 1 2.38 5.754c-.002 4.486-3.65 8.136-8.131 8.136zm4.46-6.096c-.244-.122-1.442-.712-1.666-.794-.223-.082-.385-.122-.548.122-.162.244-.63.794-.772.957-.142.162-.284.183-.528.061a6.643 6.643 0 0 1-1.957-1.206 7.324 7.324 0 0 1-1.354-1.685c-.142-.244-.015-.376.107-.497.11-.11.244-.285.366-.427.122-.142.163-.244.244-.407.082-.162.041-.305-.02-.427-.06-.122-.548-1.32-.751-1.808-.198-.477-.397-.412-.548-.42l-.467-.008c-.162 0-.427.061-.65.305-.224.244-.854.834-.854 2.034 0 1.2 1.34 2.455 1.48 2.618a10.82 10.82 0 0 0 4.116 3.642 13.9 13.9 0 0 0 1.373.508c.57.18 1.09.155 1.5.094.457-.068 1.442-.589 1.646-1.159.203-.57.203-1.057.142-1.159-.06-.102-.223-.163-.467-.285z"/>
        </svg>
      )
    }
  ];

  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-[9999] flex flex-col gap-3.5 items-end pointer-events-none select-none">
      {channels.map((channel, idx) => (
        <motion.a
          key={channel.name}
          href={channel.url}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ x: 60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ 
            type: "spring", 
            stiffness: 260, 
            damping: 20, 
            delay: idx * 0.1 
          }}
          className="flex items-center pl-4 pr-4 py-3 rounded-l-full bg-[#0b0c10]/95 border-l-2 border-y border-white/10 shadow-2xl backdrop-blur-md transition-all duration-300 pointer-events-auto cursor-pointer group"
          style={{ 
            borderLeftColor: channel.color,
            boxShadow: `0 4px 20px -2px rgba(0, 0, 0, 0.6)`
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = `0 4px 25px ${channel.glowColor}`;
            e.currentTarget.style.borderLeftWidth = "4px";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = `0 4px 20px -2px rgba(0, 0, 0, 0.6)`;
            e.currentTarget.style.borderLeftWidth = "2px";
          }}
        >
          {/* Icon wrapper */}
          <div className="flex-shrink-0 flex items-center justify-center">
            {channel.icon}
          </div>
          
          {/* Expanding text */}
          <span 
            className="inline-block w-0 overflow-hidden opacity-0 group-hover:w-24 group-hover:ml-3 group-hover:opacity-100 transition-all duration-300 font-sans font-extrabold text-[11px] uppercase tracking-wider text-left whitespace-nowrap"
            style={{ color: channel.color }}
          >
            {channel.name}
          </span>
        </motion.a>
      ))}
    </div>
  );
}
