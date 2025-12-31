import React from 'react';
import { motion } from 'framer-motion';

const Header: React.FC = () => {
  return (
    <header className="flex flex-col items-center justify-center pt-8 pb-4 relative z-10">
      <div className="relative w-48 h-48 sm:w-64 sm:h-64 mb-6">
        {/* Glow Effects */}
        <motion.div 
          className="absolute inset-0 bg-blue-400 rounded-full opacity-20 blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute inset-0 bg-white rounded-full opacity-10 blur-xl"
          animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        
        {/* Main Image */}
        <motion.img 
          src="https://i.postimg.cc/xjsLvWvy/9d90040790934503882c50e6d8c30607-removebg-preview.png" 
          alt="Shiny Rocks" 
          className="w-full h-full object-contain relative z-10 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-center px-4"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-100 via-white to-gray-300 drop-shadow-sm tracking-wide">
          GTAG VR
        </h1>
        <h2 className="text-xl sm:text-2xl text-blue-200 mt-2 font-medium tracking-wider uppercase">
          Shiny Rocks Generator
        </h2>
        <div className="flex items-center justify-center gap-2 mt-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/30">
                <span className="w-2 h-2 rounded-full bg-green-400 mr-2 animate-pulse"></span>
                Status: Online
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-800 text-gray-400 border border-gray-700">
                Ver 4.2.0 (2026)
            </span>
        </div>
      </motion.div>
    </header>
  );
};

export default Header;