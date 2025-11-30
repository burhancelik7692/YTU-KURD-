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

  // OYUN VERİLERİ (Genişletilmiş Liste)
  const slides = [
    // 1. KAPAK
    {
      type: 'cover',
      title: 'LÎSTIK',
      subtitle: 'KÎ YE EV?',
      image: '/logo.png'
    },
    
    // --- 1. SORU: CEGERXWÎN ---
    {
      type: 'question',
      name: 'MAMOSTE CEGERXWÎN',
      image: '/cegerxwin.jpg', 
      hints: ['Gulfiroş', 'Kîme Ez?', 'Stockholm'] 
    },
    {
      type: 'answer',
      name: 'Cegerxwîn',
      detail: '(1903 - 1984)',
      image: '/cegerxwin.jpg'
    },

    // --- 2. SORU: EHMEDÊ XANÎ ---
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

    // --- 3. SORU: ŞÊRKO BÊKES ---
    {
      type: 'question',
      name: 'ŞÊRKO BÊKES',
      image: '/serko.jpg',
      hints: ['Helbesta Nûjen', 'Helebçe', 'Pepûle', 'Silêmanî']
    },
    {
      type: 'answer',
      name: 'Şêrko Bêkes',
      detail: 'Imparatorê Helbestê',
      image: '/serko.jpg'
    },

    // --- 4. SORU: MESTÛRE ERDELAN (YENİ) ---
    {
      type: 'question',
      name: 'MESTÛRE ERDELAN',
      image: '/mesture.jpg',
      hints: ['Jina Yekemîn a Dîrokzan', 'Erdelan', 'Sine', 'Helbestvan']
    },
    {
      type: 'answer',
      name: 'Mestûre Erdelan',
      detail: '(1805 - 1848)',
      image: '/mesture.jpg'
    },

    // --- 5. SORU: MELAYÊ CIZÎRÎ (YENİ) ---
    {
      type: 'question',
      name: 'MELAYÊ CIZÎRÎ',
      image: '/ciziri.jpg',
      hints: ['Dîwan', 'Evîn û Tesewif', 'Cizîra Botan', 'Sebahul Xeyr']
    },
    {
      type: 'answer',
      name: 'Melayê Cizîrî',
      detail: '(1570 - 1640)',
      image: '/ciziri.jpg'
    },

    // --- 6. SORU: MUSA ANTER (YENİ) ---
    {
      type: 'question',
      name: 'MUSA ANTER',
      image: '/musa.jpg',
      hints: ['Apê Mûsa', 'Çinar', 'Qimil', 'Rojnameger']
    },
    {
      type: 'answer',
      name: 'Musa Anter',
      detail: '(1920 - 1992)',
      image: '/musa.jpg'
    },

    // --- 7. SORU: BABA TAHIRÊ URYAN (YENİ) ---
    {
      type: 'question',
      name: 'BABA TAHIRÊ URYAN',
      image: '/tahir.jpg',
      hints: ['Dubeytî', 'Hemedan', 'Yarsan', 'Sedsala 11an']
    },
    {
      type: 'answer',
      name: 'Baba Tahirê Uryan',
      detail: '(935 - 1010)',
      image: '/tahir.jpg'
    },

    // --- 8. SORU: FEQÎYÊ TEYRAN ---
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

    // --- SONUÇ ---
    {
      type: 'end',
      image: '/logo.png'
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

      <div className={`bg-black text-white flex flex-col items-center justify-center p-4 overflow-hidden relative transition-all duration-300 ${
        isFullScreen ? 'fixed inset-0 w-screen h-screen z-[100]' : 'min-h-[85vh]'
      }`}>
        
        <button 
          onClick={toggleFullScreen}
          className="absolute top-6 right-6 z-50 bg-gray-800/50 p-3 rounded-full hover:bg-gray-700 transition-all text-white border border-gray-600 group"
          title="Tam Ekran"
        >
          {isFullScreen ? <Minimize size={24} /> : <Maximize size={24} />}
        </button>

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
            className="text-center w-full max-w-5xl flex flex-col items-center justify-center h-full"
          >
            {/* KAPAK */}
            {currentData.type === 'cover' && (
              <div className="flex flex-col items-center">
                <motion.img 
                  src={currentData.image} 
                  alt="Logo" 
                  className="w-56 h-56 mb-8 object-contain drop-shadow-[0_0_25px_rgba(255,255,255,0.2)]"
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
                <h1 className="text-7xl font-black text-yellow-400 mb-4 tracking-wider">{currentData.title}</h1>
                <h2 className="text-4xl text-white font-bold">{currentData.subtitle}</h2>
                <button onClick={nextSlide} className="mt-12 bg-yellow-500 text-black px-12 py-4 rounded-full text-2xl font-bold hover:bg-yellow-400 transition-all hover:scale-110 shadow-lg shadow-yellow-500/20">
                  DEST PÊ BIKE
                </button>
              </div>
            )}

            {/* SORU */}
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
                <h2 className="text-6xl font-black text-yellow-400 mb-8 tracking-widest animate-pulse">???</h2>
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

            {/* CEVAP */}
            {currentData.type === 'answer' && (
              <div className="flex flex-col items-center">
                <motion.div initial={{ scale: 0 }} animate={{ scale: [0, 1.5, 1] }} className="mb-8">
                  <Star size={100} className="text-green-500 fill-current drop-shadow-[0_0_15px_rgba(34,197,94,0.8)]" />
                </motion.div>
                <img src={currentData.image} alt={currentData.name} className="h-[35vh] object-contain rounded-xl border-4 border-green-500 mb-8 shadow-[0_0_50px_rgba(34,197,94,0.3)]" />
                <h2 className="text-6xl text-white font-black mb-4 tracking-wide">{currentData.name}</h2>
                <p className="text-3xl text-gray-400 font-light">{currentData.detail}</p>
              </div>
            )}

            {/* SONUÇ */}
            {currentData.type === 'end' && (
              <div className="flex flex-col items-center justify-center h-full">
                <motion.div className="relative" animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
                  <motion.div className="absolute inset-0 bg-blue-500 rounded-full blur-3xl opacity-30" animate={{ opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 3, repeat: Infinity }}></motion.div>
                  <img src="/logo.png" alt="YTU Kurdî" className="w-80 h-80 object-contain relative z-10" />
                </motion.div>
                <div className="mt-16">
                  <button onClick={resetGame} className="flex items-center gap-3 bg-white text-black px-12 py-5 rounded-full text-2xl font-bold hover:bg-gray-200 transition-all transform hover:scale-105 shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                    <RefreshCcw size={28} /> Dîsa Bileyîze
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {currentData.type !== 'cover' && currentData.type !== 'end' && (
          <div className="absolute bottom-8 flex gap-8 z-50">
            <button onClick={prevSlide} className="bg-gray-800/50 p-4 rounded-full hover:bg-gray-700 transition-all text-white border border-gray-600"><ChevronLeft size={32} /></button>
            <button onClick={nextSlide} className="bg-yellow-500 p-4 rounded-full hover:bg-yellow-400 transition-all text-black shadow-[0_0_20px_rgba(234,179,8,0.5)] scale-110 hover:scale-125"><ChevronRight size={32} /></button>
          </div>
        )}
      </div>
    </>
  );
};

export default Listik;