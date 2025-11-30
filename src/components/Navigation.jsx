import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe, Instagram } from 'lucide-react'; // Instagram eklendi
import { motion, AnimatePresence } from 'framer-motion';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const links = [
    { path: '/', label: 'Sereke' },
    { path: '/ziman', label: 'Ziman' },
    { path: '/cand', label: 'Çand' },
    { path: '/dirok', label: 'Dîrok' },
    { path: '/muzik', label: 'Muzîk' },
    { path: '/huner', label: 'Huner' }
  ];

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-20">
          {/* --- LOGO KISMI --- */}
          <Link to="/" className="flex items-center space-x-3 group">
            <img 
              src="/logo.png" 
              alt="YTU Kurdî Logo" 
              className="w-12 h-12 rounded-full object-cover shadow-md group-hover:scale-110 transition-transform duration-300"
            />
            <div className="flex flex-col">
              <span className="font-bold text-xl text-gray-900 leading-none">YTU Kurdî</span>
              <span className="text-xs text-gray-500 font-medium">Komeleya Kurdî</span>
            </div>
          </Link>

          {/* Masaüstü Menü */}
          <div className="hidden md:flex items-center space-x-1">
            {links.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            
            {/* --- GÜNCELLENEN BUTON --- */}
            <motion.a 
              href="https://instagram.com/ytukurdi" 
              target="_blank" 
              rel="noopener noreferrer"
              // Hover durumunda Instagram renklerine (Mor-Kırmızı-Turuncu) dönüşür
              className="ml-4 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-[#833ab4] hover:via-[#fd1d1d] hover:to-[#fcb045] text-white px-5 py-2 rounded-full text-sm font-bold shadow-md flex items-center gap-2 cursor-pointer transition-all duration-500"
              animate={{ 
                scale: [1, 1.05, 1], 
                boxShadow: [
                  "0px 0px 0px rgba(37, 99, 235, 0)",
                  "0px 0px 15px rgba(37, 99, 235, 0.5)",
                  "0px 0px 0px rgba(37, 99, 235, 0)"
                ] 
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              whileHover={{ scale: 1.1 }}
            >
              {/* Instagram İkonu */}
              <Instagram size={20} />
              <span>Me Bişopînin</span>
            </motion.a>
          </div>

          {/* Mobil Menü Butonu */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-blue-600 transition-colors p-2"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobil Menü Açılır Kısmı */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {links.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`block px-4 py-3 rounded-lg text-base font-medium ${
                      isActive
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              {/* Mobil Menüdeki Buton */}
              <a 
                href="https://instagram.com/ytukurdi"
                target="_blank"
                rel="noopener noreferrer"
                 className="flex items-center justify-center gap-2 w-full text-center mt-4 bg-gradient-to-r from-blue-600 to-emerald-600 text-white px-5 py-3 rounded-xl font-bold"
              >
                <Instagram size={20} />
                <span>Me Bişopînin</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navigation;