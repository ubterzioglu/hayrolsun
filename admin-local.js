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

// Simulated API functions using localStorage instead of actual API calls
function fetchJson(url, token) {
  // Simulate API delay
  return new Promise((resolve) => {
    setTimeout(() => {
      if (url.includes('/api/admin/summary')) {
        resolve(getSummaryData());
      } else if (url.includes('/api/admin/dreams')) {
        resolve(getDreamsData());
      } else {
        resolve({});
      }
    }, 100);
  });
}

function getSummaryData() {
  const dreams = getAllDreams();
  const totalViews = dreams.reduce((sum, dream) => sum + (dream.views || 0), 0);

  return {
    dreamCount: dreams.length,
    articleCount: 0, // No articles in this simplified version
    totalViews: totalViews
  };
}

function getDreamsData() {
  const dreams = getAllDreams();
  return {
    items: dreams
  };
}

function loadAll() {
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

  // Validate token (in a real scenario, you'd have more sophisticated validation)
  if (token !== 'PPPlll!11321132') {
    setError('Geçersiz ADMIN_TOKEN. Lütfen doğru token\'ı girin.');
    statDreams.textContent = '-';
    statArticles.textContent = '-';
    statViews.textContent = '-';
    tableBody.innerHTML = '';
    return;
  }

  try {
    setError('');
    const summary = getSummaryData();
    statDreams.textContent = formatNumber(summary.dreamCount);
    statArticles.textContent = formatNumber(summary.articleCount || 0);
    statViews.textContent = formatNumber(summary.totalViews);

    const dreams = getDreamsData();
    tableBody.innerHTML = '';
    if (dreams.items && dreams.items.length > 0) {
      (dreams.items || []).forEach((item) => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${item.title || ''}</td>
          <td>${item.category || '-'}</td>
          <td>${item.slug || ''}</td>
          <td>${formatNumber(item.views || 0)}</td>
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
    setError(err.message || 'Yükleme başarısız. Tarayıcı veri depolama hatası.');
    statDreams.textContent = '-';
    statArticles.textContent = '-';
    statViews.textContent = '-';
    tableBody.innerHTML = '';
  }
}

function runSql() {
  const token = getToken();
  if (!token) {
    setError('ADMIN_TOKEN giriniz.');
    return;
  }

  if (token !== 'PPPlll!11321132') {
    setError('Geçersiz ADMIN_TOKEN. Lütfen doğru token\'ı girin.');
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
    // Parse simple SQL commands
    const upperSql = sql.toUpperCase().trim();

    if (upperSql.startsWith('SELECT')) {
      // Handle SELECT queries
      const dreams = getAllDreams();
      setSqlStatus(`SELECT OK - ${dreams.length} sonuç bulundu`);
    } else if (upperSql.startsWith('INSERT')) {
      // Handle INSERT commands
      // Extract values from INSERT statement
      const insertMatch = sql.match(/INSERT INTO (\w+)\s*\(([^)]+)\)\s*VALUES\s*\(([^)]+)\)/i);
      if (insertMatch) {
        const tableName = insertMatch[1];
        const columnsStr = insertMatch[2];
        const valuesStr = insertMatch[3];

        if (tableName === 'dreams') {
          // Parse columns and values
          const columns = columnsStr.split(',').map(col => col.trim().replace(/"/g, '').replace(/'/g, ''));
          const values = valuesStr.split(',').map(val => val.trim().replace(/^["']|["']$/g, ''));

          // Create dream object from parsed values
          const dream = {};
          columns.forEach((col, index) => {
            dream[col] = values[index];
          });

          // Set default values if not provided
          if (!dream.views) dream.views = 0;
          if (!dream.id) dream.id = Date.now(); // Generate ID if not provided

          const dreams = getAllDreams();
          dreams.push(dream);
          saveDreams(dreams);

          setSqlStatus('INSERT OK - Rüya tabiri eklendi');
        } else {
          throw new Error(`Tablo desteklenmiyor: ${tableName}`);
        }
      } else {
        throw new Error('INSERT komutu doğru formatta değil');
      }
    } else if (upperSql.startsWith('UPDATE')) {
      // Handle UPDATE commands
      setSqlStatus('UPDATE komutu bu sürümde desteklenmiyor');
    } else if (upperSql.startsWith('DELETE')) {
      // Handle DELETE commands
      setSqlStatus('DELETE komutu bu sürümde desteklenmiyor');
    } else {
      throw new Error('Bu SQL komutu desteklenmiyor. Sadece basit INSERT/SELECT desteklenir.');
    }
  } catch (err) {
    console.error('SQL execution error:', err);
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

// Initialize the page with helpful information
document.addEventListener('DOMContentLoaded', () => {
  const saved = getToken();
  if (saved) {
    tokenInput.value = saved;
    loadAll();
  } else {
    // Show helpful message when no token is initially set
    setError('Lütfen ADMIN_TOKEN\'ı girin ve "Kaydet" butonuna tıklayın. Token: PPPlll!11321132');
  }
});
