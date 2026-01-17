# Done Ozeti

- `status_timestamp.md` olusturuldu ve zaman damgasi ile repo ozet bulgulari yazildi.
- `.env` icine `ADMIN_TOKEN` eklendi; `readme.md` icinde admin degiskeni not edildi.
- `vercel.json` apex -> `www` 301 yonlendirme eklendi ve filesystem routing ayarlandi.
- `index.html` ana sayfa metni guncellendi; logo boyutu/yerlesim duzenlendi; header'a ayirac + `Yazilarimiz` butonu eklendi.
- `art.html` olusturuldu ve verilen yazilar eklendi.
- `db/schema.sql` icinde `articles` tablosu ve trigger eklendi; `db/seed.sql` icine `articles` ve `ruyaadd.sql` icerigi eklendi, duplicate temizlendi.
- `api/admin/sql.ts` whitelist'e `articles` eklendi; `api/_lib/turso.ts` HTTP pipeline ile baglantiya guncellendi.
- Admin paneline SQL calistir bolumu eklendi (`/api/admin/sql`).
- Statik sistem ana dizine alindi: `index.html`, `app.js`, `styles.css`, `dream.html`, `dream.js`, `admin.html`, `admin.js`, `robots.txt`, `sitemap.xml`, `sitemap.html`.
- React/TSX dosyalari kaldirildi (`src/`, configler, `package.json`, `node_modules`, `dist`).
- Dokumanlarda eski komut referanslari temizlendi, admin URL `/admin.html` olarak guncellendi.
- Test calistirilmadi.
