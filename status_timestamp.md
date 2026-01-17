# Durum Ozeti (2026-01-17 08:32:27)
Timestamp: 2026-01-17 08:32:27

## Proje Amaci
- hayrolsun.site: Islami ruya tabirleri icin statik HTML + CSS + JS.

## Mimari ve Akis
- Rotalar: `/`, `/dream.html?slug=...`, `/admin.html`.
- Backend: Vercel serverless `api/` uclari + Turso (libSQL).
- Admin: `ADMIN_TOKEN` zorunlu; `x-admin-token` ile yetkilendirme, sessionStorage.
- `vercel.json`: filesystem routing + `/api/*` route.

## API Ozeti
- `GET /api/dreams`: arama + kategori/tag filtreleri, FTS5 ile arama.
- `GET /api/dreams/:slug`: detay + tag listesi.
- `POST /api/dreams/:slug/view`: goruntulenme artirir.
- `POST /api/dreams/:slug/vote`: begeni/begenmeme artirir.
- `GET /api/admin/summary`, `GET /api/admin/dreams`, `GET /api/admin/categories`.
- `POST /api/admin/sql`: yalnizca `SELECT` ve kisitli `INSERT` (dreams/categories/tags/dream_tags/articles).

## Veri
- `db/schema.sql`: categories/tags/dreams/dream_tags + FTS5 + trigger'lar + articles.
- `db/seed.sql`, `db/import_islami.sql` mevcut.
- SQL islemleri Turso SQL Editor veya `/api/admin/sql` ile.

## UI Notlari
- API hata verirse demo/fallback veri seti gosteriliyor.
- `robots.txt`, `sitemap.xml`, `sitemap.html` var.
- Admin panelde SQL calistir bolumu var.

## Ortam Degiskenleri
- `TURSO_DATABASE_URL`
- `TURSO_AUTH_TOKEN`
- `ADMIN_TOKEN`

## Karakter/Kodlama
- `index.html`, `dream.html`, `admin.html`, `art.html` UTF-8.
