import './globals.css';

export const metadata = {
  title: 'Hayrolsun.site | İslami Rüya Tabirleri',
  description: 'Kur\'an-ı Kerim ve hadis-i şeriflere dayanan İslami rüya tabirleri rehberiniz. Rüyalarınızın anlamını öğrenin.',
  keywords: 'rüya tabiri, islami rüya tabiri, rüya yorumu, rüyada görmek, hayrolsun',
  authors: [{ name: 'Hayrolsun.site' }],
  openGraph: {
    title: 'Hayrolsun.site | İslami Rüya Tabirleri',
    description: 'Kur\'an-ı Kerim ve hadis-i şeriflere dayanan İslami rüya tabirleri rehberiniz.',
    url: 'https://www.hayrolsun.site',
    siteName: 'Hayrolsun.site',
    images: [
      {
        url: '/img/hayrolsun.png',
        width: 1200,
        height: 630,
        alt: 'Hayrolsun.site - İslami Rüya Tabirleri',
      },
    ],
    locale: 'tr_TR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hayrolsun.site | İslami Rüya Tabirleri',
    description: 'Kur\'an-ı Kerim ve hadis-i şeriflere dayanan İslami rüya tabirleri rehberiniz.',
    images: ['/img/hayrolsun.png'],
  },
  icons: {
    icon: '/img/favicon.png',
    apple: '/img/favicon.png',
  },
  metadataBase: new URL('https://www.hayrolsun.site'),
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body>
        {children}
        <script
          data-goatcounter="https://hayrolsun.goatcounter.com/count"
          async
          src="//gc.zgo.at/count.js"
        />
      </body>
    </html>
  );
}
