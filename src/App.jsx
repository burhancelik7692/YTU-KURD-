import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Culture from "./pages/Culture"; 
import Music from "./pages/Music";
import Art from "./pages/Art";
import History from "./pages/History"; 
import Language from "./pages/Language";
import Listik from "./pages/Listik"; 
import "./index.css";

// Layout Bileşeni: Sayfaya göre Menü/Footer gösterip gizlemeye karar verir
const Layout = ({ children }) => {
  const location = useLocation();
  
  // Eğer şu anki adres '/listik' ise bu değişken true olur
  const isGamePage = location.pathname === '/listik';

  return (
    <div className="app-container flex flex-col min-h-screen">
      <Helmet>
        <title>YTU Kurdî</title>
      </Helmet>
      
      {/* Mantık: Oyun sayfası DEĞİLSE (!isGamePage), Navigasyonu göster.
          Oyun sayfasıysa gösterme (null).
      */}
      {!isGamePage && <Navigation />}
      
      {/* İçerik Alanı (Sayfalar Buraya Gelir) */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Oyun sayfası DEĞİLSE Footer'ı göster */}
      {!isGamePage && <Footer />}
    </div>
  );
};

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cand" element={<Culture />} />
          <Route path="/muzik" element={<Music />} />
          <Route path="/huner" element={<Art />} />
          <Route path="/dirok" element={<History />} />
          <Route path="/ziman" element={<Language />} />
          <Route path="/listik" element={<Listik />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;