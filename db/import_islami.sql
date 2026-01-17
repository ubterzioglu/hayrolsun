-- Import: İslami tabirler (UPSERT by slug; does NOT reset counters like views/likes/dislikes)
PRAGMA foreign_keys = ON;

INSERT OR IGNORE INTO categories (name, slug) VALUES ('İslami', 'islami');

-- Helper pattern:
-- INSERT INTO dreams (...) VALUES (...) ON CONFLICT(slug) DO UPDATE SET title=excluded.title, body=excluded.body, category_slug=excluded.category_slug;

INSERT INTO dreams (title, slug, body, category_slug, views, rating)
VALUES (
  'Rüyada Su Görmek',
  'ruyada-su-gormek',
  'İslami rüya tabirlerine göre su, güzel bir yaşam ve iyi bir rızkın sembolüdür.  Berrak ve temiz su görmek bol miktarda helal mal elde edeceğinize işaret ederken, bulanık su görmek haram mal elde edeceğinize işarettir.  Rüyada suyun berrak, temiz ve içebilecek kadar soğuk olması iyi manalara; suyun sıcak, ılık, bulanık ve temiz olmaması kötü manalara işarettir.  Genel anlamda rüyada su görmek hoş bir hayata, güzel rızka, iyiliksever insana, sadık dosta, büyüklere yaklaşmaya, din güzelliğine yorumlanır.  Bazı yorumculara göre durgun su hapse, tuzlu su kedere, bulanık su rızk darlığına işarettir. ',
  'islami',
  0,
  0
) ON CONFLICT(slug) DO UPDATE SET
  title = excluded.title,
  body = excluded.body,
  category_slug = excluded.category_slug;

INSERT INTO dreams (title, slug, body, category_slug, views, rating)
VALUES (
  'Rüyada Ateş Görmek',
  'ruyada-ates-gormek',
  'Nablusi''ye göre rüyada ateş görmek, müjde, korku, harp, azap, sultan hapis, zarar, günah ve berekettir.  Rüyada ateş görmek hem olumlu hem de olumsuz anlamlar taşıyabilir; bazen cehennem azabını simgelerken, bazen de ilahi bir uyarı olabilir.  Aynı zamanda şans ve uğur anlamına gelir; kişinin durma noktasına gelmiş işlerinin açılacağına ve yeniden rızık elde edeceğine delalet eder.  Rüyada ateş görmek müjde ve bereket yahut zarar, savaş, korkuya; ateş yakmak uyarıya; ateş söndürmek fitneyi yatıştırmaya işaret etmektedir.  Bu rüya, rüya sahibinin dua ve tövbe içinde olması gerektiğini gösterir. ',
  'islami',
  0,
  0
) ON CONFLICT(slug) DO UPDATE SET
  title = excluded.title,
  body = excluded.body,
  category_slug = excluded.category_slug;

INSERT INTO dreams (title, slug, body, category_slug, views, rating)
VALUES (
  'Rüyada Kuş Görmek',
  'ruyada-kus-gormek',
  'Cafer-i Sadık rüyada kuş görmekle ilgili dört farklı anlama işaret eder.  Rüyada kuş görmek bolluğun, rızkın, varlığın ve zenginliğin işaretidir; rüyasında kuş gören kişinin işleri artar, hanesinde bolluk, bereket ve zenginlik olur.  Kuşlar, uçma kabiliyetiyle sınırsızlığı ifade eder ve bu da insanın özgürlüğü, huzuru ve bağımsızlığı simgeler.  İhya''ya göre türü bilinmeyen ve tanınmayan kuş Azrail Aleyhisselama; nasihat ve öğüde, rızka işaret eder.  Rüyada kuş görmek, evlatla yorumlanır; meçhul kuşlar müjdeye, tanınmayan kuş nasihat, öğüde veya rızka işaret eder. ',
  'islami',
  0,
  0
) ON CONFLICT(slug) DO UPDATE SET
  title = excluded.title,
  body = excluded.body,
  category_slug = excluded.category_slug;

INSERT INTO dreams (title, slug, body, category_slug, views, rating)
VALUES (
  'Rüyada Yılan Görmek',
  'ruyada-yilan-gormek',
  'İslami yorumlarda yılan rüyası, dikkatli olunması gereken durumları veya karar verme sürecindeki önemli adımları ifade edebilir.  Rüyada yılan görmek, İslami rüya yorumlarında şeytani ve asılsız bir rüya olarak kabul edilir; gizli düşmanlık veya iktidar simgesi olabilir.  Rüyada görülen yılan, düşman, devlet ve hâzineye yorulur; uzun bir yılan görmek korkuyla tabir edilir.  Nablusi''ye göre iri ve uzun yılan görmek, sahra ve vadi ile korkuya delalet eder; bazan da aile, kadın ve evlattan düşmanlığa delalet eder.  Rüyada yılan görmek her türlü düşman demektir; çok zehirli oldukları bilinen engerek, kobra gibi yılanları görmek çok daha da tehlikeli düşman demektir. ',
  'islami',
  0,
  0
) ON CONFLICT(slug) DO UPDATE SET
  title = excluded.title,
  body = excluded.body,
  category_slug = excluded.category_slug;

INSERT INTO dreams (title, slug, body, category_slug, views, rating)
VALUES (
  'Rüyada Ev Görmek',
  'ruyada-ev-gormek',
  'İmam-ı Adil''e göre rüyada ev görmek; İslam ülkelerinden bir beldeye işaret eder; evin yıkıldığını görmek müslüman bir beldenin mahvolması felakete uğraması demektir.  Rüyada ev görmek, evlilik, zenginlik, güvenlik, genişlik, mal, yöneticilik, izzet, emanete işaret edilir.  Diyanet''e göre bu rüya, bolluk, bereket ve kişinin iç dünyasındaki dengeyi temsil eder.  Rüyada evini tertemiz, yeni boyanmış, güzel bir şekilde görmek, rüyayı gören kişinin tüm dertlerinden kurtulacağına, bolluk ve berekete kavuşacağına yorumlanır.  Genel olarak rüyada ev görmek, huzur, güven ve aile yaşamıyla ilişkilendirilir. ',
  'islami',
  0,
  0
) ON CONFLICT(slug) DO UPDATE SET
  title = excluded.title,
  body = excluded.body,
  category_slug = excluded.category_slug;

INSERT INTO dreams (title, slug, body, category_slug, views, rating)
VALUES (
  'Rüyada Para Görmek',
  'ruyada-para-gormek',
  'Diyanet''e göre rüyada kağıt para görmek, genellikle maddi kazanç, sorumluluk veya gelecek kaygısının bir dışavurumu olarak düşünülür.  Rüyada para görmek esasında, kısmetin bollaşması anlamına gelir; kişinin yapacağı işlerin başarıyla sonuçlanacağına, bundan para kazanacağına hikmettir.  Rüyada para görmek üzüntü ve kedere, bayağı rızka ve darlığa; gösterişe, üzüntü veren söze, sıkıntı doğuran davranışa işaret eder.  Rüyada para görmek, rüya sahibinin elime hiç beklemediği bir yerden para geçeceğine işaret eder; aynı zamanda sıkıntılı dönemlerinin sona ereceğine delalet eder.  Rüyasında kağıt para görmek, rüya sahibinin finansal anlamda bir dönüm noktası yaşayacağına işarettir. ',
  'islami',
  0,
  0
) ON CONFLICT(slug) DO UPDATE SET
  title = excluded.title,
  body = excluded.body,
  category_slug = excluded.category_slug;

INSERT INTO dreams (title, slug, body, category_slug, views, rating)
VALUES (
  'Rüyada Mezar Görmek',
  'ruyada-mezar-gormek',
  'İmam Cafer-i Sadık''a göre rüyada mezarlık görmenin üç tabiri vardır: üzüntü, zindan, hapis, sıkıntı.  Hz. Danyal''a göre rüyada mezar görmek zindan veya hapse yorumlanır; mezar rüyası hapse, hapishane ve kabre delalet eder.  Rüyada mezar görmek, günahlardan tövbe edeceğinize işarettir; kendinizi ölmüş ve tekrar dirildiğinizi görmek ise dileklerinizin, ümitlerinizin gerçekleşeceğine işaret eder.  Rüyada mezara bastığını gören kişinin günahlar işlemiş olduğu anlamı çıkar; rüyasında mezara bastığını gören kimse büyüklerine saygısız olmaya yorulur.  İhya''ya göre rüyada mezar görmek, eğer ki mezarı kazan sizseniz; çift anlamlıdır: birinci anlamı yeni bir ev almaya, ev yaptırmaya delalet eder. ',
  'islami',
  0,
  0
) ON CONFLICT(slug) DO UPDATE SET
  title = excluded.title,
  body = excluded.body,
  category_slug = excluded.category_slug;

INSERT INTO dreams (title, slug, body, category_slug, views, rating)
VALUES (
  'Rüyada Deniz Görmek',
  'ruyada-deniz-gormek',
  'İslami yorumlara göre rüyada deniz görmek, ilahi kudret, genişlik ve sabırla ilişkilendirilir.  Rüyada deniz görmek ve suyundan içtiğinizi görmek mal ve servetle tabir olunur; Allame Meclisî''ne göre rüyada deniz görmek makam ve büyüklüğe işarettir.  Rüyada denizde yüzdüğünü görmenin manen anlamı, ilmin kapılarının açılmasına delalet eder; kişinin ilim deryasına gireceğine rivayet edilir.  Rüyada deniz görmek, kuvvetli, şefkatli, adaletli bir devlet başkanına yorulur; dini tabirlerde deniz vezir, melik veya sultana yorumlanır.  Rüyada deniz görmek, rüya sahibinin maddi yönden rahatlaması anlamına gelir; kişinin berekete erişmesi demektir. ',
  'islami',
  0,
  0
) ON CONFLICT(slug) DO UPDATE SET
  title = excluded.title,
  body = excluded.body,
  category_slug = excluded.category_slug;

INSERT INTO dreams (title, slug, body, category_slug, views, rating)
VALUES (
  'Rüyada Ağaç Görmek',
  'ruyada-agac-gormek',
  'Rüyada ağaç görmek, dinde sebat etmeye, zenginliğe, uzun ömre ve rızkın devamını şeklinde tanımlanabilir.  Dine, gövdesi imana, suyu namaz kabuğu rızka, yaprağı ise iyilik ve güzelliğe işarettir; ağaç ne kadar güzel olursa, dini inancınız da bir o kadar güzel olur.  Ağacın yaprak yaprak açıldığını görmek, uzun ve bereketli ömre, rızkın devamına, zenginliğe ve dinde sebat etmeye delâlet eder.  Rüyada ağaç görmek, dükkanlara, sofralara, bol ve geniş rızka, mahzen olarak bilinen diğer yerlere, dinlere ve mezheplere, dinde ihlâsa ve salâha delâlet eder.  Ağaç Allah''ü Teâlâ''dan olan nimete delâlet eder; kuru ağaç hidayet ve rızıktır çünkü o yanmak için hazırlanmıştır. ',
  'islami',
  0,
  0
) ON CONFLICT(slug) DO UPDATE SET
  title = excluded.title,
  body = excluded.body,
  category_slug = excluded.category_slug;

INSERT INTO dreams (title, slug, body, category_slug, views, rating)
VALUES (
  'Rüyada Uçak Görmek',
  'ruyada-ucak-gormek',
  'Rüyada uçak görmek, yükselmeye, terfi etmeye, mevki ve makamının yükseleceğine işarettir şeklinde tabir edilir.  İhya''ya göre uçak görmek yolculuğa; ehli için makam ve rütbenin yükselmesine; diğerleri için madden ilerlemeye ya da mektup almaya delalet eder.  Rüyada uçak görmek, kişinin hayatındaki baskılardan kurtulma, sınırlarını genişletme ve daha özgür bir yaşama geçme arzusunu sembolize eder.  Rüyada uçak görmenin anlamı, rüyayı gören kişinin hayatında büyük değişimlerin yaklaştığına işaret etmektedir; uçak yüksek yerlere çıkma sembolüdür.  Rüyada uçak görmek sorunların tamamen ortadan kalkacağına, yüzünün güleceğine, kendisini kıskanan ve yolunu kesmeye çalışan rakiplerine fark atacağına delalet eder. ',
  'islami',
  0,
  0
) ON CONFLICT(slug) DO UPDATE SET title = excluded.title, body = excluded.body, category_slug = excluded.category_slug;

INSERT INTO dreams (title, slug, body, category_slug, views, rating)
VALUES (
  'Rüyada Tilki Görmek',
  'ruyada-tilki-gormek',
  'Rüyada tilki görmek İslam yorumuna göre kötü bir insana işaret eder ve uyarıcı nitelik taşır.  Rüyada tilki görmek, tabiatı kötü olan kişiye delalet eder; bu kişi her işini ağlayıp sızlayarak, yalanlar söyleyerek yürüten kişi olarak tasvir edilir.  Diyanet: Rüyada tilki görülmesi hilekâr bir erkeğe yorumlanır.  Rüyada tilki görmek, hilekar ve hainlik yapan bir düşmana işaretle tabir olunur; rüyada görülen tilki yalancı, hilekar, kurnazlık yapan bir adamı temsil eder.  Tilki görmek, menfaate, elbiseye, hanıma ve bekar için evlenmeye işarettir. ',
  'islami',
  0,
  0
) ON CONFLICT(slug) DO UPDATE SET title = excluded.title, body = excluded.body, category_slug = excluded.category_slug;

INSERT INTO dreams (title, slug, body, category_slug, views, rating)
VALUES (
  'Rüyada Araba Görmek',
  'ruyada-araba-gormek',
  'Rüyada araba görmek esasında bir yolculuğa işaret eder; rüya tabir eden kişiler çıkılan seyahatin çok başarılı sonuçları olduğunu dile getirirler.  Molla Cami: Rüyada araba görmek, rüya sahibinin geçimi için aldığı tedbire işaret eder.  Rüyada arabaya binmek işlerinizin iyiye gideceğine ve bir terfi edeceğinize işarettir; genel anlamda rüyada araba görmek iyiye yorumlanır.  Rüyada araba görmek iş yaşamında kazanılacak paralara ve alınacak yeni kararlara yorulur; siyah araba aile içinde yaşayacağınız ufak tefek maddi sıkıntılara işaret eder.  Çalışan araba görmek şans dolu günler olduğuna işarettir; spor araba görmek arkadaşlarla güzel vakit geçirileceğini gösterir. ',
  'islami',
  0,
  0
) ON CONFLICT(slug) DO UPDATE SET title = excluded.title, body = excluded.body, category_slug = excluded.category_slug;

INSERT INTO dreams (title, slug, body, category_slug, views, rating)
VALUES (
  'Rüyada Balık Görmek',
  'ruyada-balik-gormek',
  'Rüyada balık görmek, hayırlı ve olumlu olayların yaşanacağına işarettir; rüyada balık görmenin anlamı kısmet ile ilişkilendirilmektedir.  Cafer-i Sadık''a göre rüyada balık görmek mevki sahibi kimseyi, ganimeti, bakire kızı, hizmetçiyi ve iş sahibi olunacağına alamet eder.  Rüyada balık görmek mutluluk, zenginlik ve ganimetin habercisidir; rüyada balık çoğu kez gelen kısmetleri simgelemektedir.  Rüyada büyük balık görmek, yemine delalet eder; bazen de balık görmek üzüntü, keder, sıkıntı, hastalık, şiddetli haberlere ve bulunduğu yerde öleceğine delalet eder.  Rüyada balık görmenin anlamı daha çok kısmet şeklindedir; kişiye gelecek kısmetler, mülkler ve mallar balık simgesiyle rüyada görülür. ',
  'islami',
  0,
  0
) ON CONFLICT(slug) DO UPDATE SET title = excluded.title, body = excluded.body, category_slug = excluded.category_slug;

INSERT INTO dreams (title, slug, body, category_slug, views, rating)
VALUES (
  'Rüyada Bebek Görmek',
  'ruyada-bebek-gormek',
  'İslam alimleri rüyada bebek görmenin hayırlı ve güzel olduğunun altını çizer; erkek bebek ise birçok rüya tabircisine göre gücün ve cesaretin sembolüdür.  Molla Cami: Rüyada erkek çocuk görmek müjdeye işaret eder; rüyada kız çocuğu görmek ise bolluğa, şerefe, zorluktan so a kolaylığa işaret eder.  Rüyada bebek görmek, sevinçli olaylara, mirasa ve işlere işaret eder; olumsuz durumlardan kurtulma ve yakın zamanda para geleceği müjdesi var.  Rüyada bebek görmek yeniliklerin, şansın, gelişimin, açılacak bereket kapılarının habercisidir; rüyada bebek görmek her zaman iyiye yorulmaktadır.  Rüyada bebek görmek, kişinin hayatında yeni bir döneme veya değişime hazırlandığını, içsel olarak yenilendiğini gösterir; masumiyet, saflık ve umut sembolüdür. ',
  'islami',
  0,
  0
) ON CONFLICT(slug) DO UPDATE SET title = excluded.title, body = excluded.body, category_slug = excluded.category_slug;

INSERT INTO dreams (title, slug, body, category_slug, views, rating)
VALUES (
  'Rüyada Kurt Görmek',
  'ruyada-kurt-gormek',
  'Cafer-i Sadık''a göre rüyada kurt görmek; kadın, cariye ve hizmetkardır.  Rüyada görülen kurt çoğu zaman hayra ve iyiliğe yorulmaktadır; kurt gücü ve asaleti temsil eder, aynı zamanda cesaretin bir göstergesidir.  Seyyid Süleyman: Rüyada kurt görmek; zalim, hain, yalancı bir amirle tabir olunur.  Rüyada kurt görmek gücünü, asaleti ve cesareti temsil etmektedir; özellikle rüya sahibinin çevresine hissettirdiği itibarı anlatır.  İmam Nablusi (r.a) yorumuna göre rüyada sürü halinde kurt görmek kuşkuya, yorgunluğa ve bazı kötü hislere işaret eder. ',
  'islami',
  0,
  0
) ON CONFLICT(slug) DO UPDATE SET title = excluded.title, body = excluded.body, category_slug = excluded.category_slug;

INSERT INTO dreams (title, slug, body, category_slug, views, rating)
VALUES (
  'Rüyada Aslan Görmek',
  'ruyada-aslan-gormek',
  'Kişinin rüyasında aslan görmesi mertebe, makam, mevki ve hayır anlamına gelir; aslan saltanata, saygınlığa, uzun ömre ve bol rızka yorumlanır.  Rüyada aslan görmek devlet reisi anlamına gelir; aslanın bedeninden kopmuş olan bir uzvunu görmek ya da yemek devlet kurumlarına ve makamlarına işaret eder.  Rüyada aslan görmenin anlamı yüksek bir makama erişeceğinize rivayet etmektedir; hatta bu makamı kazanırken size yardım edecek birinin olduğu anlamına da gelir.  Alimler, aslan gören kimselerin dertlerinin azalacağı, rızkın bollaşacağına delalet eder.  Rüyada aslan görmek, güç ve mal sahibi olmaya işaret eder; rüya sahibinin toplumda saygınlık kazanacağına ve itibarının artacağına yorumlanır. ',
  'islami',
  0,
  0
) ON CONFLICT(slug) DO UPDATE SET title = excluded.title, body = excluded.body, category_slug = excluded.category_slug;

INSERT INTO dreams (title, slug, body, category_slug, views, rating)
VALUES (
  'Rüyada Kedi Görmek',
  'ruyada-kedi-gormek',
  'İslama göre rüyada kedi görmek, gıybete, imansız bir kimseye, kibire yorulur.  İslami rüya yorumcularına göre rüyada kedi görmek hizmetçi veya düşman olarak tanımlanır; genel anlamda rüyada görülen kedi ev halkından bir kimseye işaret eder.  İhya''ya göre rüyada Misk kedisini görmek, şekil ve siması şerli görünen ve ahlaki iyi olan bir adama işarettir; bazen kedi zevce için cefaya, evlada, düşmanlığa, hırsızlığa delalet eder.  Rüyada bir kediyi sevdiğinizi gördüğünüzde, rutinlerinizi sarsmanız ve düşünme biçiminizde daha esnek olmak için yeni değişiklikler yapmanız anlamına gelir. ',
  'islami',
  0,
  0
) ON CONFLICT(slug) DO UPDATE SET title = excluded.title, body = excluded.body, category_slug = excluded.category_slug;

INSERT INTO dreams (title, slug, body, category_slug, views, rating)
VALUES (
  'Rüyada Yıldız Görmek',
  'ruyada-yildiz-gormek',
  'Bir kimsenin rüyada yıldızların açılıp ve dağıldığını görmesi, büyük meliklerin ölüp birçok askerlerin öleceği bir harbin çıkmasına delalet eder.  Rüyada yıldız görmek saygınlık ve şeref sahibi olmayı simgeler; birden fazla yıldız görmek insanlarla buluşma ve görüşmeleri işaret eder.  İmam Cafer Sadık (a.s) göre rüyada yıldızları görmek dokuz tabiri vardır; bir servete sahip olacağına veya yüksek bir şöhret elde edeceğine alamet sayılır.  Rüyada yıldız görmek genelde bilge bir kişiye yorulur; bu rüyayı gören kişinin çevresinde bilgili ve kendisine güç veren biri vardır.  Rüyada yıldız görmek, yakın çevrede bulunan bilgili bir kişiye işaret eder; bu kişiyle aranızı sıkı tutmalı, bilgilerinden faydalanmalısınız. ',
  'islami',
  0,
  0
) ON CONFLICT(slug) DO UPDATE SET title = excluded.title, body = excluded.body, category_slug = excluded.category_slug;

INSERT INTO dreams (title, slug, body, category_slug, views, rating)
VALUES (
  'Rüyada Kurtuluş Görmek',
  'ruyada-kurtulus-gormek',
  'Rüyada kurtuluş görmek bol para kazanacağına, kendini her konuda geliştireceğine ve hayatında kendisi için dönüm noktası sayılacak kararlar alacağına delalet eder.  Rüyada kurtuluş savaşını görmek İslami olarak günahlarının artacağına, uzak bir akrabanın yaşadığı sağlık sorunu ile ilgili güzel haberler alınacağına işaret eder.  Rüyada kurtuluş savaşı görmek sürpriz ve müjdeli olaylar yaşayacağına ve hayatının en mutlu günlerini geçireceğine, kısa süre içinde epey şöhret kazanacağına delalet eder.  Rüyada vatanın ve milletin kurtuluşu için savaştığını görmek, kerem ve cömertliğe, âdil olmaya, geniş rızka ve menfaate delâlet eder.  Bir kimsenin rüyada fi sebilillah (Allah rızası için) savaştığını görmesi, gerek kendisi için gerek aile fertleri için hayra yorumlanır; rızkının bollaşmasına delalet eder. ',
  'islami',
  0,
  0
) ON CONFLICT(slug) DO UPDATE SET title = excluded.title, body = excluded.body, category_slug = excluded.category_slug;

INSERT INTO dreams (title, slug, body, category_slug, views, rating)
VALUES (
  'Rüyada Altın Görmek',
  'ruyada-altin-gormek',
  'İslami rüya tabirlerine göre altın görmek, genellikle hayırlı sayılır; rüyayı gören kişinin Allah''ın lütuflarına ve nimetlerine kavuşacağına işaret eder.  Rüyada altın görmek zengin olmaya, çeyrek altın hidayete, tam altın devlet kapısında hayırlı işe, yarım altın ise maddi sıkıntıdan kurtulmaya yorumlanır.  Diyanet: Rüyada altın görülmesi kötü bir iş ve borçla yorumlanır; bazı yorumculara göre rüyada altın görülmesi gam ve kedere işarettir.  Rüyada altın görmek, rüya sahibinin maddi olarak refah veya zenginlik elde edeceğine işaret edebilir; yüksek değer ve prestijle ilişkilendirilen sembolüdür.  Rüyada altın görmek genel şekilde isteklere ulaşmaya, neşeye ve sevince işarettir; gerçekleşecek olan dileklerin parasal konularda olduğu gibi manevi konularda da başarı elde edileceğini gösterir. ',
  'islami',
  0,
  0
) ON CONFLICT(slug) DO UPDATE SET title = excluded.title, body = excluded.body, category_slug = excluded.category_slug;

INSERT INTO dreams (title, slug, body, category_slug, views, rating)
VALUES (
  'Rüyada Karanlık Görmek',
  'ruyada-karanlik-gormek',
  'Rüyada görülen karanlık, sapıklık ve hayrettir; bundan dolayı rüyada karanlıktan aydınlığa çıktığını gören kimse kafir ise Müslüman, günahkar ise tevbe eder.  Karanlık görmek, göz ve kalbinin kararmasına ve halktan gizlemek istediği şeyi gizlemeye işarettir; Diyanet: Rüyada karanlık görülmesi sapıklıkla yorumlanır.  Rüyada karanlık görmek gam ve kedere, kasvette iç bunalmasına, darlanmaya delalettir; bu rüya sıkıntı, endişe ve tasa ile yorumlanır.  İbn Sirin’e göre İslam''ın en büyük rüya yorumcusuna göre, rüyada karanlık görmek İslam''ın doğru yolundan uzaklaşmak anlamına gelir.  Rüyada karanlık görmek: sapıklık ve hayrete işarettir; hapisteki adamın karanlıktan aydınlığa çıkması hapisten kurtulmaya, kafirin çıkması Müslüman olacağına delalet eder. ',
  'islami',
  0,
  0
) ON CONFLICT(slug) DO UPDATE SET title = excluded.title, body = excluded.body, category_slug = excluded.category_slug;

INSERT INTO dreams (title, slug, body, category_slug, views, rating)
VALUES (
  'Rüyada Güneş Görmek',
  'ruyada-gunes-gormek',
  'Rüyada güneş görmek İslami simgelere göre aydınlık, rehberlik, umut ve maneviyat sembollerini taşır.  Hz. Danyal''e göre rüyada güneş görmek hakime veya büyük bir kimseye işarettir; Allame Meclisi''ne göre rüyada güneş''i görmenin altı tabiri vardır.  Rüyada güneş görmek, işte makamın artacağını, başarılı olmayı ve mülk sahibi olmayı sembolize eder; iş hayatında gerçekleşecek değişiklikler başarı elde etmeye işaret eder.  Rüyada eve güneşin girdiğini görmek büyük bir mutluluk yaşayacağınızı simgeler; güneşin azalıp çoğaldığını görmek rüya sahibinin hayatında yolunda giden veya kötüye giden durumları gösterir.  Rüyada güneş görmek yeniliklere hayırlı işlere, rahat ve zenginliğe işaret etmektedir; rüya sahibinin işinde başarıya ulaşacağı, zahmet çekmeyeceği anlamı taşır. ',
  'islami',
  0,
  0
) ON CONFLICT(slug) DO UPDATE SET title = excluded.title, body = excluded.body, category_slug = excluded.category_slug;

INSERT INTO dreams (title, slug, body, category_slug, views, rating)
VALUES (
  'Rüyada Ay Görmek',
  'ruyada-ay-gormek',
  'Dini kaynaklara göre rüyada ay görmek rütbe, yeni mevkiler, hayırlı bir eş, çocuk sahibi olmak, anne-baba yahut bir dizi hayırlı olaya işaret eder.  Çağdaş Ulema''ya göre rüyada ay görmek bir değişiklik yaşayacağınıza işarettir; ay ışığının rüyanızda yer alması genellikle ruhsal bir arınma sürecine delalet eder.  Rüyada ay görmek adaletli yöneticiye, büyük âlime, hayırlı çocuğa, başkana ve rüyayı görenin anne, baba ve kardeşlerin rızasına işarettir.  Rüyada ay görmek hayırlara işaret eder; kazancın çoğalması ile birlikte hane içindeki saadetin ve bolluğun çoğalmasına, alım gücünün artmasına delalet eder.  Hasta olan veya deniz yolculuğunda bulunan kimse için ay görmek helak olmaya işaret eder; zengin bir kimse ayın bulutla örtüldüğünü görse sıkıntıya düşeceğine delalet eder. ',
  'islami',
  0,
  0
) ON CONFLICT(slug) DO UPDATE SET title = excluded.title, body = excluded.body, category_slug = excluded.category_slug;

INSERT INTO dreams (title, slug, body, category_slug, views, rating)
VALUES (
  'Rüyada Dağ Görmek',
  'ruyada-dag-gormek',
  'Rüyada dağ görmek, sanı yüce, dehşetli ve şöhretli, emrini yerine getiren iktidarlı ve sebatlı bir amire yahut siyaset sahibine, bir çocuk ve tüccara işarettir.  Diyanet: Rüyada dağ görülmesi güçlük ve zorlukla tabir edilir; bir kişinin rüyasında büyük bir dağa tırmanarak zirveye ulaştığını görmesi o kimsenin hayatında büyük başarılar elde edeceğine delalet eder.  Rüyada dağ görmek çok hayırlı bir rüyadır; rüyada dağ gören kişi ülke yönetiminde söz hakkı bulunan üstün yetkilerle donatılır, işinde bulunabilecek en üst makama yükselir.  Hz. Danyal''a göre rüyada dağ görmek hile yoluyla elde edilen mala işarettir; rüyada kendini dağ üstünde görmek ise makam ve mevkiye ulaşmaya delalet eder.  Rüyada dağ görmek çocuğa, kadına ve seyahate işarettir; rüyada kendini dağda görmek bütün isteklerinize kavuşacağınıza işarettir. ',
  'islami',
  0,
  0
) ON CONFLICT(slug) DO UPDATE SET title = excluded.title, body = excluded.body, category_slug = excluded.category_slug;

INSERT INTO dreams (title, slug, body, category_slug, views, rating)
VALUES (
  'Rüyada Gül Görmek',
  'ruyada-gul-gormek',
  'Psikolojik olarak rüyada gül görmek takdir toplayacağı ve rütbe alacağı işler yapacağına, hayırlı bir kısmet bulup evliliğe adım atacağına delalet eder.  Rüyada gül toplamak rüya sahibi için çok iyidir; çünkü gül toplamak esenliğe, afiyette olmaya, ağız tadına, mutluluğa, huzura ve uzun bir ömre delalet eder.  Molla Cami: Rüyada gül görmek, şerefli olan bir adama veya çocuğa yahut kayıp bir kimsenin gelmesine ya da kadına işaret eder.  Rüyada gül görmek; mutluluk ve paranın habercisidir; rüyada gül görmek iyilik ve hayır şeklinde tabir edilmektedir.  Rüyada gül görmek, şerefli bir insan olacağınıza veya hayırlı bir çocuğa yahut kayıp bir kişinin geleceğine ya da kadına delalet etmektedir.  Rüyada gül ağacı görmek rüya sahibinin üzücü bir olayın ardından sevinç yaşayacağına işaret eder; zorlukla beraber gelen mutluluk anlamı taşır. ',
  'islami',
  0,
  0
) ON CONFLICT(slug) DO UPDATE SET title = excluded.title, body = excluded.body, category_slug = excluded.category_slug;

