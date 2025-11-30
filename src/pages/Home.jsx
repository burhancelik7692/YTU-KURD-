import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookOpen, Music, Palette, History, Languages } from 'lucide-react';

const Home = () => {
  const features = [{
    icon: Languages,
    title: 'Ziman',
    description: 'Hînbûna zimanê kurdî û rêzimana wê',
    path: '/ziman',
    color: 'bg-blue-500'
  }, {
    icon: BookOpen,
    title: 'Çand',
    description: 'Çanda dewlemend a gelê kurd',
    path: '/cand',
    color: 'bg-emerald-500'
  }, {
    icon: History,
    title: 'Dîrok',
    description: 'Dîroka kevn a kurdan',
    path: '/dirok',
    color: 'bg-amber-500'
  }, {
    icon: Music,
    title: 'Muzîk',
    description: 'Muzîka kurdî û stranan',
    path: '/muzik',
    color: 'bg-purple-500'
  }, {
    icon: Palette,
    title: 'Huner',
    description: 'Huner û hunermendên kurd',
    path: '/huner',
    color: 'bg-pink-500'
  }];

  return (
    <>
      <Helmet>
        <title>Sereke - YTU Kurdî </title>
        <meta name="description" content="Bi xêr hatî Komeleya Kurdî ya Zanîngeha Yıldız Teknîk. Ziman, çand, dîrok û hunera kurdî" />
      </Helmet>

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative py-20 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-emerald-600/10 to-purple-600/10"></div>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-6xl mx-auto text-center relative z-10">
            <motion.img initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.6 }} src="/logo.png" alt="YTU Kurdî" className="w-48 h-48 mx-auto mb-8 rounded-full shadow-2xl ring-8 ring-white" />
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">Bi xêr hatî <span className="text-blue-600">YTU Kurdî</span></h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-4 max-w-3xl mx-auto">Zanîngeha Yıldız Teknîk - Komeleya Kurdî</p>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Em li ser parastina û pêşxistina zimanê kurdî, çanda me, û dîroka me dixebitin</p>
          </motion.div>
        </section>

        {/* About Section */}
        <section className="py-16 px-4 bg-white/50">
          <div className="max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Derbarê Me</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">Komeleya Kurdî ya Zanîngeha Yıldız Teknîk (YTU) di sala 2025an de hatiye damezrandin. Armanca me parastina zimanê kurdî, belavkirina çanda kurdî, û hînkirina dîroka me ye.</p>
              <p className="text-lg text-gray-700 leading-relaxed">Em bi xwendekarên kurd û hemû kesên ku ji zimanê kurdî hez dikin re dixebitin. Em çalakiyên cuda yên çandî, hunerî û perwerdehî organîze dikin.</p>
            </motion.div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-4xl font-bold text-center text-gray-900 mb-12">Beşên Me</motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div key={feature.path} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }}>
                  <Link to={feature.path}>
                    <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group">
                      <div className={`${feature.color} w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                        <feature.icon className="text-white" size={32} />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-emerald-600">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-4xl font-bold mb-6">Beşdarî Komeleya Me Bibe</h2>
            <p className="text-xl mb-8">Heke tu dixwazî zimanê kurdî hîn bibî, çanda xwe nas bikî, û bi me re bixebitî, bi me re têkilî dayne!</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/ziman" className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all duration-300 hover:scale-105 shadow-lg">Dest Pê Bike</Link>
            </div>
          </motion.div>
        </section>
      </div>
    </>
  );
};

export default Home;