const params = new URLSearchParams(window.location.search);
const slug = params.get('slug');

const stateEl = document.getElementById('detail-state');
const cardEl = document.getElementById('detail-card');
const titleEl = document.getElementById('detail-title');
const bodyEl = document.getElementById('detail-body');
const categoryEl = document.getElementById('detail-category');
const dateEl = document.getElementById('detail-date');
const slugEl = document.getElementById('detail-slug');
const viewsEl = document.getElementById('detail-views');
const likeBtn = document.getElementById('like-btn');
const dislikeBtn = document.getElementById('dislike-btn');

const fallbackBySlug = {
  'ruyada-su-gormek': {
    title: 'Rüyada Su Görmek',
    body:
      'Rüyada su görmek; suyun temizliği, berraklığı ve akışına göre farklı mânâlara gelebilir. Temiz ve berrak su hayra, ferahlığa ve gönül huzuruna işaret eder. Bulanık/kirli su ise sıkıntı ve imtihanı hatırlatabilir.\n\nNot: Tabirler yorum mahiyetindedir. Allah Teâlâ en doğrusunu bilir.',
    category: 'Doğa',
    views: 0,
    likes: 0,
    dislikes: 0,
  },
};

let voted = null;

function renderItem(item, fallback) {
  titleEl.textContent = item.title || 'Başlık bulunamadı';
  bodyEl.textContent = item.body || '';
  categoryEl.textContent = item.category || 'Genel';
  dateEl.textContent = item.updatedAt
    ? new Date(item.updatedAt).toLocaleDateString('tr-TR')
    : '';
  slugEl.textContent = slug ? `/${slug}` : '';
  viewsEl.textContent = `${item.views ?? 0} görüntülenme`;
  if (fallback) {
    stateEl.textContent = 'Demo içerik gösteriliyor.';
  } else {
    stateEl.textContent = '';
  }
  cardEl.classList.remove('hidden');
}

async function fetchItem() {
  if (!slug) {
    stateEl.textContent = 'Slug bulunamadı.';
    return;
  }

  try {
    const res = await fetch(`/api/dreams/${encodeURIComponent(slug)}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (data && data.item) {
      renderItem(data.item, false);
      return;
    }
    throw new Error('Bad response');
  } catch (err) {
    const fallback = fallbackBySlug[slug];
    if (fallback) {
      renderItem(fallback, true);
    } else {
      stateEl.textContent = 'Rüya bulunamadı.';
    }
  }
}

async function countView() {
  if (!slug) return;
  const key = `viewed:${slug}`;
  if (sessionStorage.getItem(key)) return;
  sessionStorage.setItem(key, '1');
  try {
    const res = await fetch(`/api/dreams/${encodeURIComponent(slug)}/view`, { method: 'POST' });
    if (!res.ok) return;
    const data = await res.json();
    if (data && typeof data.views === 'number') {
      viewsEl.textContent = `${data.views} görüntülenme`;
    }
  } catch (err) {
    // ignore
  }
}

function loadVote() {
  if (!slug) return;
  const saved = localStorage.getItem(`vote:${slug}`);
  if (saved === 'like' || saved === 'dislike') {
    voted = saved;
    likeBtn.disabled = true;
    dislikeBtn.disabled = true;
  }
}

async function sendVote(vote) {
  if (!slug || voted) return;
  try {
    const res = await fetch(`/api/dreams/${encodeURIComponent(slug)}/vote`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ vote }),
    });
    if (!res.ok) return;
    voted = vote;
    localStorage.setItem(`vote:${slug}`, vote);
    likeBtn.disabled = true;
    dislikeBtn.disabled = true;
  } catch (err) {
    // ignore
  }
}

likeBtn.addEventListener('click', () => sendVote('like'));
dislikeBtn.addEventListener('click', () => sendVote('dislike'));

fetchItem();
countView();
loadVote();
