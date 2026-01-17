import React, { useState } from 'react';
import { Moon, Sun } from 'lucide-react';

export default function Header({ darkMode, setDarkMode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
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
  );
}