# Durum Özeti (2026-01-17 08:32:27)
Timestamp: 2026-01-17 08:32:27

## Proje Amacı
- hayrolsun.site: İslami rüya tabirleri için React + Vite + Tailwind tabanlı SPA.

## Mimari ve Akış
- Rotalar: `/`, `/ruya/:slug`, `/admin` (React Router).
- Backend: Vercel serverless `api/` uçları + Turso (libSQL).
- Admin: `ADMIN_TOKEN` zorunlu; `x-admin-token` ile yetkilendirme, oturumda saklanıyor.
- `vercel.json`: SPA yönlendirmesi ve `/api/*` yönlendirmesi.

## API Özeti
- `GET /api/dreams`: arama + kategori/tag filtreleri, FTS5 ile arama.
- `GET /api/dreams/:slug`: detay + tag listesi.
- `POST /api/dreams/:slug/view`: görüntülenme artırır.
- `POST /api/dreams/:slug/vote`: beğeni/beğenmeme artırır.
- `GET /api/admin/summary`, `GET /api/admin/dreams`, `GET /api/admin/categories`.
- `POST /api/admin/sql`: yalnızca `SELECT` ve kısıtlı `INSERT` (dreams/categories/tags/dream_tags).

## Veri ve Scriptler
- `db/schema.sql`: categories/tags/dreams/dream_tags + FTS5 + trigger'lar.
- `db/seed.sql`, `db/import_islami.sql` mevcut.
- Scriptler: `db:migrate`, `db:seed`, `db:sql` (TURSO env'leriyle).

## UI Notları
- API hata verirse demo/fallback veri seti gösteriliyor.
- `public/robots.txt`, `public/sitemap.xml` gibi SEO dosyaları var.

## Ortam Değişkenleri
- `.env`: `TURSO_DATABASE_URL` ve `TURSO_AUTH_TOKEN` mevcut; `ADMIN_TOKEN` eklendi (değeri güncelleyin).
- `env.example`: TURSO + `ADMIN_TOKEN` örnekleri mevcut.

## Karakter/Kodlama
- `index.html` ve `src/pages/*` UTF-8; Türkçe karakterler doğrulandı.
