import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Helmet } from "react-helmet";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Culture from "./pages/Culture"; 
import Music from "./pages/Music";
import Art from "./pages/Art";
import History from "./pages/History"; 
import Language from "./pages/Language";
// YENİ: Listik (Oyun) sayfası import edildi
import Listik from "./pages/Listik"; 
import "./index.css";

function App() {
  return (
    <Router>
      <div className="app-container flex flex-col min-h-screen">
        <Helmet>
          <title>YTU Kurdî</title>
        </Helmet>
        
        {/* Menü */}
        <Navigation />
        
        {/* İçerik Alanı */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ziman" element={<Language />} />
            <Route path="/cand" element={<Culture />} />
            <Route path="/dirok" element={<History />} />
            <Route path="/muzik" element={<Music />} />
            <Route path="/huner" element={<Art />} />
            
            {/* YENİ: Oyun Rotası Eklendi */}
            <Route path="/listik" element={<Listik />} />
          </Routes>
        </main>

        {/* Alt Bilgi */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;