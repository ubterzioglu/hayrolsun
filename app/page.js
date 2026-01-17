'use client';

import React, { useState, useEffect } from 'react';
import { Search, Moon, Sun, BookOpen, Eye, Heart, Clock } from 'lucide-react';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [dreams, setDreams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('Tümü');

  const categories = ['Tümü', 'Doğa', 'Hayvanlar', 'Vücut', 'Hareket', 'Hayat', 'Maddi', 'İslami'];

  // Fallback data
  const fallbackDreams = [
    { id: 1, title: 'Su Rüyası Tabiri', slug: 'ruyada-su-gormek', shortDesc: 'Temiz su rüyası bereket ve rahmet işareti olup, kirli su ise günahlardan dolayı gelen sıkıntıları gösterir.', category: 'Doğa', popularity: 95 },
    { id: 2, title: 'Uçmak Rüyası Tabiri', slug: 'ruyada-ucmak', shortDesc: 'Göklerde uçmak, Allah\'ın izniyle yüksek makamlara erişmek ve dünya işlerinde başarı kazanmak anlamına gelir.', category: 'Hareket', popularity: 88 },
    { id: 3, title: 'Diş Düşmesi Rüyası Tabiri', slug: 'ruyada-dis-dusmesi', shortDesc: 'Diş düşmesi rüyası, aile fertlerinden birinin sağlık açısından dikkat etmesi gerektiğini gösterir.', category: 'Vücut', popularity: 92 },
  ];

  // Fetch dreams from API
  useEffect(() => {
    fetchDreams();
  }, []);

  async function fetchDreams(query = '', category = '') {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (query.trim()) params.set('query', query.trim());
      if (category && category !== 'Tümü') params.set('category', category.toLowerCase());

      const res = await fetch(`/api/dreams?${params.toString()}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();
      if (Array.isArray(data.items) && data.items.length > 0) {
        setDreams(data.items);
      } else {
        setDreams(fallbackDreams);
      }
    } catch (err) {
      console.warn('API error, using fallback:', err);
      setDreams(fallbackDreams);
    } finally {
      setLoading(false);
    }
  }

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchDreams(searchTerm, selectedCategory);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm, selectedCategory]);

  const filteredDreams = dreams;

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-green-50 to-emerald-100 text-gray-800'}`}>
      {/* Header */}
      <header className={`sticky top-0 z-50 backdrop-blur-md border-b ${darkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-white/80 border-gray-200'}`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-xl ${darkMode ? 'bg-green-600' : 'bg-green-500'}`}>
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                    Hayrolsun.site
                  </h1>
                  <p className="text-sm opacity-75">İslami Rüya Tabirleri Rehberiniz</p>
                </div>
              </div>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700 text-yellow-300' : 'bg-gray-200 text-gray-700'}`}
              >
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
            </div>

            <div className="relative w-full md:w-96">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              <input
                type="text"
                placeholder="Rüya tabirini ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 rounded-xl border focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none ${
                  darkMode
                    ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400'
                    : 'bg-white border-gray-300 text-gray-800 placeholder-gray-500'
                }`}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Rüyalarınızın <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Kutsal Anlamını</span> Keşfedin
          </h2>
          <p className={`text-xl max-w-2xl mx-auto mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Kur'an-ı Kerim ve hadis-i şeriflere dayanan İslami rüya tabirleriyle ruhunuza rehberlik ediyoruz.
            Rüyanızda gördüğünüz sembollerin ilahi mesajlarını öğrenin.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {['Su', 'Uçmak', 'Diş', 'Yılan', 'Ölüm', 'Para'].map((keyword) => (
              <button
                key={keyword}
                onClick={() => setSearchTerm(keyword.toLowerCase())}
                className={`px-6 py-3 rounded-full font-medium transition-all hover:scale-105 ${
                  darkMode
                    ? 'bg-green-600 hover:bg-green-700 text-white'
                    : 'bg-white hover:bg-green-50 text-green-600 shadow-lg'
                }`}
              >
                {keyword}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="px-4 pb-12">
        <div className="container mx-auto">
          <h3 className="text-2xl font-bold mb-6 text-center">Kategoriler</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-green-600 text-white'
                    : darkMode
                      ? 'bg-gray-800 hover:bg-gray-700 text-white'
                      : 'bg-white hover:bg-green-50 text-gray-700 shadow'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Dream Interpretations */}
      <section className="px-4 pb-16">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold">İslami Rüya Tabirleri</h3>
            <span className="text-sm opacity-75">
              {loading ? 'Yükleniyor...' : `${filteredDreams.length} sonuç bulundu`}
            </span>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
              <p className="mt-4 opacity-75">Rüya tabirleri yükleniyor...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDreams.map((dream) => (
                <a
                  key={dream.id || dream.slug}
                  href={`/dream.html?slug=${encodeURIComponent(dream.slug)}`}
                  className={`block rounded-2xl p-6 transition-all hover:shadow-xl hover:-translate-y-1 ${
                    darkMode
                      ? 'bg-gray-800 hover:bg-gray-750'
                      : 'bg-white hover:bg-gray-50 shadow-lg'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                        darkMode
                          ? 'bg-green-900 text-green-300'
                          : 'bg-green-100 text-green-700'
                      }`}>
                        {dream.category || 'Genel'}
                      </span>
                      <h4 className="text-xl font-bold mt-2">{dream.title}</h4>
                    </div>
                    <div className="flex items-center space-x-1 text-sm opacity-75">
                      <Eye className="h-4 w-4" />
                      <span>{dream.popularity || 0}</span>
                    </div>
                  </div>

                  <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {dream.shortDesc || ''}
                  </p>

                  <div className="flex items-center justify-between text-sm opacity-75">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{dream.updatedAt ? new Date(dream.updatedAt).toLocaleDateString('tr-TR') : 'Yeni'}</span>
                    </div>
                    <span className={`flex items-center space-x-1 font-medium ${
                      darkMode ? 'text-green-400 hover:text-green-300' : 'text-green-600 hover:text-green-700'
                    }`}>
                      <span>Detaylı Oku</span>
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
      <section className={`py-8 px-4 ${darkMode ? 'bg-gray-800' : 'bg-green-50'}`}>
        <div className="container mx-auto max-w-4xl text-center">
          <div className={`inline-block p-6 rounded-xl ${darkMode ? 'bg-gray-700/80' : 'bg-white/80'} backdrop-blur-sm`}>
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
      <footer className={`py-8 border-t ${darkMode ? 'border-gray-800 bg-gray-900' : 'border-gray-200 bg-white'}`}>
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <BookOpen className="h-6 w-6 text-green-600" />
            <span className="text-xl font-bold">Hayrolsun.site</span>
          </div>
          <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            © 2026 Hayrolsun.site - Tüm hakları saklıdır. Rüya tabirleri Kur'an-ı Kerim ve hadis-i şeriflere dayanmaktadır.
          </p>
          <div className={`flex flex-wrap justify-center gap-6 text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
            <a href="/art.html" className="hover:text-green-600 transition-colors">Yazılarımız</a>
            <a href="#" className="hover:text-green-600 transition-colors">Gizlilik Politikası</a>
            <a href="#" className="hover:text-green-600 transition-colors">İletişim</a>
            <a href="#" className="hover:text-green-600 transition-colors">Hakkımızda</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
