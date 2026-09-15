"use client";
import { motion } from 'framer-motion';
import { ChefHat, ShieldCheck, Timer, Leaf, Users, Calendar } from 'lucide-react';

export default function WhyChooseUs() {
  const features = [
    {
      icon: Leaf,
      title: 'Pure A2 Milk & Ghee',
      desc: 'Made from A2 milk sourced from cows that naturally produce A2 beta-casein, bringing together traditional dairy goodness, rich taste, and premium quality.',
    },
    {
      icon: ChefHat,
      title: 'Expert Culinary Team',
      desc: 'Our culinary team brings years of expertise in traditional Kerala cuisine, crafting each dish with precision and care.',
    },
    {
      icon: Users,
      title: 'Warm Hospitality',
      desc: 'A warm, spacious, and inviting dining room designed to accommodate families and large groups comfortably with dedicated hospitality.',
    },
    {
      icon: Timer,
      title: 'Swift Service',
      desc: 'We respect your time. Our kitchen operations are optimized to ensure your meals are cooked fresh and served hot without unnecessary delays.',
    },
    {
      icon: ShieldCheck,
      title: 'Uncompromising Hygiene',
      desc: 'We enforce strict 5-star safety protocols, utilizing state-of-the-art sanitization, pure filtered water, and spotless preparation surfaces.',
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section 
      id="why-us" 
      className="py-24 relative overflow-hidden bg-cover bg-center bg-no-repeat bg-fixed"
      style={{ backgroundImage: "url('/images/parallax_img.jpeg')" }}
    >
      {/* Heavy dark luxury overlay to ensure text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-bg/85 via-primary-bg/50 to-primary-bg/85 pointer-events-none" />
      <div className="absolute inset-0 bg-black/40 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.08),transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-gold font-sans font-semibold tracking-widest text-sm uppercase block">WHY CHOOSE US</span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Our Commitment to Quality
          </h2>
          <div className="w-20 h-1 bg-gold mx-auto" />
          <p className="text-gray-300 font-sans text-sm sm:text-base">
            For years, we have set the benchmark for authentic multi-cuisine dining in Thrissur. Here is why our customers keep coming back.
          </p>
        </div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feat, index) => {
            const IconComponent = feat.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className="glass-panel glass-panel-hover p-8 rounded-2xl transition-all duration-300 flex flex-col items-start gap-4"
              >
                {/* Icon Circle */}
                <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center flex-shrink-0">
                  <IconComponent className="w-6 h-6 text-gold" />
                </div>

                <div className="space-y-2">
                  <h3 className="font-serif text-white text-xl font-bold">
                    {feat.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}

          {/* 6th Slot Promo Block */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -8 }}
            className="bg-gradient-to-br from-gold/20 via-gold-dark/10 to-transparent border border-gold/45 p-8 rounded-2xl flex flex-col justify-between items-start gap-6 h-full shadow-[inset_0_0_20px_rgba(212,175,55,0.05)]"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-gold text-primary-dark flex items-center justify-center">
                <Calendar className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-white text-xl font-bold">
                A Remarkable Experience
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Join us for lunch or dinner to taste the true legacy of premium multi-cuisine cooking. Reserve your table in seconds.
              </p>
            </div>

            <button
              onClick={() => document.getElementById('reserve').scrollIntoView({ behavior: 'smooth' })}
              className="w-full text-center bg-gold text-primary-dark font-sans font-bold py-3 px-6 rounded-full text-sm tracking-wider hover:bg-gold-light transition-all duration-300"
            >
              BOOK RESERVATION
            </button>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
