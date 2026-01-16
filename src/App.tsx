import React, { useEffect, useMemo, useState } from 'react';
import { Clock, Moon, Search, Sun, BookOpen, Eye } from 'lucide-react';

type DreamInterpretation = {
  id: number;
  title: string;
  shortDesc: string;
  category: string | null;
  popularity: number; // views
  updatedAt?: string;
  slug?: string;
};

const fallbackDreamInterpretations: DreamInterpretation[] = [
  {
    id: 1,
    title: 'Su Rüyası Tabiri',
    shortDesc:
      'Suyun durumu rüyanın anlamını belirler. Temiz su mutluluk, kirli su ise sorunları simgeler.',
    category: 'Doğa',
    popularity: 95,
  },
  {
    id: 2,
    title: 'Uçmak Rüyası Tabiri',
    shortDesc:
      'Uçmak özgürlük ve hırslarınızı temsil eder. Yüksekten uçmak başarıyı gösterir.',
    category: 'Hareket',
    popularity: 88,
  },
  {
    id: 3,
    title: 'Diş Düşmesi Rüyası Tabiri',
    shortDesc:
      'Diş düşmesi kaygı, güvensizlik veya bir kaybı simgeler. Aile fertlerine dikkat edilmelidir.',
    category: 'Vücut',
    popularity: 92,
  },
  {
    id: 4,
    title: 'Yılan Rüyası Tabiri',
    shortDesc:
      'Yılan hem tehlike hem de dönüşüm sembolüdür. Rüyanın detayları yorumu değiştirir.',
    category: 'Hayvanlar',
    popularity: 85,
  },
  {
    id: 5,
    title: 'Ölüm Rüyası Tabiri',
    shortDesc:
      'Ölüm rüyası genellikle yeni başlangıçları temsil eder, korkulacak bir şey değildir.',
    category: 'Hayat',
    popularity: 78,
  },
  {
    id: 6,
    title: 'Para Rüyası Tabiri',
    shortDesc:
      'Para kazanmak zenginlik değil, değer kazanmayı simgeler. Kaybetmek ise endişeyi gösterir.',
    category: 'Maddi',
    popularity: 82,
  },
];

const categories = [
  { label: 'Tümü', slug: '' },
  { label: 'Doğa', slug: 'doga' },
  { label: 'Hayvanlar', slug: 'hayvanlar' },
  { label: 'Vücut', slug: 'vucut' },
  { label: 'Hareket', slug: 'hareket' },
  { label: 'Hayat', slug: 'hayat' },
  { label: 'Maddi', slug: 'maddi' },
] as const;

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<(typeof categories)[number]>(categories[0]);
  const [items, setItems] = useState<DreamInterpretation[]>(fallbackDreamInterpretations);
  const [loading, setLoading] = useState(false);
  const [usingFallback, setUsingFallback] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const q = searchTerm.trim();
    const category = selectedCategory.slug;

    const t = setTimeout(async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        if (q) params.set('query', q);
        if (category) params.set('category', category);
        const res = await fetch(`/api/dreams?${params.toString()}`, { signal: controller.signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = (await res.json()) as { items: DreamInterpretation[] };
        if (Array.isArray(data.items)) {
          setItems(data.items);
          setUsingFallback(false);
        } else {
          throw new Error('Bad response');
        }
      } catch {
        // Local dev without API -> fallback
        setItems(fallbackDreamInterpretations);
        setUsingFallback(true);
      } finally {
        setLoading(false);
      }
    }, 250);

    return () => {
      clearTimeout(t);
      controller.abort();
    };
  }, [searchTerm, selectedCategory.slug]);

  const filteredDreams = useMemo(() => items, [items]);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode
          ? 'bg-gray-900 text-white'
          : 'bg-gradient-to-br from-green-50 to-emerald-100 text-gray-800'
      }`}
    >
      {/* Header */}
      <header
        className={`sticky top-0 z-50 backdrop-blur-md border-b ${
          darkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-white/80 border-gray-200'
        }`}
      >
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
                  <p className="text-sm opacity-75">Rüya Tabirleri Rehberiniz</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setDarkMode((v) => !v)}
                aria-label="Tema değiştir"
                className={`p-2 rounded-lg ${
                  darkMode ? 'bg-gray-700 text-yellow-300' : 'bg-gray-200 text-gray-700'
                }`}
              >
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
            </div>

            <div className="relative w-full md:w-96">
              <Search
                className={`absolute left-3 top-1/2 -translate-y-1/2 ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}
              />
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
            Rüyalarınızın{' '}
            <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Anlamını
            </span>{' '}
            Keşfedin
          </h2>
          <p className={`text-xl max-w-2xl mx-auto mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Binlerce rüya tabirini Türkçe olarak bulabileceğiniz en kapsamlı rehber. Rüyanızda
            gördüğünüz sembollerin anlamını öğrenin.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {['Su', 'Uçmak', 'Diş', 'Yılan', 'Ölüm', 'Para'].map((keyword) => (
              <button
                key={keyword}
                type="button"
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
            {categories.map((category) => {
              const isSelected = category.slug === selectedCategory.slug;
              return (
                <button
                  key={category.slug || 'all'}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full font-medium transition-all ${
                    darkMode
                      ? isSelected
                        ? 'bg-green-700 text-white'
                        : 'bg-gray-800 hover:bg-gray-700 text-white'
                      : isSelected
                        ? 'bg-green-600 text-white shadow'
                        : 'bg-white hover:bg-green-50 text-gray-700 shadow'
                  }`}
                >
                  {category.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Dream Interpretations */}
      <section className="px-4 pb-16">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold">Popüler Rüya Tabirleri</h3>
            <span className="text-sm opacity-75">
              {loading ? 'Yükleniyor…' : `${filteredDreams.length} sonuç bulundu`}
              {usingFallback ? ' (demo)' : ''}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDreams.map((dream) => (
              <div
                key={dream.id}
                className={`rounded-2xl p-6 transition-all hover:shadow-xl ${
                  darkMode ? 'bg-gray-800' : 'bg-white hover:bg-gray-50 shadow-lg'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                        darkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-700'
                      }`}
                    >
                      {dream.category}
                    </span>
                    <h4 className="text-xl font-bold mt-2">{dream.title}</h4>
                  </div>
                  <div className="flex items-center space-x-1 text-sm opacity-75">
                    <Eye className="h-4 w-4" />
                    <span>{dream.popularity}k</span>
                  </div>
                </div>

                <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {dream.shortDesc}
                </p>

                <div className="flex items-center justify-between text-sm opacity-75">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>
                      {dream.updatedAt
                        ? new Date(dream.updatedAt).toLocaleDateString('tr-TR')
                        : new Date().toLocaleDateString('tr-TR')}
                    </span>
                  </div>
                  <button
                    type="button"
                    className={`flex items-center space-x-1 font-medium ${
                      darkMode
                        ? 'text-green-400 hover:text-green-300'
                        : 'text-green-600 hover:text-green-700'
                    }`}
                  >
                    <span>Detaylı Oku</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
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
            © 2026 Hayrolsun.site - Tüm hakları saklıdır. Rüya tabirleri sadece bilgilendirme amaçlıdır.
          </p>
          <div className={`flex flex-wrap justify-center gap-6 text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
            <a href="#" className="hover:text-green-600 transition-colors">
              Gizlilik Politikası
            </a>
            <a href="#" className="hover:text-green-600 transition-colors">
              Kullanım Şartları
            </a>
            <a href="#" className="hover:text-green-600 transition-colors">
              İletişim
            </a>
            <a href="#" className="hover:text-green-600 transition-colors">
              Hakkımızda
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

