export default function Footer({ darkMode }) {
  return (
    <footer className={`py-12 border-t transition-all duration-300 ${darkMode ? 'border-slate-800/50 bg-gradient-to-r from-slate-900 to-gray-900' : 'border-emerald-200/50 bg-gradient-to-r from-white to-emerald-50/50'}`}>
      <div className="container mx-auto px-4 text-center">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <span className="text-xl font-bold">hayrolsun.site</span>
        </div>
        <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          © 2026 Hayrolsun.site - Tüm hakları saklıdır. Rüya tabirleri Kur'an-ı Kerim ve hadis-i şeriflere dayanmaktadır.
        </p>
        <div className={`flex flex-wrap justify-center gap-6 text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
          <a href="/art" className="hover:text-emerald-600 transition-all duration-200 hover:scale-105 hover:-translate-y-0.5">Yazılarımız</a>
          <a href="#" className="hover:text-emerald-600 transition-all duration-200 hover:scale-105 hover:-translate-y-0.5">Gizlilik Politikası</a>
          <a href="/contact" className="hover:text-emerald-600 transition-all duration-200 hover:scale-105 hover:-translate-y-0.5">İletişim</a>
          <a href="/share" className="hover:text-emerald-600 transition-all duration-200 hover:scale-105 hover:-translate-y-0.5">Rüya Paylaş</a>
          <a href="#" className="hover:text-emerald-600 transition-all duration-200 hover:scale-105 hover:-translate-y-0.5">Hakkımızda</a>
        </div>
      </div>
    </footer>
  );
}