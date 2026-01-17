## hayrolsun.site

Basit bir **HTML + CSS + JavaScript** arayüzü (rüya tabirleri demo).

### Dokümantasyon

- Database manuel: `DATABASE_MANUAL.md`

### Turso (Database)

- **Önemli**: `TURSO_AUTH_TOKEN` **asla** frontend’e konmaz, repoya commit edilmez. Vercel Environment Variables olarak ekleyin.
- Yerelde test için `env.example` dosyasını `.env` olarak kopyalayın ve değerleri doldurun.

Gerekli değişkenler:

- `TURSO_DATABASE_URL`
- `TURSO_AUTH_TOKEN`
- `ADMIN_TOKEN` (admin paneli için)

Admin paneli (`/admin`) için `ADMIN_TOKEN` değerini Vercel ve `.env` için ayarlayın.

Schema / seed (Turso paneli veya admin paneli üzerinden):

- Turso SQL editor ile `db/schema.sql` ve `db/seed.sql` çalıştırın
- Admin paneldeki SQL import alanını kullanın

### SEO / Robots / Sitemap

- `public/robots.txt`
- `public/sitemap.xml`
- `public/sitemap.html`
