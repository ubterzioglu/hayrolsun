import React, { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, BookOpen, Tag } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

type DreamDetail = {
  id: number;
  title: string;
  slug: string;
  body: string;
  category: string | null;
  tags: { slug: string; name: string }[];
  updatedAt?: string;
};

const fallbackBySlug: Record<string, DreamDetail> = {
  'ruyada-su-gormek': {
    id: 1,
    slug: 'ruyada-su-gormek',
    title: 'Su Rüyası Tabiri',
    body:
      'Rüyada su görmek; suyun temizliği, berraklığı ve akışına göre farklı mânâlara gelebilir. Temiz ve berrak su hayra, ferahlığa ve gönül huzuruna işaret eder. Bulanık/kirli su ise sıkıntı ve imtihanı hatırlatabilir.\n\nNot: Tabirler yorum mahiyetindedir. Allah Teâlâ en doğrusunu bilir.',
    category: 'Doğa',
    tags: [{ slug: 'su', name: 'Su' }],
  },
  'ruyada-ucmak': {
    id: 2,
    slug: 'ruyada-ucmak',
    title: 'Uçmak Rüyası Tabiri',
    body:
      'Rüyada uçmak; niyet ve hâle göre yükseliş, arzu edilen bir maksada yaklaşma veya bir belâdan kurtuluş şeklinde yorumlanabilir. Uçuş esnasındaki huzur, tabirin hayra dönmesine vesile olabilir.\n\nNot: Tabirler yorum mahiyetindedir. Allah Teâlâ en doğrusunu bilir.',
    category: 'Hareket',
    tags: [{ slug: 'ucmak', name: 'Uçmak' }],
  },
  'ruyada-dis-dusmesi': {
    id: 3,
    slug: 'ruyada-dis-dusmesi',
    title: 'Diş Düşmesi Rüyası Tabiri',
    body:
      'Rüyada dişin düşmesi; aile, yakınlar ve geçimle ilgili bazı endişeleri hatırlatabilir. Detaylar (kaç diş, acı, kan vb.) tabiri etkiler. Kişi böyle bir rüya gördüğünde dua ve sadaka ile hayra çevirmeye gayret edebilir.\n\nNot: Tabirler yorum mahiyetindedir. Allah Teâlâ en doğrusunu bilir.',
    category: 'Vücut',
    tags: [{ slug: 'dis', name: 'Diş' }],
  },
  'ruyada-yilan-gormek': {
    id: 4,
    slug: 'ruyada-yilan-gormek',
    title: 'Yılan Rüyası Tabiri',
    body:
      'Rüyada yılan görmek; bazen düşmanlık, bazen de gizli bir imtihanı işaret edebilir. Yılanın rengi, büyüklüğü ve davranışı tabiri değiştirir. Korku hissi artıyorsa istiğfar ve korunma duaları tavsiye edilir.\n\nNot: Tabirler yorum mahiyetindedir. Allah Teâlâ en doğrusunu bilir.',
    category: 'Hayvanlar',
    tags: [{ slug: 'yilan', name: 'Yılan' }],
  },
  'ruyada-olum-gormek': {
    id: 5,
    slug: 'ruyada-olum-gormek',
    title: 'Ölüm Rüyası Tabiri',
    body:
      'Rüyada ölüm görmek; çoğu zaman bir hâlin kapanıp yeni bir dönemin başlamasına, tevbe ve dönüşe işaret edebilir. Rüyadaki kişi ve hisler tabiri etkiler. Böyle rüyalar ibret ve muhasebeye vesile olabilir.\n\nNot: Tabirler yorum mahiyetindedir. Allah Teâlâ en doğrusunu bilir.',
    category: 'Hayat',
    tags: [{ slug: 'olum', name: 'Ölüm' }],
  },
  'ruyada-para-gormek': {
    id: 6,
    slug: 'ruyada-para-gormek',
    title: 'Para Rüyası Tabiri',
    body:
      'Rüyada para görmek; rızık, emanet ve sorumlulukla ilgili işaretler taşıyabilir. Paranın bulunması/harcanması, miktarı ve türü tabiri değiştirir. Kişi helâl kazanca yönelip şükürle nimetini artırmaya niyet edebilir.\n\nNot: Tabirler yorum mahiyetindedir. Allah Teâlâ en doğrusunu bilir.',
    category: 'Maddi',
    tags: [{ slug: 'para', name: 'Para' }],
  },
};

export default function DreamDetailPage() {
  const { slug = '' } = useParams();
  const [item, setItem] = useState<DreamDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [usingFallback, setUsingFallback] = useState(false);

  const fallback = useMemo(() => fallbackBySlug[slug], [slug]);

  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/dreams/${encodeURIComponent(slug)}`, { signal: controller.signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = (await res.json()) as { item: DreamDetail };
        if (data?.item?.slug) {
          setItem(data.item);
          setUsingFallback(false);
        } else {
          throw new Error('Bad response');
        }
      } catch {
        if (fallback) {
          setItem(fallback);
          setUsingFallback(true);
        } else {
          setItem(null);
          setUsingFallback(false);
        }
      } finally {
        setLoading(false);
      }
    })();

    return () => controller.abort();
  }, [slug, fallback]);

  return (
    <div className="min-h-screen transition-colors duration-300 bg-gradient-to-br from-green-50 to-emerald-100 text-gray-800">
      <header className="border-b border-gray-200 bg-white/80">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-medium text-green-700 hover:text-green-800"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Geri</span>
          </Link>
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-green-600" />
            <span className="font-bold">Hayrolsun.site</span>
          </div>
          <div className="w-10" />
        </div>
      </header>

      <main className="container mx-auto px-4 py-10">
        {loading && <div className="opacity-75">Yükleniyor…</div>}

        {!loading && !item && (
          <div className="rounded-2xl p-6 bg-white shadow">
            <h1 className="text-2xl font-bold mb-2">Bulunamadı</h1>
            <p className="text-gray-600">
              Bu rüya sayfası bulunamadı (slug: <code className="opacity-80">{slug}</code>).
            </p>
          </div>
        )}

        {item && (
          <article className="rounded-2xl p-6 md:p-8 bg-white shadow">
            <div className="flex flex-col gap-3 mb-6">
              <div className="flex items-center justify-between gap-4">
                <h1 className="text-3xl md:text-4xl font-bold">{item.title}</h1>
                {usingFallback && (
                  <span className="text-xs px-2 py-1 rounded-full bg-gray-100">
                    demo
                  </span>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2 text-sm opacity-80">
                {item.category && (
                  <span className="px-3 py-1 rounded-full bg-green-100 text-green-700">
                    {item.category}
                  </span>
                )}
                {item.updatedAt && <span>{new Date(item.updatedAt).toLocaleDateString('tr-TR')}</span>}
                <span className="opacity-60">/</span>
                <span className="font-mono text-xs">{item.slug}</span>
              </div>

              {item.tags?.length > 0 && (
                <div className="flex flex-wrap items-center gap-2">
                  <Tag className="h-4 w-4 opacity-70" />
                  {item.tags.map((t) => (
                    <span
                      key={t.slug}
                      className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700"
                    >
                      {t.name}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="whitespace-pre-wrap leading-7 text-gray-700">
              {item.body}
            </div>
          </article>
        )}
      </main>
    </div>
  );
}

