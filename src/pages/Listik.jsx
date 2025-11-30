import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, RefreshCcw, Star } from 'lucide-react';

const Listik = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // OYUN VERİLERİ (Slaytlar)
  const slides = [
    // SLAYT 1: KAPAK
    {
      type: 'cover',
      title: 'LÎSTIK',
      subtitle: 'KÎ YE EV?',
      image: '/logo.png' // Sitenin logosu
    },
    
    // --- SORU 1: CEGERXWÎN ---
    {
      type: 'question',
      name: 'MAMOSTE CEGERXWÎN',
      image: '/cegerxwin.jpg', // Public klasörüne bu isimle atman lazım
      hints: [] // İpucu yok, direkt fotoğraf
    },
    {
      type: 'answer',
      title: 'RAST E!',
      name: 'Cegerxwîn',
      detail: '(1903 - 1984)',
      image: '/cegerxwin.jpg'
    },

    // --- SORU 2: EHMEDÊ XANÎ ---
    {
      type: 'question',
      name: 'EHMEDÊ XANÎ',
      image: '/xani.jpg', // Temsili çizim
      hints: ['Mem û Zîn', 'Çiyayê Agirî', 'Sedsala 17an', 'Fîlozof']
    },
    {
      type: 'answer',
      title: 'RAST E!',
      name: 'Ehmedê Xanî',
      detail: 'Nivîskarê Mem û Zîn',
      image: '/xani.jpg'
    },

    // --- SORU 3: ŞÊRKO BÊKES ---
    {
      type: 'question',
      name: 'ŞÊRKO BÊKES',
      image: '/serko.jpg',
      hints: ['Helbesta Nûjen', 'Helebçe', 'Pepûle (Kelebek)', 'Silêmanî']
    },
    {
      type: 'answer',
      title: 'RAST E!',
      name: 'Şêrko Bêkes',
      detail: 'Imparatorê Helbestê',
      image: '/serko.jpg'
    },

    // --- SORU 4: FEQÎYÊ TEYRAN (Zor) ---
    {
      type: 'question',
      name: 'FEQÎYÊ TEYRAN',
      image: '/feqi.jpg', // Temsili veya kolaj
      hints: ['Zimanê Çivîkan', 'Zembîlfiroş', 'Av û Av', 'Miks (Bahçesaray)']
    },
    {
      type: 'answer',
      title: 'RAST E!',
      name: 'Feqiyê Teyran',
      detail: 'Helbestvanê Klasîk',
      image: '/feqi.jpg'
    },

    // --- SLAYT 10: SONUÇ ---
    {
      type: 'end',
      title: 'PÎROZ BE!',
      subtitle: 'Te hemû pirsan bildi!',
      detail: 'Hediyeyê ji bîr nekin! 🎁'
    }
  ];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) setCurrentSlide(currentSlide + 1);
  };

  const prevSlide = () => {
    if (currentSlide > 0) setCurrentSlide(currentSlide - 1);
  };

  const resetGame = () => {
    setCurrentSlide(0);
  };

  const currentData = slides[currentSlide];

  return (
    <>
      <Helmet>
        <title>Lîstik - YTU Kurdî</title>
      </Helmet>

      {/* Siyah Arka Plan - Tam Ekran */}
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 overflow-hidden relative">
        
        {/* İlerleme Çubuğu */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gray-800">
          <div 
            className="h-full bg-yellow-500 transition-all duration-500"
            style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
          ></div>
        </div>

        <AnimatePresence mode='wait'>
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.5 }}
            className="text-center w-full max-w-5xl"
          >
            {/* --- KAPAK SLAYTI --- */}
            {currentData.type === 'cover' && (
              <div className="flex flex-col items-center">
                <img 
                  src={currentData.image} 
                  alt="Logo" 
                  className="w-48 h-48 mb-8 animate-bounce object-contain"
                />
                <h1 className="text-7xl font-black text-yellow-400 mb-4 tracking-wider">{currentData.title}</h1>
                <h2 className="text-4xl text-white font-bold">{currentData.subtitle}</h2>
                <button onClick={nextSlide} className="mt-12 bg-yellow-500 text-black px-12 py-4 rounded-full text-2xl font-bold hover:bg-yellow-400 transition-all hover:scale-110">
                  DEST PÊ BIKE
                </button>
              </div>
            )}

            {/* --- SORU SLAYTI --- */}
            {currentData.type === 'question' && (
              <div className="flex flex-col items-center">
                <div className="relative mb-8">
                  <img 
                    src={currentData.image} 
                    alt={currentData.name} 
                    className="h-[50vh] object-contain rounded-xl border-4 border-yellow-500 shadow-[0_0_50px_rgba(234,179,8,0.3)]"
                    onError={(e) => {e.target.src = 'https://placehold.co/600x800/1a1a1a/FFF?text=Wêne+Tune';}}
                  />
                </div>
                
                <h2 className="text-5xl md:text-6xl font-black text-yellow-400 mb-8 uppercase tracking-widest">
                  {currentData.name}
                </h2>

                {/* İpuçları */}
                {currentData.hints && currentData.hints.length > 0 && (
                  <div className="flex flex-wrap justify-center gap-4">
                    {currentData.hints.map((hint, index) => (
                      <motion.span 
                        key={index}
                        initial={{ opacity: 0, y: 20 }}