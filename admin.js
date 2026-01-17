const tokenInput = document.getElementById('token-input');
const saveBtn = document.getElementById('token-save');
const refreshBtn = document.getElementById('token-refresh');
const errorEl = document.getElementById('admin-error');
const sqlInput = document.getElementById('sql-input');
const sqlRun = document.getElementById('sql-run');
const sqlStatus = document.getElementById('sql-status');

const statDreams = document.getElementById('stat-dreams');
const statArticles = document.getElementById('stat-articles');
const statViews = document.getElementById('stat-views');
const tableBody = document.getElementById('dream-table');

const formatNumber = (value) => new Intl.NumberFormat('tr-TR').format(value || 0);

function setError(message) {
  if (!message) {
    errorEl.classList.add('hidden');
    errorEl.textContent = '';
  } else {
    errorEl.classList.remove('hidden');
    errorEl.textContent = message;
  }
}

function setSqlStatus(message) {
  if (!sqlStatus) return;
  sqlStatus.textContent = message || '';
}

function getToken() {
  return sessionStorage.getItem('adminToken') || '';
}

async function fetchJson(url, token) {
  let res;
  try {
    res = await fetch(url, { headers: { 'x-admin-token': token } });
  } catch (networkError) {
    console.error(`Network error when fetching ${url}:`, networkError);
    throw new Error('Network error: Sunucuya bağlanılamıyor. Backend çalışıyor mu?');
  }

  let data;
  try {
    data = await res.json().catch(() => ({}));
  } catch (parseError) {
    console.error(`JSON parse error when fetching ${url}:`, parseError);
    throw new Error('Response parse error: Sunucudan geçersiz yanıt alındı.');
  }

  if (!res.ok) {
    throw new Error(data?.error || `HTTP ${res.status}`);
  }
  return data;
}

async function loadAll() {
  const token = getToken();
  if (!token) {
    setError('ADMIN_TOKEN giriniz.');
    // Clear all stats when no token is provided
    statDreams.textContent = '-';
    statArticles.textContent = '-';
    statViews.textContent = '-';
    tableBody.innerHTML = '';
    return;
  }

  try {
    setError('');
    const summary = await fetchJson('/api/admin/summary', token);
    statDreams.textContent = formatNumber(summary.dreamCount);
    statArticles.textContent = formatNumber(summary.articleCount || 0);
    statViews.textContent = formatNumber(summary.totalViews);

    const dreams = await fetchJson('/api/admin/dreams?limit=200', token);
    tableBody.innerHTML = '';
    if (dreams.items && dreams.items.length > 0) {
      (dreams.items || []).forEach((item) => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${item.title}</td>
          <td>${item.category || '-'}</td>
          <td>${item.slug}</td>
          <td>${formatNumber(item.views)}</td>
        `;
        tableBody.appendChild(row);
      });
    } else {
      // Show a message when no dreams are found
      const row = document.createElement('tr');
      row.innerHTML = '<td colspan="4">Henüz rüya tabiri eklenmemiş.</td>';
      tableBody.appendChild(row);
    }
  } catch (err) {
    console.error('Admin panel error:', err); // Log error for debugging
    setError(err.message || 'Yükleme başarısız. Sunucuya bağlanılamıyor.');
    statDreams.textContent = '-';
    statArticles.textContent = '-';
    statViews.textContent = '-';
    tableBody.innerHTML = '';

    // Check if it's a network error vs auth error
    if (err.message.includes('401') || err.message.includes('Unauthorized')) {
      setError('Geçersiz ADMIN_TOKEN. Lütfen doğru token\'ı girin.');
    } else if (err.message.includes('500') || err.message.toLowerCase().includes('server') || err.message.toLowerCase().includes('network')) {
      setError('Sunucuya bağlanılamıyor. Backend yapılandırması eksik olabilir.');
    }
  }
}

async function runSql() {
  const token = getToken();
  if (!token) {
    setError('ADMIN_TOKEN giriniz.');
    return;
  }

  if (!sqlInput) return;
  const sql = sqlInput.value.trim();
  if (!sql) {
    setSqlStatus('SQL bos.');
    return;
  }

  setSqlStatus('Calistiriliyor...');
  try {
    const res = await fetch('/api/admin/sql', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-admin-token': token,
      },
      body: JSON.stringify({ sql }),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData?.detail || errorData?.error || `HTTP ${res.status}`);
    }

    const data = await res.json().catch(() => ({}));
    setSqlStatus(`OK (${data.executed || 0})`);
  } catch (err) {
    console.error('SQL execution error:', err);
    if (err.message.includes('401') || err.message.includes('Unauthorized')) {
      setError('Geçersiz ADMIN_TOKEN. Lütfen doğru token\'ı girin.');
      setSqlStatus('Yetkilendirme hatası');
    } else if (err.message.includes('500') || err.message.toLowerCase().includes('server') || err.message.toLowerCase().includes('network')) {
      setError('Sunucuya bağlanılamıyor. Backend yapılandırması eksik olabilir.');
      setSqlStatus('Bağlantı hatası');
    } else {
      setSqlStatus(err.message || 'SQL calistirilamadi.');
    }
  }
}

saveBtn.addEventListener('click', () => {
  const token = tokenInput.value.trim();
  sessionStorage.setItem('adminToken', token);
  loadAll();
});

refreshBtn.addEventListener('click', () => loadAll());
if (sqlRun) sqlRun.addEventListener('click', () => runSql());

// Initialize the page with helpful information
document.addEventListener('DOMContentLoaded', () => {
  const saved = getToken();
  if (saved) {
    tokenInput.value = saved;
    loadAll();
  } else {
    // Show helpful message when no token is initially set
    setError('Lütfen ADMIN_TOKEN\'ı girin ve "Kaydet" butonuna tıklayın.');
  }
});
