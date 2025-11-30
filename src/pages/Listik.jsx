import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, RefreshCcw, Star, HelpCircle, Maximize, Minimize, Settings, Play, BookOpen, Clock, Info } from 'lucide-react';

// --- VERİTABANI: 20 EFSANE KÜRT ŞAİR VE YAZAR ---
const POETS_DATABASE = [
  // --- KLASİK DÖNEM ---
  { id: 'c1', name: 'Ehmedê Xanî', fullName: 'Ehmedê Xanî', category: 'classic', image: '/xani.jpg', hints: ['Mem û Zîn', 'Çiyayê Agirî', 'Fîlozof', 'Sedsala 17an'], bio: 'Fîlozof û helbestvanê mezin ê kurd e. Bi berhema "Mem û Zîn" tê nasîn.' },
  { id: 'c2', name: 'Melayê Cizîrî', fullName: 'Şêx Ehmedê Cizîrî', category: 'classic', image: '/ciziri.jpg', hints: ['Dîwan', 'Evîn û Tesewif', 'Cizîra Botan', 'Sedsala 16an'], bio: 'Pêşengê helbesta klasîk a kurmancî ye. Di helbestên xwe de evîna xwedayî hunandiye.' },
  { id: 'c3', name: 'Baba Tahirê Uryan', fullName: 'Baba Tahirê Uryan', category: 'classic', image: '/Uryan.png', hints: ['Dubeytî', 'Hemedan', 'Yarsan', 'Sedsala 11an'], bio: 'Yek ji helbestvanên herî kevn ên Rojhilatê ye. Bi "Dubeytî"yên xwe navdar e.' },
  { id: 'c4', name: 'Mestûre Erdelan', fullName: 'Mestûre Erdelan', category: 'classic', image: '/Mesture-Erdelan.jpg', hints: ['Jina Yekemîn a Dîrokzan', 'Erdelan', 'Sine', 'Helbestvan'], bio: 'Jina yekemîn a dîrokzan li Rojhilata Navîn e. Hem helbestvan hem jî serwer bû.' },
  { id: 'c5', name: 'Elî Herîrî', fullName: 'Elî Herîrî', category: 'classic', image: '/eliheriri.jpg', hints: ['Helbestvanê Pêşîn', 'Hekarî', 'Sedsala 11an', 'Klasîk'], bio: 'Wekî yekem helbestvanê klasîk ê kurd tê naskirin.' },
  { id: 'c6', name: 'Melayê Batê', fullName: 'Melayê Batê', category: 'classic', image: '/bate.jpg', hints: ['Mewlûda Kurdî', 'Hekarî', 'Klasîk', 'Sedsala 15an'], bio: 'Nivîskarê Mewlûda Kurdî ya herî navdar e.' },
  { id: 'c7', name: 'Nalî', fullName: 'Mele Xidir (Nalî)', category: 'classic', image: '/nali.jpg', hints: ['Soranî', 'Xak û Welat', 'Şarezûr', 'Matematîk'], bio: 'Damezrînerê ekola babanî ya şiîra soranî ye.' },
  { id: 'c8', name: 'Hacî Qadirê Koyî', fullName: 'Hacî Qadirê Koyî', category: 'classic', image: '/goyi.jpg', hints: ['Neteweperwer', 'Koye', 'Pêşeng', 'Stenbol'], bio: 'Pêşengê fikra neteweyî ya nûjen di helbestê de ye.' },

  // --- MODERN DÖNEM ---
  { id: 'm1', name: 'Cegerxwîn', fullName: 'Cegerxwîn', category: 'modern', image: '/cegerxwin.jpg', hints: ['Kîme Ez?', 'Karker û Cotkar', 'Stockholm', 'Mamoste'], bio: 'Dengê şoreş û têkoşîna gelê kurd e.' },
  { id: 'm2', name: 'Şêrko Bêkes', fullName: 'Şêrko Bêkes', category: 'modern', image: '/serko.jpg', hints: ['Împeratorê Helbestê', 'Helebçe', 'Pepûle', 'Silêmanî'], bio: 'Nûjenkerê helbesta kurdî ya sedsala 20an e.' },
  { id: 'm3', name: 'Pîremêrd', fullName: 'Pîremêrd', category: 'modern', image: '/piremerd.jpg', hints: ['Rojnameger', 'Newroz', 'Silêmanî', 'Jîn'], bio: 'Agirê Newrozê yê nûjen vêxistiye. Rojnameger û rewşenbîrekî mezin e.' },
  { id: 'm4', name: 'Abdulla Goran', fullName: 'Abdulla Goran', category: 'modern', image: '/goran.jpg', hints: ['Bavê Helbesta Nûjen', 'Serbest', 'Behişt û Yadgar', 'Soranî'], bio: 'Bavê helbesta nûjen û serbest (kîloya azad) a kurdî ye.' },
  { id: 'm5', name: 'Osman Sebrî', fullName: 'Osman Sebrî (Apo)', category: 'modern', image: '/osmansebri.jpg', hints: ['Apo', 'Alfabeya Latînî', 'Şam', 'Têkoşer'], bio: 'Pêşengê alfabeya latînî ya kurdî ye. Siyasetmedar û helbestvan.' },
  { id: 'm6', name: 'Qedrî Can', fullName: 'Qedrî Can', category: 'modern', image: '/qedri.jpg', hints: ['Helbesta Nûjen', 'Moskova', 'Çîrok', 'Dêrik'], bio: 'Pêşengê helbesta nûjen li Rojavayê Kurdistanê ye.' },
  { id: 'm7', name: 'Dildar', fullName: 'Yûnis Rauf (Dildar)', category: 'modern', image: '/dildar.jpg', hints: ['Ey Reqîb', 'Sirûda Neteweyî', 'Yûnis Rauf', 'Koye'], bio: 'Helbestvanê sirûda neteweyî ya kurdan "Ey Reqîb" e.' },
  { id: 'm8', name: 'Nûredîn Zaza', fullName: 'Dr. Nûredîn Zaza', category: 'modern', image: '/zaza.jpg', hints: ['Siyaset', 'Ronahî', 'Nivîskar', 'Çîrok'], bio: 'Siyasetmedar, ronakbîr û çîroknivîsekî hêja ye.' },
  { id: 'm9', name: 'Fêrîkê Ûsiv', fullName: 'Fêrîkê Ûsiv', category: 'modern', image: '/usiv.jpg', hints: ['Yêrêvan', 'Lîrîk', 'Sovyet', 'Pamp'], bio: 'Dengê lîrîk ê helbesta kurdên Sovyetê ye.' },
  { id: 'm10', name: 'Erebê Şemo', fullName: 'Erebê Şemo', category: 'modern', image: '/şemo.jpg', hints: ['Şivanê Kurmanca', 'Roman', 'Elegez', 'Ermenistan'], bio: 'Bavê romana kurdî tê qebûlkirin.' },
  { id: 'm11', name: 'Arjen Arî', fullName: 'Arjen Arî', category: 'modern', image: '/ari.jpg', hints: ['Ev Çiya Rûsipî ne', 'Amed', 'Ramûsan', 'Bakur'], bio: 'Dengê herî xurt ê helbesta nûjen a Bakur e.' },
  { id: 'm12', name: 'Rênas Jiyan', fullName: 'Rênas Jiyan', category: 'modern', image: '/jiyan.jpg', hints: ['Janya', 'Post-Modern', 'Qoser', 'Mexzena Xwînê'], bio: 'Nûnerê herî girîng ê helbesta postmodern a kurdî ye.' },
];

const Listik = () => {
  const [gameState, setGameState] = useState('setup');
  const [activeQuestions, setActiveQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  
  const [selectedCategory, setSelectedCategory] = useState('all'); 
  const [questionCount, setQuestionCount] = useState(10); 

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

  const startGame = () => {
    let filtered = POETS_DATABASE;
    if (selectedCategory !== 'all') {
      filtered = POETS_DATABASE.filter(p => p.category === selectedCategory);
    }

    let shuffled = [...filtered];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    const limit = Math.min(questionCount, shuffled.length);
    const finalQuestions = shuffled.slice(0, limit);

    setActiveQuestions(finalQuestions);
    setCurrentIndex(0);
    setShowAnswer(false);
    setGameState('playing');
  };

  const handleNext = () => {
    if (showAnswer) {
      if (currentIndex < activeQuestions.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setShowAnswer(false);
      } else {
        setGameState('finished');
      }
    } else {
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

  // --- ARKA PLAN ---
  const Background = () => (
    <div className="absolute inset-0 z-0 bg-[#0f172a] overflow-hidden pointer-events-none">
      {/* Gradyan Katmanı */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-[#0f172a] to-emerald-900/40 z-10"></div>
      
      {/* Desen Katmanı */}
      <div className="absolute inset-0 z-0 opacity-[0.03]" 
           style={{
             backgroundImage: 'url(/logo.png)',
             backgroundSize: '100px',
             backgroundRepeat: 'repeat',
             transform: 'rotate(-10deg) scale(1.2)'
           }}
      ></div>

      {/* Merkez Işık */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[150px] z-10"></div>
    </div>
  );

  // 1. GİRİŞ EKRANI
  if (gameState === 'setup') {
    return (
      <div className="h-[100dvh] w-screen bg-[#0f172a] text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
        <Helmet><title>Sazkirin - Lîstika Helbestvanan</title></Helmet>
        <Background />
        
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="relative z-20 text-center max-w-xl w-full bg-white/5 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/10 shadow-2xl">
          <img src="/logo.png" className="w-24 h-24 mx-auto mb-6 drop-shadow-xl animate-pulse" alt="Logo" />
          <h1 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-white to-emerald-400 mb-2 tracking-wide uppercase">
            Lîstika Helbestvanan
          </h1>
          <p className="text-gray-400 mb-8">Zanîna xwe ya edebiyatê biceribîne!</p>
          
          <div className="grid grid-cols-1 gap-4 mb-8">
            <div className="bg-black/20 p-4 rounded-xl border border-white/5">
              <h3 className="text-base font-bold mb-3 flex items-center justify-center gap-2 text-blue-400"><BookOpen size={18}/> Kategorî</h3>
              <div className="flex gap-2 justify-center">
                {['all', 'classic', 'modern'].map((cat) => (
                  <button key={cat} onClick={() => setSelectedCategory(cat)} className={`flex-1 py-2 px-2 rounded-lg font-bold transition-all text-xs md:text-sm border ${selectedCategory === cat ? 'bg-blue-600 text-white border-transparent shadow-lg' : 'bg-white/5 text-gray-400 border-transparent hover:bg-white/10 hover:text-white'}`}>
                    {cat === 'all' ? 'Têkel' : cat === 'classic' ? 'Klasîk' : 'Nûjen'}
                  </button>
                ))}
              </div>
            </div>
            <div className="bg-black/20 p-4 rounded-xl border border-white/5">
              <h3 className="text-lg font-bold mb-4 flex items-center justify-center gap-2 text-emerald-400"><Clock size={20}/> Hejmar</h3>
              <div className="flex gap-2 justify-center">
                {[5, 10, 20, 50].map((num) => (
                  <button key={num} onClick={() => setQuestionCount(num)} className={`flex-1 py-2 rounded-lg font-bold transition-all text-sm border ${questionCount === num ? 'bg-emerald-600 text-white border-transparent shadow-lg' : 'bg-white/5 text-gray-400 border-transparent hover:bg-white/10 hover:text-white'}`}>
                    {num}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button onClick={startGame} className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 py-4 rounded-xl text-lg font-black hover:scale-[1.02] active:scale-95 transition-all shadow-lg flex items-center justify-center gap-3 text-white border-t border-white/20">
            <Play fill="currentColor" /> DEST PÊ BIKE
          </button>
        </motion.div>
      </div>
    );
  }

  // 2. OYUN EKRANI (DİKEY DÜZEN - HER EKRANDA AYNI)
  if (gameState === 'playing') {
    const currentQ = activeQuestions[currentIndex];

    return (
      <div className={`bg-[#0f172a] text-white flex flex-col h-[100dvh] w-screen overflow-hidden relative transition-all duration-300 ${isFullScreen ? 'z-[100]' : ''}`}>
        <Helmet><title>Lîstik - {currentIndex + 1}/{activeQuestions.length}</title></Helmet>
        <Background />

        {/* --- ÜST PANEL (SABİT) --- */}
        <div className="h-16 flex-none flex items-center justify-between px-4 z-50 border-b border-white/5 bg-black/30 backdrop-blur-md">
          <div className="flex items-center gap-3">
             <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 font-black text-white shadow-lg text-sm">
               {currentIndex + 1}
             </div>
             <span className="text-gray-400 text-xs font-medium">ji {activeQuestions.length}</span>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setGameState('setup')} className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition text-gray-300 hover:text-white border border-white/5"><Settings size={18} /></button>
            <button onClick={toggleFullScreen} className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition text-gray-300 hover:text-white border border-white/5">{isFullScreen ? <Minimize size={18} /> : <Maximize size={18} />}</button>
          </div>
        </div>

        {/* --- İLERLEME ÇUBUĞU --- */}
        <div className="w-full h-1 bg-white/5 flex-none z-50">
          <motion.div className="h-full bg-gradient-to-r from-blue-500 to-emerald-500" initial={{ width: 0 }} animate={{ width: `${((currentIndex + 1) / activeQuestions.length) * 100}%` }} transition={{ duration: 0.5 }} />
        </div>

        {/* --- ORTA ALAN (FLEX COLUMN - DİKEY DÜZEN) --- */}
        <div className="flex-1 flex flex-col relative z-30 overflow-hidden py-4 px-4">
          <AnimatePresence mode='wait'>
            <motion.div 
              key={currentQ.id + (showAnswer ? '_ans' : '_que')}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col w-full h-full items-center"
            >
              
              {/* 1. RESİM ALANI (ÜST - %45 Yükseklik) */}
              <div className="flex-[4.5] w-full flex items-center justify-center max-h-[45vh]">
                <div className="relative h-full aspect-[3/4] group">
                  <div className={`absolute -inset-1 bg-gradient-to-tr rounded-[2rem] blur-xl opacity-40 transition duration-700 ${showAnswer ? 'from-emerald-500 to-blue-500' : 'from-blue-600 to-purple-600'}`}></div>
                  <div className="relative w-full h-full bg-[#0f172a] rounded-[1.8rem] border border-white/10 overflow-hidden shadow-2xl">
                    <img 
                      src={currentQ.image} 
                      alt="Kî ye ev?" 
                      className="w-full h-full object-cover"
                      onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/600x800/1e293b/94a3b8?text=${showAnswer ? currentQ.name.charAt(0) : '?'}&font=roboto`; }}
                    />
                    
                    <div className="absolute top-3 left-3">
                      <span className={`px-2 py-1 backdrop-blur-md border border-white/20 rounded-md text-[10px] font-bold uppercase tracking-wider text-white shadow-lg ${currentQ.category === 'classic' ? 'bg-amber-600/90' : 'bg-blue-600/90'}`}>
                        {currentQ.category === 'classic' ? 'Klasîk' : 'Nûjen'}
                      </span>
                    </div>
                  </div>
                  <div className={`absolute -bottom-3 -right-3 z-30 p-2 rounded-full shadow-2xl border-2 border-[#0f172a] transition-all duration-500 ${showAnswer ? 'bg-emerald-500 scale-110' : 'bg-blue-600 animate-bounce'}`}>
                    {showAnswer ? <Star size={24} fill="white" className="text-white"/> : <HelpCircle size={24} className="text-white"/>}
                  </div>
                </div>
              </div>

              {/* 2. METİN ALANI (ALT - %40 Yükseklik) */}
              <div className="flex-[4] w-full flex flex-col items-center justify-start pt-4">
                {showAnswer ? (
                  <div className="text-center w-full animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col h-full">
                    {/* İsim */}
                    <h2 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 mb-2 tracking-tight drop-shadow-xl shrink-0">
                      {currentQ.fullName || currentQ.name}
                    </h2>
                    
                    {/* Biyografi (Kaydırılabilir Kutu) */}
                    <div className="bg-white/5 backdrop-blur-md p-4 rounded-xl border border-white/10 shadow-lg text-left relative overflow-hidden group hover:bg-white/10 transition-colors flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20">
                      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-500 to-emerald-500"></div>
                      <h3 className="text-blue-400 font-bold text-xs uppercase tracking-widest mb-2 flex items-center gap-2 sticky top-0 bg-[#0f172a]/0 backdrop-blur-sm pb-1">
                        <Info size={14} /> Derbarê Wî/Wê De
                      </h3>
                      <p className="text-sm md:text-lg text-gray-300 font-light leading-relaxed">
                        {currentQ.bio || "Agahî nehat dîtin."}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center w-full flex flex-col justify-center h-full">
                    <h2 className="text-6xl md:text-8xl font-black text-white/5 mb-4 tracking-[0.2em] select-none animate-pulse shrink-0">???</h2>
                    <div className="flex flex-wrap justify-center items-center gap-2 w-full overflow-y-auto max-h-full">
                      {currentQ.hints.map((hint, index) => (
                        <motion.div 
                          key={index}
                          initial={{ opacity: 0, y: 10, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ delay: index * 0.1, type: "spring" }}
                          className="px-4 py-2 rounded-lg bg-blue-900/30 border border-blue-500/20 backdrop-blur-md text-blue-100 text-sm md:text-lg font-medium shadow-lg hover:bg-blue-500/20 transition-all cursor-help"
                        >
                          {hint}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

        {/* --- 3. ALT KUMANDA PANELİ (SABİT - %15 Yükseklik) --- */}
        <div className="h-24 flex-none flex items-center justify-center px-4 bg-gradient-to-t from-black via-black/80 to-transparent z-50 pb-4">
          <div className="flex items-center gap-6 bg-white/10 backdrop-blur-xl px-8 py-2 rounded-full border border-white/10 shadow-2xl ring-1 ring-white/5">
            <button onClick={handlePrev} disabled={currentIndex === 0 && !showAnswer} className={`p-3 rounded-full transition-all duration-300 group ${currentIndex === 0 && !showAnswer ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white/10 active:scale-95'}`}>
              <ChevronLeft size={24} className="text-gray-400 group-hover:text-white" />
            </button>

            <button onClick={handleNext} className={`relative flex items-center justify-center w-16 h-16 -mt-8 rounded-full transition-all duration-300 transform shadow-2xl border-[5px] border-[#0a0a0a] ${showAnswer ? 'bg-gradient-to-br from-amber-400 to-orange-500 hover:scale-110' : 'bg-gradient-to-br from-blue-500 to-emerald-600 hover:scale-110'}`}>
              {showAnswer ? <ChevronRight size={32} className="text-black ml-1" strokeWidth={4} /> : <HelpCircle size={32} className="text-white" strokeWidth={3} />}
            </button>

            <button onClick={() => setGameState('setup')} className="p-3 rounded-full transition-all duration-300 group hover:bg-white/10 active:scale-95" title="Derkeve">
              <RefreshCcw size={24} className="text-gray-400 group-hover:text-white" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 3. FINISHED SCREEN
  if (gameState === 'finished') {
    return (
      <div className="h-[100dvh] w-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
        <Helmet><title>Dawî - Lîstika Helbestvanan</title></Helmet>
        <Background />
        <div className="absolute inset-0 pointer-events-none">
           {[...Array(30)].map((_, i) => (
             <motion.div key={i} className={`absolute w-3 h-3 rounded-full ${i % 2 === 0 ? 'bg-blue-500' : 'bg-emerald-500'}`} initial={{ x: "50%", y: "50%", opacity: 1 }} animate={{ x: `${Math.random() * 100}%`, y: `${Math.random() * 100}%`, opacity: 0, scale: 0 }} transition={{ duration: 2.5, repeat: Infinity, delay: Math.random() * 2 }} />
           ))}
        </div>
        <motion.div className="relative z-20 flex flex-col items-center text-center max-w-2xl bg-black/40 backdrop-blur-xl p-12 rounded-[3rem] border border-white/5" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8, type: "spring" }}>
          <motion.div className="relative mb-10" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
            <div className="absolute inset-0 bg-blue-500 rounded-full blur-[80px] opacity-50 animate-pulse"></div>
            <img src="/logo.png" alt="YTU Kurdî" className="w-64 h-64 object-contain relative z-10 drop-shadow-2xl" />
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500">Qediya!</h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 font-light">Spas ji bo beşdariyê.</p>
          <button onClick={() => setGameState('setup')} className="group flex items-center gap-4 bg-white text-black px-12 py-5 rounded-full text-xl font-bold hover:bg-gray-200 transition-all shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:scale-105">
            <RefreshCcw size={24} className="group-hover:rotate-180 transition-transform duration-500" />
            Dîsa Bileyîze
          </button>
        </motion.div>
      </div>
    );
  }

  return null;
};

export default Listik;