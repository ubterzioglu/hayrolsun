'use client';

import React, { useState } from 'react';
import { Eye, Clock } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const articles = [
  {
    id: 'islamiyet-ve-ruyalar',
    title: 'İslamiyet ve Rüyalar',
    slug: 'islamiyet-ve-ruyalar',
    content: `İslam, rüyaları "müminin üçte biri" olarak tanımlayarak onlara özel bir yer verir. Kur'an-ı Kerim'de "Allah'ın bir işareti" olarak ifade edilen rüyalar, insanın ruh hali ve imanı ile doğrudan ilişkilidir. Peygamberimiz (s.a.v.), "En güzel rüya, müminin rüyasıdır" hadisiyle rüyaların temiz kalple bağlantısını vurgulamıştır. İslam'da rüyalar, Allah'ın izniyle gelen bir nimet ve bazen de uyaran bir mesaj olabilir; ancak her rüyanın manası yoktur. Batıl inançlardan uzak durulması, Kur'an ve Sünnet ışığında değerlendirilmesi gerekir.

Rüyaların İslam'da yeri, Hz. Yusuf (a.s.)'ın rüyalarının tefsirini içeren Kur'an ayetlerinde de net bir şekilde ortaya konur. Rüyalar, bilinçaltı ile değil, Allah'ın iradesiyle şekillenir. Bu yüzden rüya yorumlaması, sadece ehliyetli alimlerin yapabileceği bir bilimdir. Müslüman, rüyalarını manevi bir rehber olarak görmeli, ancak her rüyayı gerçekleştirmeye kalkmamalıdır. Rüya yorumlaması, imanla ve bilgiyle yapılan bir yaklaşımla yapılmalıdır.`,
    views: 1250,
    likes: 89,
    dislikes: 3,
    updatedAt: '2024-01-15',
    tags: ['islam', 'rüya', 'iman']
  },
  {
    id: 'ruya-nedir',
    title: 'Rüya Nedir',
    slug: 'ruya-nedir',
    content: `Rüya, insanın uyuduğunda zihnin serbestçe hareket ettiği, bilinçsiz bir durumda oluşan görüntülerdir. İslam'da rüya, "ruhun serbest kalması" olarak tanımlanır ve Allah'ın izniyle gerçekleşir. Kur'an-ı Kerim'de, "Allah, insanın ruhunu alır" ayetiyle uyku ve rüyaların ilahi bir süreç olduğu vurgulanır. Rüyalar, bazen müjde, bazen de uyarı niteliğinde olabilir; ancak her rüyanın manası yoktur.

Peygamberimiz (s.a.v.), "Rüya üç kısımdır: Allah'tan gelen müjde, insanın içinden gelen düşünceler ve şeytanın vesvesesi" buyurarak rüyaların üç ana başlıkta toplamıştır. Müslüman, rüyalarını değerlendirmek için bu ayrımı dikkate almalıdır. Güzel rüyalar, Allah'ın lütfu; kötü rüyalar ise genellikle şeytanın vesvesesidir. Bu yüzden rüyaların yorumu, imanla ve bilgiyle yapılmalıdır.`,
    views: 980,
    likes: 67,
    dislikes: 2,
    updatedAt: '2024-01-12',
    tags: ['rüya', 'uyku', 'islam']
  },
  {
    id: 'ruyalar-ve-bilincalti',
    title: 'Rüyalar ve Bilinçaltı',
    slug: 'ruyalar-ve-bilincalti',
    content: `Bilinçaltı kavramı, modern psikolojide rüyaları açıklamak için kullanılır; ancak İslam, rüyaları Allah'ın izniyle şekillenen bir süreç olarak görür. Bilinçaltı, insanın gizli arzularını yansıtabilir, ancak İslam'da rüyaların asıl kaynağı Allah'ın hikmetidir. Peygamberimiz (s.a.v.), "Rüya, müminin üçte biridir" diyerek rüyaların manevi boyutunu vurgulamıştır.

Rüyalar, bilinçaltı ile bağlantılı olsa bile sonucu Allah'ın elindedir. Bu yüzden bilinçaltı üzerinden yapılan yorumlar, İslam'ın temel prensiplerini aşmamalıdır. Müslüman, rüyalarını anlamak için Kur'an ve Sünnet'i referans almalı, psikolojik yorumlara aşırı güvenmemelidir. Rüya yorumlaması, ehliyetli alimlerin danışılmasıyla yapılmalıdır.`,
    views: 756,
    likes: 45,
    dislikes: 1,
    updatedAt: '2024-01-10',
    tags: ['bilinçaltı', 'psikoloji', 'islam']
  },
  {
    id: 'uyku-nedir',
    title: 'Uyku Nedir',
    slug: 'uyku-nedir',
    content: `Uyku, Allah'ın insanlara lütfu olan ve vücudun dinlenmesi için yaratılmış bir nimettir. Kur'an-ı Kerim'de, "Allah, size geceyi uyku olarak yaratmıştır" ayetiyle uyku, Allah'ın hikmetiyle şekillenen bir süreç olarak tanımlanır. Uyku, insanın ruhunu serbest bırakarak rüyaların oluşmasına zemin hazırlar. İslam'da uyku, sadece fiziksel dinlenme değil, manevi bir huzur anıdır.

Peygamberimiz (s.a.v.), "Uyku, ölümün küçük kardeşidir" diyerek uyku ile ölüm arasındaki ilişkiyi vurgulamıştır. Uyku, Allah'ın izniyle ruhun geçici olarak alınmasıdır. Bu yüzden uyku öncesi ve sonrası duaları, İslam'da büyük önem taşır. Sabah-akşam dualarıyla uyumak ve uyanmak, rüyaların güzel olmasını sağlar.

İslam, uyku düzenini de önemser. Gece geç saatlerde uyumamak, sabah namazına uygun bir uyku almak teşvik edilir. Uyku, rüyaların oluştuğu bir süreçtir; bu yüzden uyku öncesi yapılan dualar ve niyetler, rüyaları olumlu yönde etkiler. Müslüman, uyku anını da Allah'a şükretmek ve dua etmek için fırsat bilir.`,
    views: 892,
    likes: 52,
    dislikes: 4,
    updatedAt: '2024-01-08',
    tags: ['uyku', 'dua', 'islam']
  },
  {
    id: 'astral-seyahat-nedir',
    title: 'Astral Seyahat Nedir',
    slug: 'astral-seyahat-nedir',
    content: `Astral seyahat, modern dünyada "ruhun bedenden ayrılması" olarak tanımlanan bir kavramdır; ancak İslam'da bu inançlar kabul edilmez. Kur'an-ı Kerim ve Sünnet'ten destek alamayan bu kavram, şirk ve batıl inançlara kapı açabilir. Peygamberimiz (s.a.v.), "Rüya üç kısımdır" hadisiyle rüyaların kaynağını net bir şekilde açıklamıştır; astral seyahat gibi kavramlar ise bu sınırları aşar.

İslam, astral seyahat gibi kavramları reddeder. Ruh, Allah'ın izniyle bedenden ayrılır; ancak bu, sadece ölüm anında gerçekleşir. Hayatta iken ruhun bedenden ayrılması, Kur'an ve Sünnet'ten destek alamaz. Bu yüzden astral seyahat, batıl inançlar ve şifa arayışları içindeki insanların sapmasına neden olabilir.

Müslüman, astral seyahat gibi kavramlardan uzak durmalı ve Kur'an ve Sünnet'i referans almalıdır. Rüyalar, Allah'ın izniyle oluşur; ancak astral seyahat, bu süreci insana mal eden bir yaklaşımdır. İslam'da rüyaların manası, imanla ve ehliyetli alimlerin görüşüyle değerlendirilmelidir. Astral seyahat, İslam'ın çerçevesinde değerlendirilemez.`,
    views: 634,
    likes: 38,
    dislikes: 12,
    updatedAt: '2024-01-05',
    tags: ['astral', 'batıl', 'islam']
  },
  {
    id: 'burclar',
    title: 'Burçlar',
    slug: 'burclar',
    content: `Burçlar, yıldızların konumuna dayalı bir kader inancıdır; ancak İslam'da bu tür inançlar şirk sayılır. Kur'an-ı Kerim'de, "Kaderi sadece Allah bilir" ayetiyle kaderin Allah'ın elinde olduğu vurgulanır. Burçlar, insanların kaderini yıldızlara bağlaması anlamına gelir ve bu, tevhid inancına aykırıdır.

Peygamberimiz (s.a.v.), "Yıldızlar, geceyi aydınlatmak ve yol göstermek için yaratılmıştır; burçlarla kaderi tahmin etmek ise batıldır" buyurmuştur. Burçlar, insanı Allah'a değil, yaratılanlara yönelten bir inançtır. Müslüman, kaderini Allah'a tevekkül ederek, burçlara inanmamalıdır.

İslam, burçların rüya yorumlamasına karıştırılmasını reddeder. Rüyalar, Allah'ın izniyle oluşur; ancak burçlar, bu süreci insana ve yıldızlara mal eder. Müslüman, rüya tabirini ehliyetli alimlerden almalı, burçların etkisine kapılmamalıdır. Burçlar, İslam'ın temel prensiplerine aykırı olduğundan kesinlikle reddedilmelidir.`,
    views: 723,
    likes: 41,
    dislikes: 18,
    updatedAt: '2024-01-03',
    tags: ['burçlar', 'şirk', 'islam']
  },
  {
    id: 'kontrol-edilebilen-ruyalar',
    title: 'Kontrol Edilebilen Rüyalar',
    slug: 'kontrol-edilebilen-ruyalar',
    content: `Kontrol edilebilen rüyalar, modern psikolojide "lucid dream" olarak tanımlanır; ancak İslam'da rüyaların kontrolü, Allah'ın izniyle mümkündür. Peygamberimiz (s.a.v.), "Uyku öncesi istikametli niyet ve dua" ile rüyaların olumlu olmasını teşvik etmiştir. Müslüman, rüyalarını kontrol etmek için sabah-akşam dualarını ve istikametli bir yaşamı tercih etmelidir.

Rüyaların kontrolü, sadece Allah'ın izniyle gerçekleşir. İnsan, rüyalarını kontrol etmek için dua edebilir; ancak bu, Allah'a tevekkül ederek yapılmalıdır. Peygamberimiz (s.a.v.), "Rüya, müminin üçte biridir" diyerek rüyaların manevi boyutunu vurgulamıştır. Bu yüzden rüyaları kontrol etmek, imanla ve dua ile beslenmelidir.

Kontrol edilebilen rüyalar, İslam'da "istikametli niyet" ile ilişkilendirilir. Müslüman, rüyalarını olumlu yönde şekillendirmek için Kur'an-ı Kerim okumalı ve sabah-akşam dualarını ihmal etmemelidir. Rüyaların kontrolü, insanın kendi gücüne değil, Allah'ın kudretine dayanmalıdır. Bu yüzden kontrol edilebilen rüyalar, İslam'ın çerçevesinde "dua ve tevekkül" ile değerlendirilmelidir.`,
    views: 567,
    likes: 33,
    dislikes: 5,
    updatedAt: '2024-01-01',
    tags: ['kontrol', 'dua', 'islam']
  },
  {
    id: 'istihare-nasil-yapilir',
    title: 'İstihare Nasıl Yapılır',
    slug: 'istihare-nasil-yapilir',
    content: `İstihare namazı, önemli kararlar alırken Allah'tan doğru yolu istemek için kılınan bir namazdır. Peygamberimiz (s.a.v.), "Herhangi bir işe karar veremiyorsanız, istihare namazı kılın" buyurmuştur. İstihare, rüya yorumlamasında da önemli bir yer tutar; çünkü istihare sonrası gelen rüyalar, genellikle Allah'ın rehberliğidir.

İstihare namazı, iki rekâttır ve her rekâtın sonunda "Allah'ım, eğer bu iş benim için hayırlıysa..." diye dua edilir. İstihare sonrası, kalbin huzur bulması ve rüyaların olumlu olması, Allah'ın rehberliğinin işareti olabilir. Müslüman, istihareyi düzenli olarak yapmalı ve rüyalarını bu çerçevede değerlendirmelidir.

İstihare, rüya yorumlamasında en güvenilir rehberdir. İstihare sonrası gelen rüyalar, genellikle Allah'ın rehberliğidir. Müslüman, rüya tabiri için ehliyetli alimlere danışmalı, ancak istihareyi ihmal etmemelidir. İstihare, İslam'da "dua ve tevekkül"ün en güzel örneklerindendir.`,
    views: 834,
    likes: 67,
    dislikes: 2,
    updatedAt: '2023-12-28',
    tags: ['istihare', 'dua', 'islam']
  },
  {
    id: 'psikolojik-ruya-yorumlari',
    title: 'Psikolojik Rüya Yorumları',
    slug: 'psikolojik-ruya-yorumlari',
    content: `Psikolojik rüya yorumları, modern dünyada rüyaları anlamak için kullanılan bir yöntemdir; ancak İslam'da rüya tabiri, Kur'an ve Sünnet'ten yola çıkılarak yapılmalıdır. Psikolojik yorumlar bazen faydalı olsa da, İslam'ın temel prensiplerini aşmamalıdır. Peygamberimiz (s.a.v.), "Rüya üç kısımdır" diyerek rüyaların kaynağını net bir şekilde açıklamıştır.

Müslüman, psikolojik yorumlara aşırı güvenmemeli ve her zaman Kur'an ve Sünnet'i referans almalıdır. Rüya tabiri, ehliyetli alimlerin danışılmasıyla yapılmalıdır. Psikolojik yorumlar, rüyaların manevi boyutunu göremeyebilir; bu yüzden İslam'ın çerçevesinde değerlendirilmelidir.

Rüyalar, psikolojik yorumlarla kısmen açıklanabilir; ancak asıl manası Allah'ın izniyle belirlenir. Müslüman, rüyalarını anlamak için psikolojik yorumları destek olarak kullanabilir, ancak Kur'an ve Sünnet'i esas almalıdır. Rüya tabiri, imanla ve ehliyetli alimlerin görüşüyle yapılmalıdır.`,
    views: 445,
    likes: 28,
    dislikes: 7,
    updatedAt: '2023-12-25',
    tags: ['psikoloji', 'yorum', 'islam']
  },
  {
    id: 'ruya-yorumlama-ve-tabiri',
    title: 'Rüya Yorumlama ve Tabiri',
    slug: 'ruya-yorumlama-ve-tabiri',
    content: `Rüya yorumlama, İslam'da "tebşir" olarak adlandırılan ve ehliyetli alimlerin yaptığı bir bilimdir. Peygamberimiz (s.a.v.), "En güzel rüya, müminin rüyasıdır" diyerek rüya tabirinin önemini vurgulamıştır. Rüya tabiri, kişinin niyeti, yaşam durumu ve dua ederken iç haliyle bağlantılıdır.

Rüya yorumlaması, sadece ehliyetli alimlerin yapabileceği bir bilimdir. Herkesin rüya tabiri yapması, hatalı yorumlara neden olabilir. Müslüman, rüya tabiri için ehliyetli alimlere danışmalıdır. Rüya tabiri, Kur'an ve Sünnet'ten yola çıkılarak yapılmalıdır.

Rüya yorumlaması, imanla ve tevekkülle yapılmalıdır. Rüyaların manası, Allah'ın izniyle belirlenir. Müslüman, rüya tabirini ehliyetli alimlerden almalı ve rüyalarını manevi bir rehber olarak görmelidir. Rüya tabiri, İslam'da "ruhun huzur anı" olarak kabul edilir.`,
    views: 956,
    likes: 71,
    dislikes: 3,
    updatedAt: '2023-12-22',
    tags: ['yorumlama', 'tabir', 'islam']
  },
  {
    id: 'ruyalara-dair-gercekler',
    title: 'Rüyalara Dair Gerçekler',
    slug: 'ruyalara-dair-gercekler',
    content: `Rüyalar, İslam'da "müminin üçte biri" olarak tanımlanır ve Allah'ın izniyle oluşur. Peygamberimiz (s.a.v.), "Rüya üç kısımdır: Allah'tan gelen müjde, insanın içinden gelen düşünceler ve şeytanın vesvesesi" buyurmuştur. Bu yüzden her rüyanın manası yoktur; ancak tekrarlanan veya kalp huzuru veren rüyalar dikkate alınmalıdır.

Rüyalar, kişinin niyeti ve yaşam tarzıyla doğrudan ilişkilidir. İmanı güçlü olanların rüyaları genellikle daha aydınlıktır. Rüya tabiri, ehliyetli alimlerin danışılmasıyla yapılmalıdır. Müslüman, rüyalarını aşırı önemsememeli, ancak Allah'ın rehberliği için dikkatli olmalıdır.

Rüyalara dair en önemli gerçek, rüyaların Allah'ın izniyle oluşmasıdır. Müslüman, rüyalarını manevi bir rehber olarak görmeli ve Kur'an ve Sünnet'i referans almalıdır. Rüyalar, İslam'da "ruhun huzur anı" olarak kabul edilir ve imanla beslenmelidir.`,
    views: 678,
    likes: 49,
    dislikes: 1,
    updatedAt: '2023-12-20',
    tags: ['gerçekler', 'iman', 'islam']
  },
  {
    id: 'tekrarlanan-ruyalar',
    title: 'Tekrarlanan Rüyalar',
    slug: 'tekrarlanan-ruyalar',
    content: `Tekrarlanan rüyalar, İslam'da Allah'ın insanı uyarmak veya doğru yola yönlendirmek için gönderdiği işaretlerdir. Peygamberimiz (s.a.v.), "Tekrarlanan rüya, Allah'ın lütfudur" buyurmuştur. Tekrarlanan rüyalar, genellikle kişinin dikkatini çekmek için gönderilir ve önemsenmelidir.

Müslüman, tekrarlanan rüyaları ciddiye almalı ve istihare namazı kılmalıdır. Rüya tabiri, ehliyetli alimlerin danışılmasıyla yapılmalıdır. Tekrarlanan rüyalar, kişinin yaşamını olumlu yönde değiştirmesi için bir fırsat olabilir.

Tekrarlanan rüyalar, İslam'da "Allah'ın rehberliği" olarak kabul edilir. Müslüman, tekrarlanan rüyaları manevi bir rehber olarak görmeli ve Kur'an ve Sünnet'i referans almalıdır. Rüyalar, İslam'da "ruhun huzur anı" olarak kabul edilir ve imanla beslenmelidir.`,
    views: 542,
    likes: 36,
    dislikes: 4,
    updatedAt: '2023-12-18',
    tags: ['tekrarlanan', 'rehberlik', 'islam']
  }
];

export default function Articles() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`min-h-screen transition-all duration-500 ${darkMode ? 'bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900 text-white' : 'bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 text-gray-800'}`}>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Yazılarımız
          </h1>
          <p className={`text-xl max-w-2xl mx-auto mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            İslam, rüya ve bilinçaltı üzerine yazılarımız
          </p>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="px-4 pb-16">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <article
                key={article.id}
                className={`block rounded-3xl p-6 min-h-[300px] flex flex-col transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02] group ${
                  darkMode
                    ? 'bg-slate-800/80 hover:bg-slate-750 backdrop-blur-sm border border-slate-700/50'
                    : 'bg-white/90 hover:bg-white shadow-xl backdrop-blur-sm border border-emerald-100/50'
                }`}
              >
                {/* Views - Top Right */}
                <div className="flex items-start justify-end mb-3">
                  <div className="flex items-center space-x-1 text-sm opacity-75">
                    <Eye className="h-4 w-4" />
                    <span>{article.views}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-base font-bold mb-4">{article.title}</h3>

                {/* Content Preview */}
                <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {article.content.substring(0, 150)}...
                </p>

                {/* Bottom Section - Date left, Like/Dislike buttons right */}
                <div className="flex items-end justify-between mt-auto text-sm opacity-75">
                  {/* Date - Bottom Left */}
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{new Date(article.updatedAt).toLocaleDateString('tr-TR')}</span>
                  </div>

                  {/* Like/Dislike Buttons - Bottom Right */}
                  <div className="flex space-x-2">
                    <button className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition-colors">
                      👍
                    </button>
                    <button className="flex items-center justify-center w-8 h-8 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors">
                      👎
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer darkMode={darkMode} />
    </div>
  );
}