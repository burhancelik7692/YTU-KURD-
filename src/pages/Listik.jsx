import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, RefreshCcw, Star, HelpCircle, Maximize, Minimize } from 'lucide-react';

const Listik = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);

  // TAM EKRAN FONKSİYONU
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullScreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullScreen(false);
      }
    }
  };

  // OYUN VERİLERİ (Slaytlar)
  const slides = [
    // SLAYT 1: KAPAK
    {
      type: 'cover',
      title: 'LÎSTIK',
      subtitle: 'KÎ YE EV?',
      image: '/logo.png'
    },
    
    // --- SORU 1: CEGERXWÎN ---
    {
      type: 'question',
      name: 'MAMOSTE CEGERXWÎN',
      image: '/cegerxwin.jpg', 
      hints: [] 
    },
    {
      type: 'answer',
      // 'RAST E' başlığı kaldırıldı
      name: 'Cegerxwîn',
      detail: '(1903 - 1984)',
      image: '/cegerxwin.jpg'
    },

    // --- SORU 2: EHMEDÊ XANÎ ---
    {
      type: 'question',
      name: 'EHMEDÊ XANÎ',
      image: '/xani.jpg', 
      hints: ['Mem û Zîn', 'Çiyayê Agirî', 'Sedsala 17an', 'Fîlozof']
    },
    {
      type: 'answer',
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
      name: 'Şêrko Bêkes',
      detail: 'Imparatorê Helbestê',
      image: '/serko.jpg'
    },

    // --- SORU 4: FEQÎYÊ TEYRAN ---
    {
      type: 'question',
      name: 'FEQÎYÊ TEYRAN',
      image: '/feqi.jpg', 
      hints: ['Zimanê Çivîkan', 'Zembîlfiroş', 'Av û Av', 'Miks (Bahçesaray)']
    },
    {
      type: 'answer',
      name: 'Feqiyê Teyran',
      detail: 'Helbestvanê Klasîk',
      image: '/feqi.jpg'
    },

    // --- SONUÇ (Logo Animasyonlu) ---
    {
      type: 'end',
      title: 'PÎROZ BE!',
      // subtitle: 'Te hemû pirsan bildi!', (İstersen açabilirsin)
      image: '/logo.png', // Logo eklendi
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

      {/* Siyah Arka Plan */}
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 overflow-hidden relative">
        
        {/* --- TAM EKRAN BUTONU (Sağ Üst) --- */}
        <button 
          onClick={toggleFullScreen}
          className="absolute top-6 right-6 z-50 bg-gray-800/50 p-3 rounded-full hover:bg-gray-700 transition-all text-white border border-gray-600 group"
          title="Tam Ekran"
        >
          {isFullScreen ? <Minimize size={24} /> : <Maximize size={24} />}
          <span className="absolute right-full mr-3 bg-gray-800 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Tam Ekran
          </span>
        </button>

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
                <div className="relative mb-8 group">
                  <img 
                    src={currentData.image} 
                    alt="Kî ye ev?" 
                    className="h-[50vh] object-contain rounded-xl border-4 border-yellow-500 shadow-[0_0_50px_rgba(234,179,8,0.3)] transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {e.target.src = 'https://placehold.co/600x800/1a1a1a/FFF?text=Wêne+Tune';}}
                  />
                  <div className="absolute -bottom-6 -right-6 bg-yellow-500 text-black p-4 rounded-full shadow-lg animate-bounce">
                    <HelpCircle size={40} />
                  </div>
                </div>
                
                <h2 className="text-6xl font-black text-yellow-400 mb-8 tracking-widest animate-pulse">
                  ???
                </h2>

                {currentData.hints && currentData.hints.length > 0 ? (
                  <div className="flex flex-wrap justify-center gap-4">
                    {currentData.hints.map((hint, index) => (
                      <motion.span 
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.5 }}
                        className="bg-gray-800 text-white px-6 py-2 rounded-full text-xl border border-gray-600 shadow-lg"
                      >
                        {hint}
                      </motion.span>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-xl italic">Tenê li wêne binêre...</p>
                )}
              </div>
            )}

            {/* --- CEVAP SLAYTI (RAST E Yazısı Kaldırıldı) --- */}
            {currentData.type === 'answer' && (
              <div className="flex flex-col items-center">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.5, 1] }}
                  className="mb-8"
                >
                  <Star size={100} className="text-green-500 fill-current drop-shadow-[0_0_15px_rgba(34,197,94,0.8)]" />
                </motion.div>
                
                <img 
                  src={currentData.image} 
                  alt={currentData.name} 
                  className="h-[35vh] object-contain rounded-xl border-4 border-green-500 mb-8 shadow-[0_0_50px_rgba(34,197,94,0.3)]"
                />
                
                {/* RAST E yazısı burada yok, direkt isim geliyor */}
                <h2 className="text-6xl text-white font-black mb-4 tracking-wide">{currentData.name}</h2>
                <p className="text-3xl text-gray-400 font-light">{currentData.detail}</p>
              </div>
            )}

            {/* --- OYUN SONU SLAYTI (LOGO ANİMASYONLU) --- */}
            {currentData.type === 'end' && (
              <div className="flex flex-col items-center">
                
                {/* Dönen ve Büyüyen Logo */}
                <motion.img 
                  src="/logo.png"
                  alt="YTU Kurdî"
                  className="w-64 h-64 mb-8 object-contain rounded-full shadow-[0_0_50px_rgba(37,99,235,0.5)]"
                  animate={{ 
                    rotate: 360, 
                    scale: [1, 1.1, 1] 
                  }}
                  transition={{ 
                    rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                    scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                  }}
                />

                <h1 className="text-7xl font-black text-yellow-400 mb-6">{currentData.title}</h1>
                <p className="text-2xl text-gray-400 mb-12 bg-gray-900 px-8 py-4 rounded-xl border border-gray-700">
                  {currentData.detail}
                </p>
                <button 
                  onClick={resetGame} 
                  className="flex items-center gap-3 bg-white text-black px-10 py-4 rounded-full text-xl font-bold hover:bg-gray-200 transition-all transform hover:scale-105"
                >
                  <RefreshCcw />
                  Dîsa Bileyîze
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* --- NAVİGASYON BUTONLARI --- */}
        {currentData.type !== 'cover' && currentData.type !== 'end' && (
          <div className="absolute bottom-8 flex gap-8 z-50">
            <button 
              onClick={prevSlide}
              className="bg-gray-800/50 p-4 rounded-full hover:bg-gray-700 transition-all text-white border border-gray-600"
            >
              <ChevronLeft size={32} />
            </button>
            <button 
              onClick={nextSlide}
              className="bg-yellow-500 p-4 rounded-full hover:bg-yellow-400 transition-all text-black shadow-[0_0_20px_rgba(234,179,8,0.5)] scale-110 hover:scale-125"
            >
              <ChevronRight size={32} />
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Listik;