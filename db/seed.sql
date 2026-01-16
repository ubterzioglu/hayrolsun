PRAGMA foreign_keys = ON;

INSERT OR IGNORE INTO categories (name, slug) VALUES
  ('Doğa', 'doga'),
  ('Hareket', 'hareket'),
  ('Vücut', 'vucut'),
  ('Hayvanlar', 'hayvanlar'),
  ('Hayat', 'hayat'),
  ('Maddi', 'maddi');

INSERT OR IGNORE INTO tags (name, slug) VALUES
  ('Su', 'su'),
  ('Uçmak', 'ucmak'),
  ('Diş', 'dis'),
  ('Yılan', 'yilan'),
  ('Ölüm', 'olum'),
  ('Para', 'para');

INSERT OR IGNORE INTO dreams (title, slug, body, category_slug, views, rating) VALUES
  (
    'Su Rüyası Tabiri',
    'ruyada-su-gormek',
    'Rüyada su görmek; suyun temizliği, berraklığı ve akışına göre farklı mânâlara gelebilir. Temiz ve berrak su hayra, ferahlığa ve gönül huzuruna işaret eder. Bulanık/kirli su ise sıkıntı ve imtihanı hatırlatabilir. Allah Teâlâ en doğrusunu bilir.',
    'doga',
    95000,
    4.7
  ),
  (
    'Uçmak Rüyası Tabiri',
    'ruyada-ucmak',
    'Rüyada uçmak; niyet ve hâle göre yükseliş, arzu edilen bir maksada yaklaşma veya bir belâdan kurtuluş şeklinde yorumlanabilir. Uçuş esnasındaki huzur, tabirin hayra dönmesine vesile olabilir. Allah Teâlâ en doğrusunu bilir.',
    'hareket',
    88000,
    4.5
  ),
  (
    'Diş Düşmesi Rüyası Tabiri',
    'ruyada-dis-dusmesi',
    'Rüyada dişin düşmesi; aile, yakınlar ve geçimle ilgili bazı endişeleri hatırlatabilir. Detaylar (kaç diş, acı, kan vb.) tabiri etkiler. Dua ve sadaka ile hayra çevirmeye gayret edilebilir. Allah Teâlâ en doğrusunu bilir.',
    'vucut',
    92000,
    4.6
  ),
  (
    'Yılan Rüyası Tabiri',
    'ruyada-yilan-gormek',
    'Rüyada yılan görmek; bazen düşmanlık, bazen de gizli bir imtihanı işaret edebilir. Yılanın rengi, büyüklüğü ve davranışı tabiri değiştirir. Korunma duaları ve istiğfar tavsiye edilir. Allah Teâlâ en doğrusunu bilir.',
    'hayvanlar',
    85000,
    4.4
  ),
  (
    'Ölüm Rüyası Tabiri',
    'ruyada-olum-gormek',
    'Rüyada ölüm görmek; çoğu zaman bir hâlin kapanıp yeni bir dönemin başlamasına, tevbe ve dönüşe işaret edebilir. Böyle rüyalar ibret ve muhasebeye vesile olabilir. Allah Teâlâ en doğrusunu bilir.',
    'hayat',
    78000,
    4.2
  ),
  (
    'Para Rüyası Tabiri',
    'ruyada-para-gormek',
    'Rüyada para görmek; rızık, emanet ve sorumlulukla ilgili işaretler taşıyabilir. Paranın bulunması/harcanması, miktarı ve türü tabiri değiştirir. Helâl kazanca yönelip şükür tavsiye edilir. Allah Teâlâ en doğrusunu bilir.',
    'maddi',
    82000,
    4.3
  );

-- Tag relations
INSERT OR IGNORE INTO dream_tags (dream_id, tag_slug)
SELECT d.id, 'su' FROM dreams d WHERE d.slug = 'ruyada-su-gormek';
INSERT OR IGNORE INTO dream_tags (dream_id, tag_slug)
SELECT d.id, 'ucmak' FROM dreams d WHERE d.slug = 'ruyada-ucmak';
INSERT OR IGNORE INTO dream_tags (dream_id, tag_slug)
SELECT d.id, 'dis' FROM dreams d WHERE d.slug = 'ruyada-dis-dusmesi';
INSERT OR IGNORE INTO dream_tags (dream_id, tag_slug)
SELECT d.id, 'yilan' FROM dreams d WHERE d.slug = 'ruyada-yilan-gormek';
INSERT OR IGNORE INTO dream_tags (dream_id, tag_slug)
SELECT d.id, 'olum' FROM dreams d WHERE d.slug = 'ruyada-olum-gormek';
INSERT OR IGNORE INTO dream_tags (dream_id, tag_slug)
SELECT d.id, 'para' FROM dreams d WHERE d.slug = 'ruyada-para-gormek';

