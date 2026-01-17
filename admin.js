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
  const res = await fetch(url, { headers: { 'x-admin-token': token } });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data?.error || `HTTP ${res.status}`);
  }
  return data;
}

async function loadAll() {
  const token = getToken();
  if (!token) {
    setError('ADMIN_TOKEN giriniz.');
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
  } catch (err) {
    setError(err.message || 'Yükleme başarısız');
    statDreams.textContent = '-';
    statArticles.textContent = '-';
    statViews.textContent = '-';
    tableBody.innerHTML = '';
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
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(data?.detail || data?.error || `HTTP ${res.status}`);
    }
    setSqlStatus(`OK (${data.executed || 0})`);
  } catch (err) {
    setSqlStatus(err.message || 'SQL calistirilamadi.');
  }
}

saveBtn.addEventListener('click', () => {
  const token = tokenInput.value.trim();
  sessionStorage.setItem('adminToken', token);
  loadAll();
});

refreshBtn.addEventListener('click', () => loadAll());
if (sqlRun) sqlRun.addEventListener('click', () => runSql());

const saved = getToken();
if (saved) {
  tokenInput.value = saved;
  loadAll();
}
