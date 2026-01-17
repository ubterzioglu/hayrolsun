## hayrolsun.site — Database Güncelleme Kılavuzu (Turso / libSQL)

Bu proje **okuma ağırlıklı** olduğu için veritabanında amaç:

- **Rüya içeriklerini** (başlık + uzun metin) saklamak
- **Kategori / etiket** ile filtrelemek
- **Arama** için FTS (Full Text Search) kullanmak

> Önemli: `TURSO_AUTH_TOKEN` **asla** frontend’e konmaz, Git’e commit edilmez. Vercel “Environment Variables” içinde tutulur.

### Kullanılan şema (özet)

- **`dreams`**: rüya kayıtları (title, slug, body, category_slug, views, rating, created_at, updated_at)
- **`categories`**: kategoriler (name, slug)
- **`tags`**: etiketler (name, slug)
- **`dream_tags`**: rüya ↔ etiket çoktan-çoğa ilişkisi
- **`dreams_fts`**: FTS5 arama index’i (title + body)

FTS, `db/schema.sql` içindeki trigger’lar ile **otomatik senkron** tutulur.

### Dosyalar

- **Schema**: `db/schema.sql`
- **Seed (örnek data)**: `db/seed.sql`

### Ortam değişkenleri (Production)

Vercel projesinde aşağıdaki env’ler tanımlı olmalı:

- `TURSO_DATABASE_URL`
- `TURSO_AUTH_TOKEN`

### Database güncelleme senaryoları

## 1) İçerik ekleme/güncelleme (data update)

Bu işlem için iki yol var:

- **(A) Turso Dashboard / SQL Editor**: en pratik yöntem
- **(B) Lokalden SQL çalıştırma**: Turso paneli veya kendi araçların (Turso CLI, curl vb.)

Admin panelde SQL import alani vardir; icerik ekleme Dashboard veya admin panelden yapilabilir.

### SQL query’yi nereye yazıyorum? (Turso Dashboard)

1. Turso’da ilgili **database**’i aç
2. Sol menüden **SQL / Query / SQL Editor** benzeri bölüme gir
3. Query alanına SQL’ini yapıştır ve **Run** (çalıştır) de

> Not: `dreams.category_slug` alanı `categories.slug`’a bağlı. Bu yüzden `islami` gibi yeni bir kategori kullanacaksan, önce kategoriyi ekle.

Örnek:

```sql
INSERT OR IGNORE INTO categories (name, slug)
VALUES ('İslami', 'islami');
```

### Turso paneli yoksa: Admin panelden SQL import

Eğer Turso Dashboard’a erişemiyorsan, sitedeki admin ekranını kullanabilirsin:

- URL: **`/admin.html`**
- Token: **`ADMIN_TOKEN`** (Vercel Env’e eklediğin değer)
- “**SQL Çalıştır (Import)**” alanına SQL’ini yapıştır → **Çalıştır**

Güvenlik için backend yalnızca şu tablolara **INSERT** (ve kontrol amaçlı **SELECT**) kabul eder:

- `dreams`
- `categories`
- `tags`
- `dream_tags`
- `articles`

### Terminalden SQL çalıştırma (dosya ile)

Eğer SQL'i dosyada tutmak istersen iki yol var:

- **Turso SQL Editor / Turso CLI** (tercih edilen)
- **Canlı API**: `/api/admin/sql` (yalnızca INSERT/SELECT)

Örnek (curl):

```bash
curl -X POST https://www.hayrolsun.site/api/admin/sql \
  -H "content-type: application/json" \
  -H "x-admin-token: $ADMIN_TOKEN" \
  -d "{\"sql\":\"INSERT OR IGNORE INTO categories (name, slug) VALUES ('Islami','islami');\"}"
```

### A) Turso Dashboard ile yeni rüya ekleme

1. Turso’da DB’yi aç → **SQL Editor**
2. Aşağıdaki örnekleri kullan

#### Kategori ekleme

```sql
INSERT OR IGNORE INTO categories (name, slug)
VALUES ('İslami', 'islami');
```

#### Etiket ekleme

```sql
INSERT OR IGNORE INTO tags (name, slug)
VALUES ('Evlilik', 'evlilik');
```

#### Yeni rüya ekleme

```sql
INSERT INTO dreams (title, slug, body, category_slug, views, rating)
VALUES (
  'Rüyada Evlilik Görmek',
  'ruyada-evlilik-gormek',
  'Uzun tabir metni buraya gelecek...',
  'islami',
  0,
  0
);
```

#### Rüyaya etiket bağlama

```sql
INSERT OR IGNORE INTO dream_tags (dream_id, tag_slug)
SELECT d.id, 'evlilik'
FROM dreams d
WHERE d.slug = 'ruyada-evlilik-gormek';
```

#### Rüya metni güncelleme

```sql
UPDATE dreams
SET body = 'Güncel uzun tabir metni...'
WHERE slug = 'ruyada-evlilik-gormek';
```

#### Başlık formatını “Rüyada X Görmek” olarak güncelleme (örnek)

Elindeki kayıtlar “X Rüyası Tabiri” formatındaysa, aşağıdaki gibi `UPDATE` ile tek seferde düzeltebilirsin:

```sql
UPDATE dreams SET title = 'Rüyada Su Görmek' WHERE slug = 'ruyada-su-gormek';
UPDATE dreams SET title = 'Rüyada Uçmak Görmek' WHERE slug = 'ruyada-ucmak';
UPDATE dreams SET title = 'Rüyada Diş Düşmesi Görmek' WHERE slug = 'ruyada-dis-dusmesi';
UPDATE dreams SET title = 'Rüyada Yılan Görmek' WHERE slug = 'ruyada-yilan-gormek';
UPDATE dreams SET title = 'Rüyada Ölüm Görmek' WHERE slug = 'ruyada-olum-gormek';
UPDATE dreams SET title = 'Rüyada Para Görmek' WHERE slug = 'ruyada-para-gormek';
```

> Not: `dreams_fts` (arama index’i) trigger’lar sayesinde otomatik güncellenir. Ekstra işlem yapmana gerek yok.

## 1.1) Views ve Like/Dislike (rating) nasıl çalışıyor?

- **Views**: Detay sayfası açıldığında backend şu endpoint’e istek atar ve DB’de `views = views + 1` olur:
  - `POST /api/dreams/:slug/view`
- **Rating (Like/Dislike)**: Detay sayfasındaki butonlar şu endpoint’e istek atar:
  - `POST /api/dreams/:slug/vote` body: `{ "vote": "like" }` veya `{ "vote": "dislike" }`

> Not: Şu an kullanıcı hesabı yok. Tekrarlı oyları engellemek için frontend tarafında basit bir `localStorage` kilidi var (tarayıcı bazlı).

### SQL ile manuel artırmak istersen

#### Views artırma

```sql
UPDATE dreams SET views = views + 1 WHERE slug = 'ruyada-yilan-gormek';
```

#### Like / Dislike artırma

```sql
UPDATE dreams SET likes = likes + 1 WHERE slug = 'ruyada-yilan-gormek';
-- veya
UPDATE dreams SET dislikes = dislikes + 1 WHERE slug = 'ruyada-yilan-gormek';
```

## 2) Schema değişikliği (manual)

Schema değişikliği demek: yeni tablo/kolon/index/trigger eklemek veya değiştirmek demek.

Bu projede schema kaynağı **`db/schema.sql`**.

### Adımlar

1. `db/schema.sql` dosyasını düzenle
2. **Turso SQL Editor** (veya Turso CLI) ile schema SQL'ini çalıştır

> Not: `/api/admin/sql` yalnızca INSERT/SELECT kabul ettiği için schema değişikliği burada yapılamaz.

## 3) Seed (ilk veri basma)

Seed yalnızca "ilk kurulum" veya "demo verisi" için.

Yöntemler:

- Turso SQL Editor ile `db/seed.sql` çalıştır
- Admin paneldeki SQL import alanını kullan

> Seed `INSERT OR IGNORE` kullandığı için tekrar çalıştırıldığında genelde idempotent davranır.

### Slug kuralları (öneri)

- Hepsi küçük harf
- Türkçe karakterleri sadeleştir: `ş->s`, `ç->c`, `ı->i`, `ğ->g`, `ö->o`, `ü->u`
- Boşluk yerine `-`
- Örn: `Rüyada Yılan Görmek` → `ruyada-yilan-gormek`

### Canlı sitede test (kontrol listesi)

- Vercel’de env’ler doğru mu? (URL + token)
- Deploy sonrası `GET /api/dreams` 200 dönüyor mu?
- `query` ile arama çalışıyor mu? (`/api/dreams?query=yilan`)
- Kategori filtre çalışıyor mu? (`/api/dreams?category=hayvanlar`)

### Güvenlik notu

- Token sızdıysa: Turso’dan **token rotate** yap, Vercel env’i güncelle, tekrar deploy et.

