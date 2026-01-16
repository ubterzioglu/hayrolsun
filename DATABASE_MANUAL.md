## Hayrolsun.site — Database Güncelleme Kılavuzu (Turso / libSQL)

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
- **Migration komutu**: `npm run db:migrate` (script: `scripts/db-migrate.mjs`)
- **Seed komutu**: `npm run db:seed` (script: `scripts/db-seed.mjs`)

### Ortam değişkenleri (Production)

Vercel projesinde aşağıdaki env’ler tanımlı olmalı:

- `TURSO_DATABASE_URL`
- `TURSO_AUTH_TOKEN`

### Database güncelleme senaryoları

## 1) İçerik ekleme/güncelleme (data update)

Bu işlem için iki yol var:

- **(A) Turso Dashboard / SQL Editor**: en pratik yöntem
- **(B) Lokalden SQL çalıştırma**: kendi script’inle (ileride istersen admin CLI ekleriz)

Şu an repoda (kasıtlı olarak) “admin panel / content editor” yok; içerik ekleme genelde Dashboard üzerinden yapılır.

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

> Not: `dreams_fts` (arama index’i) trigger’lar sayesinde otomatik güncellenir. Ekstra işlem yapmana gerek yok.

## 2) Schema değişikliği (migration)

Schema değişikliği demek: yeni tablo/kolon/index/trigger eklemek veya değiştirmek demek.

Bu projede schema kaynağı **`db/schema.sql`**.

### Adımlar

1. `db/schema.sql` dosyasını düzenle
2. Production env’ler hazırken (Vercel’de zaten var), **lokal makineden** migration’ı çalıştır:

```bash
npm run db:migrate
```

> Bu komut `.env / .env.local / .env.development.local` dosyalarını otomatik okur.
> Production için `.env` içine production Turso bilgilerini koymak yerine, güvenli yöntem: Vercel’den `vercel env pull` ile yerel dosyaya almak veya geçici olarak shell env ile çalıştırmaktır.

## 3) Seed (ilk veri basma)

Seed yalnızca “ilk kurulum” veya “demo verisi” için.

```bash
npm run db:seed
```

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

