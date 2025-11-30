import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, RefreshCcw, Star, HelpCircle, Maximize, Minimize } from 'lucide-react';

const Listik = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    const handleFullScreenChange = () => {
      if (!document.fullscreenElement) {
        setIsFullScreen(false);
      }
    };
    document.addEventListener('fullscreenchange', handleFullScreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullScreenChange);
  }, []);

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

  // OYUN VERİLERİ
  const slides = [
    { type: 'cover', title: 'LÎSTIK', subtitle: 'KÎ YE EV?', image: '/logo.png' },
    
    // --- 1. SORU: CEGERXWÎN ---
    { type: 'question', name: 'MAMOSTE CEGERXWÎN', image: '/cegerxwin.jpg', hints: ['Gulfiroş', 'Kîme Ez?', 'Stockholm'] },
    { type: 'answer', name: 'Cegerxwîn', detail: '(1903 - 1984)', image: '/cegerxwin.jpg' },

    // --- 2. SORU: EHMEDÊ XANÎ ---
    { type: 'question', name: 'EHMEDÊ XANÎ', image: '/xani.jpg', hints: ['Mem û Zîn', 'Çiyayê Agirî', 'Sedsala 17an', 'Fîlozof'] },
    { type: 'answer', name: 'Ehmedê Xanî', detail: 'Nivîskarê Mem û Zîn', image: '/xani.jpg' },

    // --- 3. SORU: ŞÊRKO BÊKES ---
    { type: 'question', name: 'ŞÊRKO BÊKES', image: '/serko.jpg', hints: ['Helbesta Nûjen', 'Helebçe', 'Pepûle', 'Silêmanî'] },
    { type: 'answer', name: 'Şêrko Bêkes', detail: 'Imparatorê Helbestê', image: '/serko.jpg' },

    // --- 4. SORU: MESTÛRE ERDELAN ---
    { type: 'question', name: 'MESTÛRE ERDELAN', image: '/mesture.jpg', hints: ['Jina Yekemîn a Dîrokzan', 'Erdelan', 'Sine', 'Helbestvan'] },
    { type: 'answer', name: 'Mestûre Erdelan', detail: '(1805 - 1848)', image: '/mesture.jpg' },

    // --- 5. SORU: MELAYÊ CIZÎRÎ ---
    { type: 'question', name: 'MELAYÊ CIZÎRÎ', image: '/ciziri.jpg', hints: ['Dîwan', 'Evîn û Tesewif', 'Cizîra Botan', 'Sebahul Xeyr'] },
    { type: 'answer', name: 'Melayê Cizîrî', detail: '(1570 - 1640)', image: '/ciziri.jpg' },

    // --- 6. SORU: MUSA ANTER ---
    { type: 'question', name: 'MUSA ANTER', image: '/musa.jpg', hints: ['Apê Mûsa', 'Çinar', 'Qimil', 'Rojnameger'] },
    { type: 'answer', name: 'Musa Anter', detail: '(1920 - 1992)', image: '/musa.jpg' },

    // --- 7. SORU: BABA TAHIRÊ URYAN ---
    { type: 'question', name: 'BABA TAHIRÊ URYAN', image: '/tahir.jpg', hints: ['Dubeytî', 'Hemedan', 'Yarsan', 'Sedsala 11an'] },
    { type: 'answer', name: 'Baba Tahirê Uryan', detail: '(935 - 1010)', image: '/tahir.jpg' },

    // --- 8. SORU: FEQÎYÊ TEYRAN ---
    { type: 'question', name: 'FEQÎYÊ TEYRAN', image: '/feqi.jpg', hints: ['Zimanê Çivîkan', 'Zembîlfiroş', 'Av û Av', 'Miks (Bahçesaray)'] },
    { type: 'answer', name: 'Feqiyê Teyran', detail: 'Helbestvanê Klasîk', image: '/feqi.jpg' },

    // --- SONUÇ ---
    { type: 'end', image: '/logo.png' }
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

      {/* Ana Kapsayıcı */}
      <div className={`bg-black text-white flex flex-col items-center justify-center p-4 overflow-hidden relative transition-all duration-300 ${
        isFullScreen ? 'fixed inset-0 w-screen h-screen z-[100]' : 'min-h-[85vh]'
      }`}>
        
        {/* Tam Ekran Butonu */}
        <button 
          onClick={toggleFullScreen}
          className="absolute top-6 right-6 z-50 bg-white/10 backdrop-blur-md p-3 rounded-full hover:bg-white/20 transition-all text-white border border-white/10 group"
          title="Tam Ekran"
        >
          {isFullScreen ? <Minimize size={24} /> : <Maximize size={24} />}
        </button>

        {/* İlerleme Çubuğu */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gray-800">
          <div 
            className="h-full bg-gradient-to-r from-yellow-500 to-yellow-300 transition-all duration-500"
            style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
          ></div>
        </div>

        <AnimatePresence mode='wait'>
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
            transition={{ duration: 0.4 }}
            className="text-center w-full max-w-6xl flex flex-col items-center justify-center h-full px-4"
          >
            {/* --- KAPAK SLAYTI --- */}
            {currentData.type === 'cover' && (
              <div className="flex flex-col items-center">
                <motion.img 
                  src={currentData.image} 
                  alt="Logo" 
                  className="w-56 h-56 mb-8 object-contain drop-shadow-[0_0_35px_rgba(234,179,8,0.3)]"
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
                <h1 className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200 mb-4 tracking-wider">
                  {currentData.title}
                </h1>
                <h2 className="text-4xl text-gray-300 font-bold tracking-widest">{currentData.subtitle}</h2>
                
                <button 
                  onClick={nextSlide} 
                  className="mt-16 bg-yellow-500 text-black px-16 py-5 rounded-full text-2xl font-black hover:bg-yellow-400 transition-all hover:scale-105 shadow-[0_0_30px_rgba(234,179,8,0.4)]"
                >
                  DEST PÊ BIKE
                </button>
              </div>
            )}

            {/* --- SORU SLAYTI (GELİŞTİRİLDİ) --- */}
            {currentData.type === 'question' && (
              <div className="flex flex-col items-center w-full">
                <div className="relative mb-10 group">
                  {/* Resim Çerçevesi */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-yellow-600 to-yellow-300 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
                  <img 
                    src={currentData.image} 
                    alt="Kî ye ev?" 
                    className="relative h-[45vh] object-contain rounded-xl border-2 border-yellow-500/50 shadow-2xl z-10"
                    onError={(e) => {e.target.src = 'https://placehold.co/600x800/1a1a1a/FFF?text=Wêne+Tune';}}
                  />
                  <div className="absolute -bottom-5 -right-5 z-20 bg-yellow-500 text-black p-4 rounded-full shadow-lg animate-bounce">
                    <HelpCircle size={36} strokeWidth={3} />
                  </div>
                </div>
                
                <h2 className="text-7xl font-black text-white/90 mb-10 tracking-[0.2em] animate-pulse">
                  ???
                </h2>

                {/* İpuçları (Çakışma Önleyici Düzen) */}
                {currentData.hints && currentData.hints.length > 0 ? (
                  <div className="flex flex-wrap justify-center items-center gap-4 max-w-4xl">
                    {currentData.hints.map((hint, index) => (
                      <motion.div 
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.2 }}
                        className="px-6 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-yellow-300 text-xl font-medium shadow-[0_0_15px_rgba(0,0,0,0.5)] hover:bg-white/10 transition-colors"
                      >
                        {hint}
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-xl italic font-light tracking-wide">Tenê li wêne binêre...</p>
                )}
              </div>
            )}

            {/* --- CEVAP SLAYTI --- */}
            {currentData.type === 'answer' && (
              <div className="flex flex-col items-center">
                <motion.div 
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: [0, 1.2, 1], rotate: 0 }}
                  transition={{ duration: 0.6 }}
                  className="mb-8"
                >
                  <Star size={100} className="text-green-500 fill-current drop-shadow-[0_0_25px_rgba(34,197,94,0.6)]" />
                </motion.div>
                
                <img 
                  src={currentData.image} 
                  alt={currentData.name} 
                  className="h-[35vh] object-contain rounded-xl border-4 border-green-500 mb-8 shadow-[0_0_50px_rgba(34,197,94,0.2)]"
                />
                
                <h2 className="text-6xl text-white font-black mb-4 tracking-wide drop-shadow-lg">{currentData.name}</h2>
                <p className="text-3xl text-gray-300 font-light bg-white/5 px-8 py-2 rounded-full border border-white/10">
                  {currentData.detail}
                </p>
              </div>
            )}

            {/* --- SONUÇ SLAYTI --- */}
            {currentData.type === 'end' && (
              <div className="flex flex-col items-center justify-center h-full">
                <motion.div
                  className="relative"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="absolute inset-0 bg-blue-500 rounded-full blur-[100px] opacity-20 animate-pulse"></div>
                  <img 
                    src="/logo.png"
                    alt="YTU Kurdî"
                    className="w-80 h-80 object-contain relative z-10 drop-shadow-2xl"
                  />
                </motion.div>

                <div className="mt-20">
                  <button 
                    onClick={resetGame} 
                    className="group flex items-center gap-4 bg-white text-black px-12 py-5 rounded-full text-2xl font-bold hover:bg-gray-200 transition-all shadow-[0_0_40px_rgba(255,255,255,0.2)]"
                  >
                    <RefreshCcw size={28} className="group-hover:rotate-180 transition-transform duration-500" />
                    Dîsa Bileyîze
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* --- MODERN NAVİGASYON BUTONLARI (Alt Köşeler) --- */}
        {currentData.type !== 'cover' && currentData.type !== 'end' && (
          <div className="absolute bottom-0 left-0 w-full p-8 flex justify-between items-end z-50 pointer-events-none">
            {/* Sol Buton */}
            <button 
              onClick={prevSlide}
              className="pointer-events-auto w-16 h-16 flex items-center justify-center rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-all transform hover:scale-110 active:scale-95"
            >
              <ChevronLeft size={32} />
            </button>

            {/* Sağ Buton (Daha Belirgin) */}
            <button 
              onClick={nextSlide}
              className="pointer-events-auto w-20 h-20 flex items-center justify-center rounded-full bg-yellow-500 text-black border-4 border-yellow-600/30 hover:bg-yellow-400 hover:border-yellow-500/50 shadow-[0_0_30px_rgba(234,179,8,0.4)] transition-all transform hover:scale-110 active:scale-95"
            >
              <ChevronRight size={40} strokeWidth={3} />
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Listik;