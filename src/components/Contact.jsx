"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function Contact() {
  const [activeBranch, setActiveBranch] = useState(0);

  const branches = [
    {
      id: 0,
      name: 'M.G. Road Branch',
      tagline: 'Flagship Restaurant',
      address: 'Brahmaswom Madam Building, MG Road, Thrissur, Kerala - 680001',
      phone: '+91 78722 25222',
      phoneLink: 'tel:+917872225222',
      mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3922.59345719908!2d76.21272717596001!3d10.524816989609272!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba7ee3bd1987d69%3A0x6d97c555d496a792!2sKanary%20Restaurant!5e0!3m2!1sen!2sin!4v1718544000000!5m2!1sen!2sin',
      directionsUrl: 'https://maps.google.com/?q=Kanary+Restaurant+MG+Road+Thrissur',
      hours: 'Monday – Sunday: 11:00 AM – 1:00 AM'
    },
    {
      id: 1,
      name: 'Ayyanthole Branch',
      tagline: 'Civil Line Link Road',
      address: 'Civil Line Link Road, Ayyanthole, Thrissur, Kerala - 680003',
      phone: '+91 78722 25222',
      phoneLink: 'tel:+917872225222',
      mapEmbedUrl: 'https://maps.google.com/maps?q=Kanary%20Restaurant%20Civil%20Line%20Link%20Road%20Ayyanthole%20Thrissur&t=&z=15&ie=UTF8&iwloc=&output=embed',
      directionsUrl: 'https://maps.google.com/?q=Kanary+Restaurant+Civil+Line+Link+Road+Ayyanthole+Thrissur',
      hours: 'Monday – Sunday: 11:00 AM – 11:00 PM'
    },
    {
      id: 2,
      name: 'Koorkenchery Branch',
      tagline: 'AVM Tower',
      address: 'AVM Tower, Koorkenchery, Thrissur, Kerala - 680007',
      phone: '+91 78722 25222',
      phoneLink: 'tel:+917872225222',
      mapEmbedUrl: 'https://maps.google.com/maps?q=Kanary%20Restaurant%20AVM%20Tower%20Koorkenchery%20Thrissur&t=&z=15&ie=UTF8&iwloc=&output=embed',
      directionsUrl: 'https://maps.google.com/?q=Kanary+Restaurant+AVM+Tower+Koorkenchery+Thrissur',
      hours: 'Monday – Sunday: 11:00 AM – 1:00 AM'
    }
  ];

  const currentBranch = branches[activeBranch];

  return (
    <section 
      id="contact" 
      className="py-24 relative overflow-hidden bg-cover bg-center bg-no-repeat bg-fixed animate-fade-in"
      style={{ backgroundImage: "url('/images/parallax_img.jpeg')" }}
    >
      {/* Heavy dark luxury overlay to ensure text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-bg/70 via-primary-bg/35 to-primary-bg/70 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.08),transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-gold font-sans font-semibold tracking-widest text-sm uppercase block">FIND US</span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Our Locations
          </h2>
          <div className="w-20 h-1 bg-gold mx-auto" />
          <p className="text-gray-300 font-sans text-sm sm:text-base">
            We are proud to serve you across three locations in Thrissur. Select a branch below to view its location details, map, and hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Branch Cards list */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            {branches.map((branch, index) => {
              const isActive = activeBranch === index;
              return (
                <motion.div
                  key={branch.id}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onClick={() => setActiveBranch(index)}
                  className={`p-5 rounded-2xl cursor-pointer transition-all duration-300 border flex flex-col gap-3 relative ${
                    isActive 
                      ? 'bg-primary-dark/85 border-gold shadow-[0_4px_25px_rgba(197,168,128,0.15)] scale-[1.02]' 
                      : 'bg-primary-dark/45 border-white/5 hover:border-gold/30 opacity-80 hover:opacity-100'
                  }`}
                >
                  {/* Branch Title and Indicator */}
                  <div className="flex items-center justify-between">
                    <div>
                      <span className={`text-[10px] font-sans font-semibold tracking-widest uppercase block ${isActive ? 'text-gold' : 'text-gray-400'}`}>
                        {branch.tagline}
                      </span>
                      <h3 className="text-white font-serif font-bold text-lg mt-0.5">{branch.name}</h3>
                    </div>
                    {isActive && (
                      <span className="px-2.5 py-0.5 rounded-full bg-gold/10 border border-gold/30 text-gold text-[10px] font-bold uppercase tracking-wider">
                        Selected
                      </span>
                    )}
                  </div>

                  {/* Branch Details */}
                  <div className="space-y-2 text-xs sm:text-sm text-gray-300 font-sans border-t border-white/5 pt-3">
                    <div className="flex items-start gap-2.5">
                      <MapPin className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                      <span>{branch.address}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Phone className="w-4 h-4 text-gold flex-shrink-0" />
                      <a href={branch.phoneLink} className="hover:text-gold transition-colors font-semibold">
                        {branch.phone}
                      </a>
                    </div>
                  </div>

                  {/* Directions trigger */}
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/5">
                    <a
                      href={branch.directionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] font-bold text-gold hover:text-gold-light uppercase tracking-wider inline-flex items-center gap-1 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Get Directions →
                    </a>
                    
                    <span className="text-[10px] text-gray-500 font-medium">
                      Open till late
                    </span>
                  </div>
                </motion.div>
              );
            })}

            {/* Email Contact & Hours Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="p-5 rounded-2xl bg-primary-dark/45 border border-white/5 flex flex-col gap-3"
            >
              <div className="grid grid-cols-2 gap-4 divide-x divide-white/5">
                <div className="flex flex-col gap-1.5 pl-1">
                  <div className="flex items-center gap-2 text-gold">
                    <Mail className="w-4 h-4" />
                    <span className="text-[10px] font-sans font-bold uppercase tracking-wider">Email</span>
                  </div>
                  <a href="mailto:Kanarykafe@gmail.com" className="text-xs sm:text-sm text-white hover:text-gold transition-colors font-sans truncate">
                    Kanarykafe@gmail.com
                  </a>
                </div>
                
                <div className="flex flex-col gap-1.5 pl-4">
                  <div className="flex items-center gap-2 text-gold">
                    <Clock className="w-4 h-4" />
                    <span className="text-[10px] font-sans font-bold uppercase tracking-wider">Active Hours</span>
                  </div>
                  <span className="text-xs sm:text-sm text-white font-sans">
                    {currentBranch.hours}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Google Maps Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 h-[450px] lg:h-auto min-h-[400px] rounded-3xl overflow-hidden border border-gold/25 shadow-2xl relative bg-primary-dark"
          >
            <iframe
              src={currentBranch.mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`${currentBranch.name} Google Maps Location`}
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
            />
          </motion.div>

        </div>

      </div>
    </section>
  );
}
