'use client';

import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Contact() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`min-h-screen transition-all duration-500 ${darkMode ? 'bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900 text-white' : 'bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 text-gray-800'}`}>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            İletişim
          </h1>
          <p className={`text-xl max-w-2xl mx-auto mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Hayrolsun.site ile iletişime geçin
          </p>
        </div>
      </section>

      {/* Contact Form */}
      <section className="px-4 pb-16">
        <div className="container mx-auto max-w-2xl">
          <div className={`rounded-3xl p-8 ${darkMode ? 'bg-slate-800/80' : 'bg-white/90'} shadow-xl backdrop-blur-sm`}>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Ad Soyad</label>
                <input
                  type="text"
                  className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-emerald-500 outline-none transition-all ${
                    darkMode
                      ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400'
                      : 'bg-white border-gray-300 text-gray-800 placeholder-gray-500'
                  }`}
                  placeholder="Adınızı ve soyadınızı girin"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">E-posta</label>
                <input
                  type="email"
                  className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-emerald-500 outline-none transition-all ${
                    darkMode
                      ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400'
                      : 'bg-white border-gray-300 text-gray-800 placeholder-gray-500'
                  }`}
                  placeholder="E-posta adresinizi girin"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Konu</label>
                <input
                  type="text"
                  className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-emerald-500 outline-none transition-all ${
                    darkMode
                      ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400'
                      : 'bg-white border-gray-300 text-gray-800 placeholder-gray-500'
                  }`}
                  placeholder="Konuyu belirtin"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Mesaj</label>
                <textarea
                  rows="6"
                  className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-emerald-500 outline-none transition-all resize-none ${
                    darkMode
                      ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400'
                      : 'bg-white border-gray-300 text-gray-800 placeholder-gray-500'
                  }`}
                  placeholder="Mesajınızı yazın"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full py-3 px-6 bg-gradient-to-r from-emerald-600 to-green-600 text-white font-semibold rounded-xl hover:from-emerald-700 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Gönder
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer darkMode={darkMode} />
    </div>
  );
}