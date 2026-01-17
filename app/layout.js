'use client';

import './globals.css';
import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';

export default function RootLayout({ children }) {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <html lang="tr">
      <head>
        <title>Hayrolsun.site | İslami Rüya Tabirleri</title>
        <meta name="description" content="Kur'an-ı Kerim ve hadis-i şeriflere dayanan İslami rüya tabirleri rehberiniz. Rüyalarınızın anlamını öğrenin." />
        <meta name="keywords" content="rüya tabiri, islami rüya tabiri, rüya yorumu, rüyada görmek, hayrolsun" />
        <link rel="icon" href="/img/favicon.png" />
        <link rel="apple-touch-icon" href="/img/favicon.png" />
      </head>
      <body className={`min-h-screen transition-all duration-500 ${darkMode ? 'bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900 text-white' : 'bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 text-gray-800'}`}>
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />
        <main>{children}</main>
        <Footer darkMode={darkMode} />
        <script
          data-goatcounter="https://hayrolsun.goatcounter.com/count"
          async
          src="//gc.zgo.at/count.js"
        />
      </body>
    </html>
  );
}
