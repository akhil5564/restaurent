"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, Users, User, Phone, CheckCircle, Send, MessageSquare, MapPin } from 'lucide-react';

export default function Reservation() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    branch: 'M.G. Road Branch',
    guests: '2',
    date: '',
    time: '19:00',
    preference: 'Standard Dining',
    notes: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  const timeSlots = [
    '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', 
    '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const generateBookingRef = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let ref = 'KN-';
    for (let i = 0; i < 5; i++) {
      ref += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return ref;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate required fields
    if (!formData.name || !formData.phone || !formData.date) {
      alert('Please fill out all required fields.');
      return;
    }
    setBookingRef(generateBookingRef());
    setIsSubmitted(true);
  };

  // Generate pre-filled WhatsApp link
  const getWhatsAppLink = () => {
    const message = `*Kanary Restaurant Reservation Request*
Reference: ${bookingRef}
Branch: ${formData.branch}
Name: ${formData.name}
Phone: ${formData.phone}
Guests: ${formData.guests}
Date: ${formData.date}
Time: ${formData.time}
Seating: ${formData.preference}
Notes: ${formData.notes || 'None'}`;
    
    // Route to the enquiry WhatsApp phone number
    const phoneNum = '917872225222';
    
    return `https://wa.me/${phoneNum}?text=${encodeURIComponent(message)}`;
  };



  const handleReset = () => {
    setFormData({
      name: '',
      phone: '',
      branch: 'M.G. Road Branch',
      guests: '2',
      date: '',
      time: '19:00',
      preference: 'Standard Dining',
      notes: '',
    });
    setIsSubmitted(false);
  };

  return (
    <section id="reserve" className="py-24 bg-primary-dark/50 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(212,175,55,0.05),transparent_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-gold font-sans font-semibold tracking-widest text-sm uppercase block">BOOKINGS</span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Reserve A Table
          </h2>
          <div className="w-20 h-1 bg-gold mx-auto" />
          <p className="text-gray-300 font-sans text-sm sm:text-base">
            Secure your table for lunch or dinner. Fill out the form, and send it directly via WhatsApp or Email for instant verification.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch max-w-5xl mx-auto">
          
          {/* Info Card Column */}
          <div className="lg:col-span-5 flex flex-col justify-between p-8 sm:p-10 rounded-3xl bg-primary-dark border border-gold/15 shadow-2xl relative overflow-hidden">
            <div className="absolute -top-12 -left-12 w-40 h-40 bg-gold/5 rounded-full filter blur-xl pointer-events-none" />
            
            <div className="space-y-6">
              <h3 className="font-serif text-2xl font-bold text-white">Reservation Guidelines</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                For online booking requests, please submit the form at least 2 hours prior to your desired dining time. 
              </p>
              
              <div className="space-y-4 pt-4 border-t border-gray-800">
                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold flex-shrink-0 mt-0.5">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm">Instant WhatsApp Submission</h4>
                    <p className="text-gray-400 text-xs mt-0.5">Direct chat confirmation with our manager.</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold flex-shrink-0 mt-0.5">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm">Seating Preferences</h4>
                    <p className="text-gray-400 text-xs mt-0.5">Choose from Standard Dining, Family Section, or romantic Candlelight settings.</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold flex-shrink-0 mt-0.5">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm">Need Help? Call Us</h4>
                    <p className="text-gray-400 text-xs mt-0.5">Call +91 78722 25222 for immediate group bookings or event inquiries.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-800 text-gray-400 text-xs">
              <p className="italic">Note: Table bookings are held for a maximum of 15 minutes past the reserved slot.</p>
            </div>
          </div>

          {/* Form Card Column */}
          <div className="lg:col-span-7 glass-panel p-8 sm:p-10 rounded-3xl border border-gold/25 shadow-2xl flex flex-col justify-center min-h-[500px]">
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form
                  key="booking-form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Branch Selector (Full Width) */}
                    <div className="space-y-2 sm:col-span-2">
                      <label htmlFor="branch" className="text-xs font-bold uppercase tracking-wider text-gray-300 flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-gold" /> Select Restaurant Branch *
                      </label>
                      <select
                        id="branch"
                        name="branch"
                        required
                        value={formData.branch}
                        onChange={handleChange}
                        className="w-full bg-primary-dark/80 border border-gold/20 rounded-xl px-4 py-3 text-white font-sans text-sm focus:outline-none focus:border-gold transition-colors"
                      >
                        <option value="M.G. Road Branch">M.G. Road Branch (MG Road)</option>
                        <option value="Ayyanthole Branch">Ayyanthole Branch (Civil Line Link Road)</option>
                        <option value="Koorkenchery Branch">Koorkenchery Branch (AVM Tower)</option>
                      </select>
                    </div>

                    {/* Name */}
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-gray-300 flex items-center gap-2">
                        <User className="w-3.5 h-3.5 text-gold" /> Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full bg-primary-dark/80 border border-gold/20 rounded-xl px-4 py-3 text-white font-sans text-sm focus:outline-none focus:border-gold transition-colors"
                      />
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-xs font-bold uppercase tracking-wider text-gray-300 flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-gold" /> Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 78722 25222"
                        className="w-full bg-primary-dark/80 border border-gold/20 rounded-xl px-4 py-3 text-white font-sans text-sm focus:outline-none focus:border-gold transition-colors"
                      />
                    </div>

                    {/* Guests */}
                    <div className="space-y-2">
                      <label htmlFor="guests" className="text-xs font-bold uppercase tracking-wider text-gray-300 flex items-center gap-2">
                        <Users className="w-3.5 h-3.5 text-gold" /> Number of Guests
                      </label>
                      <select
                        id="guests"
                        name="guests"
                        value={formData.guests}
                        onChange={handleChange}
                        className="w-full bg-primary-dark/80 border border-gold/20 rounded-xl px-4 py-3 text-white font-sans text-sm focus:outline-none focus:border-gold transition-colors"
                      >
                        <option value="1">1 Guest</option>
                        <option value="2">2 Guests</option>
                        <option value="3">3 Guests</option>
                        <option value="4">4 Guests</option>
                        <option value="5">5 Guests</option>
                        <option value="6">6 Guests</option>
                        <option value="7">7 Guests</option>
                        <option value="8+">8+ Guests (Group)</option>
                      </select>
                    </div>

                    {/* Date */}
                    <div className="space-y-2">
                      <label htmlFor="date" className="text-xs font-bold uppercase tracking-wider text-gray-300 flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-gold" /> Date *
                      </label>
                      <input
                        type="date"
                        id="date"
                        name="date"
                        required
                        value={formData.date}
                        onChange={handleChange}
                        className="w-full bg-primary-dark/80 border border-gold/20 rounded-xl px-4 py-3 text-white font-sans text-sm focus:outline-none focus:border-gold transition-colors"
                      />
                    </div>

                    {/* Time */}
                    <div className="space-y-2">
                      <label htmlFor="time" className="text-xs font-bold uppercase tracking-wider text-gray-300 flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-gold" /> Arrival Time
                      </label>
                      <select
                        id="time"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        className="w-full bg-primary-dark/80 border border-gold/20 rounded-xl px-4 py-3 text-white font-sans text-sm focus:outline-none focus:border-gold transition-colors"
                      >
                        {timeSlots.map((slot) => (
                          <option key={slot} value={slot}>
                            {slot} {parseInt(slot) >= 12 ? 'PM' : 'AM'}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Preference */}
                    <div className="space-y-2">
                      <label htmlFor="preference" className="text-xs font-bold uppercase tracking-wider text-gray-300 flex items-center gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-gold" /> Seating Preference
                      </label>
                      <select
                        id="preference"
                        name="preference"
                        value={formData.preference}
                        onChange={handleChange}
                        className="w-full bg-primary-dark/80 border border-gold/20 rounded-xl px-4 py-3 text-white font-sans text-sm focus:outline-none focus:border-gold transition-colors"
                      >
                        <option value="Standard Dining">Standard Dining</option>
                        <option value="Family Section">Family Section</option>
                        <option value="Candlelight setting">Candlelight Setting</option>
                        <option value="Window Seat">Window Seat</option>
                      </select>
                    </div>
                  </div>

                  {/* Notes */}
                  <div className="space-y-2">
                    <label htmlFor="notes" className="text-xs font-bold uppercase tracking-wider text-gray-300">
                      Special Requests / Notes (Optional)
                    </label>
                    <textarea
                      id="notes"
                      name="notes"
                      rows="3"
                      value={formData.notes}
                      onChange={handleChange}
                      placeholder="E.g., High chair needed, allergy concerns, celebrating anniversary..."
                      className="w-full bg-primary-dark/80 border border-gold/20 rounded-xl px-4 py-3 text-white font-sans text-sm focus:outline-none focus:border-gold transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full gold-gradient-bg hover:opacity-95 text-primary-dark font-sans font-bold py-4 rounded-xl text-base tracking-wider transition-all duration-300 shadow-[0_4px_20px_rgba(212,175,55,0.2)] flex items-center justify-center gap-2 cursor-pointer hover:-translate-y-0.5"
                  >
                    CONFIRM DETAILS
                    <Send className="w-4 h-4" />
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="booking-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="text-center space-y-6"
                >
                  <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500 flex items-center justify-center mx-auto text-green-500 mb-2">
                    <CheckCircle className="w-10 h-10" />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-serif text-3xl font-bold text-white">Details Verified!</h3>
                    <p className="text-gray-300 text-sm">
                      Your request has been compiled. Click below to submit via WhatsApp for immediate confirmation:
                    </p>
                  </div>

                  {/* Booking Receipt Summary */}
                  <div className="bg-primary-dark/90 rounded-2xl p-6 border border-gold/20 text-left space-y-3 max-w-md mx-auto">
                    <div className="flex justify-between border-b border-gray-800 pb-2">
                      <span className="text-gray-400 text-xs font-bold uppercase">Booking Ref</span>
                      <span className="text-gold font-sans font-bold text-sm">{bookingRef}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400 text-xs">Name</span>
                      <span className="text-white text-xs font-semibold">{formData.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400 text-xs">Phone</span>
                      <span className="text-white text-xs font-semibold">{formData.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400 text-xs">Guests & Seating</span>
                      <span className="text-white text-xs font-semibold">{formData.guests} Guests ({formData.preference})</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400 text-xs">Date & Time</span>
                      <span className="text-white text-xs font-semibold">{formData.date} at {formData.time} {parseInt(formData.time) >= 12 ? 'PM' : 'AM'}</span>
                    </div>
                  </div>

                  {/* WhatsApp Submission Button */}
                  <div className="max-w-md mx-auto">
                    <a
                      href={getWhatsAppLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white font-sans font-bold py-3.5 px-6 rounded-xl text-sm tracking-wider transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:-translate-y-0.5"
                    >
                      <MessageSquare className="w-4 h-4 fill-white" />
                      SEND WHATSAPP
                    </a>
                  </div>

                  <button
                    onClick={handleReset}
                    className="text-xs font-bold text-gold hover:text-gold-light uppercase tracking-widest pt-2 underline cursor-pointer inline-block"
                  >
                    Edit / Book Another Table
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
