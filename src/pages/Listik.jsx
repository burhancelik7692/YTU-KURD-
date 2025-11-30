import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, RefreshCcw, Star, HelpCircle, Maximize, Minimize, Settings, Play, BookOpen, Clock, Info } from 'lucide-react';

// --- VERİTABANI: 50 KÜRT ŞAİR VE YAZAR ---
const POETS_DATABASE = [
  // --- 1. ERKEN DÖNEM VE KLASİK KURMANCÎ (10-17. YY) ---
  { 
    id: 'c1', name: 'Baba Tahirê Uryan', category: 'classic', 
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Baba_Tahir.jpg/330px-Baba_Tahir.jpg', 
    hints: ['Sedsala 11an', 'Rubayî', 'Hemedan', 'Mîstîk'], 
    bio: 'Yek ji helbestvanên herî kevn ên Rojhilatê ye. Bi "Dubeytî"yên xwe yên mîstîk û felsefî tê nasîn.' 
  },
  { 
    id: 'c2', name: 'Elî Herîrî', category: 'classic', 
    image: 'https://upload.wikimedia.org/wikipedia/commons/5/53/Eli_Heriri.jpg', 
    hints: ['Helbestvanê Pêşîn', 'Hekarî', 'Sedsala 11an', 'Klasîk'], 
    bio: 'Wekî yekem helbestvanê klasîk ê kurd tê naskirin. Ji herêma Hekariyê ye.' 
  },
  { 
    id: 'c3', name: 'Melayê Batê', category: 'classic', 
    image: 'https://kurdishhistory.org/wp-content/uploads/2021/05/Melaye-Bate.jpg', 
    hints: ['Mewlûda Kurdî', 'Hekarî', 'Klasîk', 'Sedsala 15an'], 
    bio: 'Nivîskarê Mewlûda Kurdî ya herî navdar e ku heta îro di mizgeft û şînan de tê xwendin.' 
  },
  { 
    id: 'c4', name: 'Melayê Cizîrî', category: 'classic', 
    image: '/ciziri.jpg', // PUBLIC DOSYASI
    hints: ['Mîrê Evînê', 'Dîwan', 'Cizîra Botan', 'Tesewif'], 
    bio: 'Lûtkeya helbesta klasîk a kurmancî û tesewifê ye. Di helbestên xwe de evîna xwedayî bi hostayî hunandiye.' 
  },
  { 
    id: 'c5', name: 'Feqiyê Teyran', category: 'classic', 
    image: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/Feqiye_Teyran.jpg', 
    hints: ['Zimanê Çivîkan', 'Zembîlfiroş', 'Av û Av', 'Miks'], 
    bio: 'Helbestvanê xweza û evînê ye. Bi destana Zembîlfiroş û Şêxê Senan navdar e.' 
  },
  { 
    id: 'c6', name: 'Yusuf Yaska', category: 'classic', 
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png', // Resim bulunamadı
    hints: ['Goranî', 'Sedsala 16an', 'Helbesta Kevn', 'Şarezûr'], 
    bio: 'Yek ji nûnerên destpêkê yên edebiyata zaravayê Goranî ye.' 
  },
  { 
    id: 'c7', name: 'Ehmedê Xanî', category: 'classic', 
    image: '/xani.jpg', // PUBLIC DOSYASI
    hints: ['Mem û Zîn', 'Fîlozof', 'Çiyayê Agirî', 'Neteweyî'], 
    bio: 'Fîlozof û helbestvanê mezin ê kurd e. Bi şahesera xwe "Mem û Zîn", bingeha bîra neteweyî daniye.' 
  },
  { 
    id: 'c8', name: 'Îsmaîl Beyazîdî', category: 'classic', 
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png',
    hints: ['Ferheng', 'Gulzar', 'Bazîd', 'Klasîk'], 
    bio: 'Di serdema klasîk de ferheng û helbestên girîng nivîsandiye.' 
  },
  { 
    id: 'c9', name: 'Şêx Şemsedînê Exlatî', category: 'classic', 
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png',
    hints: ['Exlat (Bitlîs)', 'Tesewif', 'Sedsala 17an', 'Helbest'], 
    bio: 'Bi helbestên xwe yên tesewifî tê nasîn.' 
  },
  { 
    id: 'c10', name: 'Mîna', category: 'classic', 
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png',
    hints: ['Jina Helbestvan', 'Sedsala 17an', 'Evîn', 'Klasîk'], 
    bio: 'Yek ji jinên helbestvan ên kêm ên wê serdemê ye ku navê wê gihîştiye me.' 
  },

  // --- 2. GORANÎ / HEWRAMÎ EKOLÜ (18. YY) ---
  { 
    id: 'g1', name: 'Mele Perîşan', category: 'classic', 
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png', 
    hints: ['Goranî', 'Dînewer', 'Sedsala 14an', 'Mîstîk'], 
    bio: 'Bi zaravayê Goranî helbestên mîstîk û dînî nivîsandiye.' 
  },
  { 
    id: 'g2', name: 'Mistefa Bêsaranî', category: 'classic', 
    image: 'https://upload.wikimedia.org/wikipedia/en/9/99/Besarani.jpg', 
    hints: ['Goranî', 'Xweza', 'Lîrîk', 'Sedsala 17an'], 
    bio: 'Hostayê helbesta lîrîk û xwezayê ye di edebiyata Goranî de.' 
  },
  { 
    id: 'g3', name: 'Xanayê Qûbadî', category: 'classic', 
    image: 'https://upload.wikimedia.org/wikipedia/commons/4/42/Xanaye_Qubadi.jpg', 
    hints: ['Şîrîn û Xusrew', 'Goranî', 'Werger', 'Sedsala 18an'], 
    bio: 'Mesneviya navdar "Şîrîn û Xusrew" bi kurdî (Goranî) nivîsandiye.' 
  },
  { 
    id: 'g4', name: 'Sareng Elmas Xan', category: 'classic', 
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png', 
    hints: ['Şehname', 'Goranî', 'Destan', 'Sedsala 18an'], 
    bio: 'Kevneşopiya destana Şehnameyê aniye nav edebiyata kurdî.' 
  },
  { 
    id: 'g5', name: 'Şeyda Hewramî', category: 'classic', 
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png', 
    hints: ['Hewraman', 'Goranî', 'Sedsala 18an', 'Dîwan'], 
    bio: 'Helbestvanekî girîng ê herêma Hewramanê ye.' 
  },
  { 
    id: 'g6', name: 'Mewlewî Tawegozî', category: 'classic', 
    image: 'https://upload.wikimedia.org/wikipedia/commons/3/3c/Mawlawi_Tawagozi.jpg', 
    hints: ['Lûtkeya Goranî', 'Tesewif', 'Helebçe', 'Sedsala 19an'], 
    bio: 'Lûtkeya helbesta Goranî û tesewifê ye. Şagirtên wî bandoreke mezin li edebiyata kurdî kirine.' 
  },

  // --- 3. BABAN EKOLÜ VE SORANÎ (19. YY) ---
  { 
    id: 'b1', name: 'Nalî', category: 'classic', 
    image: 'https://upload.wikimedia.org/wikipedia/commons/7/72/Nali_Sherzor.jpg', 
    hints: ['Soranî', 'Xak û Welat', 'Şarezûr', 'Matematîkzan'], 
    bio: 'Damezrînerê ekola helbesta Soranî ye. Matematîkzan û zimannas bû.' 
  },
  { 
    id: 'b2', name: 'Salem', category: 'classic', 
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Salem_Kurdish_Poet.jpg/220px-Salem_Kurdish_Poet.jpg', 
    hints: ['Mersiye', 'Baban', 'Silêmanî', 'Sedsala 19an'], 
    bio: 'Bi mersiyeyên xwe yên xemgîn ên ji bo rûxandina Mîrnişîna Baban tê nasîn.' 
  },
  { 
    id: 'b3', name: 'Kurdî (Mistefa Beg)', category: 'classic', 
    image: 'https://via.placeholder.com/400x600?text=Kurdi+Mistefa', 
    hints: ['Lîrîk', 'Soranî', 'Evîn', 'Silêmanî'], 
    bio: 'Helbestên evînî û lîrîk bi zimanekî zelal nivîsandiye.' 
  },
  { 
    id: 'b4', name: 'Mestûre Erdelan', category: 'classic', 
    image: 'https://upload.wikimedia.org/wikipedia/commons/0/00/Mastura_Ardalan.jpg', 
    hints: ['Jina Yekemîn a Dîrokzan', 'Erdelan', 'Sine', 'Helbestvan'], 
    bio: 'Jina yekemîn a dîrokzan li Rojhilata Navîn e. Hem helbestvan hem jî serwerê mîrnişîna Erdelanê bû.' 
  },
  { 
    id: 'b5', name: 'Mahwi', category: 'classic', 
    image: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Mahwi.jpg', 
    hints: ['Soranî', 'Felsefe', 'Tesewif', 'Mehkema'], 
    bio: 'Helbestên kûr ên tesewifî û felsefî nivîsandiye.' 
  },
  { 
    id: 'b6', name: 'Şêx Riza Talebanî', category: 'classic', 
    image: 'https://upload.wikimedia.org/wikipedia/commons/d/d3/Sheikh_Raza_Talabani.jpg', 
    hints: ['Hîcîv (Rexne)', 'Kerkûk', 'Helbesta Tûj', 'Sedsala 19an'], 
    bio: 'Hostayê mezin ê hîcîv (yergi) û rexneyê ye. Zimanê wî tûj û wêrek bû.' 
  },
  { 
    id: 'b7', name: 'Wefayî', category: 'classic', 
    image: 'https://upload.wikimedia.org/wikipedia/commons/0/0f/Wafaei.jpg', 
    hints: ['Mahabad', 'Tesewif', 'Evîna Xwedayî', 'Lîrîk'], 
    bio: 'Evîn û tesewif di helbestên wî de bi awayekî lîrîk bûne yek.' 
  },
  { 
    id: 'b8', name: 'Hacî Qadirê Koyî', category: 'classic', 
    image: 'https://upload.wikimedia.org/wikipedia/commons/8/84/Haci_Qadire_Koyi.jpg', 
    hints: ['Neteweperwer', 'Koye', 'Pêşeng', 'Stenbol'], 
    bio: 'Pêşengê fikra neteweyî ya nûjen di helbestê de ye. Pira navbera klasîk û nûjen e.' 
  },
  { 
    id: 'b9', name: 'Edeb (Misbah)', category: 'classic', 
    image: 'https://via.placeholder.com/400x600?text=Edeb', 
    hints: ['Soranî', 'Evîn', 'Nexweşî', 'Sedsala 19an'], 
    bio: 'Helbestvanekî lîrîk ê serdema Baban e ku jiyaneke bi êş derbas kiriye.' 
  },
  { 
    id: 'b10', name: 'Siyehpûş', category: 'classic', 
    image: 'https://via.placeholder.com/400x600?text=Siyehpos', 
    hints: ['Seyfûlmutûk', 'Destan', 'Urmiye', 'Klasîk'], 
    bio: 'Bi destana xwe ya navdar "Seyfûlmutûk û Bedîûlcemal" tê nasîn.' 
  },
  { 
    id: 'b11', name: 'Pertew Begê Hekarî', category: 'classic', 
    image: 'https://via.placeholder.com/400x600?text=Pertew+Beg', 
    hints: ['Hekarî', 'Dîwan', 'Evîn', 'Sedsala 19an'], 
    bio: 'Ji Hekariyê dengê helbesta klasîk û evînî ye.' 
  },
  { 
    id: 'b12', name: 'Harîq', category: 'classic', 
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png', 
    hints: ['Soranî', 'Şewitî', 'Sedsala 19an', 'Dîwan'], 
    bio: 'Helbestvanekî girîng ê sedsala 19an e. Navê wî tê wateya "Şewitî".' 
  },

  // --- 4. MODERN DÖNEM (20. YY) ---
  { 
    id: 'm1', name: 'Pîremêrd', category: 'modern', 
    image: 'https://upload.wikimedia.org/wikipedia/commons/6/64/Piremerd.jpg', 
    hints: ['Rojnameger', 'Newroz', 'Silêmanî', 'Jîn'], 
    bio: 'Agirê Newrozê yê nûjen li Silêmaniyê vêxistiye. Rojnameger, şair û rewşenbîrekî mezin e.' 
  },
  { 
    id: 'm2', name: 'Zîwer', category: 'modern', 
    image: 'https://via.placeholder.com/400x600?text=Ziwer', 
    hints: ['Niştiman', 'Soranî', 'Mamoste', 'Sedsala 20an'], 
    bio: 'Helbestên niştimanî û perwerdeyî nivîsandiye.' 
  },
  { 
    id: 'm3', name: 'Fayiql Bêkes', category: 'modern', 
    image: 'https://upload.wikimedia.org/wikipedia/en/c/cd/Faiq_Bekes.jpg', 
    hints: ['Bavê Şêrko', 'Niştiman', 'Soranî', 'Têkoşer'], 
    bio: 'Helbestvanê niştimanperwer û bavê împeratorê helbestê Şêrko Bêkes e.' 
  },
  { 
    id: 'm4', name: 'Abdulla Goran', category: 'modern', 
    image: 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Abdulla_Goran.jpg', 
    hints: ['Bavê Helbesta Nûjen', 'Serbest', 'Behişt û Yadgar', 'Soranî'], 
    bio: 'Bavê helbesta nûjen û serbest (kîloya azad) a kurdî ye. Kevneşopiya klasîk şikandiye.' 
  },
  { 
    id: 'm5', name: 'Cegerxwîn', category: 'modern', 
    image: '/cegerxwin.jpg', // PUBLIC DOSYASI
    hints: ['Kîme Ez?', 'Karker û Cotkar', 'Stockholm', 'Mamoste'], 
    bio: 'Dengê şoreş û têkoşîna gelê kurd e. Helbestên wî yên civakî û neteweyî pir bandor li gel kirine.' 
  },
  { 
    id: 'm6', name: 'Osman Sebrî', category: 'modern', 
    image: 'https://upload.wikimedia.org/wikipedia/en/8/85/Osman_Sebri.jpg', 
    hints: ['Apo', 'Alfabeya Latînî', 'Şam', 'Têkoşer'], 
    bio: 'Pêşengê alfabeya latînî ya kurdî ye. Hem siyasetmedar hem jî helbestvanekî epîk bû.' 
  },
  { 
    id: 'm7', name: 'Tîrêj', category: 'modern', 
    image: 'https://upload.wikimedia.org/wikipedia/tr/a/a6/Tirej.jpg', 
    hints: ['Xortên Kurd', 'Rojava', 'Cegerxwîn', 'Helbest'], 
    bio: 'Nûnerekî xurt ê ekola Cegerxwîn e li Rojavayê Kurdistanê.' 
  },
  { 
    id: 'm8', name: 'Qedrî Can', category: 'modern', 
    image: 'https://upload.wikimedia.org/wikipedia/commons/1/1c/Qedr%C3%AE_Can.jpg', 
    hints: ['Helbesta Nûjen', 'Moskova', 'Çîrok', 'Dêrik'], 
    bio: 'Pêşengê helbesta nûjen li Rojavayê Kurdistanê ye. Çîrokên wî jî navdar in.' 
  },
  { 
    id: 'm9', name: 'Dildar', category: 'modern', 
    image: 'https://upload.wikimedia.org/wikipedia/commons/5/59/Dildar.jpg', 
    hints: ['Ey Reqîb', 'Sirûda Neteweyî', 'Yûnis Rauf', 'Koye'], 
    bio: 'Helbestvanê sirûda neteweyî ya kurdan "Ey Reqîb" e. Di ciwaniya xwe de wefat kiriye.' 
  },
  { 
    id: 'm10', name: 'Hejar Mukriyanî', category: 'modern', 
    image: 'https://upload.wikimedia.org/wikipedia/commons/e/e6/Hazhar.jpg', 
    hints: ['Werger (Şerefname)', 'Çêştî Mecêвър', 'Mahabad', 'Ferheng'], 
    bio: 'Wergêrê mezin (Şerefname, Quran, Rubayî), ferhengnas û helbestvanekî şoreşger e.' 
  },
  { 
    id: 'm11', name: 'Hêmin Mukriyanî', category: 'modern', 
    image: 'https://upload.wikimedia.org/wikipedia/commons/5/5f/Hemin_Mukriyani.jpg', 
    hints: ['Naley Cudayî', 'Mahabad', 'Tarîk û Rûn', 'Evîn'], 
    bio: 'Helbestvanê mezin ê serdema Komara Mahabadê ye. Helbesta "Naley Cudayî" şahesera wî ye.' 
  },
  { 
    id: 'm12', name: 'Nûredîn Zaza', category: 'modern', 
    image: 'https://upload.wikimedia.org/wikipedia/commons/1/17/Nureddin_Zaza.jpg', 
    hints: ['Siyaset', 'Ronahî', 'Nivîskar', 'Çîrok'], 
    bio: 'Siyasetmedar, ronakbîr û çîroknivîsekî hêja ye. Yek ji damezrînerên PDK-S.' 
  },

  // --- 5. ÇAĞDAŞ DÖNEM VE SOVYET (1950+) ---
  { 
    id: 's1', name: 'Fêrîkê Ûsiv', category: 'modern', 
    image: 'https://via.placeholder.com/400x600?text=Ferike+Usiv', 
    hints: ['Yêrêvan', 'Lîrîk', 'Sovyet', 'Pamp'], 
    bio: 'Dengê lîrîk û paqij ê helbesta kurdên Sovyetê ye. Helbesta "Pamp" pir navdar e.' 
  },
  { 
    id: 's2', name: 'Şikoyê Hesen', category: 'modern', 
    image: 'https://via.placeholder.com/400x600?text=Sikoye+Hesen', 
    hints: ['Kaladoçka', 'Kafkasya', 'Hêvî', 'Sovyet'], 
    bio: 'Dengê xemgîn û hesretê yê kurdên Kafkasyayê ye. Helbesta "Kaladoçka" şahesera wî ye.' 
  },
  { 
    id: 's3', name: 'Şêrko Bêkes', category: 'modern', 
    image: '/serko.jpg', // PUBLIC DOSYASI
    hints: ['Împeratorê Helbestê', 'Helebçe', 'Pepûle', 'Silêmanî'], 
    bio: 'Nûjenkerê helbesta kurdî ya sedsala 20an e. Wekî "Împeratorê Helbestê" tê nasîn.' 
  },
  { 
    id: 's4', name: 'Latîf Helmet', category: 'modern', 
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png', 
    hints: ['Sûrrealîzm', 'Kerkûk', 'Nûjen', 'Pêşeng'], 
    bio: 'Bi îmgiyên xwe yên nûjen, zarokî û sûrrealîst tê nasîn. Pêşengê nûjeniyê ye.' 
  },
  { 
    id: 's5', name: 'Refîq Sabir', category: 'modern', 
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png', 
    hints: ['Helebçe', 'Trajedî', 'Swêd', 'Helbest'], 
    bio: 'Helbestvanê trajedî û êşa Helebçeyê ye. Helbesta wî ya li ser kîmyabaranê pir bi bandor e.' 
  },
  { 
    id: 's6', name: 'Erebê Şemo', category: 'modern', 
    image: 'https://upload.wikimedia.org/wikipedia/commons/c/c6/Ereb_%C5%9Eem%C4%lo.jpg', 
    hints: ['Şivanê Kurmanca', 'Roman', 'Elegez', 'Ermenistan'], 
    bio: 'Bavê romana kurdî tê qebûlkirin. Romana wî ya "Şivanê Kurmanca" berhema yekem e.' 
  },
  { 
    id: 's7', name: 'Arjen Arî', category: 'modern', 
    image: 'https://upload.wikimedia.org/wikipedia/tr/8/82/Arjen_Ari.jpg', 
    hints: ['Ev Çiya Rûsipî ne', 'Amed', 'Ramûsan', 'Bakur'], 
    bio: 'Dengê herî xurt ê helbesta nûjen a Bakur e. Helbestên wî yên li ser Amedê navdar in.' 
  },
  { 
    id: 's8', name: 'Berken Bereh', category: 'modern', 
    image: 'https://via.placeholder.com/400x600?text=Berken+Bereh', 
    hints: ['Dilê Min', 'Şirnex', 'Nûjen', 'Helbest'], 
    bio: 'Helbestvanekî girîng ê nifşê îro ye. Zimanê wî herikbar û lîrîk e.' 
  },
  { 
    id: 's9', name: 'Rênas Jiyan', category: 'modern', 
    image: 'https://via.placeholder.com/400x600?text=Renas+Jiyan', 
    hints: ['Janya', 'Post-Modern', 'Qoser', 'Mexzena Xwînê'], 
    bio: 'Nûnerê herî girîng ê helbesta postmodern a kurdî ye. Şêwazeke wî ya taybet heye.' 
  },
  { 
    id: 's10', name: 'Kawa Nemir', category: 'modern', 
    image: 'https://via.placeholder.com/400x600?text=Kawa+Nemir', 
    hints: ['Werger', 'Ulysses', 'Hamlet', 'Balyoz'], 
    bio: 'Bi wergerên xwe yên şaheser (Hamlet, Ulysses) zimanê kurdî gihandiye asteke bilind.' 
  },
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

  // --- ARKA PLAN ---
  const Background = () => (
    <div className="absolute inset-0 z-0 bg-[#0f172a] overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-[#0f172a] to-emerald-900/40 z-10"></div>
      <div className="absolute inset-0 z-0 opacity-[0.03]" 
           style={{
             backgroundImage: 'url(/logo.png)',
             backgroundSize: '100px',
             backgroundRepeat: 'repeat',
             transform: 'rotate(-10deg) scale(1.2)'
           }}
      ></div>
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

  // 2. OYUN EKRANI (KESİNLİKLE KAYDIRMA YOK - 100DVH)
  if (gameState === 'playing') {
    const currentQ = activeQuestions[currentIndex];

    return (
      <div className={`bg-[#0f172a] text-white flex flex-col h-[100dvh] w-screen overflow-hidden relative transition-all duration-300 ${isFullScreen ? 'z-[100]' : ''}`}>
        <Helmet><title>Lîstik - {currentIndex + 1}/{activeQuestions.length}</title></Helmet>
        <Background />

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

        <div className="w-full h-1 bg-white/5 flex-none z-50">
          <motion.div className="h-full bg-gradient-to-r from-blue-500 to-emerald-500" initial={{ width: 0 }} animate={{ width: `${((currentIndex + 1) / activeQuestions.length) * 100}%` }} transition={{ duration: 0.5 }} />
        </div>

        <div className="flex-1 flex flex-col relative z-30 overflow-hidden">
          <AnimatePresence mode='wait'>
            <motion.div 
              key={currentQ.id + (showAnswer ? '_ans' : '_que')}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col md:flex-row w-full h-full items-center justify-center p-4 md:p-8 gap-4 md:gap-8"
            >
              <div className="flex-none md:flex-1 flex items-center justify-center w-full md:h-full max-h-[40vh] md:max-h-full">
                <div className="relative w-full max-w-xs md:max-w-md aspect-[3/4] h-full group">
                  <div className={`absolute -inset-1 bg-gradient-to-tr rounded-[2rem] blur-xl opacity-40 transition duration-700 ${showAnswer ? 'from-emerald-500 to-blue-500' : 'from-blue-600 to-purple-600'}`}></div>
                  <div className="relative w-full h-full bg-[#0f172a] rounded-[1.8rem] border border-white/10 overflow-hidden shadow-2xl">
                    <img 
                      src={currentQ.image} 
                      alt="Kî ye ev?" 
                      className="w-full h-full object-cover"
                      onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/600x800/1e293b/94a3b8?text=${showAnswer ? currentQ.name.charAt(0) : '?'}&font=roboto`; }}
                    />
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 backdrop-blur-md border border-white/20 rounded-lg text-xs font-bold uppercase tracking-wider text-white shadow-lg ${currentQ.category === 'classic' ? 'bg-amber-600/90' : 'bg-blue-600/90'}`}>
                        {currentQ.category === 'classic' ? 'Klasîk' : 'Nûjen'}
                      </span>
                    </div>
                  </div>
                  <div className={`absolute -bottom-4 -right-4 z-30 p-3 rounded-full shadow-2xl border-4 border-[#0f172a] transition-all duration-500 ${showAnswer ? 'bg-emerald-500 scale-110' : 'bg-blue-600 animate-bounce'}`}>
                    {showAnswer ? <Star size={28} fill="white" className="text-white"/> : <HelpCircle size={28} className="text-white"/>}
                  </div>
                </div>
              </div>

              <div className="flex-none md:flex-1 flex flex-col items-center justify-start md:justify-center w-full h-auto">
                {showAnswer ? (
                  <div className="text-center w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <h2 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 mb-3 tracking-tight drop-shadow-xl">
                      {currentQ.name}
                    </h2>
                    <div className="bg-white/5 backdrop-blur-md p-4 rounded-xl border border-white/10 shadow-lg text-left relative overflow-hidden group hover:bg-white/10 transition-colors max-h-[30vh] overflow-y-auto scrollbar-thin scrollbar-thumb-white/20">
                      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-500 to-emerald-500"></div>
                      <h3 className="text-blue-400 font-bold text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
                        <Info size={14} /> Derbarê Wî/Wê De
                      </h3>
                      <p className="text-sm md:text-lg text-gray-300 font-light leading-relaxed">
                        {currentQ.bio || "Agahî nehat dîtin."}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center w-full">
                    <h2 className="text-6xl md:text-8xl font-black text-white/5 mb-4 tracking-[0.2em] select-none animate-pulse">???</h2>
                    <div className="flex flex-wrap justify-center items-center gap-2 w-full">
                      {currentQ.hints.map((hint, index) => (
                        <motion.div 
                          key={index}
                          initial={{ opacity: 0, y: 10, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ delay: index * 0.1, type: "spring" }}
                          className="px-3 py-2 rounded-lg bg-blue-900/30 border border-blue-500/20 backdrop-blur-md text-blue-100 text-sm md:text-lg font-medium shadow-lg hover:bg-blue-500/20 transition-all cursor-help"
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

        <div className="h-20 flex-none flex items-center justify-center px-4 bg-gradient-to-t from-black via-black/80 to-transparent z-50 pb-2">
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