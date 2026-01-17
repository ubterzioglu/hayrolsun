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
    'Rüyada Su Görmek',
    'ruyada-su-gormek',
    'Rüyada su görmek; suyun temizliği, berraklığı ve akışına göre farklı mânâlara gelebilir. Temiz ve berrak su hayra, ferahlığa ve gönül huzuruna işaret eder. Bulanık/kirli su ise sıkıntı ve imtihanı hatırlatabilir. Allah Teâlâ en doğrusunu bilir.',
    'doga',
    0,
    0
  ),
  (
    'Rüyada Uçmak Görmek',
    'ruyada-ucmak',
    'Rüyada uçmak; niyet ve hâle göre yükseliş, arzu edilen bir maksada yaklaşma veya bir belâdan kurtuluş şeklinde yorumlanabilir. Uçuş esnasındaki huzur, tabirin hayra dönmesine vesile olabilir. Allah Teâlâ en doğrusunu bilir.',
    'hareket',
    0,
    0
  ),
  (
    'Rüyada Diş Düşmesi Görmek',
    'ruyada-dis-dusmesi',
    'Rüyada dişin düşmesi; aile, yakınlar ve geçimle ilgili bazı endişeleri hatırlatabilir. Detaylar (kaç diş, acı, kan vb.) tabiri etkiler. Dua ve sadaka ile hayra çevirmeye gayret edilebilir. Allah Teâlâ en doğrusunu bilir.',
    'vucut',
    0,
    0
  ),
  (
    'Rüyada Yılan Görmek',
    'ruyada-yilan-gormek',
    'Rüyada yılan görmek; bazen düşmanlık, bazen de gizli bir imtihanı işaret edebilir. Yılanın rengi, büyüklüğü ve davranışı tabiri değiştirir. Korunma duaları ve istiğfar tavsiye edilir. Allah Teâlâ en doğrusunu bilir.',
    'hayvanlar',
    0,
    0
  ),
  (
    'Rüyada Ölüm Görmek',
    'ruyada-olum-gormek',
    'Rüyada ölüm görmek; çoğu zaman bir hâlin kapanıp yeni bir dönemin başlamasına, tevbe ve dönüşe işaret edebilir. Böyle rüyalar ibret ve muhasebeye vesile olabilir. Allah Teâlâ en doğrusunu bilir.',
    'hayat',
    0,
    0
  ),
  (
    'Rüyada Para Görmek',
    'ruyada-para-gormek',
    'Rüyada para görmek; rızık, emanet ve sorumlulukla ilgili işaretler taşıyabilir. Paranın bulunması/harcanması, miktarı ve türü tabiri değiştirir. Helâl kazanca yönelip şükür tavsiye edilir. Allah Teâlâ en doğrusunu bilir.',
    'maddi',
    0,
    0
  );

INSERT OR IGNORE INTO articles (title, slug, body) VALUES
  (
    'İslamiyet ve Rüyalar',
    'islamiyet-ve-ruyalar',
    'İslam, rüyaları "müminin üçte biri" olarak tanımlayarak onlara özel bir yer verir. Kur’an-ı Kerim’de "Allah’ın bir işareti" olarak ifade edilen rüyalar, insanın ruh hali ve imanı ile doğrudan ilişkilidir. Peygamberimiz (s.a.v.), "En güzel rüya, müminin rüyasıdır" hadisiyle rüyaların temiz kalple bağlantısını vurgulamıştır. İslam’da rüyalar, Allah’ın izniyle gelen bir nimet ve bazen de uyaran bir mesaj olabilir; ancak her rüyanın manası yoktur. Batıl inançlardan uzak durulması, Kur’an ve Sünnet ışığında değerlendirilmesi gerekir.

Rüyaların İslam’da yeri, Hz. Yusuf (a.s.)’ın rüyalarının tefsirini içeren Kur’an ayetlerinde de net bir şekilde ortaya konur. Rüyalar, bilinçaltı ile değil, Allah’ın iradesiyle şekillenir. Bu yüzden rüya yorumlaması, sadece ehliyetli alimlerin yapabileceği bir bilimdir. Müslüman, rüyalarını manevi bir rehber olarak görmeli, ancak her rüyayı gerçekleştirmeye kalkmamalıdır. Rüya yorumlaması, imanın ve dua ile beslenen bir yaklaşımla yapılmalıdır.

İslam, rüyaları anlamak için "istikametli niyet" ve "sabah-akşam duaları" gibi pratikler önerir. Rüyaların kontrolü, Allah’a tevekkül ederek ve istikametli bir yaşam süresiyle mümkündür. Rüya tabiri, kişinin niyeti ve hayatındaki durumla bağlantılıdır. Bu yüzden rüyalar, sadece gece dünyasının eseri değil, imanın ve dua ile beslenen bir hayatın ışığıdır. Müslüman, rüyaları değerlendirirken her zaman Kur’an ve Sünnet’i referans almalıdır.'
  ),
  (
    'Rüya Nedir',
    'ruya-nedir',
    'Rüya, insanın uyuduğunda zihnin serbestçe hareket ettiği, bilinçsiz bir durumda oluşan görüntülerdir. İslam’da rüya, "ruhun serbest kalması" olarak tanımlanır ve Allah’ın izniyle gerçekleşir. Kur’an-ı Kerim’de, "Allah, insanın ruhunu alır" ayetiyle uyku ve rüyaların ilahi bir süreç olduğu vurgulanır. Rüyalar, bazen müjde, bazen de uyarı niteliğinde olabilir; ancak her rüyanın manası yoktur.

Peygamberimiz (s.a.v.), "Rüya üç kısımdır: Allah’tan gelen müjde, insanın içinden gelen düşünceler ve şeytanın vesvesesi" buyurarak rüyaları üç ana başlıkta toplamıştır. Müslüman, rüyalarını değerlendirmek için bu ayrımı dikkate almalıdır. Güzel rüyalar, Allah’ın lütfu; kötü rüyalar ise genellikle şeytanın vesvesesidir. Bu yüzden rüyaların yorumu, imanla ve bilgiyle yapılmalıdır.

Rüya, insanın kalbinin temizliğiyle doğrudan ilişkilidir. İmanı güçlü olanların rüyaları genellikle daha aydınlıktır. Rüya tabiri, ehliyetli alimlerin danışılmasıyla yapılmalıdır. Her rüya gerçek olmayabilir; bu yüzden rüyaları aşırı önemsemek veya korkmamak gerekir. Rüya, İslam’da "ruhun huzur anı" olarak kabul edilir ve imanla beslenmelidir.'
  ),
  (
    'Rüyalar ve Bilinçaltı',
    'ruyalar-ve-bilincalti',
    'Bilinçaltı kavramı, modern psikolojide rüyaları açıklamak için kullanılır; ancak İslam, rüyaları Allah’ın izniyle şekillenen bir süreç olarak görür. Bilinçaltı, insanın gizli arzularını yansıtabilir, ancak İslam’da rüyaların asıl kaynağı Allah’ın hikmetidir. Peygamberimiz (s.a.v.), "Rüya, müminin üçte biridir" diyerek rüyaların manevi boyutunu vurgulamıştır.

Rüyalar, bilinçaltı ile bağlantılı olsa bile sonucu Allah’ın elindedir. Bu yüzden bilinçaltı üzerinden yapılan yorumlar, İslam’ın temel prensiplerini aşmamalıdır. Müslüman, rüyalarını anlamak için Kur’an ve Sünnet’i referans almalı, psikolojik yorumlara aşırı güvenmemelidir. Rüya tabiri, imanla ve ehliyetli alimlerin görüşüyle yapılmalıdır.

İslam, bilinçaltı kavramını reddetmez; ancak onu Allah’ın kudreti çerçevesinde değerlendirir. Rüyalar, kişinin niyeti, dua ederken iç hali ve yaşam tarzıyla ilişkilidir. Bu yüzden rüyaları anlamak için, sadece bilinçaltı değil, iman ve dua ile beslenen bir yaklaşım gerekir. Rüya, İslam’da "ruhun huzur anı" olarak kabul edilir ve imanla beslenmelidir.'
  ),
  (
    'Uyku Nedir',
    'uyku-nedir',
    'Uyku, Allah’ın insanlara lütfu olan ve vücudun dinlenmesi için yaratılmış bir nimettir. Kur’an-ı Kerim’de, "Allah, size geceyi uyku olarak yaratmıştır" ayetiyle uyku, Allah’ın hikmetiyle şekillenmiş bir süreç olarak tanımlanır. Uyku, insanın ruhunu serbest bırakarak rüyaların oluşmasına zemin hazırlar. İslam’da uyku, sadece fiziksel dinlenme değil, manevi bir huzur anıdır.

Peygamberimiz (s.a.v.), "Uyku, ölümün küçük kardeşidir" diyerek uyku ile ölüm arasındaki ilişkiyi vurgulamıştır. Uyku, Allah’ın izniyle ruhun geçici olarak alınmasıdır. Bu yüzden uyku öncesi ve sonrası duaları, İslam’da büyük önem taşır. Sabah-akşam dualarıyla uyumak ve uyanmak, rüyaların güzel olmasını sağlar.

İslam, uyku düzenini de önemser. Gece geç saatlerde uyumamak, sabah namazına uygun bir uyku almak teşvik edilir. Uyku, rüyaların oluştuğu bir süreçtir; bu yüzden uyku öncesi yapılan dualar ve niyetler, rüyaları olumlu yönde etkiler. Müslüman, uyku anını da Allah’a şükretmek ve dua etmek için fırsat bilir.'
  ),
  (
    'Astral Seyahat Nedir',
    'astral-seyahat-nedir',
    'Astral seyahat, modern dünyada "ruhun bedenden ayrılması" olarak tanımlanan bir kavramdır; ancak İslam’da bu inançlar kabul edilmez. Kur’an-ı Kerim ve Sünnet’ten destek alamayan bu kavram, şirk ve batıl inançlara kapı açabilir. Peygamberimiz (s.a.v.), "Rüya üç kısımdır" hadisiyle rüyaların kaynağını net bir şekilde açıklamıştır; astral seyahat gibi kavramlar ise bu sınırları aşar.

İslam, astral seyahat gibi kavramları reddeder. Ruh, Allah’ın izniyle bedenden ayrılır; ancak bu, sadece ölüm anında gerçekleşir. Hayatta iken ruhun bedenden ayrılması, Kur’an ve Sünnet’ten destek alamaz. Bu yüzden astral seyahat, batıl inançlar ve şifa arayışları içindeki insanların sapmasına neden olabilir.

Müslüman, astral seyahat gibi kavramlardan uzak durmalı ve Kur’an ve Sünnet’i referans almalıdır. Rüyalar, Allah’ın izniyle oluşur; ancak astral seyahat, bu süreci insana mal eden bir yaklaşımdır. İslam’da rüyaların manası, imanla ve ehliyetli alimlerin görüşüyle değerlendirilmelidir. Astral seyahat, İslam’ın çerçevesinde değerlendirilemez.'
  ),
  (
    'Burçlar',
    'burclar',
    'Burçlar, yıldızların konumuna dayalı bir kader inancıdır; ancak İslam’da bu tür inançlar şirk sayılır. Kur’an-ı Kerim’de, "Kaderi sadece Allah bilir" ayetiyle kaderin Allah’ın elinde olduğu vurgulanır. Burçlar, insanların kaderini yıldızlara bağlaması anlamına gelir ve bu, tevhid inancına aykırıdır.

Peygamberimiz (s.a.v.), "Yıldızlar, geceyi aydınlatmak ve yol göstermek için yaratılmıştır; burçlarla kaderi tahmin etmek ise batıldır" buyurmuştur. Burçlar, insanı Allah’a değil, yaratılanlara yönelten bir inançtır. Müslüman, kaderini Allah’a tevekkül ederek, burçlara inanmamalıdır.

İslam, burçların rüya yorumlamasına karıştırılmasını reddeder. Rüyalar, Allah’ın izniyle oluşur; ancak burçlar, bu süreci insana ve yıldızlara mal eder. Müslüman, rüya tabirini ehliyetli alimlerden almalı, burçların etkisine kapılmamalıdır. Burçlar, İslam’ın temel prensiplerine aykırı olduğundan kesinlikle reddedilmelidir.'
  ),
  (
    'Kontrol Edilebilen Rüyalar',
    'kontrol-edilebilen-ruyalar',
    'Kontrol edilebilen rüyalar, modern psikolojide "lucid dream" olarak tanımlanır; ancak İslam’da rüyaların kontrolü, Allah’ın izniyle mümkündür. Peygamberimiz (s.a.v.), "Uyku öncesi istikametli niyet ve dua" ile rüyaların olumlu olmasını teşvik etmiştir. Müslüman, rüyalarını kontrol etmek için sabah-akşam dualarını ve istikametli bir yaşamı tercih etmelidir.

Rüyaların kontrolü, sadece Allah’ın izniyle gerçekleşir. İnsan, rüyalarını kontrol etmek için dua edebilir; ancak bu, Allah’a tevekkül ederek yapılmalıdır. Peygamberimiz (s.a.v.), "Rüya, müminin üçte biridir" diyerek rüyaların manevi boyutunu vurgulamıştır. Bu yüzden rüyaları kontrol etmek, imanla ve dua ile beslenmelidir.

Kontrol edilebilen rüyalar, İslam’da "istikametli niyet" ile ilişkilendirilir. Müslüman, rüyalarını olumlu yönde şekillendirmek için Kur’an-ı Kerim okumalı ve sabah-akşam dualarını ihmal etmemelidir. Rüyaların kontrolü, insanın kendi gücüne değil, Allah’ın kudretine dayanmalıdır. Bu yüzden kontrol edilebilen rüyalar, İslam’ın çerçevesinde "dua ve tevekkül" ile değerlendirilmelidir.'
  ),
  (
    'İstihare Nasıl Yapılır',
    'istihare-nasil-yapilir',
    'İstihare namazı, önemli kararlar alırken Allah’tan doğru yolu istemek için kılınan bir namazdır. Peygamberimiz (s.a.v.), "Herhangi bir işe karar veremiyorsanız, istihare namazı kılın" buyurmuştur. İstihare, rüya yorumlamasında da önemli bir yer tutar; çünkü istihare sonrası gelen rüyalar, genellikle Allah’ın rehberliğidir.

İstihare namazı, iki rekâttır ve her rekâtın sonunda "Allah’ım, eğer bu iş benim için hayırlıysa..." diye dua edilir. İstihare sonrası, kalbin huzur bulması ve rüyaların olumlu olması, Allah’ın rehberliğinin işareti olabilir. Müslüman, istihareyi düzenli olarak yapmalı ve rüyalarını bu çerçevede değerlendirmelidir.

İstihare, rüya yorumlamasında en güvenilir rehberdir. İstihare sonrası gelen rüyalar, genellikle Allah’ın rehberliğidir. Müslüman, rüya tabiri için ehliyetli alimlere danışmalı, ancak istihareyi ihmal etmemelidir. İstihare, İslam’da "dua ve tevekkül"ün en güzel örneklerindendir.'
  ),
  (
    'Psikolojik Rüya Yorumları',
    'psikolojik-ruya-yorumlari',
    'Psikolojik rüya yorumları, modern dünyada rüyaları anlamak için kullanılan bir yöntemdir; ancak İslam’da rüya tabiri, Kur’an ve Sünnet’ten yola çıkılarak yapılmalıdır. Psikolojik yorumlar bazen faydalı olsa da, İslam’ın temel prensiplerini aşmamalıdır. Peygamberimiz (s.a.v.), "Rüya üç kısımdır" diyerek rüyaların kaynağını net bir şekilde açıklamıştır.

Müslüman, psikolojik yorumlara aşırı güvenmemeli ve her zaman Kur’an ve Sünnet’i referans almalıdır. Rüya tabiri, ehliyetli alimlerin danışılmasıyla yapılmalıdır. Psikolojik yorumlar, rüyaların manevi boyutunu göremeyebilir; bu yüzden İslam’ın çerçevesinde değerlendirilmelidir.

Rüyalar, psikolojik yorumlarla kısmen açıklanabilir; ancak asıl manası Allah’ın izniyle belirlenir. Müslüman, rüyalarını anlamak için psikolojik yorumları destek olarak kullanabilir, ancak Kur’an ve Sünnet’i esas almalıdır. Rüya tabiri, imanla ve ehliyetli alimlerin görüşüyle yapılmalıdır.'
  ),
  (
    'Rüya Yorumlama ve Tabiri',
    'ruya-yorumlama-ve-tabiri',
    'Rüya yorumlama, İslam’da "tebşir" olarak adlandırılan ve ehliyetli alimlerin yaptığı bir bilimdir. Peygamberimiz (s.a.v.), "En güzel rüya, müminin rüyasıdır" diyerek rüya tabirinin önemini vurgulamıştır. Rüya tabiri, kişinin niyeti, yaşam durumu ve dua ederken iç haliyle bağlantılıdır.

Rüya yorumlaması, sadece ehliyetli alimlerin yapabileceği bir bilimdir. Herkesin rüya tabiri yapması, hatalı yorumlara neden olabilir. Müslüman, rüya tabiri için ehliyetli alimlere danışmalıdır. Rüya tabiri, Kur’an ve Sünnet’ten yola çıkılarak yapılmalıdır.

Rüya yorumlaması, imanla ve tevekkülle yapılmalıdır. Rüyaların manası, Allah’ın izniyle belirlenir. Müslüman, rüya tabirini ehliyetli alimlerden almalı ve rüyalarını manevi bir rehber olarak görmelidir. Rüya tabiri, İslam’da "ruhun huzur anı" olarak kabul edilir.'
  ),
  (
    'Rüyalara Dair Gerçekler',
    'ruyalara-dair-gercekler',
    'Rüyalar, İslam’da "müminin üçte biri" olarak tanımlanır ve Allah’ın izniyle oluşur. Peygamberimiz (s.a.v.), "Rüya üç kısımdır: Allah’tan gelen müjde, insanın içinden gelen düşünceler ve şeytanın vesvesesi" buyurmuştur. Bu yüzden her rüyanın manası yoktur; ancak tekrarlanan veya kalp huzuru veren rüyalar dikkate alınmalıdır.

Rüyalar, kişinin niyeti ve yaşam tarzıyla doğrudan ilişkilidir. İmanı güçlü olanların rüyaları genellikle daha aydınlıktır. Rüya tabiri, ehliyetli alimlerin danışılmasıyla yapılmalıdır. Müslüman, rüyalarını aşırı önemsememeli, ancak Allah’ın rehberliği için dikkatli olmalıdır.

Rüyalara dair en önemli gerçek, rüyaların Allah’ın izniyle oluşmasıdır. Müslüman, rüyalarını manevi bir rehber olarak görmeli ve Kur’an ve Sünnet’i referans almalıdır. Rüyalar, İslam’da "ruhun huzur anı" olarak kabul edilir ve imanla beslenmelidir.'
  ),
  (
    'Tekrarlanan Rüyalar',
    'tekrarlanan-ruyalar',
    'Tekrarlanan rüyalar, İslam’da Allah’ın insanı uyarmak veya doğru yola yönlendirmek için gönderdiği işaretlerdir. Peygamberimiz (s.a.v.), "Tekrarlanan rüya, Allah’ın lütfudur" buyurmuştur. Tekrarlanan rüyalar, genellikle kişinin dikkatini çekmek için gönderilir ve önemsenmelidir.

Müslüman, tekrarlanan rüyaları ciddiye almalı ve istihare namazı kılmalıdır. Rüya tabiri, ehliyetli alimlerin danışılmasıyla yapılmalıdır. Tekrarlanan rüyalar, kişinin yaşamını olumlu yönde değiştirmesi için bir fırsat olabilir.

Tekrarlanan rüyalar, İslam’da "Allah’ın rehberliği" olarak kabul edilir. Müslüman, tekrarlanan rüyaları manevi bir rehber olarak görmeli ve Kur’an ve Sünnet’i referans almalıdır. Rüyalar, İslam’da "ruhun huzur anı" olarak kabul edilir ve imanla beslenmelidir.'
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

INSERT OR IGNORE INTO articles (title, slug, body) VALUES
  (
    'İslamiyet ve Rüyalar',
    'islamiyet-ve-ruyalar',
    'İslam, rüyaları "müminin üçte biri" olarak tanımlayarak onlara özel bir yer verir. Kur’an-ı Kerim’de "Allah’ın bir işareti" olarak ifade edilen rüyalar, insanın ruh hali ve imanı ile doğrudan ilişkilidir. Peygamberimiz (s.a.v.), "En güzel rüya, müminin rüyasıdır" hadisiyle rüyaların temiz kalple bağlantısını vurgulamıştır. İslam’da rüyalar, Allah’ın izniyle gelen bir nimet ve bazen de uyaran bir mesaj olabilir; ancak her rüyanın manası yoktur. Batıl inançlardan uzak durulması, Kur’an ve Sünnet ışığında değerlendirilmesi gerekir.

Rüyaların İslam’da yeri, Hz. Yusuf (a.s.)’ın rüyalarının tefsirini içeren Kur’an ayetlerinde de net bir şekilde ortaya konur. Rüyalar, bilinçaltı ile değil, Allah’ın iradesiyle şekillenir. Bu yüzden rüya yorumlaması, sadece ehliyetli alimlerin yapabileceği bir bilimdir. Müslüman, rüyalarını manevi bir rehber olarak görmeli, ancak her rüyayı gerçekleştirmeye kalkmamalıdır. Rüya yorumlaması, imanın ve dua ile beslenen bir yaklaşımla yapılmalıdır.

İslam, rüyaları anlamak için "istikametli niyet" ve "sabah-akşam duaları" gibi pratikler önerir. Rüyaların kontrolü, Allah’a tevekkül ederek ve istikametli bir yaşam süresiyle mümkündür. Rüya tabiri, kişinin niyeti ve hayatındaki durumla bağlantılıdır. Bu yüzden rüyalar, sadece gece dünyasının eseri değil, imanın ve dua ile beslenen bir hayatın ışığıdır. Müslüman, rüyaları değerlendirirken her zaman Kur’an ve Sünnet’i referans almalıdır.'
  ),
  (
    'Rüya Nedir',
    'ruya-nedir',
    'Rüya, insanın uyuduğunda zihnin serbestçe hareket ettiği, bilinçsiz bir durumda oluşan görüntülerdir. İslam’da rüya, "ruhun serbest kalması" olarak tanımlanır ve Allah’ın izniyle gerçekleşir. Kur’an-ı Kerim’de, "Allah, insanın ruhunu alır" ayetiyle uyku ve rüyaların ilahi bir süreç olduğu vurgulanır. Rüyalar, bazen müjde, bazen de uyarı niteliğinde olabilir; ancak her rüyanın manası yoktur.

Peygamberimiz (s.a.v.), "Rüya üç kısımdır: Allah’tan gelen müjde, insanın içinden gelen düşünceler ve şeytanın vesvesesi" buyurarak rüyaları üç ana başlıkta toplamıştır. Müslüman, rüyalarını değerlendirmek için bu ayrımı dikkate almalıdır. Güzel rüyalar, Allah’ın lütfu; kötü rüyalar ise genellikle şeytanın vesvesesidir. Bu yüzden rüyaların yorumu, imanla ve bilgiyle yapılmalıdır.

Rüya, insanın kalbinin temizliğiyle doğrudan ilişkilidir. İmanı güçlü olanların rüyaları genellikle daha aydınlıktır. Rüya tabiri, ehliyetli alimlerin danışılmasıyla yapılmalıdır. Her rüya gerçek olmayabilir; bu yüzden rüyaları aşırı önemsemek veya korkmamak gerekir. Rüya, İslam’da "ruhun huzur anı" olarak kabul edilir ve imanla beslenmelidir.'
  ),
  (
    'Rüyalar ve Bilinçaltı',
    'ruyalar-ve-bilincalti',
    'Bilinçaltı kavramı, modern psikolojide rüyaları açıklamak için kullanılır; ancak İslam, rüyaları Allah’ın izniyle şekillenen bir süreç olarak görür. Bilinçaltı, insanın gizli arzularını yansıtabilir, ancak İslam’da rüyaların asıl kaynağı Allah’ın hikmetidir. Peygamberimiz (s.a.v.), "Rüya, müminin üçte biridir" diyerek rüyaların manevi boyutunu vurgulamıştır.

Rüyalar, bilinçaltı ile bağlantılı olsa bile sonucu Allah’ın elindedir. Bu yüzden bilinçaltı üzerinden yapılan yorumlar, İslam’ın temel prensiplerini aşmamalıdır. Müslüman, rüyalarını anlamak için Kur’an ve Sünnet’i referans almalı, psikolojik yorumlara aşırı güvenmemelidir. Rüya tabiri, imanla ve ehliyetli alimlerin görüşüyle yapılmalıdır.

İslam, bilinçaltı kavramını reddetmez; ancak onu Allah’ın kudreti çerçevesinde değerlendirir. Rüyalar, kişinin niyeti, dua ederken iç hali ve yaşam tarzıyla ilişkilidir. Bu yüzden rüyaları anlamak için, sadece bilinçaltı değil, iman ve dua ile beslenen bir yaklaşım gerekir. Rüya, İslam’da "ruhun huzur anı" olarak kabul edilir ve imanla beslenmelidir.'
  ),
  (
    'Uyku Nedir',
    'uyku-nedir',
    'Uyku, Allah’ın insanlara lütfu olan ve vücudun dinlenmesi için yaratılmış bir nimettir. Kur’an-ı Kerim’de, "Allah, size geceyi uyku olarak yaratmıştır" ayetiyle uyku, Allah’ın hikmetiyle şekillenmiş bir süreç olarak tanımlanır. Uyku, insanın ruhunu serbest bırakarak rüyaların oluşmasına zemin hazırlar. İslam’da uyku, sadece fiziksel dinlenme değil, manevi bir huzur anıdır.

Peygamberimiz (s.a.v.), "Uyku, ölümün küçük kardeşidir" diyerek uyku ile ölüm arasındaki ilişkiyi vurgulamıştır. Uyku, Allah’ın izniyle ruhun geçici olarak alınmasıdır. Bu yüzden uyku öncesi ve sonrası duaları, İslam’da büyük önem taşır. Sabah-akşam dualarıyla uyumak ve uyanmak, rüyaların güzel olmasını sağlar.

İslam, uyku düzenini de önemser. Gece geç saatlerde uyumamak, sabah namazına uygun bir uyku almak teşvik edilir. Uyku, rüyaların oluştuğu bir süreçtir; bu yüzden uyku öncesi yapılan dualar ve niyetler, rüyaları olumlu yönde etkiler. Müslüman, uyku anını da Allah’a şükretmek ve dua etmek için fırsat bilir.'
  ),
  (
    'Astral Seyahat Nedir',
    'astral-seyahat-nedir',
    'Astral seyahat, modern dünyada "ruhun bedenden ayrılması" olarak tanımlanan bir kavramdır; ancak İslam’da bu inançlar kabul edilmez. Kur’an-ı Kerim ve Sünnet’ten destek alamayan bu kavram, şirk ve batıl inançlara kapı açabilir. Peygamberimiz (s.a.v.), "Rüya üç kısımdır" hadisiyle rüyaların kaynağını net bir şekilde açıklamıştır; astral seyahat gibi kavramlar ise bu sınırları aşar.

İslam, astral seyahat gibi kavramları reddeder. Ruh, Allah’ın izniyle bedenden ayrılır; ancak bu, sadece ölüm anında gerçekleşir. Hayatta iken ruhun bedenden ayrılması, Kur’an ve Sünnet’ten destek alamaz. Bu yüzden astral seyahat, batıl inançlar ve şifa arayışları içindeki insanların sapmasına neden olabilir.

Müslüman, astral seyahat gibi kavramlardan uzak durmalı ve Kur’an ve Sünnet’i referans almalıdır. Rüyalar, Allah’ın izniyle oluşur; ancak astral seyahat, bu süreci insana mal eden bir yaklaşımdır. İslam’da rüyaların manası, imanla ve ehliyetli alimlerin görüşüyle değerlendirilmelidir. Astral seyahat, İslam’ın çerçevesinde değerlendirilemez.'
  ),
  (
    'Burçlar',
    'burclar',
    'Burçlar, yıldızların konumuna dayalı bir kader inancıdır; ancak İslam’da bu tür inançlar şirk sayılır. Kur’an-ı Kerim’de, "Kaderi sadece Allah bilir" ayetiyle kaderin Allah’ın elinde olduğu vurgulanır. Burçlar, insanların kaderini yıldızlara bağlaması anlamına gelir ve bu, tevhid inancına aykırıdır.

Peygamberimiz (s.a.v.), "Yıldızlar, geceyi aydınlatmak ve yol göstermek için yaratılmıştır; burçlarla kaderi tahmin etmek ise batıldır" buyurmuştur. Burçlar, insanı Allah’a değil, yaratılanlara yönelten bir inançtır. Müslüman, kaderini Allah’a tevekkül ederek, burçlara inanmamalıdır.

İslam, burçların rüya yorumlamasına karıştırılmasını reddeder. Rüyalar, Allah’ın izniyle oluşur; ancak burçlar, bu süreci insana ve yıldızlara mal eder. Müslüman, rüya tabirini ehliyetli alimlerden almalı, burçların etkisine kapılmamalıdır. Burçlar, İslam’ın temel prensiplerine aykırı olduğundan kesinlikle reddedilmelidir.'
  ),
  (
    'Kontrol Edilebilen Rüyalar',
    'kontrol-edilebilen-ruyalar',
    'Kontrol edilebilen rüyalar, modern psikolojide "lucid dream" olarak tanımlanır; ancak İslam’da rüyaların kontrolü, Allah’ın izniyle mümkündür. Peygamberimiz (s.a.v.), "Uyku öncesi istikametli niyet ve dua" ile rüyaların olumlu olmasını teşvik etmiştir. Müslüman, rüyalarını kontrol etmek için sabah-akşam dualarını ve istikametli bir yaşamı tercih etmelidir.

Rüyaların kontrolü, sadece Allah’ın izniyle gerçekleşir. İnsan, rüyalarını kontrol etmek için dua edebilir; ancak bu, Allah’a tevekkül ederek yapılmalıdır. Peygamberimiz (s.a.v.), "Rüya, müminin üçte biridir" diyerek rüyaların manevi boyutunu vurgulamıştır. Bu yüzden rüyaları kontrol etmek, imanla ve dua ile beslenmelidir.

Kontrol edilebilen rüyalar, İslam’da "istikametli niyet" ile ilişkilendirilir. Müslüman, rüyalarını olumlu yönde şekillendirmek için Kur’an-ı Kerim okumalı ve sabah-akşam dualarını ihmal etmemelidir. Rüyaların kontrolü, insanın kendi gücüne değil, Allah’ın kudretine dayanmalıdır. Bu yüzden kontrol edilebilen rüyalar, İslam’ın çerçevesinde "dua ve tevekkül" ile değerlendirilmelidir.'
  ),
  (
    'İstihare Nasıl Yapılır',
    'istihare-nasil-yapilir',
    'İstihare namazı, önemli kararlar alırken Allah’tan doğru yolu istemek için kılınan bir namazdır. Peygamberimiz (s.a.v.), "Herhangi bir işe karar veremiyorsanız, istihare namazı kılın" buyurmuştur. İstihare, rüya yorumlamasında da önemli bir yer tutar; çünkü istihare sonrası gelen rüyalar, genellikle Allah’ın rehberliğidir.

İstihare namazı, iki rekâttır ve her rekâtın sonunda "Allah’ım, eğer bu iş benim için hayırlıysa..." diye dua edilir. İstihare sonrası, kalbin huzur bulması ve rüyaların olumlu olması, Allah’ın rehberliğinin işareti olabilir. Müslüman, istihareyi düzenli olarak yapmalı ve rüyalarını bu çerçevede değerlendirmelidir.

İstihare, rüya yorumlamasında en güvenilir rehberdir. İstihare sonrası gelen rüyalar, genellikle Allah’ın rehberliğidir. Müslüman, rüya tabiri için ehliyetli alimlere danışmalı, ancak istihareyi ihmal etmemelidir. İstihare, İslam’da "dua ve tevekkül"ün en güzel örneklerindendir.'
  ),
  (
    'Psikolojik Rüya Yorumları',
    'psikolojik-ruya-yorumlari',
    'Psikolojik rüya yorumları, modern dünyada rüyaları anlamak için kullanılan bir yöntemdir; ancak İslam’da rüya tabiri, Kur’an ve Sünnet’ten yola çıkılarak yapılmalıdır. Psikolojik yorumlar bazen faydalı olsa da, İslam’ın temel prensiplerini aşmamalıdır. Peygamberimiz (s.a.v.), "Rüya üç kısımdır" diyerek rüyaların kaynağını net bir şekilde açıklamıştır.

Müslüman, psikolojik yorumlara aşırı güvenmemeli ve her zaman Kur’an ve Sünnet’i referans almalıdır. Rüya tabiri, ehliyetli alimlerin danışılmasıyla yapılmalıdır. Psikolojik yorumlar, rüyaların manevi boyutunu göremeyebilir; bu yüzden İslam’ın çerçevesinde değerlendirilmelidir.

Rüyalar, psikolojik yorumlarla kısmen açıklanabilir; ancak asıl manası Allah’ın izniyle belirlenir. Müslüman, rüyalarını anlamak için psikolojik yorumları destek olarak kullanabilir, ancak Kur’an ve Sünnet’i esas almalıdır. Rüya tabiri, imanla ve ehliyetli alimlerin görüşüyle yapılmalıdır.'
  ),
  (
    'Rüya Yorumlama ve Tabiri',
    'ruya-yorumlama-ve-tabiri',
    'Rüya yorumlama, İslam’da "tebşir" olarak adlandırılan ve ehliyetli alimlerin yaptığı bir bilimdir. Peygamberimiz (s.a.v.), "En güzel rüya, müminin rüyasıdır" diyerek rüya tabirinin önemini vurgulamıştır. Rüya tabiri, kişinin niyeti, yaşam durumu ve dua ederken iç haliyle bağlantılıdır.

Rüya yorumlaması, sadece ehliyetli alimlerin yapabileceği bir bilimdir. Herkesin rüya tabiri yapması, hatalı yorumlara neden olabilir. Müslüman, rüya tabiri için ehliyetli alimlere danışmalıdır. Rüya tabiri, Kur’an ve Sünnet’ten yola çıkılarak yapılmalıdır.

Rüya yorumlaması, imanla ve tevekkülle yapılmalıdır. Rüyaların manası, Allah’ın izniyle belirlenir. Müslüman, rüya tabirini ehliyetli alimlerden almalı ve rüyalarını manevi bir rehber olarak görmelidir. Rüya tabiri, İslam’da "ruhun huzur anı" olarak kabul edilir.'
  ),
  (
    'Rüyalara Dair Gerçekler',
    'ruyalara-dair-gercekler',
    'Rüyalar, İslam’da "müminin üçte biri" olarak tanımlanır ve Allah’ın izniyle oluşur. Peygamberimiz (s.a.v.), "Rüya üç kısımdır: Allah’tan gelen müjde, insanın içinden gelen düşünceler ve şeytanın vesvesesi" buyurmuştur. Bu yüzden her rüyanın manası yoktur; ancak tekrarlanan veya kalp huzuru veren rüyalar dikkate alınmalıdır.

Rüyalar, kişinin niyeti ve yaşam tarzıyla doğrudan ilişkilidir. İmanı güçlü olanların rüyaları genellikle daha aydınlıktır. Rüya tabiri, ehliyetli alimlerin danışılmasıyla yapılmalıdır. Müslüman, rüyalarını aşırı önemsememeli, ancak Allah’ın rehberliği için dikkatli olmalıdır.

Rüyalara dair en önemli gerçek, rüyaların Allah’ın izniyle oluşmasıdır. Müslüman, rüyalarını manevi bir rehber olarak görmeli ve Kur’an ve Sünnet’i referans almalıdır. Rüyalar, İslam’da "ruhun huzur anı" olarak kabul edilir ve imanla beslenmelidir.'
  ),
  (
    'Tekrarlanan Rüyalar',
    'tekrarlanan-ruyalar',
    'Tekrarlanan rüyalar, İslam’da Allah’ın insanı uyarmak veya doğru yola yönlendirmek için gönderdiği işaretlerdir. Peygamberimiz (s.a.v.), "Tekrarlanan rüya, Allah’ın lütfudur" buyurmuştur. Tekrarlanan rüyalar, genellikle kişinin dikkatini çekmek için gönderilir ve önemsenmelidir.

Müslüman, tekrarlanan rüyaları ciddiye almalı ve istihare namazı kılmalıdır. Rüya tabiri, ehliyetli alimlerin danışılmasıyla yapılmalıdır. Tekrarlanan rüyalar, kişinin yaşamını olumlu yönde değiştirmesi için bir fırsat olabilir.

Tekrarlanan rüyalar, İslam’da "Allah’ın rehberliği" olarak kabul edilir. Müslüman, tekrarlanan rüyaları manevi bir rehber olarak görmeli ve Kur’an ve Sünnet’i referans almalıdır. Rüyalar, İslam’da "ruhun huzur anı" olarak kabul edilir ve imanla beslenmelidir.'
  );

