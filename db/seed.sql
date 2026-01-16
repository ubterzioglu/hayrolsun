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
    'Suyun durumu rüyanın anlamını belirler. Temiz su mutluluk, kirli su ise sorunları simgeler.',
    'doga',
    95000,
    4.7
  ),
  (
    'Uçmak Rüyası Tabiri',
    'ruyada-ucmak',
    'Uçmak özgürlük ve hırslarınızı temsil eder. Yüksekten uçmak başarıyı gösterir.',
    'hareket',
    88000,
    4.5
  ),
  (
    'Diş Düşmesi Rüyası Tabiri',
    'ruyada-dis-dusmesi',
    'Diş düşmesi kaygı, güvensizlik veya bir kaybı simgeler. Aile fertlerine dikkat edilmelidir.',
    'vucut',
    92000,
    4.6
  ),
  (
    'Yılan Rüyası Tabiri',
    'ruyada-yilan-gormek',
    'Yılan hem tehlike hem de dönüşüm sembolüdür. Rüyanın detayları yorumu değiştirir.',
    'hayvanlar',
    85000,
    4.4
  ),
  (
    'Ölüm Rüyası Tabiri',
    'ruyada-olum-gormek',
    'Ölüm rüyası genellikle yeni başlangıçları temsil eder, korkulacak bir şey değildir.',
    'hayat',
    78000,
    4.2
  ),
  (
    'Para Rüyası Tabiri',
    'ruyada-para-gormek',
    'Para kazanmak zenginlik değil, değer kazanmayı simgeler. Kaybetmek ise endişeyi gösterir.',
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

