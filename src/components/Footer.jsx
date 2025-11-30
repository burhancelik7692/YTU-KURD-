import React from 'react';
import { Instagram } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4 mt-auto">
      <div className="max-w-7xl mx-auto text-center">
        <img src="/logo.png" alt="YTU Kurdî" className="w-20 h-20 mx-auto mb-6 rounded-full" />
        <p className="text-lg mb-6">Zanîngeha Yıldız Teknîk - Komeleya Kurdî</p>
        
        {/* --- INSTAGRAM BÖLÜMÜ (Animasyonlu) --- */}
        <div className="mb-8 flex justify-center">
          <a 
            href="https://instagram.com/ytukurdi" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-3 bg-white/10 px-6 py-3 rounded-full hover:bg-gradient-to-tr hover:from-[#833ab4] hover:via-[#fd1d1d] hover:to-[#fcb045] transition-all duration-500 group"
          >
            <motion.div
              animate={{
                scale: [1, 1.15, 1], // Nabız Efekti
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Instagram size={28} className="text-white" />
            </motion.div>
            <span className="font-bold tracking-wider">Zanîngeha Yıldız Teknîk - Komeleya Kurdî</span>
          </a>
        </div>
        {/* --- BÖLÜM SONU --- */}

        <p className="text-gray-400">© 2025 YTU Kurdî . Hemû mafên parastî ne.</p>
      </div>
    </footer>
  );
};

export default Footer;