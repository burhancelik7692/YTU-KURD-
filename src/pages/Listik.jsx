import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, RefreshCcw, Star, HelpCircle, Maximize, Minimize, Settings, Play, BookOpen, Users, Info } from 'lucide-react';

// --- VERİTABANI: 50+ KÜRT ŞAİR VE YAZAR ---
const POETS_DATABASE = [
  // 1. ERKEN DÖNEM VE KLASİK KURMANCÎ (10-17. YY)
  { id: 'c1', name: 'Baba Tahirê Uryan', category: 'classic', image: '/tahir.jpg', hints: ['Sedsala 11an', 'Rubayî', 'Hemedan', 'Mîstîk'], bio: 'Yek ji helbestvanên herî kevn ên Rojhilatê ye. Bi "Dubeytî"yên xwe yên mîstîk û felsefî tê nasîn.' },
  { id: 'c2', name: 'Elî Herîrî', category: 'classic', image: '/heriri.jpg', hints: ['Helbestvanê Pêşîn', 'Hekarî', 'Sedsala 11an', 'Klasîk'], bio: 'Yek ji pêşengên edebiyata kurdî ya klasîk tê qebûlkirin.' },
  { id: 'c3', name: 'Melayê Batê', category: 'classic', image: '/bate.jpg', hints: ['Mewlûda Kurdî', 'Hekarî', 'Klasîk', 'Sedsala 15an'], bio: 'Mewlûda Kurdî ya herî navdar nivîsandiye û di medreseyan de tê xwendin.' },
  { id: 'c4', name: 'Melayê Cizîrî', category: 'classic', image: '/ciziri.jpg', hints: ['Mîrê Evînê', 'Dîwan', 'Cizîra Botan', 'Tesewif'], bio: 'Pêşengê helbesta klasîk a kurmancî ye. Di helbestên xwe de evîna xwedayî û tesewif bi hostayî hunandiye.' },
  { id: 'c5', name: 'Feqiyê Teyran', category: 'classic', image: '/feqi.jpg', hints: ['Zimanê Çivîkan', 'Zembîlfiroş', 'Av û Av', 'Miks'], bio: 'Helbestvanê xweza û evînê ye. Tê gotin ku zimanê çivîkan fêm dikir.' },
  { id: 'c6', name: 'Yusuf Yaska', category: 'classic', image: '/yaska.jpg', hints: ['Goranî', 'Sedsala 16an', 'Helbesta Kevn', 'Şarezûr'], bio: 'Yek ji nûnerên destpêkê yên helbesta zaravayê Goranî ye.' },
  { id: 'c7', name: 'Ehmedê Xanî', category: 'classic', image: '/xani.jpg', hints: ['Mem û Zîn', 'Fîlozof', 'Çiyayê Agirî', 'Neteweyî'], bio: 'Fîlozof û helbestvanê mezin ê kurd e. Bi berhema "Mem û Zîn" tê nasîn.' },
  { id: 'c8', name: 'Îsmaîl Beyazîdî', category: 'classic', image: '/beyazidi.jpg', hints: ['Ferheng', 'Gulzar', 'Bazîd', 'Klasîk'], bio: 'Di serdema klasîk de ferheng û helbest nivîsandiye.' },
  { id: 'c9', name: 'Şêx Şemsedînê Exlatî', category: 'classic', image: '/exlati.jpg', hints: ['Exlat (Bitlîs)', 'Tesewif', 'Sedsala 17an', 'Helbest'], bio: 'Bi helbestên xwe yên tesewifî tê nasîn.' },
  { id: 'c10', name: 'Mîna', category: 'classic', image: '/mina.jpg', hints: ['Jina Helbestvan', 'Sedsala 17an', 'Evîn', 'Klasîk'], bio: 'Yek ji jinên helbestvan ên kêm ên wê serdemê ye.' },

  // 2. GORANÎ / HEWRAMÎ EKOLÜ (18. YY)
  { id: 'g1', name: 'Mele Perîşan', category: 'classic', image: '/perisan.jpg', hints: ['Goranî', 'Dînewer', 'Sedsala 14an', 'Mîstîk'], bio: 'Bi zaravayê Goranî helbestên mîstîk nivîsandiye.' },
  { id: 'g2', name: 'Mistefa Bêsaranî', category: 'classic', image: '/besarani.jpg', hints: ['Goranî', 'Xweza', 'Lîrîk', 'Sedsala 17an'], bio: 'Hostayê helbesta lîrîk û xwezayê ye.' },
  { id: 'g3', name: 'Xanayê Qûbadî', category: 'classic', image: '/qubadi.jpg', hints: ['Şîrîn û Xusrew', 'Goranî', 'Werger', 'Sedsala 18an'], bio: 'Mesneviya Şîrîn û Xusrew bi kurdî nivîsandiye.' },
  { id: 'g4', name: 'Sareng Elmas Xan', category: 'classic', image: '/elmas.jpg', hints: ['Şehname', 'Goranî', 'Destan', 'Sedsala 18an'], bio: 'Kevneşopiya Şehnameyê aniye nav edebiyata kurdî.' },
  { id: 'g5', name: 'Şeyda Hewramî', category: 'classic', image: '/seyda.jpg', hints: ['Hewraman', 'Goranî', 'Sedsala 18an', 'Dîwan'], bio: 'Helbestvanekî girîng ê herêma Hewramanê ye.' },
  { id: 'g6', name: 'Mewlewî Tawegozî', category: 'classic', image: '/mewlewi.jpg', hints: ['Lûtkeya Goranî', 'Tesewif', 'Helebçe', 'Sedsala 19an'], bio: 'Lûtkeya helbesta Goranî û tesewifê ye.' },

  // 3. BABAN EKOLÜ VE SORANÎ (19. YY)
  { id: 'b1', name: 'Nalî', category: 'classic', image: '/nali.jpg', hints: ['Soranî', 'Xak û Welat', 'Şarezûr', 'Matematîkzan'], bio: 'Damezrînerê ekola helbesta Soranî ye. Matematîkzan û zimannas bû.' },
  { id: 'b2', name: 'Salem', category: 'classic', image: '/salem.jpg', hints: ['Mersiye', 'Baban', 'Silêmanî', 'Sedsala 19an'], bio: 'Bi mersiyeyên xwe yên ji bo rûxandina Mîrnişîna Baban tê nasîn.' },
  { id: 'b3', name: 'Kurdî (Mistefa Beg)', category: 'classic', image: '/kurdi.jpg', hints: ['Lîrîk', 'Soranî', 'Evîn', 'Silêmanî'], bio: 'Helbestên evînî û lîrîk nivîsandiye.' },
  { id: 'b4', name: 'Mestûre Erdelan', category: 'classic', image: '/mesture.jpg', hints: ['Jina Yekemîn a Dîrokzan', 'Erdelan', 'Sine', 'Helbestvan'], bio: 'Jina yekemîn a dîrokzan li Rojhilata Navîn e. Helbestvaneke xurt bû.' },
  { id: 'b5', name: 'Mehwî', category: 'classic', image: '/mehwi.jpg', hints: ['Soranî', 'Felsefe', 'Tesewif', 'Mehkema'], bio: 'Helbestên kûr ên tesewifî û felsefî nivîsandiye.' },
  { id: 'b6', name: 'Şêx Riza Talebanî', category: 'classic', image: '/reza.jpg', hints: ['Hîcîv (Rexne)', 'Kerkûk', 'Helbesta Tûj', 'Sedsala 19an'], bio: 'Hostayê mezin ê hîcîv (yergi) û rexneyê ye.' },
  { id: 'b7', name: 'Wefayî', category: 'classic', image: '/wefayi.jpg', hints: ['Mahabad', 'Tesewif', 'Evîna Xwedayî', 'Lîrîk'], bio: 'Evîn û tesewif di helbestên wî de bûne yek.' },
  { id: 'b8', name: 'Hacî Qadirê Koyî', category: 'classic', image: '/koyi.jpg', hints: ['Neteweperwer', 'Koye', 'Pêşeng', 'Stenbol'], bio: 'Pêşengê fikra neteweyî ya nûjen di helbestê de ye.' },
  { id: 'b9', name: 'Edeb (Misbah)', category: 'classic', image: '/edeb.jpg', hints: ['Soranî', 'Evîn', 'Nexweşî', 'Sedsala 19an'], bio: 'Helbestvanekî lîrîk ê serdema Baban e.' },
  { id: 'b10', name: 'Siyehpûş', category: 'classic', image: '/siyehpos.jpg', hints: ['Seyfûlmutûk', 'Destan', 'Urmiye', 'Klasîk'], bio: 'Bi destana Seyfûlmutûk tê nasîn.' },
  { id: 'b11', name: 'Pertew Begê Hekarî', category: 'classic', image: '/pertew.jpg', hints: ['Hekarî', 'Dîwan', 'Evîn', 'Sedsala 19an'], bio: 'Ji Hekariyê dengê helbesta klasîk e.' },
  { id: 'b12', name: 'Harîq', category: 'classic', image: '/hariq.jpg', hints: ['Soranî', 'Şewitî', 'Sedsala 19an', 'Dîwan'], bio: 'Helbestvanekî girîng ê sedsala 19an e.' },

  // 4. MODERN DÖNEM (20. YY)
  { id: 'm1', name: 'Pîremêrd', category: 'modern', image: '/piremerd.jpg', hints: ['Rojnameger', 'Newroz', 'Silêmanî', 'Jîn'], bio: 'Agirê Newrozê yê nûjen vêxistiye. Rojnameger û rewşenbîr e.' },
  { id: 'm2', name: 'Zîwer', category: 'modern', image: '/ziwer.jpg', hints: ['Niştiman', 'Soranî', 'Mamoste', 'Sedsala 20an'], bio: 'Helbestên niştimanî nivîsandiye.' },
  { id: 'm3', name: 'Fayiql Bêkes', category: 'modern', image: '/fayiq.jpg', hints: ['Bavê Şêrko', 'Niştiman', 'Soranî', 'Têkoşer'], bio: 'Helbestvanê niştimanperwer û bavê Şêrko Bêkes e.' },
  { id: 'm4', name: 'Abdulla Goran', category: 'modern', image: '/goran.jpg', hints: ['Bavê Helbesta Nûjen', 'Serbest', 'Behişt û Yadgar', 'Soranî'], bio: 'Bavê helbesta nûjen û serbest (kîloya azad) a kurdî ye.' },
  { id: 'm5', name: 'Cegerxwîn', category: 'modern', image: '/cegerxwin.jpg', hints: ['Kîme Ez?', 'Karker û Cotkar', 'Stockholm', 'Mamoste'], bio: 'Dengê şoreş û têkoşîna gelê kurd e. Helbestên wî pir bandor li gel kirine.' },
  { id: 'm6', name: 'Osman Sebrî', category: 'modern', image: '/osman.jpg', hints: ['Apo', 'Alfabeya Latînî', 'Şam', 'Têkoşer'], bio: 'Pêşengê alfabeya latînî û helbesta epîk e.' },
  { id: 'm7', name: 'Tîrêj', category: 'modern', image: '/tirej.jpg', hints: ['Xortên Kurd', 'Rojava', 'Cegerxwîn', 'Helbest'], bio: 'Nûnerekî xurt ê ekola Cegerxwîn e.' },
  { id: 'm8', name: 'Qedrî Can', category: 'modern', image: '/qedrican.jpg', hints: ['Helbesta Nûjen', 'Moskova', 'Çîrok', 'Dêrik'], bio: 'Pêşengê helbesta nûjen li Rojavayê Kurdistanê ye.' },
  { id: 'm9', name: 'Dildar', category: 'modern', image: '/dildar.jpg', hints: ['Ey Reqîb', 'Sirûda Neteweyî', 'Yûnis Rauf', 'Koye'], bio: 'Helbestvanê sirûda neteweyî "Ey Reqîb" e.' },
  { id: 'm10', name: 'Hejar Mukriyanî', category: 'modern', image: '/hejar.jpg', hints: ['Werger (Şerefname)', 'Çêştî Mecêвър', 'Mahabad', 'Ferheng'], bio: 'Wergêrê rubayiyên Xeyyam û nivîskarê ferhengan e.' },
  { id: 'm11', name: 'Hêmin Mukriyanî', category: 'modern', image: '/hemin.jpg', hints: ['Naley Cudayî', 'Mahabad', 'Tarîk û Rûn', 'Evîn'], bio: 'Helbestvanê mezin ê serdema Komara Mahabadê ye.' },
  { id: 'm12', name: 'Nûredîn Zaza', category: 'modern', image: '/zaza.jpg', hints: ['Siyaset', 'Ronahî', 'Nivîskar', 'Çîrok'], bio: 'Siyasetmedar û çîroknivîsekî hêja ye.' },

  // 5. ÇAĞDAŞ DÖNEM VE SOVYET (1950+)
  { id: 's1', name: 'Fêrîkê Ûsiv', category: 'modern', image: '/ferik.jpg', hints: ['Yêrêvan', 'Lîrîk', 'Sovyet', 'Pamp'], bio: 'Dengê lîrîk ê helbesta kurdên Sovyetê ye.' },
  { id: 's2', name: 'Şikoyê Hesen', category: 'modern', image: '/siko.jpg', hints: ['Kaladoçka', 'Kafkasya', 'Hêvî', 'Sovyet'], bio: 'Dengê xemgîn ê kurdên Kafkasyayê ye.' },
  { id: 's3', name: 'Şêrko Bêkes', category: 'modern', image: '/serko.jpg', hints: ['Împeratorê Helbestê', 'Helebçe', 'Pepûle', 'Silêmanî'], bio: 'Nûjenkerê helbesta kurdî ya sedsala 20an e. Împeratorê helbestê.' },
  { id: 's4', name: 'Latîf Helmet', category: 'modern', image: '/latif.jpg', hints: ['Sûrrealîzm', 'Kerkûk', 'Nûjen', 'Pêşeng'], bio: 'Bi îmgiyên xwe yên nûjen û sûrrealîst tê nasîn.' },
  { id: 's5', name: 'Refîq Sabir', category: 'modern', image: '/refiq.jpg', hints: ['Helebçe', 'Trajedî', 'Swêd', 'Helbest'], bio: 'Helbestvanê trajedî û êşa Helebçeyê ye.' },
  { id: 's6', name: 'Erebê Şemo', category: 'modern', image: '/semo.jpg', hints: ['Şivanê Kurmanca', 'Roman', 'Elegez', 'Ermenistan'], bio: 'Bavê romana kurdî tê qebûlkirin.' },
  { id: 's7', name: 'Arjen Arî', category: 'modern', image: '/arjen.jpg', hints: ['Ev Çiya Rûsipî ne', 'Amed', 'Ramûsan', 'Bakur'], bio: 'Dengê herî xurt ê helbesta nûjen a Bakur e.' },
  { id: 's8', name: 'Berken Bereh', category: 'modern', image: '/berken.jpg', hints: ['Dilê Min', 'Şirnex', 'Nûjen', 'Helbest'], bio: 'Helbestvanekî girîng ê nifşê îro ye.' },
  { id: 's9', name: 'Rênas Jiyan', category: 'modern', image: '/renas.jpg', hints: ['Janya', 'Post-Modern', 'Qoser', 'Mexzena Xwînê'], bio: 'Nûnerê herî girîng ê helbesta postmodern a kurdî ye.' },
  { id: 's10', name: 'Kawa Nemir', category: 'modern', image: '/kawa.jpg', hints: ['Werger', 'Ulysses', 'Hamlet', 'Balyoz'], bio: 'Bi wergerên xwe yên şaheser (Hamlet, Ulysses) tê nasîn.' },
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

    const finalQuestions = shuffled.slice(0, questionCount);
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

  // --- ARKA PLAN BİLEŞENİ (YTU KURDÎ TEMASI) ---
  const Background = () => (
    <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none overflow-hidden bg-[#0a0a0a]">
      {/* 1. Gradyan Zemin */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-black to-emerald-900/20 z-10"></div>
      
      {/* 2. Hareketli Işıklar */}
      <motion.div 
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-600/30 rounded-full blur-[120px]"
        animate={{ x: [0, 50, 0], y: [0, -50, 0], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-emerald-600/30 rounded-full blur-[120px]"
        animate={{ x: [0, -50, 0], y: [0, 50, 0], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* 3. Logo (Nefes Alan) */}
      <motion.img 
        src="/logo.png" 
        alt="Background Logo" 
        className="w-[80vw] md:w-[35vw] object-contain opacity-5 blur-sm z-0"
        animate={{ scale: [1, 1.05, 1], rotate: [0, 2, -2, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );

  // 1. SETUP SCREEN
  if (gameState === 'setup') {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
        <Helmet><title>Sazkirin - Lîstika Helbestvanan</title></Helmet>
        <Background />
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative z-20 text-center max-w-2xl w-full bg-black/60 backdrop-blur-2xl p-8 rounded-[2rem] border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          <img src="/logo.png" className="w-28 h-28 mx-auto mb-6 drop-shadow-[0_0_20px_rgba(59,130,246,0.5)]" alt="Logo" />
          <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-white to-emerald-400 mb-8 tracking-wide uppercase">
            Lîstika Helbestvanan
          </h1>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white/5 p-5 rounded-2xl border border-white/10 hover:border-blue-500/50 transition-colors">
              <h3 className="text-lg font-bold mb-4 flex items-center justify-center gap-2 text-blue-400"><BookOpen size={20}/> Kategorî</h3>
              <div className="flex flex-col gap-2">
                {['all', 'classic', 'modern'].map((cat) => (
                  <button key={cat} onClick={() => setSelectedCategory(cat)} className={`py-3 px-4 rounded-xl font-bold transition-all text-sm border ${selectedCategory === cat ? 'bg-gradient-to-r from-blue-600 to-emerald-600 text-white border-transparent shadow-lg scale-105' : 'bg-transparent text-gray-400 border-gray-700 hover:text-white'}`}>
                    {cat === 'all' ? 'Têkel (Hemû)' : cat === 'classic' ? 'Klasîk' : 'Nûjen'}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white/5 p-5 rounded-2xl border border-white/10 hover:border-emerald-500/50 transition-colors">
              <h3 className="text-lg font-bold mb-4 flex items-center justify-center gap-2 text-emerald-400"><Clock size={20}/> Hejmar</h3>
              <div className="grid grid-cols-2 gap-3">
                {[5, 10, 20, 50].map((num) => (
                  <button key={num} onClick={() => setQuestionCount(num)} className={`py-3 rounded-xl font-bold transition-all text-sm border ${questionCount === num ? 'bg-gradient-to-r from-emerald-600 to-blue-600 text-white border-transparent shadow-lg scale-105' : 'bg-transparent text-gray-400 border-gray-700 hover:text-white'}`}>
                    {num}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button onClick={startGame} className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 py-5 rounded-2xl text-2xl font-black hover:scale-[1.02] active:scale-95 transition-all shadow-[0_0_40px_rgba(59,130,246,0.4)] flex items-center justify-center gap-3 text-white border border-white/10">
            <Play fill="currentColor" /> DEST PÊ BIKE
          </button>
        </motion.div>
      </div>
    );
  }

  // 2. GAME SCREEN
  if (gameState === 'playing') {
    const currentQ = activeQuestions[currentIndex];

    return (
      <div className={`bg-black text-white flex flex-col h-screen overflow-hidden relative transition-all duration-300 ${isFullScreen ? 'z-[100]' : ''}`}>
        <Helmet><title>Lîstik - {currentIndex + 1}/{activeQuestions.length}</title></Helmet>
        <Background />

        {/* Üst Panel */}
        <div className="h-20 flex items-center justify-between px-6 bg-gradient-to-b from-black/80 to-transparent z-50">
          <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
             <span className="text-blue-400 font-black text-xl font-mono">{currentIndex + 1}</span>
             <span className="text-gray-500 text-lg">/</span>
             <span className="text-gray-400 text-lg">{activeQuestions.length}</span>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setGameState('setup')} className="p-3 rounded-full bg-white/5 hover:bg-white/20 transition text-white border border-white/10 backdrop-blur-md"><Settings size={20} /></button>
            <button onClick={toggleFullScreen} className="p-3 rounded-full bg-white/5 hover:bg-white/20 transition text-white border border-white/10 backdrop-blur-md">{isFullScreen ? <Minimize size={20} /> : <Maximize size={20} />}</button>
          </div>
        </div>

        {/* İlerleme Çubuğu */}
        <div className="absolute top-0 left-0 w-full h-1 bg-white/10 z-50">
          <motion.div 
            className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500" 
            initial={{ width: 0 }}
            animate={{ width: `${((currentIndex + 1) / activeQuestions.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {/* Orta Alan (İçerik) */}
        <div className="flex-1 flex flex-col items-center justify-center overflow-y-auto px-4 py-2 scrollbar-hide z-30">
          <AnimatePresence mode='wait'>
            <motion.div
              key={currentQ.id + (showAnswer ? '_ans' : '_que')}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center w-full max-w-5xl"
            >
              {/* Resim Çerçevesi */}
              <div className="relative mb-8 group w-full max-w-md mx-auto">
                <div className={`absolute -inset-1 bg-gradient-to-tr rounded-[2.5rem] blur-xl opacity-60 transition duration-700 ${showAnswer ? 'from-blue-600 via-purple-500 to-emerald-500' : 'from-blue-800 to-emerald-800'}`}></div>
                
                <div className="relative p-1 bg-gray-900 rounded-[2rem] border border-white/10 overflow-hidden shadow-2xl">
                  <img 
                    src={currentQ.image} 
                    alt="Kî ye ev?" 
                    className="w-full h-[40vh] md:h-[50vh] object-cover bg-gray-800"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://placehold.co/600x800/111/444?text=${showAnswer ? currentQ.name.charAt(0) : '?'}&font=roboto`;
                    }}
                  />
                  
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 backdrop-blur-md border border-white/20 rounded-lg text-xs font-bold uppercase tracking-wider text-white ${currentQ.category === 'classic' ? 'bg-amber-600/80' : 'bg-blue-600/80'}`}>
                      {currentQ.category === 'classic' ? 'Klasîk' : 'Nûjen'}
                    </span>
                  </div>
                </div>

                <div className={`absolute -bottom-5 -right-5 z-30 p-4 rounded-full shadow-2xl border-4 border-black transition-all duration-500 ${showAnswer ? 'bg-blue-600 scale-110' : 'bg-white text-black animate-pulse'}`}>
                  {showAnswer ? <Star size={32} fill="white" className="text-white"/> : <HelpCircle size={32} className="text-black"/>}
                </div>
              </div>

              {/* Metin Alanı */}
              {showAnswer ? (
                <div className="text-center max-w-3xl animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <h2 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 mb-6 tracking-wide drop-shadow-[0_0_25px_rgba(255,255,255,0.2)]">
                    {currentQ.name}
                  </h2>
                  <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-lg text-left relative overflow-hidden group hover:bg-white/10 transition-colors">
                    <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-500 to-emerald-500"></div>
                    <h3 className="text-blue-400 font-bold text-sm uppercase tracking-widest mb-2 flex items-center gap-2">
                      <Info size={16} /> Derbarê Wî/Wê De
                    </h3>
                    <p className="text-xl md:text-2xl text-gray-200 font-light leading-relaxed">
                      {currentQ.bio || "Agahî nehat dîtin."}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center w-full">
                  <h2 className="text-7xl md:text-9xl font-black text-white/10 mb-8 tracking-[0.3em] select-none animate-pulse">???</h2>
                  <div className="flex flex-wrap justify-center items-center gap-3 max-w-5xl">
                    {currentQ.hints.map((hint, index) => (
                      <motion.div 
                        key={index}
                        initial={{ opacity: 0, y: 30, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ delay: index * 0.15, type: "spring" }}
                        className="px-6 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-blue-100 text-xl font-medium shadow-lg hover:bg-blue-500/20 hover:border-blue-500/50 hover:scale-105 transition-all cursor-help"
                      >
                        {hint}
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 3. ALT KUMANDA PANELİ */}
        <div className="h-28 flex items-center justify-center pb-6 px-4 z-50">
          <div className="flex items-center gap-8 bg-black/60 backdrop-blur-2xl px-10 py-4 rounded-full border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
            <button onClick={handlePrev} disabled={currentIndex === 0 && !showAnswer} className={`p-4 rounded-full transition-all duration-300 group border border-white/5 ${currentIndex === 0 && !showAnswer ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white/10 active:scale-90 hover:border-white/20'}`}>
              <ChevronLeft size={32} className="text-gray-400 group-hover:text-white" />
            </button>

            <button onClick={handleNext} className={`relative flex items-center justify-center w-24 h-24 -mt-8 rounded-full transition-all duration-300 transform shadow-2xl border-[6px] border-black ${showAnswer ? 'bg-gradient-to-br from-yellow-400 to-orange-500 hover:scale-110 hover:shadow-yellow-500/50' : 'bg-gradient-to-br from-blue-600 to-emerald-600 hover:scale-110 hover:shadow-blue-500/50'}`}>
              {showAnswer ? <ChevronRight size={48} className="text-black ml-1" strokeWidth={4} /> : <HelpCircle size={48} className="text-white" strokeWidth={3} />}
            </button>

            <button onClick={() => setGameState('setup')} className="p-4 rounded-full transition-all duration-300 group border border-white/5 hover:bg-white/10 active:scale-90 hover:border-white/20" title="Derkeve">
              <RefreshCcw size={28} className="text-gray-400 group-hover:text-white" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 3. FINISHED SCREEN
  if (gameState === 'finished') {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
        <Helmet><title>Dawî - Lîstika Helbestvanan</title></Helmet>
        <Background />
        
        {/* KONFETİ EFEKTİ */}
        <div className="absolute inset-0 pointer-events-none">
           {[...Array(30)].map((_, i) => (
             <motion.div
               key={i}
               className={`absolute w-3 h-3 rounded-full ${i % 2 === 0 ? 'bg-blue-500' : 'bg-emerald-500'}`}
               initial={{ x: "50%", y: "50%", opacity: 1 }}
               animate={{ x: `${Math.random() * 100}%`, y: `${Math.random() * 100}%`, opacity: 0, scale: 0 }}
               transition={{ duration: 2.5, repeat: Infinity, delay: Math.random() * 2 }}
             />
           ))}
        </div>
        
        <motion.div className="relative z-20 flex flex-col items-center text-center max-w-2xl bg-black/40 backdrop-blur-xl p-12 rounded-[3rem] border border-white/5" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8, type: "spring" }}>
          <motion.div className="relative mb-10" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
            <div className="absolute inset-0 bg-blue-500 rounded-full blur-[80px] opacity-50 animate-pulse"></div>
            <img src="/logo.png" alt="YTU Kurdî" className="w-64 h-64 object-contain relative z-10 drop-shadow-2xl" />
          </motion.div>

          <h1 className="text-6xl md:text-8xl font-black text-white mb-6 tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500">Qediya!</h1>
          <p className="text-2xl text-gray-300 mb-12 font-light">Spas ji bo beşdariyê.</p>
          
          <button onClick={() => setGameState('setup')} className="group flex items-center gap-4 bg-white text-black px-12 py-5 rounded-full text-2xl font-bold hover:bg-gray-200 transition-all shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:scale-105">
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
```

### Yayınla 🚀

Terminale şu komutları yazıp gönder:

```bash
git add .
git commit -m "Listik sade hal 50 sair YTU Kurdi temasi"
git push