import React, { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, BookOpen, Tag, ThumbsDown, ThumbsUp, Eye } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

type DreamDetail = {
  id: number;
  title: string;
  slug: string;
  body: string;
  category: string | null;
  tags: { slug: string; name: string }[];
  views?: number;
  likes?: number;
  dislikes?: number;
  updatedAt?: string;
};

const fallbackBySlug: Record<string, DreamDetail> = {
  'ruyada-su-gormek': {
    id: 1,
    slug: 'ruyada-su-gormek',
    title: 'Rüyada Su Görmek',
    body:
      'Rüyada su görmek; suyun temizliği, berraklığı ve akışına göre farklı mânâlara gelebilir. Temiz ve berrak su hayra, ferahlığa ve gönül huzuruna işaret eder. Bulanık/kirli su ise sıkıntı ve imtihanı hatırlatabilir.\n\nNot: Tabirler yorum mahiyetindedir. Allah Teâlâ en doğrusunu bilir.',
    category: 'Doğa',
    tags: [{ slug: 'su', name: 'Su' }],
    views: 0,
    likes: 0,
    dislikes: 0,
  },
  'ruyada-ucmak': {
    id: 2,
    slug: 'ruyada-ucmak',
    title: 'Rüyada Uçmak Görmek',
    body:
      'Rüyada uçmak; niyet ve hâle göre yükseliş, arzu edilen bir maksada yaklaşma veya bir belâdan kurtuluş şeklinde yorumlanabilir. Uçuş esnasındaki huzur, tabirin hayra dönmesine vesile olabilir.\n\nNot: Tabirler yorum mahiyetindedir. Allah Teâlâ en doğrusunu bilir.',
    category: 'Hareket',
    tags: [{ slug: 'ucmak', name: 'Uçmak' }],
    views: 0,
    likes: 0,
    dislikes: 0,
  },
  'ruyada-dis-dusmesi': {
    id: 3,
    slug: 'ruyada-dis-dusmesi',
    title: 'Rüyada Diş Düşmesi Görmek',
    body:
      'Rüyada dişin düşmesi; aile, yakınlar ve geçimle ilgili bazı endişeleri hatırlatabilir. Detaylar (kaç diş, acı, kan vb.) tabiri etkiler. Kişi böyle bir rüya gördüğünde dua ve sadaka ile hayra çevirmeye gayret edebilir.\n\nNot: Tabirler yorum mahiyetindedir. Allah Teâlâ en doğrusunu bilir.',
    category: 'Vücut',
    tags: [{ slug: 'dis', name: 'Diş' }],
    views: 0,
    likes: 0,
    dislikes: 0,
  },
  'ruyada-yilan-gormek': {
    id: 4,
    slug: 'ruyada-yilan-gormek',
    title: 'Rüyada Yılan Görmek',
    body:
      'Rüyada yılan görmek; bazen düşmanlık, bazen de gizli bir imtihanı işaret edebilir. Yılanın rengi, büyüklüğü ve davranışı tabiri değiştirir. Korku hissi artıyorsa istiğfar ve korunma duaları tavsiye edilir.\n\nNot: Tabirler yorum mahiyetindedir. Allah Teâlâ en doğrusunu bilir.',
    category: 'Hayvanlar',
    tags: [{ slug: 'yilan', name: 'Yılan' }],
    views: 0,
    likes: 0,
    dislikes: 0,
  },
  'ruyada-olum-gormek': {
    id: 5,
    slug: 'ruyada-olum-gormek',
    title: 'Rüyada Ölüm Görmek',
    body:
      'Rüyada ölüm görmek; çoğu zaman bir hâlin kapanıp yeni bir dönemin başlamasına, tevbe ve dönüşe işaret edebilir. Rüyadaki kişi ve hisler tabiri etkiler. Böyle rüyalar ibret ve muhasebeye vesile olabilir.\n\nNot: Tabirler yorum mahiyetindedir. Allah Teâlâ en doğrusunu bilir.',
    category: 'Hayat',
    tags: [{ slug: 'olum', name: 'Ölüm' }],
    views: 0,
    likes: 0,
    dislikes: 0,
  },
  'ruyada-para-gormek': {
    id: 6,
    slug: 'ruyada-para-gormek',
    title: 'Rüyada Para Görmek',
    body:
      'Rüyada para görmek; rızık, emanet ve sorumlulukla ilgili işaretler taşıyabilir. Paranın bulunması/harcanması, miktarı ve türü tabiri değiştirir. Kişi helâl kazanca yönelip şükürle nimetini artırmaya niyet edebilir.\n\nNot: Tabirler yorum mahiyetindedir. Allah Teâlâ en doğrusunu bilir.',
    category: 'Maddi',
    tags: [{ slug: 'para', name: 'Para' }],
    views: 0,
    likes: 0,
    dislikes: 0,
  },
};

export default function DreamDetailPage() {
  const { slug = '' } = useParams();
  const [item, setItem] = useState<DreamDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [usingFallback, setUsingFallback] = useState(false);
  const [views, setViews] = useState<number | null>(null);
  const [likes, setLikes] = useState<number | null>(null);
  const [dislikes, setDislikes] = useState<number | null>(null);
  const [voteLoading, setVoteLoading] = useState(false);
  const [voted, setVoted] = useState<'like' | 'dislike' | null>(null);

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
          setViews(typeof data.item.views === 'number' ? data.item.views : null);
          setLikes(typeof data.item.likes === 'number' ? data.item.likes : null);
          setDislikes(typeof data.item.dislikes === 'number' ? data.item.dislikes : null);
          setUsingFallback(false);
        } else {
          throw new Error('Bad response');
        }
      } catch {
        if (fallback) {
          setItem(fallback);
          setUsingFallback(true);
          setViews(null);
          setLikes(null);
          setDislikes(null);
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

  useEffect(() => {
    // Count a view when user lands on detail page.
    // Server will increment; response gives latest count.
    if (!slug) return;
    const key = `viewed:${slug}`;
    // Avoid double-counting in the same tab (StrictMode double effects in dev).
    if (sessionStorage.getItem(key)) return;
    sessionStorage.setItem(key, '1');

    fetch(`/api/dreams/${encodeURIComponent(slug)}/view`, { method: 'POST' })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data && typeof data.views === 'number') setViews(data.views);
      })
      .catch(() => {});
  }, [slug]);

  useEffect(() => {
    if (!slug) return;
    const saved = localStorage.getItem(`vote:${slug}`);
    if (saved === 'like' || saved === 'dislike') setVoted(saved);
  }, [slug]);

  async function sendVote(v: 'like' | 'dislike') {
    if (!slug) return;
    if (voted) return;
    try {
      setVoteLoading(true);
      const res = await fetch(`/api/dreams/${encodeURIComponent(slug)}/vote`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ vote: v }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = (await res.json()) as { likes?: number; dislikes?: number };
      if (typeof data.likes === 'number') setLikes(data.likes);
      if (typeof data.dislikes === 'number') setDislikes(data.dislikes);
      setVoted(v);
      localStorage.setItem(`vote:${slug}`, v);
    } finally {
      setVoteLoading(false);
    }
  }

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

              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                <span className="inline-flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  <span>{views ?? item.views ?? 0} görüntülenme</span>
                </span>

                <span className="opacity-40">•</span>

                <div className="inline-flex items-center gap-2">
                  <button
                    type="button"
                    disabled={voteLoading || !!voted}
                    onClick={() => void sendVote('like')}
                    className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border transition-colors ${
                      voted === 'like'
                        ? 'bg-green-600 text-white border-green-600'
                        : 'bg-white hover:bg-green-50 border-gray-200'
                    } ${voteLoading || voted ? 'opacity-70 cursor-not-allowed' : ''}`}
                    aria-label="Beğen"
                  >
                    <ThumbsUp className="h-4 w-4" />
                    <span>{likes ?? item.likes ?? 0}</span>
                  </button>

                  <button
                    type="button"
                    disabled={voteLoading || !!voted}
                    onClick={() => void sendVote('dislike')}
                    className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border transition-colors ${
                      voted === 'dislike'
                        ? 'bg-red-600 text-white border-red-600'
                        : 'bg-white hover:bg-red-50 border-gray-200'
                    } ${voteLoading || voted ? 'opacity-70 cursor-not-allowed' : ''}`}
                    aria-label="Beğenme"
                  >
                    <ThumbsDown className="h-4 w-4" />
                    <span>{dislikes ?? item.dislikes ?? 0}</span>
                  </button>

                  {voted && <span className="text-xs text-gray-500">Oyunuz alındı</span>}
                </div>
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

