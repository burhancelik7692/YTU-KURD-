import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, RefreshCcw, Star, HelpCircle, Maximize, Minimize, Settings, Play, BookOpen, Clock } from 'lucide-react';

// --- VERİTABANI (50+ ŞAİR VE YAZAR) ---
const POETS_DATABASE = [
  // --- KLASİK DÖNEM (15) ---
  { id: 'classic_1', name: 'Ehmedê Xanî', category: 'classic', image: '/xani.jpg', hints: ['Mem û Zîn', 'Çiyayê Agirî', 'Fîlozof', 'Sedsala 17an'] },
  { id: 'classic_2', name: 'Melayê Cizîrî', category: 'classic', image: '/ciziri.jpg', hints: ['Dîwan', 'Evîn û Tesewif', 'Cizîra Botan', 'Sedsala 16an'] },
  { id: 'classic_3', name: 'Feqiyê Teyran', category: 'classic', image: '/feqi.jpg', hints: ['Zimanê Çivîkan', 'Zembîlfiroş', 'Av û Av', 'Miks'] },
  { id: 'classic_4', name: 'Baba Tahirê Uryan', category: 'classic', image: '/tahir.jpg', hints: ['Dubeytî', 'Hemedan', 'Yarsan', 'Sedsala 11an'] },
  { id: 'classic_5', name: 'Elî Herîrî', category: 'classic', image: '/heriri.jpg', hints: ['Helbestvanê Pêşîn', 'Hekarî', 'Sedsala 11an', 'Klasîk'] },
  { id: 'classic_6', name: 'Mestûre Erdelan', category: 'classic', image: '/mesture.jpg', hints: ['Jina Yekemîn a Dîrokzan', 'Erdelan', 'Sine', 'Helbestvan'] },
  { id: 'classic_7', name: 'Mewlana Xalid', category: 'classic', image: '/xalid.jpg', hints: ['Neqşîbendî', 'Silêmanî', 'Dîwan', 'Zanyar'] },
  { id: 'classic_8', name: 'Şerefxanê Bedlîsî', category: 'classic', image: '/seref.jpg', hints: ['Şerefname', 'Dîrok', 'Bedlîs', 'Mîr'] },
  { id: 'classic_9', name: 'Nalî', category: 'classic', image: '/nali.jpg', hints: ['Soranî', 'Xak û Welat', 'Şarezûr', 'Matematîkzan'] },
  { id: 'classic_10', name: 'Mehwî', category: 'classic', image: '/mehwi.jpg', hints: ['Soranî', 'Tesewif', 'Silêmanî', 'Evîn'] },
  { id: 'classic_11', name: 'Xanai Qubadi', category: 'classic', image: '/xanai.jpg', hints: ['Şîrîn û Xusrew', 'Soranî', 'Werger', 'Sedsala 18an'] },
  { id: 'classic_12', name: 'Siyehpoş', category: 'classic', image: '/siyehpos.jpg', hints: ['Seyfulmuluk', 'Urmiye', 'Çîrok', 'Klasîk'] },
  { id: 'classic_13', name: 'Pertew Begê Hekarî', category: 'classic', image: '/pertew.jpg', hints: ['Hekarî', 'Dîwan', 'Evîn', 'Sedsala 19an'] },
  { id: 'classic_14', name: 'Şêx Rezayê Talebanî', category: 'classic', image: '/reza.jpg', hints: ['Hîcîv (Rexne)', 'Kerkûk', 'Helbesta Tûj', 'Sedsala 19an'] },
  { id: 'classic_15', name: 'Wefayî', category: 'classic', image: '/wefayi.jpg', hints: ['Mahabad', 'Tesewif', 'Evîna Xwedayî', 'Sedsala 19an'] },

  // --- MODERN DÖNEM (35) ---
  { id: 'modern_1', name: 'Cegerxwîn', category: 'modern', image: '/cegerxwin.jpg', hints: ['Gulfiroş', 'Kîme Ez?', 'Stockholm', 'Mamoste'] },
  { id: 'modern_2', name: 'Şêrko Bêkes', category: 'modern', image: '/serko.jpg', hints: ['Helbesta Nûjen', 'Helebçe', 'Pepûle', 'Silêmanî'] },
  { id: 'modern_3', name: 'Musa Anter', category: 'modern', image: '/musa.jpg', hints: ['Apê Mûsa', 'Çinar', 'Qimil', 'Rojnameger'] },
  { id: 'modern_4', name: 'Mehmed Uzun', category: 'modern', image: '/uzun.jpg', hints: ['Romannivîs', 'Bîra Qederê', 'Siya Evînê', 'Swêd'] },
  { id: 'modern_5', name: 'Celadet Alî Bedirxan', category: 'modern', image: '/celadet.jpg', hints: ['Hawar', 'Alfabe', 'Ronahî', 'Mîr'] },
  { id: 'modern_6', name: 'Osman Sebrî', category: 'modern', image: '/osman.jpg', hints: ['Apo', 'Helbestvan', 'Şam', 'Têkoşer'] },
  { id: 'modern_7', name: 'Qedrîcan', category: 'modern', image: '/qedrican.jpg', hints: ['Helbesta Nûjen', 'Moskova', 'Çîrok', 'Dêrik'] },
  { id: 'modern_8', name: 'Erebê Şemo', category: 'modern', image: '/semo.jpg', hints: ['Şivanê Kurmanca', 'Yekemîn Roman', 'Elegez', 'Ermenistan'] },
  { id: 'modern_9', name: 'Hêmin Mukriyanî', category: 'modern', image: '/hemin.jpg', hints: ['Naley Cudayî', 'Mahabad', 'Kovar', 'Helbest'] },
  { id: 'modern_10', name: 'Hejar Mukriyanî', category: 'modern', image: '/hejar.jpg', hints: ['Werger (Şerefname)', 'Ferheng', 'Mahabad', 'Çêştî Mecêвър'] },
  { id: 'modern_11', name: 'Şivan Perwer', category: 'modern', image: '/sivan.jpg', hints: ['Dengbêj', 'Saz', 'Welatê Min', 'Efsane'] },
  { id: 'modern_12', name: 'Yılmaz Güney', category: 'modern', image: '/yilmaz.jpg', hints: ['Sînema', 'Yol', 'Çirkin Kral', 'Cannes'] },
  { id: 'modern_13', name: 'Ahmet Kaya', category: 'modern', image: '/kaya.jpg', hints: ['Muzîk', 'Hoşçakal Gözüm', 'Gülten', 'Parîs'] },
  { id: 'modern_14', name: 'Ferhad Pîrbal', category: 'modern', image: '/pirbal.jpg', hints: ['Hewlêr', 'Felsefe', 'Helbesta Şêt', 'Nûjen'] },
  { id: 'modern_15', name: 'Bextiyar Elî', category: 'modern', image: '/bextiyar.jpg', hints: ['Roman', 'Êvara Perwaneyê', 'Xezal', 'Felsefe'] },
  { id: 'modern_16', name: 'Arjen Arî', category: 'modern', image: '/arjen.jpg', hints: ['Ev Çiya Rûsipî ne', 'Amed', 'Helbest', 'Ramûsan'] },
  { id: 'modern_17', name: 'Rênas Jiyan', category: 'modern', image: '/renas.jpg', hints: ['Janya', 'Helbesta Post-Modern', 'Qoser', 'Mexzena Xwînê'] },
  { id: 'modern_18', name: 'Fatma Savcı', category: 'modern', image: '/fatma.jpg', hints: ['Helbest', 'Jin', 'Amed', 'Gulên Qasid'] },
  { id: 'modern_19', name: 'Kawa Nemir', category: 'modern', image: '/kawa.jpg', hints: ['Werger', 'Ulysses', 'Hamlet', 'Kovar'] },
  { id: 'modern_20', name: 'Jan Dost', category: 'modern', image: '/jandost.jpg', hints: ['Mîjabad', 'Kobani', 'Dîwan', 'Roman'] },
  { id: 'modern_21', name: 'Helîm Yûsiv', category: 'modern', image: '/helim.jpg', hints: ['Sobarto', 'Tirsa Bê Diran', 'Romannivîs', 'Amûdê'] },
  { id: 'modern_22', name: 'Firat Cewerî', category: 'modern', image: '/firat.jpg', hints: ['Nûdem', 'Payiza Dereng', 'Swêd', 'Roman'] },
  { id: 'modern_23', name: 'Mîran Janbar', category: 'modern', image: '/miran.jpg', hints: ['Qolyoz', 'Roman', 'Amed', 'Wêje'] },
  { id: 'modern_24', name: 'Ciwan Haco', category: 'modern', image: '/ciwan.jpg', hints: ['Muzîk', 'Rock/Jazz', 'Diyarbekir Mala Min e', 'Qamişlo'] },
  { id: 'modern_25', name: 'Aynur Doğan', category: 'modern', image: '/aynur.jpg', hints: ['Keça Kurd', 'Muzîk', 'Dersim', 'Womex'] },
  { id: 'modern_26', name: 'Mem Ararat', category: 'modern', image: '/mem.jpg', hints: ['Muzîk', 'Zana û Andok', 'Dêrik', 'Dengê Nû'] },
  { id: 'modern_27', name: 'Mihemed Şêxo', category: 'modern', image: '/sexo.jpg', hints: ['Ay Lê Gulê', 'Bavê Felek', 'Qamişlo', 'Saz'] },
  { id: 'modern_28', name: 'Tehsîn Taha', category: 'modern', image: '/tehsin.jpg', hints: ['Amêdî', 'Muzîk', 'Evîn', 'Klasîka Nû'] },
  { id: 'modern_29', name: 'Aram Tîgran', category: 'modern', image: '/aram.jpg', hints: ['Zimanê Kurdî', 'Cûmbûş', 'Ermenî', 'Qamişlo'] },
  { id: 'modern_30', name: 'Mikaîl Aslan', category: 'modern', image: '/mikail.jpg', hints: ['Dersim', 'Zazakî', 'Muzîk', 'Elqajiyê'] },
  { id: 'modern_31', name: 'Ahmet Arîf', category: 'modern', image: '/arif.jpg', hints: ['Hasretinden Prangalar', 'Diyarbekir', 'Şiir', 'Anadolu'] },
  { id: 'modern_32', name: 'Yaşar Kemal', category: 'modern', image: '/yasar.jpg', hints: ['İnce Memed', 'Çukurova', 'Efsane', 'Hemite'] },
  { id: 'modern_33', name: 'Tahîr Elçî', category: 'modern', image: '/elci.jpg', hints: ['Aşitî', 'Hiqûq', 'Amed', 'Dora Minarê'] },
  { id: 'modern_34', name: 'Nûredîn Zaza', category: 'modern', image: '/zaza.jpg', hints: ['Siyaset', 'Ronahî', 'Nivîskar', 'Çîrok'] },
  { id: 'modern_35', name: 'Kamuran Bedirxan', category: 'modern', image: '/kamuran.jpg', hints: ['Mîr', 'Parîs', 'Ziman', 'Kovar'] }
];

const Listik = () => {
  // OYUN DURUMLARI: 'setup' (giriş), 'playing' (oyun), 'finished' (bitiş)
  const [gameState, setGameState] = useState('setup');
  const [activeQuestions, setActiveQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  
  // AYARLAR
  const [selectedCategory, setSelectedCategory] = useState('all'); // all, classic, modern
  const [questionCount, setQuestionCount] = useState(10); // 5, 10, 20, 50

  useEffect(() => {
    const handleFullScreenChange = () => {
      if (!document.fullscreenElement) setIsFullScreen(false);
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

  // --- OYUNU BAŞLATMA VE KARIŞTIRMA MANTIĞI ---
  const startGame = () => {
    // 1. Kategoriyi Filtrele
    let filtered = POETS_DATABASE;
    if (selectedCategory !== 'all') {
      filtered = POETS_DATABASE.filter(p => p.category === selectedCategory);
    }

    // 2. Karıştır (Shuffle - Fisher-Yates Algoritması)
    let shuffled = [...filtered];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    // 3. Sayıyı Kısıtla
    const finalQuestions = shuffled.slice(0, questionCount);

    setActiveQuestions(finalQuestions);
    setCurrentIndex(0);
    setShowAnswer(false);
    setGameState('playing');
  };

  const handleNext = () => {
    if (showAnswer) {
      // Cevap açıksa, sonraki soruya geç
      if (currentIndex < activeQuestions.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setShowAnswer(false);
      } else {
        setGameState('finished');
      }
    } else {
      // Cevap kapalıysa, cevabı göster
      setShowAnswer(true);
    }
  };

  const handlePrev = () => {
    if (showAnswer) {
      setShowAnswer(false);
    } else if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setShowAnswer(true);
    }
  };

  // --- EKRANLAR ---

  // 1. GİRİŞ EKRANI (AYARLAR)
  if (gameState === 'setup') {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
        <Helmet><title>Sazkirin - Lîstik</title></Helmet>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-2xl w-full">
          <img src="/logo.png" className="w-32 h-32 mx-auto mb-6 animate-bounce" alt="Logo" />
          <h1 className="text-5xl font-black text-yellow-400 mb-8">SAZKIRINA LÎSTIKÊ</h1>
          
          {/* Kategori Seçimi */}
          <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800 mb-6">
            <h3 className="text-xl font-bold mb-4 flex items-center justify-center gap-2"><BookOpen className="text-yellow-500"/> Kategorî Hilbijêre</h3>
            <div className="grid grid-cols-3 gap-4">
              {['all', 'classic', 'modern'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`py-3 px-4 rounded-xl font-bold transition-all ${
                    selectedCategory === cat ? 'bg-yellow-500 text-black scale-105' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                  }`}
                >
                  {cat === 'all' ? 'Têkel (Hemû)' : cat === 'classic' ? 'Klasîk' : 'Nûjen'}
                </button>
              ))}
            </div>
          </div>

          {/* Soru Sayısı */}
          <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800 mb-8">
            <h3 className="text-xl font-bold mb-4 flex items-center justify-center gap-2"><Clock className="text-blue-500"/> Hejmara Pirsan</h3>
            <div className="grid grid-cols-4 gap-4">
              {[5, 10, 20, 50].map((num) => (
                <button
                  key={num}
                  onClick={() => setQuestionCount(num)}
                  className={`py-3 px-4 rounded-xl font-bold transition-all ${
                    questionCount === num ? 'bg-blue-600 text-white scale-105' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          <button onClick={startGame} className="w-full bg-gradient-to-r from-green-500 to-emerald-600 py-5 rounded-2xl text-2xl font-black hover:scale-105 transition-transform shadow-[0_0_30px_rgba(16,185,129,0.4)] flex items-center justify-center gap-3">
            <Play fill="currentColor" /> DEST PÊ BIKE
          </button>
        </motion.div>
      </div>
    );
  }

  // 2. OYUN EKRANI
  if (gameState === 'playing') {
    const currentQ = activeQuestions[currentIndex];

    return (
      <div className={`bg-black text-white flex flex-col items-center justify-center p-4 overflow-hidden relative transition-all duration-300 ${
        isFullScreen ? 'fixed inset-0 w-screen h-screen z-[100]' : 'min-h-[85vh]'
      }`}>
        <Helmet><title>Lîstik - YTU Kurdî</title></Helmet>

        {/* Araçlar */}
        <div className="absolute top-6 right-6 z-50 flex gap-4">
          <button onClick={() => setGameState('setup')} className="bg-white/10 p-3 rounded-full hover:bg-white/20 transition-all text-white border border-white/10" title="Ayarlar">
            <Settings size={24} />
          </button>
          <button onClick={toggleFullScreen} className="bg-white/10 p-3 rounded-full hover:bg-white/20 transition-all text-white border border-white/10" title="Tam Ekran">
            {isFullScreen ? <Minimize size={24} /> : <Maximize size={24} />}
          </button>
        </div>

        {/* İlerleme */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gray-800">
          <div className="h-full bg-gradient-to-r from-yellow-500 to-yellow-300 transition-all duration-500" style={{ width: `${((currentIndex + 1) / activeQuestions.length) * 100}%` }}></div>
        </div>

        <AnimatePresence mode='wait'>
          <motion.div
            key={currentQ.id + (showAnswer ? '_ans' : '_que')} // Key değişince animasyon çalışır
            initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
            transition={{ duration: 0.4 }}
            className="text-center w-full max-w-6xl flex flex-col items-center justify-center h-full px-4"
          >
            {/* RESİM ALANI (Ortak) */}
            <div className="relative mb-8 group">
              {/* Çerçeve Efekti */}
              <div className={`absolute -inset-1 bg-gradient-to-r rounded-2xl blur opacity-40 transition duration-500 ${showAnswer ? 'from-green-600 to-emerald-400 opacity-70' : 'from-yellow-600 to-yellow-300'}`}></div>
              
              <img 
                src={currentQ.image} 
                alt="Kî ye ev?" 
                className={`relative h-[50vh] object-contain rounded-xl border-4 shadow-2xl z-10 transition-all duration-500 ${
                  showAnswer ? 'border-green-500' : 'border-yellow-500/50'
                }`}
                // RESİM YOKSA GÖSTERİLECEK YEDEK (Placeholder)
                onError={(e) => {
                  e.target.onerror = null; // Sonsuz döngüyü engelle
                  e.target.src = `https://placehold.co/600x800/111/FFF?text=${showAnswer ? currentQ.name.replace(' ', '+') : '???'}&font=roboto`;
                }}
              />
              
              {/* İkon */}
              <div className={`absolute -bottom-6 -right-6 text-black p-4 rounded-full shadow-lg z-20 transition-all duration-500 ${showAnswer ? 'bg-green-500 scale-110' : 'bg-yellow-500 animate-bounce'}`}>
                {showAnswer ? <Star size={40} fill="white" className="text-white"/> : <HelpCircle size={40} />}
              </div>
            </div>

            {/* METİN ALANI */}
            {showAnswer ? (
              // CEVAP MODU
              <div className="flex flex-col items-center">
                <h2 className="text-6xl text-white font-black mb-4 tracking-wide drop-shadow-[0_0_15px_rgba(34,197,94,0.5)]">
                  {currentQ.name}
                </h2>
                <div className="flex items-center gap-3">
                  <span className="text-xl px-3 py-1 bg-green-900/50 text-green-400 rounded border border-green-700 uppercase font-bold tracking-widest">{currentQ.category === 'classic' ? 'Klasîk' : 'Nûjen'}</span>
                </div>
              </div>
            ) : (
              // SORU MODU
              <div className="flex flex-col items-center w-full">
                <h2 className="text-7xl font-black text-white/90 mb-8 tracking-[0.2em] animate-pulse">???</h2>
                <div className="flex flex-wrap justify-center gap-4 max-w-4xl">
                  {currentQ.hints.map((hint, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.15 }}
                      className="px-6 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-yellow-300 text-xl font-medium shadow-lg"
                    >
                      {hint}
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* --- KONTROL BUTONLARI --- */}
        <div className="absolute bottom-0 left-0 w-full p-8 flex justify-between items-end z-50 pointer-events-none">
          <button 
            onClick={handlePrev}
            className={`pointer-events-auto w-16 h-16 flex items-center justify-center rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-all ${currentIndex === 0 && !showAnswer ? 'opacity-0' : 'opacity-100'}`}
          >
            <ChevronLeft size={32} />
          </button>

          <button 
            onClick={handleNext}
            className={`pointer-events-auto w-24 h-24 flex items-center justify-center rounded-full shadow-[0_0_40px_rgba(0,0,0,0.5)] transition-all transform hover:scale-110 active:scale-95 border-4 ${
              showAnswer 
                ? 'bg-yellow-500 text-black border-yellow-300 hover:bg-yellow-400' // İleri git (Sarı)
                : 'bg-green-600 text-white border-green-400 hover:bg-green-500' // Cevabı Göster (Yeşil)
            }`}
          >
            {showAnswer ? <ChevronRight size={48} strokeWidth={3} /> : <HelpCircle size={48} strokeWidth={3} />}
          </button>
        </div>
      </div>
    );
  }

  // 3. BİTİŞ EKRANI
  if (gameState === 'finished') {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
        {/* Arka Plan Efekti */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black"></div>
        
        <motion.div className="relative z-10 flex flex-col items-center" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8 }}>
          {/* Nefes Alan Logo */}
          <motion.div
            className="relative mb-12"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="absolute inset-0 bg-blue-500 rounded-full blur-[80px] opacity-30 animate-pulse"></div>
            <img src="/logo.png" alt="YTU Kurdî" className="w-72 h-72 object-contain relative z-10 drop-shadow-2xl" />
          </motion.div>

          <h1 className="text-6xl font-black text-white mb-8 tracking-widest uppercase">Lîstik Qediya</h1>
          
          <button 
            onClick={() => setGameState('setup')} 
            className="group flex items-center gap-4 bg-white text-black px-12 py-5 rounded-full text-2xl font-bold hover:bg-gray-200 transition-all shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:scale-105"
          >
            <RefreshCcw size={28} className="group-hover:rotate-180 transition-transform duration-500" />
            Dîsa Bileyîze
          </button>
        </motion.div>
      </div>
    );
  }

  return null;
};

export default Listik;