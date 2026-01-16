## Hayrolsun.site

Basit bir **React + Vite + Tailwind** arayüzü (rüya tabirleri demo).

### Dokümantasyon

- Database manuel: `DATABASE_MANUAL.md`

### Turso (Database)

- **Önemli**: `TURSO_AUTH_TOKEN` **asla** frontend’e konmaz, repoya commit edilmez. Vercel Environment Variables olarak ekleyin.
- Yerelde test için `env.example` dosyasını `.env` olarak kopyalayın ve değerleri doldurun.

Gerekli değişkenler:

- `TURSO_DATABASE_URL`
- `TURSO_AUTH_TOKEN`

Schema / seed:

```bash
npm run db:migrate
npm run db:seed
```

### Kurulum

```bash
npm install
```

### Geliştirme

```bash
npm run dev
```

### Build

```bash
npm run build
```

### SEO / Robots / Sitemap

- `public/robots.txt`
- `public/sitemap.xml`
- `public/sitemap.html`
