/* ============================================================
   Admin — reads and writes bin content on JSONBin.io.
   Credentials stored in localStorage (never sent elsewhere).
   ============================================================ */

const STORAGE_KEY = 'beit-yisrael-admin';
const JSONBIN_BASE = 'https://api.jsonbin.io/v3/b';

const EMBEDDED_BIN_ID = '6a967794f5f4af5e295b1fc6';
const EMBEDDED_MASTER_KEY = '$2a$10$vMqEEPROzx3Te6Whi1XDw.y5JlVhr/ybBqcS44IoSHuIM7d34sqbC';

let state = {
  binId: null,
  masterKey: null,
  data: null,
  version: null
};

function loadCreds() {
  try {
    const s = localStorage.getItem(STORAGE_KEY);
    if (s) return JSON.parse(s);
  } catch (e) {}
  return null;
}
function saveCreds(c) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(c));
}
function clearCreds() {
  localStorage.removeItem(STORAGE_KEY);
}

async function fetchBin(binId, masterKey) {
  const res = await fetch(`${JSONBIN_BASE}/${binId}/latest`, {
    headers: { 'X-Master-Key': masterKey }
  });
  if (!res.ok) throw new Error(`Failed to load: ${res.status}`);
  const body = await res.json();
  return { data: body.record, version: body.metadata?.versionId };
}

async function saveBin(binId, masterKey, data) {
  const res = await fetch(`${JSONBIN_BASE}/${binId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-Master-Key': masterKey
    },
    body: JSON.stringify(data)
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Save failed: ${res.status} — ${text}`);
  }
  return res.json();
}

function getPath(obj, path) {
  return path.split('.').reduce((a, k) => (a == null ? a : a[k]), obj);
}
function setPath(obj, path, value) {
  const keys = path.split('.');
  const last = keys.pop();
  let cur = obj;
  for (const k of keys) {
    if (cur[k] == null || typeof cur[k] !== 'object') cur[k] = {};
    cur = cur[k];
  }
  cur[last] = value;
}

function fillSimpleFields() {
  document.querySelectorAll('[data-path]').forEach(el => {
    const val = getPath(state.data, el.dataset.path);
    el.value = val == null ? '' : val;
    el.addEventListener('input', () => {
      setPath(state.data, el.dataset.path, el.value);
      markDirty();
    });
  });
}

function renderList(containerId, listPath, templateId) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';
  const items = getPath(state.data, listPath) || [];
  items.forEach((item, idx) => {
    const clone = document.getElementById(`tpl-${templateId}`).content.cloneNode(true);
    const itemEl = clone.querySelector('.list-item');
    itemEl.querySelector('.list-item__num').textContent = idx + 1;
    itemEl.querySelectorAll('[data-key]').forEach(input => {
      const key = input.dataset.key;
      input.value = item[key] != null ? item[key] : '';
      input.addEventListener('input', () => {
        item[key] = input.value;
        markDirty();
      });
    });
    itemEl.querySelector('[data-remove]').addEventListener('click', (e) => {
      e.preventDefault();
      if (!confirm('למחוק את הפריט?')) return;
      items.splice(idx, 1);
      renderList(containerId, listPath, templateId);
      markDirty();
    });
    itemEl.querySelector('[data-move="up"]').addEventListener('click', (e) => {
      e.preventDefault();
      if (idx === 0) return;
      [items[idx - 1], items[idx]] = [items[idx], items[idx - 1]];
      renderList(containerId, listPath, templateId);
      markDirty();
    });
    itemEl.querySelector('[data-move="down"]').addEventListener('click', (e) => {
      e.preventDefault();
      if (idx === items.length - 1) return;
      [items[idx + 1], items[idx]] = [items[idx], items[idx + 1]];
      renderList(containerId, listPath, templateId);
      markDirty();
    });
    container.appendChild(clone);
  });
}

function renderWeekdayTable() {
  const tbody = document.querySelector('#weekday-table tbody');
  tbody.innerHTML = '';
  const table = getPath(state.data, 'weekday.table') || [];
  const days = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי'];
  days.forEach((dayName, idx) => {
    const row = table[idx] || { day: dayName, mincha: '', maariv: '' };
    table[idx] = row;
    row.day = dayName;
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td class="day-name">${dayName}</td>
      <td><input type="text" data-day-idx="${idx}" data-field="mincha" value="${row.mincha || ''}"></td>
      <td><input type="text" data-day-idx="${idx}" data-field="maariv" value="${row.maariv || ''}"></td>
    `;
    tbody.appendChild(tr);
  });
  setPath(state.data, 'weekday.table', table);
  tbody.querySelectorAll('input').forEach(inp => {
    inp.addEventListener('input', () => {
      const idx = parseInt(inp.dataset.dayIdx);
      table[idx][inp.dataset.field] = inp.value;
      markDirty();
    });
  });
}

const LIST_CONFIG = [
  { container: 'shabbat-times-list', path: 'shabbat.times', template: 'shabbat-time', empty: { label: '', value: '', note: '' } },
  { container: 'shacharit-list', path: 'weekday.shacharit', template: 'shacharit', empty: { label: '', value: '' } },
  { container: 'torah-archive-list', path: 'torah.archive', template: 'torah-archive', empty: { title: '', parasha: '', url: '#' } },
  { container: 'qa-archive-list', path: 'qa.archive', template: 'qa-archive', empty: { date: '', question: '', answer: '', source: '' } },
  { container: 'classes-list', path: 'classes', template: 'class', empty: { title: '', teacher: '', where: '', when: '' } },
  { container: 'pillars-list', path: 'community.pillars', template: 'pillar', empty: { marker: '', name: '', desc: '' } },
  { container: 'gabbaim-list', path: 'contact.gabbaim', template: 'gabbai', empty: { name: '', phone: '', phone_display: '' } }
];

function renderAllLists() {
  LIST_CONFIG.forEach(c => renderList(c.container, c.path, c.template));
}

function renderAll() {
  fillSimpleFields();
  renderAllLists();
  renderWeekdayTable();
  setupDonationsEnabled();
}

document.querySelectorAll('[data-add]').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const listPath = btn.dataset.add;
    const templateName = btn.dataset.template;
    const cfg = LIST_CONFIG.find(c => c.path === listPath);
    if (!cfg) return;
    const items = getPath(state.data, listPath) || [];
    items.push({ ...cfg.empty });
    setPath(state.data, listPath, items);
    renderList(cfg.container, cfg.path, cfg.template);
    markDirty();
  });
});

let dirty = false;
function markDirty() {
  if (!dirty) {
    dirty = true;
    updateStatus('יש שינויים שלא נשמרו', '');
  }
}
function markClean() {
  dirty = false;
  updateStatus('כל השינויים נשמרו', 'success');
}

function updateStatus(text, kind) {
  const el = document.getElementById('save-status');
  el.textContent = text;
  el.classList.remove('status--success', 'status--error');
  if (kind === 'success') el.classList.add('status--success');
  if (kind === 'error') el.classList.add('status--error');
}

window.addEventListener('beforeunload', (e) => {
  if (dirty) {
    e.preventDefault();
    e.returnValue = '';
  }
});

document.getElementById('btn-save').addEventListener('click', async () => {
  const btn = document.getElementById('btn-save');
  btn.disabled = true;
  updateStatus('שומר...', '');
  try {
    const now = new Date();
    const dd = String(now.getDate()).padStart(2, '0');
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const yyyy = now.getFullYear();
    state.data._updated_display = `${dd}.${mm}.${yyyy}`;
    const dateField = document.querySelector('[data-path="_updated_display"]');
    if (dateField) dateField.value = state.data._updated_display;
    await saveBin(state.binId, state.masterKey, state.data);
    markClean();
  } catch (e) {
    console.error(e);
    updateStatus('שגיאה בשמירה: ' + e.message, 'error');
  } finally {
    btn.disabled = false;
  }
});

document.getElementById('btn-reload').addEventListener('click', async () => {
  if (dirty && !confirm('יש שינויים שלא נשמרו. לזרוק אותם?')) return;
  await loadAndRender();
});

document.getElementById('btn-logout').addEventListener('click', () => {
  if (dirty && !confirm('יש שינויים שלא נשמרו. להתנתק בכל זאת?')) return;
  clearCreds();
  setSessionUnlocked(false);
  location.reload();
});

document.getElementById('btn-connect').addEventListener('click', async () => {
  const binId = document.getElementById('bin-id').value.trim();
  const masterKey = document.getElementById('master-key').value.trim();
  if (!binId || !masterKey) {
    alert('נא להזין Bin ID ו־Master Key.');
    return;
  }
  try {
    const { data, version } = await fetchBin(binId, masterKey);
    state.binId = binId;
    state.masterKey = masterKey;
    state.data = data;
    state.version = version;
    saveCreds({ binId, masterKey });
    showEditor();
  } catch (e) {
    alert('התחברות נכשלה: ' + e.message);
  }
});

function showSetup() {
  document.getElementById('setup').classList.remove('hidden');
  document.getElementById('loading').classList.add('hidden');
  document.getElementById('editor').classList.add('hidden');
  document.getElementById('save-bar').classList.add('hidden');
  document.getElementById('connection-badge').classList.add('hidden');
}

function showEditor() {
  document.getElementById('setup').classList.add('hidden');
  document.getElementById('loading').classList.add('hidden');
  document.getElementById('editor').classList.remove('hidden');
  document.getElementById('save-bar').classList.remove('hidden');
  document.getElementById('connection-badge').classList.remove('hidden');
  renderAll();
  markClean();
}

async function loadAndRender() {
  document.getElementById('loading').classList.remove('hidden');
  document.getElementById('editor').classList.add('hidden');
  document.getElementById('save-bar').classList.add('hidden');
  try {
    const { data, version } = await fetchBin(state.binId, state.masterKey);
    state.data = data;
    state.version = version;
    showEditor();
  } catch (e) {
    console.error(e);
    alert('טעינה נכשלה: ' + e.message + '\n\nייתכן שהמפתחות כבר לא בתוקף. יש להתנתק ולהתחבר מחדש.');
    showSetup();
  }
}

const HEBCAL_URL = 'https://www.hebcal.com/shabbat?cfg=json&geonameid=293918&b=30&M=on&lg=he&i=on';

async function pullFromHebcal() {
  const status = document.getElementById('hebcal-status');
  const btn = document.getElementById('btn-hebcal');
  if (status) status.textContent = 'מושך...';
  if (btn) btn.disabled = true;
  try {
    const res = await fetch(HEBCAL_URL, { cache: 'no-store' });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const heb = await res.json();
    const items = heb.items || [];
    const parashaItem = items.find(i => i.category === 'parashat');
    if (parashaItem) {
      let name = parashaItem.hebrew || parashaItem.title || '';
      name = name.replace(/^פרשת\s+/, '').replace(/^פָּרָשַׁת\s+/, '');
      if (!state.data.shabbat) state.data.shabbat = {};
      state.data.shabbat.parasha = name;
    }
    if (!state.data.shabbat) state.data.shabbat = {};
    if (!Array.isArray(state.data.shabbat.times)) state.data.shabbat.times = [];
    const candles = items.find(i => i.category === 'candles');
    if (candles && candles.date) {
      const timeStr = candles.date.slice(11, 16);
      let entry = state.data.shabbat.times.find(t =>
        t.label && (t.label.includes('הדלקת נרות') || t.label.includes('הדלקת'))
      );
      if (entry) {
        entry.value = timeStr;
        entry.note = 'מ־Hebcal · 30 דק׳ לפני שקיעה · פתח תקווה';
      } else {
        state.data.shabbat.times.unshift({
          label: 'הדלקת נרות',
          value: timeStr,
          note: 'מ־Hebcal · 30 דק׳ לפני שקיעה · פתח תקווה'
        });
      }
    }
    const havdalah = items.find(i => i.category === 'havdalah');
    if (havdalah && havdalah.date) {
      const timeStr = havdalah.date.slice(11, 16);
      let entry = state.data.shabbat.times.find(t =>
        t.label && (t.label.includes('הבדלה') || t.label.includes('ערבית והבדלה'))
      );
      if (entry) {
        entry.value = timeStr;
      } else {
        state.data.shabbat.times.push({ label: 'ערבית והבדלה', value: timeStr, note: '' });
      }
    }
    const now = new Date();
    const gy = now.getFullYear();
    const gm = now.getMonth() + 1;
    const gd = now.getDate();
    const convRes = await fetch(`https://www.hebcal.com/converter?cfg=json&g2h=1&gy=${gy}&gm=${gm}&gd=${gd}`, { cache: 'no-store' });
    if (convRes.ok) {
      const conv = await convRes.json();
      if (!state.data.date) state.data.date = {};
      if (conv.hebrew) {
        state.data.date.hebrew = conv.hebrew.replace(/[\u0591-\u05C7]/g, '');
      }
      const monthsHe = ['ינואר','פברואר','מרץ','אפריל','מאי','יוני','יולי','אוגוסט','ספטמבר','אוקטובר','נובמבר','דצמבר'];
      state.data.date.gregorian = `${gd} ב${monthsHe[gm - 1]} ${gy}`;
    }
    renderAll();
    markDirty();
    if (status) status.textContent = 'עודכן בהצלחה ✓';
  } catch (e) {
    console.error(e);
    if (status) status.textContent = 'שגיאה: ' + e.message;
    alert('משיכה מ־Hebcal נכשלה: ' + e.message);
  } finally {
    if (btn) btn.disabled = false;
  }
}

document.getElementById('btn-hebcal')?.addEventListener('click', pullFromHebcal);

function setupDonationsEnabled() {
  const cb = document.getElementById('donations-enabled');
  if (!cb) return;
  if (!state.data.donations) state.data.donations = {};
  cb.checked = !!state.data.donations.enabled;
  cb.onchange = () => {
    state.data.donations.enabled = cb.checked;
    markDirty();
  };
}

// ===== Admin password gate =====
// Password hash is stored in JSON: _admin.password_hash (JSONBin / data.json)
const DEFAULT_PW_HASH = '7dd1df78e3a748c6f5f1c38e5b5b33785b0668e75eff595bb4e1f46a4339aebf'; // beitisrael
const SESSION_KEY = 'beit-yisrael-admin-session';
let globalPwHash = null;

async function sha256(text) {
  const data = new TextEncoder().encode(text);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
}

async function loadPwHashFromData() {
  try {
    const res = await fetch(JSONBIN_BASE + '/' + EMBEDDED_BIN_ID + '/latest', {
      headers: { 'X-Master-Key': EMBEDDED_MASTER_KEY },
      cache: 'no-store'
    });
    if (res.ok) {
      const body = await res.json();
      const rec = body.record || body;
      const h = rec && rec._admin && rec._admin.password_hash;
      if (h && String(h).trim()) return String(h).trim();
    }
  } catch (e) {
    console.warn('Could not load password from JSONBin:', e);
  }
  try {
    const res = await fetch('data.json', { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      const h = data && data._admin && data._admin.password_hash;
      if (h && String(h).trim()) return String(h).trim();
    }
  } catch (e) {
    console.warn('Could not load password from data.json:', e);
  }
  return DEFAULT_PW_HASH;
}

async function getStoredPwHash() {
  if (globalPwHash === null) globalPwHash = await loadPwHashFromData();
  return globalPwHash;
}

function setStoredPwHash(hash) {
  globalPwHash = hash;
  if (state.data) {
    state.data._admin = state.data._admin || {};
    state.data._admin.password_hash = hash;
    state.data._admin._comment = 'סיסמה מוצפנת (SHA-256) — שנה דרך לוח הניהול';
  }
}

function isSessionUnlocked() {
  try { return sessionStorage.getItem(SESSION_KEY) === '1'; } catch (e) { return false; }
}
function setSessionUnlocked(on) {
  try {
    if (on) sessionStorage.setItem(SESSION_KEY, '1');
    else sessionStorage.removeItem(SESSION_KEY);
  } catch (e) {}
}

function showLoginGate(isSetup) {
  document.getElementById('login-gate').classList.remove('hidden');
  document.getElementById('admin-main')?.classList.add('hidden');
  document.getElementById('save-bar')?.classList.add('hidden');
  document.getElementById('loading')?.classList.add('hidden');
  const title = document.getElementById('login-title');
  const hint = document.getElementById('login-hint');
  const wrap2 = document.getElementById('login-password2-wrap');
  if (isSetup) {
    title.textContent = 'הגדרת סיסמת ניהול';
    hint.textContent = 'בחרו סיסמה לניהול האתר (לפחות 4 תווים).';
    wrap2.classList.remove('hidden');
    document.getElementById('btn-login').textContent = 'שמור סיסמה והמשך';
  } else {
    title.textContent = 'כניסה לניהול';
    hint.textContent = 'הזינו את סיסמת הניהול כדי לערוך את תוכן האתר.';
    wrap2.classList.add('hidden');
    document.getElementById('btn-login').textContent = 'כניסה';
  }
  document.getElementById('login-password').value = '';
  document.getElementById('login-password2').value = '';
  document.getElementById('login-error').textContent = '';
  setTimeout(() => document.getElementById('login-password').focus(), 100);
}

function hideLoginGate() {
  document.getElementById('login-gate').classList.add('hidden');
  document.getElementById('admin-main')?.classList.remove('hidden');
}

async function handleLogin() {
  const err = document.getElementById('login-error');
  err.textContent = '';
  err.style.color = '';
  const pw = document.getElementById('login-password').value;
  const pw2 = document.getElementById('login-password2').value;
  const stored = await getStoredPwHash();

  if (!stored) {
    if (!pw || pw.length < 4) {
      err.textContent = 'הסיסמה חייבת להכיל לפחות 4 תווים.';
      return;
    }
    if (pw !== pw2) {
      err.textContent = 'הסיסמאות אינן תואמות.';
      return;
    }
    const newHash = await sha256(pw);
    setStoredPwHash(newHash);
    err.textContent = '✓ סיסמה הוגדרה בהצלחה';
    err.style.color = '#2d6a4f';
    setSessionUnlocked(true);
    setTimeout(() => {
      hideLoginGate();
      continueBootAfterAuth();
    }, 600);
    return;
  }

  if (!pw) {
    err.textContent = 'נא להזין סיסמה.';
    return;
  }
  const hash = await sha256(pw);
  if (hash !== stored) {
    err.textContent = 'סיסמה שגויה.';
    return;
  }
  setSessionUnlocked(true);
  hideLoginGate();
  continueBootAfterAuth();
}

document.getElementById('btn-login')?.addEventListener('click', handleLogin);
document.getElementById('login-password')?.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') handleLogin();
});
document.getElementById('login-password2')?.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') handleLogin();
});

document.getElementById('btn-change-pw')?.addEventListener('click', async () => {
  const status = document.getElementById('pw-status');
  status.textContent = '';
  const cur = document.getElementById('pw-current').value;
  const nw = document.getElementById('pw-new').value;
  const nw2 = document.getElementById('pw-new2').value;
  const stored = await getStoredPwHash();
  if (!stored) {
    status.textContent = 'אין סיסמה מוגדרת.';
    return;
  }
  if ((await sha256(cur)) !== stored) {
    status.textContent = 'הסיסמה הנוכחית שגויה.';
    status.style.color = 'var(--danger)';
    return;
  }
  if (!nw || nw.length < 4) {
    status.textContent = 'הסיסמה החדשה חייבת להכיל לפחות 4 תווים.';
    status.style.color = 'var(--danger)';
    return;
  }
  if (nw !== nw2) {
    status.textContent = 'הסיסמאות החדשות אינן תואמות.';
    status.style.color = 'var(--danger)';
    return;
  }
  const newHash = await sha256(nw);
  setStoredPwHash(newHash);
  document.getElementById('pw-current').value = '';
  document.getElementById('pw-new').value = '';
  document.getElementById('pw-new2').value = '';
  status.textContent = '✓ הסיסמה עודכנה. לחצו "שמור" כדי לשמור לשרת.';
  status.style.color = 'var(--success)';
  if (typeof markDirty === 'function') markDirty();
});

let continueBootAfterAuth = () => {};

async function runAdminBoot() {
  const binInput = document.getElementById('bin-id');
  const keyInput = document.getElementById('master-key');
  if (binInput) binInput.value = EMBEDDED_BIN_ID;
  if (keyInput) keyInput.value = EMBEDDED_MASTER_KEY;

  const creds = loadCreds();
  if (creds) {
    state.binId = creds.binId;
    state.masterKey = creds.masterKey;
    await loadAndRender();
    return;
  }

  if (EMBEDDED_BIN_ID && EMBEDDED_MASTER_KEY) {
    try {
      const { data, version } = await fetchBin(EMBEDDED_BIN_ID, EMBEDDED_MASTER_KEY);
      state.binId = EMBEDDED_BIN_ID;
      state.masterKey = EMBEDDED_MASTER_KEY;
      state.data = data;
      if (!state.data.donations) {
        state.data.donations = {
          enabled: false,
          title: 'תרומות לבית הכנסת.',
          subtitle: '',
          bank_name: '', branch: '', account: '', account_name: '',
          iban: '', bit_phone: '', paybox: '', note: ''
        };
      }
      state.version = version;
      saveCreds({ binId: EMBEDDED_BIN_ID, masterKey: EMBEDDED_MASTER_KEY });
      showEditor();
      return;
    } catch (e) {
      console.warn('Embedded credentials failed, showing setup form', e);
    }
  }

  showSetup();
}

(async function boot() {
  continueBootAfterAuth = runAdminBoot;
  // Always require password on every full page load (do not auto-enter from session)
  try { sessionStorage.removeItem(SESSION_KEY); } catch (e) {}
  document.getElementById('admin-main')?.classList.add('hidden');
  document.getElementById('save-bar')?.classList.add('hidden');
  document.getElementById('login-gate')?.classList.remove('hidden');
  const stored = await getStoredPwHash();
  showLoginGate(!stored);
})();
