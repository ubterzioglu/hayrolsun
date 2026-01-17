const categories = [
  { label: 'Tümü', slug: '' },
  { label: 'Doğa', slug: 'doga' },
  { label: 'Hayvanlar', slug: 'hayvanlar' },
  { label: 'Vücut', slug: 'vucut' },
  { label: 'Hareket', slug: 'hareket' },
  { label: 'Hayat', slug: 'hayat' },
  { label: 'Maddi', slug: 'maddi' },
  { label: 'İslami', slug: 'islami' },
];

const fallbackDreams = [
  {
    id: 1,
    slug: 'ruyada-su-gormek',
    title: 'Rüyada Su Görmek',
    shortDesc:
      'Suyun durumu rüyanın anlamını belirler. Temiz su mutluluk, kirli su ise sorunları simgeler.',
    category: 'Doğa',
    popularity: 0,
  },
  {
    id: 2,
    slug: 'ruyada-ucmak',
    title: 'Rüyada Uçmak Görmek',
    shortDesc: 'Uçmak özgürlük ve hırslarınızı temsil eder. Yüksekten uçmak başarıyı gösterir.',
    category: 'Hareket',
    popularity: 0,
  },
  {
    id: 3,
    slug: 'ruyada-dis-dusmesi',
    title: 'Rüyada Diş Düşmesi Görmek',
    shortDesc:
      'Diş düşmesi kaygı, güvensizlik veya bir kaybı simgeler. Aile fertlerine dikkat edilmelidir.',
    category: 'Vücut',
    popularity: 0,
  },
];

const state = {
  searchTerm: '',
  selectedCategory: categories[0],
  items: [...fallbackDreams],
  loading: false,
  usingFallback: true,
};

const listEl = document.getElementById('dream-list');
const categoryEl = document.getElementById('category-list');
const statusEl = document.getElementById('result-status');
const searchInput = document.getElementById('search-input');

function formatViews(value) {
  if (value >= 1_000_000) return `${Math.round(value / 1_000_000)}M`;
  if (value >= 1_000) return `${Math.round(value / 1_000)}k`;
  return String(value ?? 0);
}

function renderCategories() {
  categoryEl.innerHTML = '';
  categories.forEach((cat) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = cat.label;
    if (cat.slug === state.selectedCategory.slug) btn.classList.add('active');
    btn.addEventListener('click', () => {
      state.selectedCategory = cat;
      renderCategories();
      loadDreams();
    });
    categoryEl.appendChild(btn);
  });
}

function filterItems() {
  const q = state.searchTerm.trim().toLowerCase();
  const selected = state.selectedCategory;
  return state.items.filter((dream) => {
    const title = (dream.title || '').toLowerCase();
    const desc = (dream.shortDesc || '').toLowerCase();
    const matchesQuery = q.length === 0 || title.includes(q) || desc.includes(q);
    const cat = dream.category || '';
    const matchesCategory =
      selected.slug === '' ||
      cat === selected.label ||
      cat === selected.slug ||
      cat.toLowerCase() === selected.label.toLowerCase() ||
      cat.toLowerCase() === selected.slug.toLowerCase();
    return matchesQuery && matchesCategory;
  });
}

function renderList() {
  const filtered = filterItems();
  listEl.innerHTML = '';
  statusEl.textContent = state.loading
    ? 'Yükleniyor...'
    : `${filtered.length} sonuç bulundu${state.usingFallback ? ' (demo)' : ''}`;

  if (filtered.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'muted';
    empty.textContent = 'Sonuç bulunamadı.';
    listEl.appendChild(empty);
    return;
  }

  filtered.forEach((dream) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <span class="pill">${dream.category || 'Genel'}</span>
      <h4>${dream.title}</h4>
      <p>${dream.shortDesc || ''}</p>
      <div class="muted">${formatViews(dream.popularity || 0)} görüntülenme</div>
      <a href="./dream.html?slug=${encodeURIComponent(dream.slug)}">Tabiri Oku</a>
    `;
    listEl.appendChild(card);
  });
}

let debounceTimer;
async function loadDreams() {
  if (state.loading) return;
  state.loading = true;
  renderList();

  const q = state.searchTerm.trim();
  const category = state.selectedCategory.slug;
  const params = new URLSearchParams();
  if (q) params.set('query', q);
  if (category) params.set('category', category);

  try {
    const res = await fetch(`/api/dreams?${params.toString()}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (Array.isArray(data.items)) {
      state.items = data.items;
      state.usingFallback = false;
    } else {
      throw new Error('Bad response');
    }
  } catch (err) {
    state.items = [...fallbackDreams];
    state.usingFallback = true;
  } finally {
    state.loading = false;
    renderList();
  }
}

searchInput.addEventListener('input', (event) => {
  state.searchTerm = event.target.value;
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => loadDreams(), 250);
});

renderCategories();
renderList();
loadDreams();
