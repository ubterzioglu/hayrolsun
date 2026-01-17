'use client';

import React, { useState, useEffect } from 'react';
import { Search, Moon, Sun, Eye, Heart, Clock } from 'lucide-react';
import Footer from './components/Footer';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [dreams, setDreams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [stats, setStats] = useState({ dreamCount: 126, articleCount: 17 });

  // Fetch dreams and stats from API
  useEffect(() => {
    fetchDreams();
    fetchStats();
  }, []);

  async function fetchStats() {
    try {
      const res = await fetch('/api/stats');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      console.log('Stats loaded:', data);
      setStats(data);
    } catch (err) {
      console.warn('Stats API error:', err);
      setStats({ dreamCount: 126, articleCount: 17 }); // Fallback
    }
  }

  async function fetchDreams(query = '') {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (query.trim()) params.set('query', query.trim());

      const res = await fetch(`/api/dreams?${params.toString()}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();
      if (Array.isArray(data.items)) {
        setDreams(data.items);
        setTotalCount(data.count || data.items.length);
      } else {
        setDreams([]);
        setTotalCount(0);
      }
    } catch (err) {
      console.warn('API error:', err);
      setDreams([]);
      setTotalCount(0);
    } finally {
      setLoading(false);
    }
  }

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchDreams(searchTerm);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  return (
    <div className={`min-h-screen transition-all duration-500 ${darkMode ? 'bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900 text-white' : 'bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 text-gray-800'}`}>
      {/* Header */}
      <header className={`sticky top-0 z-50 backdrop-blur-xl border-b transition-all duration-300 ${darkMode ? 'bg-slate-800/90 border-slate-700/50' : 'bg-white/90 border-emerald-200/50'}`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <a href="/" className="flex items-center space-x-3">
              <div>
                <h1 className="text-[1.75rem] font-bold bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent">
                  hayrolsun.site
                </h1>
                <p className="text-[0.8425rem] opacity-75 leading-tight">İslami Rüya Tabirleri Rehberiniz</p>
              </div>
            </a>
            <div className="relative">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="px-5 py-2.5 text-sm font-semibold rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 text-white hover:from-emerald-700 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
              >
                Menü
              </button>
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-emerald-100/50 overflow-hidden z-50">
                  <button
                    onClick={() => setMenuOpen(false)}
                    className="w-full px-4 py-3 text-sm font-semibold text-white bg-red-500 hover:bg-red-600 transition-colors"
                  >
                    Menüyü Kapat
                  </button>
                  <a href="/" className="block px-4 py-3 text-gray-700 hover:bg-gray-50 border-b border-gray-100">Ana Sayfa</a>
                  <a href="/art.html" className="block px-4 py-3 text-gray-700 hover:bg-gray-50 border-b border-gray-100">Yazılarımız</a>
                  <a href="/share.html" className="block px-4 py-3 text-gray-700 hover:bg-gray-50 border-b border-gray-100">Rüya Paylaş</a>
                  <a href="/contact.html" className="block px-4 py-3 text-gray-700 hover:bg-gray-50 border-b border-gray-100">İletişim</a>
                  <button
                    onClick={() => { setDarkMode(!darkMode); setMenuOpen(false); }}
                    className="w-full px-4 py-3 text-left text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                  >
                    {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                    {darkMode ? 'Aydınlık Mod' : 'Karanlık Mod'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section with Search */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-base font-bold mb-4 leading-tight">
            Rüyalarınızın <span className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent">hikmetini</span> keşfedin
          </h2>
          <p className={`text-base max-w-2xl mx-auto mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Kur'an-ı Kerim ve hadis-i şeriflere dayanan İslami rüya tabirleriyle ruhunuza rehberlik ediyoruz.
            Rüyanızda gördüğünüz sembollerin ilahi mesajlarını öğrenin.
          </p>

          {/* Stats */}
          <div className="flex justify-center gap-6 mb-8">
            <div className={`aspect-square w-24 flex flex-col justify-center items-center rounded-xl transition-all duration-300 ${
              darkMode
                ? 'bg-slate-800/80 text-gray-300 hover:bg-slate-750 border border-slate-700/50'
                : 'bg-white/90 text-gray-600 hover:bg-white shadow-lg border border-emerald-100/50'
            } backdrop-blur-sm`}>
              <div className="text-2xl font-bold text-emerald-600">{stats.dreamCount.toLocaleString()}</div>
              <div className="text-sm mt-1">Rüya Tabiri</div>
            </div>
            <div className={`aspect-square w-24 flex flex-col justify-center items-center rounded-xl transition-all duration-300 ${
              darkMode
                ? 'bg-slate-800/80 text-gray-300 hover:bg-slate-750 border border-slate-700/50'
                : 'bg-white/90 text-gray-600 hover:bg-white shadow-lg border border-emerald-100/50'
            } backdrop-blur-sm`}>
              <div className="text-2xl font-bold text-emerald-600">{stats.articleCount.toLocaleString()}</div>
              <div className="text-sm mt-1">Makale</div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto group">
            <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 transition-all duration-200 ${darkMode ? 'text-slate-400 group-hover:text-emerald-400' : 'text-gray-500 group-hover:text-emerald-500'} group`} />
            <input
              type="text"
              placeholder="Rüyanı Ara. Hayrolsun..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-14 pr-6 py-4 text-lg rounded-3xl border-2 focus:ring-4 focus:ring-emerald-500/30 focus:border-emerald-500 outline-none transition-all duration-300 ${
                darkMode
                  ? 'bg-slate-800/80 border-slate-700 text-white placeholder-slate-400 backdrop-blur-sm'
                  : 'bg-white/90 border-emerald-200 text-gray-800 placeholder-gray-500 shadow-xl backdrop-blur-sm'
              }`}
            />
          </div>

          {/* Search status */}
          {searchTerm && !loading && (
            <p className={`mt-4 text-sm transition-all duration-300 ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>
              "{searchTerm}" için {totalCount} sonuç bulundu
            </p>
          )}
        </div>
      </section>

      {/* Dream Interpretations */}
      <section className="px-4 pb-16">
        <div className="container mx-auto">

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-200 border-t-emerald-600 mx-auto shadow-lg"></div>
              <p className="mt-4 opacity-75 animate-pulse">Rüya tabirleri yükleniyor...</p>
            </div>
          ) : dreams.length === 0 ? (
            <div className="text-center py-12">
              <div className={`inline-block p-8 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white shadow-lg'}`}>
                <Search className={`h-16 w-16 mx-auto mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-300'}`} />
                <h4 className="text-xl font-bold mb-2">Sonuç Bulunamadı</h4>
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  "{searchTerm}" ile ilgili rüya tabiri bulunamadı.<br />
                  Farklı kelimelerle aramayı deneyin.
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {dreams.map((dream) => (
                <a
                  key={dream.id || dream.slug}
                  href={`/dream.html?slug=${encodeURIComponent(dream.slug)}`}
                  className={`block rounded-3xl p-6 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02] group ${
                    darkMode
                      ? 'bg-slate-800/80 hover:bg-slate-750 backdrop-blur-sm border border-slate-700/50'
                      : 'bg-white/90 hover:bg-white shadow-xl backdrop-blur-sm border border-emerald-100/50'
                  }`}
                >
                  <div className="flex items-start justify-end mb-3">
                    <div className="flex items-center space-x-1 text-sm opacity-75">
                      <Eye className="h-4 w-4" />
                      <span>{dream.popularity || 0}</span>
                    </div>
                  </div>

                  <h4 className="text-base font-bold mb-4">{dream.title}</h4>

                  <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {dream.shortDesc || ''}
                  </p>

                  <div className="flex items-end justify-between mt-auto text-sm opacity-75">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{dream.updatedAt ? new Date(dream.updatedAt).toLocaleDateString('tr-TR') : 'Yeni'}</span>
                    </div>
                    <span className={`flex items-center space-x-1 font-medium transition-all duration-200 group-hover:translate-x-1 ${
                      darkMode ? 'text-emerald-400 group-hover:text-emerald-300' : 'text-emerald-600 group-hover:text-emerald-700'
                    }`}>
                      <span>Oku</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Religious Note */}
      <section className={`py-12 px-4 transition-colors duration-500 ${darkMode ? 'bg-gradient-to-r from-slate-800 to-gray-800' : 'bg-gradient-to-r from-emerald-50 to-green-50'}`}>
        <div className="container mx-auto max-w-4xl text-center">
          <div className={`inline-block p-8 rounded-3xl ${darkMode ? 'bg-slate-700/80' : 'bg-white/90'} backdrop-blur-xl shadow-xl border ${darkMode ? 'border-slate-600/50' : 'border-emerald-200/50'}`}>
            <Heart className="h-8 w-8 text-green-600 mx-auto mb-4" />
            <p className={`text-lg italic ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
              "Rüyalar, Rahmân'ın kuluna gönderdiği müjde veya ikaz olabilir.
              Her rüya tabirini kalbinize göre değerlendirin ve her zaman Allah'a sığının."
            </p>
            <p className={`mt-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              — Kur'an ve Sünnet'e Dayalı Yorumlar
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer darkMode={darkMode} />
    </div>
  );
}
