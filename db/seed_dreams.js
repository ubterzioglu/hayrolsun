const dreams = [
  { user_id: "34521", content: "Rüyamda camide namaz kılıyordum. Cemaat çok kalabalıktı ve herkes huzurlu görünüyordu. Namazdan sonra tanımadığım yaşlı bir adam yanıma gelip elimi tuttu ve dua etti. Çok garip bir sıcaklık hissettim." },
  { user_id: "78432", content: "Dün gece rüyamda denizde yüzüyordum ama su çok berraktı, dipten balıkları görebiliyordum. Sonra birden gökyüzüne baktım ve güneş batıyordu, renkleri inanılmazdı. Uyandığımda çok huzurluydum." },
  { user_id: "12987", content: "Rüyamda vefat etmiş babamı gördüm. Bana gülümsüyordu ve hiçbir şey söylemeden sarıldı. Uyandığımda yastığım ıslakmış, ağlamışım uyurken. Bu rüya ne anlama geliyor acaba?" },
  { user_id: "45678", content: "Sürekli aynı rüyayı görüyorum. Bir bahçedeyim, her yer yeşil ve çiçekler var. Uzakta bir ev var ama ne kadar yürüsem de eve ulaşamıyorum. Tam yaklaşacakken uyanıyorum her seferinde." },
  { user_id: "89234", content: "Dün gece uçtuğumu gördüm rüyamda. Kollarımı açıp şehrin üzerinde süzülüyordum. Aşağıda insanlar beni görüp el sallıyorlardı. Çok özgür hissettim, keşke gerçek olsa." },
  { user_id: "56123", content: "Rüyamda bir kitap okuyordum ama sayfalar boştu. Çevirmeye devam ettim, sonunda bir sayfada Arapça bir yazı gördüm ama okuyamadım. Kitabı kapatınca kayboldu elimden." },
  { user_id: "23456", content: "Sınav rüyası gördüm yine. Üniversite bitmesine rağmen hala sınava geç kaldığımı görüyorum. Koşarak gidiyorum ama sınıfı bulamıyorum. Bu rüyalar ne zaman bitecek bilmiyorum." },
  { user_id: "67891", content: "Rüyamda yağmur yağıyordu ve ben şemsiyesiz dışarıdaydım ama ıslanmıyordum. Yağmur damlalarının arasından geçiyordum sanki. Etraftaki insanlar şaşkın şaşkın bakıyorlardı." },
  { user_id: "91234", content: "Dün gece rüyamda bir bebek emziriyordum ama bebeğim yok gerçekte. Bebek çok güzel ve sakin görünüyordu. Annem de yanımdaydı ve gülümsüyordu. Evlilik planım bile yok şu an." },
  { user_id: "34789", content: "Rüyamda eve hırsız girdi ama hırsız hiçbir şey almadan çıktı. Sadece oturma odasında oturup bana baktı ve gitti. Yüzünü göremedim ama korkmadım garip şekilde." },
  { user_id: "52341", content: "Bir dağın tepesinde oturuyordum rüyamda. Güneş doğuyordu ve kuşlar etrafımda uçuşuyordu. Yanımda tanımadığım biri vardı ama konuşmadık, sadece manzarayı seyrettik." },
  { user_id: "78901", content: "Rüyamda dişlerim dökülüyordu tek tek. Aynaya baktığımda ağzım bomboştu. Sonra yenileri çıkmaya başladı, altın renginde dişler. Tuhaf ama korkutucu değildi." },
  { user_id: "43218", content: "Kayıp kedimi buldum rüyamda. 3 yıl önce kaybetmiştim, rüyada kapının önünde bekliyordu. Kucağıma aldım ve mırıldandı. Uyandığımda gerçekten mutluydum." }
];

async function seed() {
  const endpoint = "https://hayrolsun-vercel-icfg-twk0q8t9arsmkdgxgh8zquox.aws-eu-west-1.turso.io/v2/pipeline";
  const token = process.env.TURSO_AUTH_TOKEN;

  for (const d of dreams) {
    const body = {
      requests: [{
        type: "execute",
        stmt: {
          sql: "INSERT INTO user_dreams (user_id, content, status) VALUES (?, ?, 'approved')",
          args: [
            { type: "text", value: d.user_id },
            { type: "text", value: d.content }
          ]
        }
      }]
    };

    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(body)
    });

    const result = await res.json();
    console.log(`#${d.user_id}:`, res.ok ? "OK" : result.error);
  }
}

seed();
