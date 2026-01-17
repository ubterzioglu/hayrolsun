import React, { useEffect, useMemo, useState } from 'react';
import { BookOpen, Shield, RefreshCw, TerminalSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

type Summary = {
  dreamCount: number;
  articleCount: number;
  categoryCount: number;
  tagCount: number;
  totalViews: number;
  totalLikes: number;
  totalDislikes: number;
};

type DreamRow = {
  id: number;
  title: string;
  slug: string;
  category: string | null;
  views: number;
  likes: number;
  dislikes: number;
  updatedAt: string;
};

type CategoryRow = {
  id: number;
  name: string;
  slug: string;
  dreamCount: number;
};

function formatNumber(n: number) {
  return new Intl.NumberFormat('tr-TR').format(n);
}

export default function AdminPage() {
  const [token, setToken] = useState('');
  const [savedToken, setSavedToken] = useState<string>(() => sessionStorage.getItem('adminToken') ?? '');
  const [summary, setSummary] = useState<Summary | null>(null);
  const [dreams, setDreams] = useState<DreamRow[]>([]);
  const [categories, setCategories] = useState<CategoryRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sqlText, setSqlText] = useState('');
  const [sqlResult, setSqlResult] = useState<string | null>(null);
  const [sqlLoading, setSqlLoading] = useState(false);

  const activeToken = useMemo(() => savedToken, [savedToken]);

  async function loadAll(t: string) {
    setLoading(true);
    setError(null);
    try {
      const headers: Record<string, string> = { 'x-admin-token': t };

      const [s, d, c] = await Promise.all([
        fetch('/api/admin/summary', { headers }),
        fetch('/api/admin/dreams?limit=200', { headers }),
        fetch('/api/admin/categories', { headers }),
      ]);

      if (!s.ok) throw new Error(`summary HTTP ${s.status}`);
      if (!d.ok) throw new Error(`dreams HTTP ${d.status}`);
      if (!c.ok) throw new Error(`categories HTTP ${c.status}`);

      const summaryJson = (await s.json()) as Summary;
      const dreamsJson = (await d.json()) as { items: DreamRow[] };
      const categoriesJson = (await c.json()) as { items: CategoryRow[] };

      setSummary(summaryJson);
      setDreams(Array.isArray(dreamsJson.items) ? dreamsJson.items : []);
      setCategories(Array.isArray(categoriesJson.items) ? categoriesJson.items : []);
    } catch (e: any) {
      setError(e?.message ?? String(e));
      setSummary(null);
      setDreams([]);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (activeToken) void loadAll(activeToken);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeToken]);

  async function runSql() {
    if (!savedToken) return;
    if (!sqlText.trim()) return;
    setSqlLoading(true);
    setSqlResult(null);
    try {
      const res = await fetch('/api/admin/sql', {
        method: 'POST',
        headers: { 'content-type': 'application/json', 'x-admin-token': savedToken },
        body: JSON.stringify({ sql: sqlText }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.detail || data?.error || `HTTP ${res.status}`);
      setSqlResult(`✅ OK (executed: ${data.executed ?? '?'})`);
      // refresh after inserts
      await loadAll(savedToken);
    } catch (e: any) {
      setSqlResult(`❌ ${e?.message ?? String(e)}`);
    } finally {
      setSqlLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 text-gray-800">
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-green-600" />
            <span className="font-bold">hayrolsun.site</span>
          </Link>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Shield className="h-4 w-4" />
            <span>Admin (salt-okunur)</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-6">
        <section className="rounded-2xl bg-white shadow p-5">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold">Admin Paneli</h1>
              <p className="text-sm text-gray-600">
                Bu ekran sadece özet metrikleri ve listeleri gösterir. Düzenleme yok.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
              <input
                type="password"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="ADMIN_TOKEN"
                className="px-3 py-2 rounded-xl border border-gray-300 bg-white outline-none focus:ring-2 focus:ring-green-500 w-full sm:w-80"
              />
              <button
                type="button"
                onClick={() => {
                  sessionStorage.setItem('adminToken', token);
                  setSavedToken(token);
                }}
                className="px-4 py-2 rounded-xl bg-green-600 text-white font-medium hover:bg-green-700"
              >
                Kaydet
              </button>
              <button
                type="button"
                disabled={!savedToken || loading}
                onClick={() => void loadAll(savedToken)}
                className={`px-4 py-2 rounded-xl border border-gray-300 font-medium inline-flex items-center gap-2 ${
                  !savedToken || loading ? 'opacity-60 cursor-not-allowed' : 'hover:bg-gray-50'
                }`}
              >
                <RefreshCw className="h-4 w-4" />
                Yenile
              </button>
            </div>
          </div>

          {error && (
            <div className="mt-4 rounded-xl border border-red-200 bg-red-50 text-red-700 px-4 py-3 text-sm">
              {error}
            </div>
          )}
        </section>

        <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="rounded-2xl bg-white shadow p-5">
            <div className="text-sm text-gray-500">Mevcut rüya tabiri sayısı</div>
            <div className="text-3xl font-bold">{summary ? formatNumber(summary.dreamCount) : '-'}</div>
          </div>
          <div className="rounded-2xl bg-white shadow p-5">
            <div className="text-sm text-gray-500">Mevcut makale sayısı</div>
            <div className="text-3xl font-bold">{summary ? formatNumber(summary.articleCount) : '-'}</div>
          </div>
          <div className="rounded-2xl bg-white shadow p-5">
            <div className="text-sm text-gray-500">Toplam görüntülenme (rüya sayfaları)</div>
            <div className="text-3xl font-bold">{summary ? formatNumber(summary.totalViews) : '-'}</div>
            <div className="text-xs text-gray-500 mt-1">
              Not: Bu metrik "tekil kişi" değildir; rüya sayfalarının toplam görüntülenmesidir.
            </div>
          </div>
          <div className="rounded-2xl bg-white shadow p-5">
            <div className="text-sm text-gray-500">Beğeni / Beğenmeme</div>
            <div className="text-3xl font-bold">
              {summary ? `${formatNumber(summary.totalLikes)} / ${formatNumber(summary.totalDislikes)}` : '—'}
            </div>
          </div>
        </section>

        <section className="rounded-2xl bg-white shadow p-5">
          <div className="flex items-center justify-between gap-4 mb-3">
            <h2 className="text-lg font-bold inline-flex items-center gap-2">
              <TerminalSquare className="h-5 w-5" />
              SQL Çalıştır (Import)
            </h2>
            <div className="text-xs text-gray-500">
              Sadece <span className="font-mono">INSERT</span>/<span className="font-mono">SELECT</span> izinli
            </div>
          </div>

          <p className="text-sm text-gray-600 mb-3">
            Turso paneline erişemiyorsan, SQL’ini buraya yapıştırıp çalıştırabilirsin. Güvenlik için bu API sadece
            <b> belirli tablolara</b> (<span className="font-mono">dreams/categories/tags/dream_tags</span>) INSERT
            kabul eder.
          </p>

          <textarea
            value={sqlText}
            onChange={(e) => setSqlText(e.target.value)}
            placeholder="SQL'i buraya yapıştır (örn. INSERT INTO dreams ...;)"
            className="w-full min-h-40 rounded-xl border border-gray-300 bg-white p-3 font-mono text-xs outline-none focus:ring-2 focus:ring-green-500"
          />

          <div className="mt-3 flex flex-col sm:flex-row sm:items-center gap-3">
            <button
              type="button"
              disabled={!savedToken || sqlLoading || !sqlText.trim()}
              onClick={() => void runSql()}
              className={`px-4 py-2 rounded-xl bg-green-600 text-white font-medium hover:bg-green-700 ${
                !savedToken || sqlLoading || !sqlText.trim() ? 'opacity-60 cursor-not-allowed' : ''
              }`}
            >
              Çalıştır
            </button>
            <button
              type="button"
              disabled={sqlLoading || !sqlText}
              onClick={() => {
                setSqlText('');
                setSqlResult(null);
              }}
              className={`px-4 py-2 rounded-xl border border-gray-300 font-medium hover:bg-gray-50 ${
                sqlLoading || !sqlText ? 'opacity-60 cursor-not-allowed' : ''
              }`}
            >
              Temizle
            </button>
            {sqlResult && <div className="text-sm text-gray-700">{sqlResult}</div>}
          </div>
        </section>

        <section className="rounded-2xl bg-white shadow p-5">
          <h2 className="text-lg font-bold mb-3">Kategoriler</h2>
          <div className="overflow-auto">
            <table className="min-w-full text-sm">
              <thead className="text-left text-gray-500">
                <tr>
                  <th className="py-2 pr-4">Ad</th>
                  <th className="py-2 pr-4">Slug</th>
                  <th className="py-2 pr-4">Rüya sayısı</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((c) => (
                  <tr key={c.id} className="border-t border-gray-100">
                    <td className="py-2 pr-4 font-medium">{c.name}</td>
                    <td className="py-2 pr-4 font-mono text-xs">{c.slug}</td>
                    <td className="py-2 pr-4">{formatNumber(c.dreamCount)}</td>
                  </tr>
                ))}
                {categories.length === 0 && (
                  <tr>
                    <td className="py-3 text-gray-500" colSpan={3}>
                      {savedToken ? (loading ? 'Yükleniyor…' : 'Kayıt yok') : 'Token giriniz'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-2xl bg-white shadow p-5">
          <h2 className="text-lg font-bold mb-3">Rüya tabirleri (başlık listesi)</h2>
          <div className="overflow-auto">
            <table className="min-w-full text-sm">
              <thead className="text-left text-gray-500">
                <tr>
                  <th className="py-2 pr-4">Başlık</th>
                  <th className="py-2 pr-4">Kategori</th>
                  <th className="py-2 pr-4">Slug</th>
                  <th className="py-2 pr-4">Views</th>
                  <th className="py-2 pr-4">Like</th>
                  <th className="py-2 pr-4">Dislike</th>
                </tr>
              </thead>
              <tbody>
                {dreams.map((d) => (
                  <tr key={d.id} className="border-t border-gray-100">
                    <td className="py-2 pr-4 font-medium">
                      <Link className="text-green-700 hover:text-green-800" to={`/ruya/${d.slug}`}>
                        {d.title}
                      </Link>
                    </td>
                    <td className="py-2 pr-4">{d.category ?? '—'}</td>
                    <td className="py-2 pr-4 font-mono text-xs">{d.slug}</td>
                    <td className="py-2 pr-4">{formatNumber(d.views)}</td>
                    <td className="py-2 pr-4">{formatNumber(d.likes)}</td>
                    <td className="py-2 pr-4">{formatNumber(d.dislikes)}</td>
                  </tr>
                ))}
                {dreams.length === 0 && (
                  <tr>
                    <td className="py-3 text-gray-500" colSpan={6}>
                      {savedToken ? (loading ? 'Yükleniyor…' : 'Kayıt yok') : 'Token giriniz'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}

