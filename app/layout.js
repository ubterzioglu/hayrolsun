import './globals.css';

export const metadata = {
  title: 'Hayrolsun.site | İslami Rüya Tabirleri',
  description: 'Kur\'an-ı Kerim ve hadis-i şeriflere dayanan İslami rüya tabirleri rehberiniz.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
