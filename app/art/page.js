'use client';

import React, { useState } from 'react';
import { Eye, Clock } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const articles = [
  {
    id: 'islamiyet-ve-ruyalar',
    title: 'İslamiyet ve Rüyalar',
    slug: 'islamiyet-ve-ruyalar',
    content: `İslam, rüyaları "müminin üçte biri" olarak tanımlayarak onlara özel bir yer verir. Kur'an-ı Kerim'de "Allah'ın bir işareti" olarak ifade edilen rüyalar, insanın ruh hali ve imanı ile doğrudan ilişkilidir. Peygamberimiz (s.a.v.), "En güzel rüya, müminin rüyasıdır" hadisiyle rüyaların temiz kalple bağlantısını vurgulamıştır. İslam'da rüyalar, Allah'ın izniyle gelen bir nimet ve bazen de uyaran bir mesaj olabilir; ancak her rüyanın manası yoktur. Batıl inançlardan uzak durulması, Kur'an ve Sünnet ışığında değerlendirilmesi gerekir.

Rüyaların İslam'da yeri, Hz. Yusuf (a.s.)'ın rüyalarının tefsirini içeren Kur'an ayetlerinde de net bir şekilde ortaya konur. Rüyalar, bilinçaltı ile değil, Allah'ın iradesiyle şekillenir. Bu yüzden rüya yorumlaması, sadece ehliyetli alimlerin yapabileceği bir bilimdir. Müslüman, rüyalarını manevi bir rehber olarak görmeli, ancak her rüyayı gerçekleştirmeye kalkmamalıdır. Rüya yorumlaması, imanla ve bilgiyle yapılan bir yaklaşımla yapılmalıdır.`,
    views: 1250,
    likes: 89,
    dislikes: 3,
    updatedAt: '2024-01-15',
    tags: ['islam', 'rüya', 'iman']
  },
  {
    id: 'ruya-nedir',
    title: 'Rüya Nedir',
    slug: 'ruya-nedir',
    content: `Rüya, insanın uyuduğunda zihnin serbestçe hareket ettiği, bilinçsiz bir durumda oluşan görüntülerdir. İslam'da rüya, "ruhun serbest kalması" olarak tanımlanır ve Allah'ın izniyle gerçekleşir. Kur'an-ı Kerim'de, "Allah, insanın ruhunu alır" ayetiyle uyku ve rüyaların ilahi bir süreç olduğu vurgulanır. Rüyalar, bazen müjde, bazen de uyarı niteliğinde olabilir; ancak her rüyanın manası yoktur.

Peygamberimiz (s.a.v.), "Rüya üç kısımdır: Allah'tan gelen müjde, insanın içinden gelen düşünceler ve şeytanın vesvesesi" buyurarak rüyaların üç ana başlıkta toplamıştır. Müslüman, rüyalarını değerlendirmek için bu ayrımı dikkate almalıdır. Güzel rüyalar, Allah'ın lütfu; kötü rüyalar ise genellikle şeytanın vesvesesidir. Bu yüzden rüyaların yorumu, imanla ve bilgiyle yapılmalıdır.`,
    views: 980,
    likes: 67,
    dislikes: 2,
    updatedAt: '2024-01-12',
    tags: ['rüya', 'uyku', 'islam']
  },
  {
    id: 'ruyalar-ve-bilincalti',
    title: 'Rüyalar ve Bilinçaltı',
    slug: 'ruyalar-ve-bilincalti',
    content: `Bilinçaltı kavramı, modern psikolojide rüyaları açıklamak için kullanılır; ancak İslam, rüyaları Allah'ın izniyle şekillenen bir süreç olarak görür. Bilinçaltı, insanın gizli arzularını yansıtabilir, ancak İslam'da rüyaların asıl kaynağı Allah'ın hikmetidir. Peygamberimiz (s.a.v.), "Rüya, müminin üçte biridir" diyerek rüyaların manevi boyutunu vurgulamıştır.

Rüyalar, bilinçaltı ile bağlantılı olsa bile sonucu Allah'ın elindedir. Bu yüzden bilinçaltı üzerinden yapılan yorumlar, İslam'ın temel prensiplerini aşmamalıdır. Müslüman, rüyalarını anlamak için Kur'an ve Sünnet'i referans almalı, psikolojik yorumlara aşırı güvenmemelidir. Rüya yorumlaması, ehliyetli alimlerin danışılmasıyla yapılmalıdır.`,
    views: 756,
    likes: 45,
    dislikes: 1,
    updatedAt: '2024-01-10',
    tags: ['bilinçaltı', 'psikoloji', 'islam']
  },
  {
    id: 'uyku-nedir',
    title: 'Uyku Nedir',
    slug: 'uyku-nedir',
    content: `Uyku, Allah'ın insanlara lütfu olan ve vücudun dinlenmesi için yaratılmış bir nimettir. Kur'an-ı Kerim'de, "Allah, size geceyi uyku olarak yaratmıştır" ayetiyle uyku, Allah'ın hikmetiyle şekillenen bir süreç olarak tanımlanır. Uyku, insanın ruhunu serbest bırakarak rüyaların oluşmasına zemin hazırlar. İslam'da uyku, sadece fiziksel dinlenme değil, manevi bir huzur anıdır.

Peygamberimiz (s.a.v.), "Uyku, ölümün küçük kardeşidir" diyerek uyku ile ölüm arasındaki ilişkiyi vurgulamıştır. Uyku, Allah'ın izniyle ruhun geçici olarak alınmasıdır. Bu yüzden uyku öncesi ve sonrası duaları, İslam'da büyük önem taşır. Sabah-akşam dualarıyla uyumak ve uyanmak, rüyaların güzel olmasını sağlar.`,
    views: 892,
    likes: 52,
    dislikes: 4,
    updatedAt: '2024-01-08',
    tags: ['uyku', 'dua', 'islam']
  }
];

export default function Articles() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`min-h-screen transition-all duration-500 ${darkMode ? 'bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900 text-white' : 'bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 text-gray-800'}`}>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Yazılarımız
          </h1>
          <p className={`text-xl max-w-2xl mx-auto mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            İslam, rüya ve bilinçaltı üzerine yazılarımız
          </p>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="px-4 pb-16">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <article
                key={article.id}
                className={`block rounded-3xl p-6 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02] group ${
                  darkMode
                    ? 'bg-slate-800/80 hover:bg-slate-750 backdrop-blur-sm border border-slate-700/50'
                    : 'bg-white/90 hover:bg-white shadow-xl backdrop-blur-sm border border-emerald-100/50'
                }`}
              >
                {/* Views - Top Right */}
                <div className="flex items-start justify-end mb-3">
                  <div className="flex items-center space-x-1 text-sm opacity-75">
                    <Eye className="h-4 w-4" />
                    <span>{article.views}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-base font-bold mb-4">{article.title}</h3>

                {/* Content Preview */}
                <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {article.content.substring(0, 150)}...
                </p>

                {/* Bottom Section - Date left, Like/Dislike buttons right */}
                <div className="flex items-end justify-between mt-auto text-sm opacity-75">
                  {/* Date - Bottom Left */}
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{new Date(article.updatedAt).toLocaleDateString('tr-TR')}</span>
                  </div>

                  {/* Like/Dislike Buttons - Bottom Right */}
                  <div className="flex space-x-2">
                    <button className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition-colors">
                      👍
                    </button>
                    <button className="flex items-center justify-center w-8 h-8 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors">
                      👎
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer darkMode={darkMode} />
    </div>
  );
}