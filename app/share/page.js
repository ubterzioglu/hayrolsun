'use client';

import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Share() {
  const [darkMode, setDarkMode] = useState(false);
  const [dreams, setDreams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    userId: '',
    content: ''
  });

  useEffect(() => {
    fetchDreams();
  }, []);

  const fetchDreams = async () => {
    try {
      const res = await fetch('/api/user-dreams');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setDreams(data.dreams || []);
    } catch (err) {
      console.warn('Dreams API error:', err);
      setDreams([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.userId.trim() || !formData.content.trim()) return;

    try {
      const res = await fetch('/api/user-dreams', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: formData.userId.trim(),
          content: formData.content.trim(),
          status: 'pending'
        }),
      });

      if (res.ok) {
        setFormData({ userId: '', content: '' });
        alert('Rüyanız başarıyla gönderildi! Onaylandıktan sonra yayınlanacak.');
      } else {
        alert('Bir hata oluştu. Lütfen tekrar deneyin.');
      }
    } catch (err) {
      console.error('Submit error:', err);
      alert('Bir hata oluştu. Lütfen tekrar deneyin.');
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${darkMode ? 'bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900 text-white' : 'bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 text-gray-800'}`}>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Rüya Paylaş
          </h1>
          <p className={`text-xl max-w-2xl mx-auto mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Gördüğünüz rüyaları paylaşın ve yorumlarını öğrenin
          </p>
        </div>
      </section>

      {/* Share Form */}
      <section className="px-4 pb-8">
        <div className="container mx-auto max-w-2xl">
          <div className={`rounded-3xl p-8 mb-8 ${darkMode ? 'bg-slate-800/80' : 'bg-white/90'} shadow-xl backdrop-blur-sm`}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Kullanıcı Adı</label>
                <input
                  type="text"
                  name="userId"
                  value={formData.userId}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-emerald-500 outline-none transition-all ${
                    darkMode
                      ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400'
                      : 'bg-white border-gray-300 text-gray-800 placeholder-gray-500'
                  }`}
                  placeholder="Kullanıcı adınızı girin"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Rüya İçeriği</label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  rows="6"
                  className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-emerald-500 outline-none transition-all resize-none ${
                    darkMode
                      ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400'
                      : 'bg-white border-gray-300 text-gray-800 placeholder-gray-500'
                  }`}
                  placeholder="Rüyanızı detaylı olarak anlatın..."
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full py-3 px-6 bg-gradient-to-r from-emerald-600 to-green-600 text-white font-semibold rounded-xl hover:from-emerald-700 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Rüyayı Paylaş
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Shared Dreams */}
      <section className="px-4 pb-16">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold mb-8 text-center">Paylaşılan Rüyalar</h2>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-200 border-t-emerald-600 mx-auto"></div>
              <p className="mt-4 opacity-75">Yükleniyor...</p>
            </div>
          ) : dreams.length === 0 ? (
            <div className={`text-center py-12 rounded-3xl ${darkMode ? 'bg-slate-800/80' : 'bg-white/90'} shadow-xl backdrop-blur-sm`}>
              <p className="text-xl opacity-75">Henüz paylaşılan rüya bulunmuyor.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {dreams.map((dream, index) => (
                <div
                  key={index}
                  className={`rounded-3xl p-6 ${darkMode ? 'bg-slate-800/80' : 'bg-white/90'} shadow-xl backdrop-blur-sm`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {dream.userId.charAt(0).toUpperCase()}
                      </div>
                      <span className="font-medium">{dream.userId}</span>
                    </div>
                    <span className="text-sm opacity-60">
                      {new Date(dream.createdAt).toLocaleDateString('tr-TR')}
                    </span>
                  </div>
                  <p className={`whitespace-pre-wrap ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {dream.content}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer darkMode={darkMode} />
    </div>
  );
}