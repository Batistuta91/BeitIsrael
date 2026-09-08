const DATA_URL = 'https://api.jsonbin.io/v3/b/6a967794f5f4af5e295b1fc6/latest';
const HEBCAL_URL = 'https://www.hebcal.com/shabbat?cfg=json&geonameid=293918&b=30&M=on&lg=he&i=on';

const I18N = {
  he: {
    dir: 'rtl', lang: 'he',
    nav_shabbat: 'שבת', nav_times: 'זמני תפילה', nav_torah: 'תורה', nav_qa: 'שאלות',
    nav_classes: 'שיעורים', nav_community: 'קהילה', nav_visit: 'בואו אלינו', nav_donate: 'תרומות',
    lang_label: 'שפה', logo_alt: 'לוגו בית כנסת בית ישראל',
    hero_prefix: 'בית כנסת', hero_cta: 'זמני שבת הקרובה', content_note: '',
    parasha_label: 'שבת פרשת', shabbat_times_heading: 'זמני תפילות בשבת',
    weekday_eyebrow: 'ימי חול', col_shacharit: 'שחרית', col_mincha: 'מנחה', col_maariv: 'מעריב', mincha_maariv_heading: 'מנחה ומעריב',
    torah_eyebrow: 'תורת השבוע', torah_archive: 'ארכיון דברי תורה',
    qa_eyebrow: 'הלכה ופסיקה', qa_archive: 'שאלות קודמות',
    classes_eyebrow: 'לוח שיעורים', community_eyebrow: 'קהילה',
    visit_eyebrow: 'בואו אלינו', directions_label: 'איך מגיעים', map_link: 'מפה בגוגל ←',
    gabbaim_label: 'גבאים', email_label: 'דוא״ל',
    donate_eyebrow: 'תרומות', bank_transfer: 'העברה בנקאית', bank: 'בנק', branch: 'סניף',
    account: 'מספר חשבון', account_name: 'שם החשבון', bit_paybox: 'ביט / פייבוקס',
    bit_phone: 'טלפון לביט', paybox: 'פייבוקס',
    last_updated: 'עדכון אחרון', admin_link: 'ניהול',
    open_menu: 'פתח תפריט', close_menu: 'סגור תפריט', menu: 'תפריט',
    page_title: 'בית כנסת בית ישראל — זמני תפילות בשבת',
    page_description: 'בית תפילה קהילתי — תפילות שחרית, מנחה ומעריב בכל יום, שיעורי תורה, ובית פתוח לכל יהודי.',
    aria_main: 'ראשי', aria_mobile: 'תפריט נייד', aria_language: 'שפה', aria_menu_dialog: 'תפריט',
    skip_link: 'דלגו לתוכן הראשי'
  },
  en: {
    dir: 'ltr', lang: 'en',
    nav_shabbat: 'Shabbat', nav_times: 'Prayer times', nav_torah: 'Torah', nav_qa: 'Q&A',
    nav_classes: 'Classes', nav_community: 'Community', nav_visit: 'Visit us', nav_donate: 'Donate',
    lang_label: 'Language', logo_alt: 'Beit Israel Synagogue logo',
    hero_prefix: 'Synagogue', hero_cta: "This week's Shabbat times",
    content_note: 'Community content (times, Torah, notices) is published in Hebrew.',
    parasha_label: 'Shabbat Parashat', shabbat_times_heading: 'Shabbat prayer times',
    weekday_eyebrow: 'Weekdays', col_shacharit: 'Shacharit', col_mincha: 'Mincha', col_maariv: 'Maariv', mincha_maariv_heading: 'Mincha & Maariv',
    torah_eyebrow: 'Weekly Torah', torah_archive: 'Torah archive',
    qa_eyebrow: 'Halacha', qa_archive: 'Previous questions',
    classes_eyebrow: 'Classes', community_eyebrow: 'Community',
    visit_eyebrow: 'Visit us', directions_label: 'How to get here', map_link: 'Google Maps →',
    gabbaim_label: 'Gabbaim', email_label: 'Email',
    donate_eyebrow: 'Donations', bank_transfer: 'Bank transfer', bank: 'Bank', branch: 'Branch',
    account: 'Account', account_name: 'Account name', bit_paybox: 'Bit / PayBox',
    bit_phone: 'Bit phone', paybox: 'PayBox',
    last_updated: 'Last updated', admin_link: 'Admin',
    open_menu: 'Open menu', close_menu: 'Close menu', menu: 'Menu',
    page_title: 'Beit Israel Synagogue — Shabbat Prayer Times',
    page_description: "A community house of prayer — Shacharit, Mincha and Maariv every day, Torah classes, and a house open to every Jew.",
    aria_main: 'Main', aria_mobile: 'Mobile', aria_language: 'Language', aria_menu_dialog: 'Menu',
    skip_link: 'Skip to main content'
  },
  ru: {
    dir: 'ltr', lang: 'ru',
    nav_shabbat: 'Шаббат', nav_times: 'Время молитв', nav_torah: 'Тора', nav_qa: 'Вопросы',
    nav_classes: 'Уроки', nav_community: 'Община', nav_visit: 'Как добраться', nav_donate: 'Пожертвования',
    lang_label: 'Язык', logo_alt: 'Логотип синагоги Бейт Исраэль',
    hero_prefix: 'Синагога', hero_cta: 'Время Шаббата на этой неделе',
    content_note: 'Содержание общины (время, Тора, объявления) публикуется на иврите.',
    parasha_label: 'Шаббат парашат', shabbat_times_heading: 'Время молитв в Шаббат',
    weekday_eyebrow: 'Будни', col_shacharit: 'Шахарит', col_mincha: 'Минха', col_maariv: 'Маарив', mincha_maariv_heading: 'Минха и Маарив',
    torah_eyebrow: 'Тора недели', torah_archive: 'Архив Торы',
    qa_eyebrow: 'Алаха', qa_archive: 'Предыдущие вопросы',
    classes_eyebrow: 'Уроки', community_eyebrow: 'Община',
    visit_eyebrow: 'Как добраться', directions_label: 'Проезд', map_link: 'Карта Google →',
    gabbaim_label: 'Габбаим', email_label: 'Эл. почта',
    donate_eyebrow: 'Пожертвования', bank_transfer: 'Банковский перевод', bank: 'Банк', branch: 'Отделение',
    account: 'Счёт', account_name: 'Имя счёта', bit_paybox: 'Bit / PayBox',
    bit_phone: 'Телефон Bit', paybox: 'PayBox',
    last_updated: 'Обновлено', admin_link: 'Админ',
    open_menu: 'Открыть меню', close_menu: 'Закрыть меню', menu: 'Меню',
    page_title: 'Синагога Бейт Исраэль — время молитв в Шаббат',
    page_description: 'Общинный дом молитвы — Шахарит, Минха и Маарив каждый день, уроки Торы, дом открыт для каждого еврея.',
    aria_main: 'Основное', aria_mobile: 'Мобильное меню', aria_language: 'Язык', aria_menu_dialog: 'Меню',
    skip_link: 'Перейти к основному содержимому'
  },
  am: {
    dir: 'ltr', lang: 'am',
    nav_shabbat: 'ሳባት', nav_times: 'የጸሎት ጊዜ', nav_torah: 'ቶራ', nav_qa: 'ጥያቄዎች',
    nav_classes: 'ትምህርቶች', nav_community: 'ማህበረሰብ', nav_visit: 'ይጎብኙን', nav_donate: 'ልገሳ',
    lang_label: 'ቋንቋ', logo_alt: 'የቤተ እስራኤል ምልክት',
    hero_prefix: 'ሲናጎግ', hero_cta: 'የዚህ ሳምንት የሳባት ጊዜ',
    content_note: 'የማህበረሰብ ይዘት (ጊዜ፣ ቶራ፣ ማስታወቂያ) በዕብራይስጥ ይታተማል።',
    parasha_label: 'ሳባት ፓራሻት', shabbat_times_heading: 'የሳባት የጸሎት ጊዜ',
    weekday_eyebrow: 'የሳምንት ቀናት', col_shacharit: 'ሻካሪት', col_mincha: 'ሚንቻ', col_maariv: 'ማዓሪቭ', mincha_maariv_heading: 'ሚንቻ እና ማዓሪቭ',
    torah_eyebrow: 'የሳምንቱ ቶራ', torah_archive: 'የቶራ ማህደር',
    qa_eyebrow: 'ሃላካ', qa_archive: 'ቀደምት ጥያቄዎች',
    classes_eyebrow: 'ትምህርቶች', community_eyebrow: 'ማህበረሰብ',
    visit_eyebrow: 'ይጎብኙን', directions_label: 'እንዴት መድረስ', map_link: 'ጎግል ካርታ →',
    gabbaim_label: 'ጋባይም', email_label: 'ኢሜይል',
    donate_eyebrow: 'ልገሳ', bank_transfer: 'የባንክ ዝውውር', bank: 'ባንክ', branch: 'ቅርንጫፍ',
    account: 'መለያ', account_name: 'የመለያ ስም', bit_paybox: 'Bit / PayBox',
    bit_phone: 'Bit ስልክ', paybox: 'PayBox',
    last_updated: 'መጨረሻ የተዘመነ', admin_link: 'አስተዳደር',
    open_menu: 'ምናሌ ክፈት', close_menu: 'ምናሌ ዝጋ', menu: 'ምናሌ',
    page_title: 'የቤተ እስራኤል ምኩራብ — የሳባት የጸሎት ሰዓቶች',
    page_description: 'የማህበረሰብ የጸሎት ቤት — በየቀኑ ሻካሪት፣ ሚንቻ እና ማዓሪቭ፣ የቶራ ትምህርቶች፣ ለማንኛውም አይሁዳዊ ክፍት ቤት።',
    aria_main: 'ዋና', aria_mobile: 'የሞባይል ምናሌ', aria_language: 'ቋንቋ', aria_menu_dialog: 'ምናሌ',
    skip_link: 'ወደ ዋናው ይዘት ዝለል'
  },
  fr: {
    dir: 'ltr', lang: 'fr',
    nav_shabbat: 'Chabbat', nav_times: 'Horaires', nav_torah: 'Torah', nav_qa: 'Questions',
    nav_classes: 'Cours', nav_community: 'Communauté', nav_visit: 'Nous rendre visite', nav_donate: 'Dons',
    lang_label: 'Langue', logo_alt: 'Logo de la synagogue Beit Israel',
    hero_prefix: 'Synagogue', hero_cta: 'Horaires du Chabbat',
    content_note: 'Le contenu communautaire (horaires, Torah, annonces) est publié en hébreu.',
    parasha_label: 'Chabbat Parachat', shabbat_times_heading: 'Horaires de prière du Chabbat',
    weekday_eyebrow: 'Jours de semaine', col_shacharit: 'Chaharit', col_mincha: 'Minha', col_maariv: 'Arvit', mincha_maariv_heading: 'Minha et Arvit',
    torah_eyebrow: 'Torah de la semaine', torah_archive: 'Archives Torah',
    qa_eyebrow: 'Halakha', qa_archive: 'Questions précédentes',
    classes_eyebrow: 'Cours', community_eyebrow: 'Communauté',
    visit_eyebrow: 'Nous rendre visite', directions_label: 'Comment venir', map_link: 'Google Maps →',
    gabbaim_label: 'Gabbaim', email_label: 'E-mail',
    donate_eyebrow: 'Dons', bank_transfer: 'Virement bancaire', bank: 'Banque', branch: 'Agence',
    account: 'Compte', account_name: 'Nom du compte', bit_paybox: 'Bit / PayBox',
    bit_phone: 'Téléphone Bit', paybox: 'PayBox',
    last_updated: 'Dernière mise à jour', admin_link: 'Admin',
    open_menu: 'Ouvrir le menu', close_menu: 'Fermer le menu', menu: 'Menu',
    page_title: 'Synagogue Beit Israël — Horaires de Chabbat',
    page_description: "Une maison de prière communautaire — Chaharit, Minha et Arvit chaque jour, cours de Torah, une maison ouverte à tout Juif.",
    aria_main: 'Principal', aria_mobile: 'Menu mobile', aria_language: 'Langue', aria_menu_dialog: 'Menu',
    skip_link: 'Aller au contenu principal'
  }
};

let currentLang = 'he';

function t(key) {
  const pack = I18N[currentLang] || I18N.he;
  return pack[key] != null ? pack[key] : (I18N.he[key] || key);
}

function applyI18n() {
  const pack = I18N[currentLang] || I18N.he;
  document.documentElement.lang = pack.lang;
  document.documentElement.dir = pack.dir;
  document.body.classList.toggle('ltr', pack.dir === 'ltr');
  document.body.classList.remove('lang-he', 'lang-en', 'lang-ru', 'lang-am', 'lang-fr');
  document.body.classList.add('lang-' + currentLang);

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (pack[key] != null) el.textContent = pack[key];
  });
  document.querySelectorAll('[data-i18n-alt]').forEach(el => {
    const key = el.getAttribute('data-i18n-alt');
    if (pack[key] != null) el.setAttribute('alt', pack[key]);
  });

  const openBtn = document.getElementById('menu-open');
  const closeBtn = document.getElementById('menu-close');
  if (openBtn) openBtn.setAttribute('aria-label', t('open_menu'));
  if (closeBtn) closeBtn.setAttribute('aria-label', t('close_menu'));

  document.title = t('page_title');
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute('content', t('page_description'));
  const topNav = document.querySelector('.topbar__nav');
  if (topNav) topNav.setAttribute('aria-label', t('aria_main'));
  const drawerNav = document.querySelector('.drawer__nav');
  if (drawerNav) drawerNav.setAttribute('aria-label', t('aria_mobile'));
  const sideDrawer = document.getElementById('side-drawer');
  if (sideDrawer) sideDrawer.setAttribute('aria-label', t('aria_menu_dialog'));
  document.querySelectorAll('.lang-select, #lang-select-top, #lang-select-drawer').forEach(el => {
    el.setAttribute('aria-label', t('aria_language'));
  });

  const top = document.getElementById('lang-select-top');
  const drawerSel = document.getElementById('lang-select-drawer');
  if (top) top.value = currentLang;
  if (drawerSel) drawerSel.value = currentLang;

  try { localStorage.setItem('beit-israel-lang', currentLang); } catch (e) {}
}

function setLanguage(lang) {
  if (!I18N[lang]) lang = 'he';
  currentLang = lang;
  applyI18n();
}

const drawer = document.getElementById('side-drawer');
const overlay = document.getElementById('drawer-overlay');
const menuOpen = document.getElementById('menu-open');
const menuClose = document.getElementById('menu-close');

function openMenu() {
  drawer.hidden = false;
  overlay.hidden = false;
  drawer.offsetHeight;
  drawer.classList.add('is-open');
  overlay.classList.add('is-open');
  document.body.classList.add('menu-open');
  menuOpen.setAttribute('aria-expanded', 'true');
  menuClose.focus();
}

function closeMenu() {
  drawer.classList.remove('is-open');
  overlay.classList.remove('is-open');
  document.body.classList.remove('menu-open');
  menuOpen.setAttribute('aria-expanded', 'false');
  setTimeout(() => {
    if (!drawer.classList.contains('is-open')) {
      drawer.hidden = true;
      overlay.hidden = true;
    }
  }, 280);
  menuOpen.focus();
}

if (menuOpen) menuOpen.addEventListener('click', openMenu);
if (menuClose) menuClose.addEventListener('click', closeMenu);
if (overlay) overlay.addEventListener('click', closeMenu);
if (drawer) {
  drawer.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', () => closeMenu());
  });
}
const drawerBrand = document.getElementById('drawer-brand');
if (drawerBrand) drawerBrand.addEventListener('click', () => closeMenu());
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && drawer && drawer.classList.contains('is-open')) closeMenu();
});

const langTop = document.getElementById('lang-select-top');
const langDrawer = document.getElementById('lang-select-drawer');
if (langTop) langTop.addEventListener('change', e => setLanguage(e.target.value));
if (langDrawer) langDrawer.addEventListener('change', e => {
  setLanguage(e.target.value);
  closeMenu();
});

(function initLang() {
  let saved = null;
  try { saved = localStorage.getItem('beit-israel-lang'); } catch (e) {}
  if (saved && I18N[saved]) { setLanguage(saved); return; }
  const nav = (navigator.language || 'he').toLowerCase();
  if (nav.startsWith('ru')) setLanguage('ru');
  else if (nav.startsWith('am')) setLanguage('am');
  else if (nav.startsWith('fr')) setLanguage('fr');
  else if (nav.startsWith('en')) setLanguage('en');
  else setLanguage('he');
})();

function resolvePath(obj, path) {
  return path.split('.').reduce((acc, key) => (acc == null ? acc : acc[key]), obj);
}

function bindElement(el, data) {
  const ifPath = el.dataset.if;
  if (ifPath) {
    const val = resolvePath(data, ifPath);
    if (val == null || val === '' || val === false) {
      el.style.display = 'none';
      return;
    } else {
      el.style.display = '';
    }
  }
  const bindPath = el.dataset.bind;
  if (bindPath) {
    const val = resolvePath(data, bindPath);
    if (val != null) el.textContent = val;
  }
  for (const [key, val] of Object.entries(el.dataset)) {
    if (!key.startsWith('attrHref') && !key.startsWith('attr')) continue;
    if (key === 'attrHref') {
      const v = resolvePath(data, val);
      if (v) el.setAttribute('href', v);
    } else if (key === 'attrHrefTel') {
      const v = resolvePath(data, val);
      if (v) el.setAttribute('href', 'tel:' + v.replace(/[-\s]/g, ''));
    } else if (key === 'attrHrefMailto') {
      const v = resolvePath(data, val);
      if (v) el.setAttribute('href', 'mailto:' + v);
    } else if (key === 'attrTarget') {
      el.setAttribute('target', val);
    }
  }
}

function isHaftaraItem(item) {
  if (!item) return false;
  if (item.is_haftara) return true;
  const label = (item.label || '').toString();
  return label.includes('הפטרה') || label.toLowerCase().includes('haftar');
}

function renderList(containerEl, templateId, items) {
  const tpl = document.getElementById(templateId);
  if (!tpl || !Array.isArray(items)) return;
  containerEl.innerHTML = '';
  items.forEach(item => {
    const row = Object.assign({}, item);
    if (isHaftaraItem(row)) {
      row.is_haftara = true;
      if ((!row.value || !String(row.value).trim()) && row.note && String(row.note).trim()) {
        row.value = String(row.note).trim();
        row.note = '';
      }
    }

    const clone = tpl.content.cloneNode(true);
    const root = clone.querySelector('[data-class]');
    if (root && root.dataset.class) {
      const [flag, cls] = root.dataset.class.split(':');
      if (row[flag] || (flag === 'is_haftara' && isHaftaraItem(row))) {
        root.classList.add(cls);
      }
    }
    clone.querySelectorAll('[data-bind], [data-if], [data-attr-href], [data-attr-href-tel], [data-attr-href-mailto], [data-attr-target]')
      .forEach(el => bindElement(el, row));
    containerEl.appendChild(clone);
  });
}

function render(data) {
  document.body.dataset.skin = (data.site && data.site.skin) || 'navy-gold';
  document.querySelectorAll('[data-bind], [data-if]').forEach(el => {
    if (el.closest('template')) return;
    bindElement(el, data);
  });
  document.querySelectorAll('[data-attr-href], [data-attr-href-tel], [data-attr-href-mailto]').forEach(el => {
    if (el.closest('template')) return;
    if (el.dataset.bind) return;
    bindElement(el, data);
  });
  document.querySelectorAll('[data-list]').forEach(container => {
    if (container.closest('template')) return;
    const path = container.dataset.list;
    const templateId = container.dataset.template;
    const items = resolvePath(data, path);
    renderList(container, templateId, items);
  });
  const notice = document.querySelector('.notice');
  if (notice && !notice.textContent.trim()) notice.style.display = 'none';
  else if (notice) notice.style.display = '';
  const archiveBox = document.getElementById('torah-archive');
  const archiveItems = resolvePath(data, 'torah.archive');
  if (archiveBox) {
    archiveBox.style.display = (!Array.isArray(archiveItems) || archiveItems.length === 0) ? 'none' : '';
  }
  applyI18n();
}

function loadFallback() {
  try {
    return JSON.parse(document.getElementById('fallback-data').textContent);
  } catch (e) {
    console.error('Failed to parse inline fallback data', e);
    return null;
  }
}

async function fetchFresh() {
  try {
    const res = await fetch(DATA_URL, { cache: 'no-store' });
    if (!res.ok) return null;
    const body = await res.json();
    return body.record || body;
  } catch (e) {
    console.warn('Could not fetch fresh data from', DATA_URL, e);
    return null;
  }
}

async function enrichWithHebcal(data) {
  if (!data) return data;
  try {
    const res = await fetch(HEBCAL_URL, { cache: 'no-store' });
    if (res.ok) {
      const heb = await res.json();
      const items = heb.items || [];
      const parashaItem = items.find(i => i.category === 'parashat');
      const holidayOnShabbat = items.find(i => i.category === 'holiday' && new Date(i.date + 'T12:00:00').getDay() === 6);
      if (parashaItem) {
        let name = parashaItem.hebrew || parashaItem.title || '';
        name = name.replace(/^פרשת\s+/, '').replace(/^פָּרָשַׁת\s+/, '');
        data.shabbat = data.shabbat || {};
        data.shabbat.parasha = name;
      } else if (holidayOnShabbat) {
        // No weekly parasha this Shabbat (it's a Yom Tov) - show the holiday name instead of stale data
        data.shabbat = data.shabbat || {};
        const holidayName = (holidayOnShabbat.hebrew || holidayOnShabbat.title || '').replace(/\s*\d{4}\s*$/, '').trim();
        data.shabbat.parasha = holidayName || data.shabbat.parasha;
        try {
          const [hgy, hgm, hgd] = holidayOnShabbat.date.split('-').map(Number);
          const hConvRes = await fetch(`https://www.hebcal.com/converter?cfg=json&g2h=1&gy=${hgy}&gm=${hgm}&gd=${hgd}`, { cache: 'no-store' });
          if (hConvRes.ok) {
            const hConv = await hConvRes.json();
            const heYear = hConv.heDateParts && hConv.heDateParts.y;
            if (heYear && holidayName) data.shabbat.parasha = `${holidayName} ${heYear}`;
          }
        } catch (yearErr) {
          console.warn('Hebrew year fetch failed', yearErr);
        }
      }
      const readingItem = parashaItem || holidayOnShabbat;
      if (readingItem && readingItem.leyning && readingItem.leyning.torah && data.shabbat) {
        try {
          const firstVerseRef = readingItem.leyning.torah.split('-')[0].trim();
          const sefariaId = firstVerseRef.replace(/\s+/g, '.').replace(':', '.');
          const vRes = await fetch(`https://www.sefaria.org/api/texts/${sefariaId}`, { cache: 'no-store' });
          if (vRes.ok) {
            const vData = await vRes.json();
            let heText = Array.isArray(vData.he) ? vData.he[0] : vData.he;
            if (heText) {
              heText = heText.replace(/&nbsp;/g, ' ').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
              const prevRef = (data.shabbat.petiha && data.shabbat.petiha.reference) || '';
              const heRef = (vData.heRef || '').replace(/:/g, ', ').replace(/׳/g, '');
              data.shabbat.petiha = {
                initial: heText.charAt(0),
                text: heText,
                reference: heRef || prevRef
              };
            }
          }
        } catch (verseErr) {
          console.warn('Verse fetch failed', verseErr);
        }
      }
      const candles = items.find(i => i.category === 'candles');
      if (candles && candles.date && data.shabbat && Array.isArray(data.shabbat.times)) {
        const timeStr = candles.date.slice(11, 16);
        const entry = data.shabbat.times.find(t =>
          t.label && (t.label.includes('הדלקת נרות') || t.label.includes('הדלקת'))
        );
        if (entry) {
          entry.value = timeStr;
          entry.note = entry.note || 'מ־Hebcal · 30 דק׳ לפני שקיעה · פתח תקווה';
        }
      }
      const havdalah = items.find(i => i.category === 'havdalah');
      if (havdalah && havdalah.date && data.shabbat && Array.isArray(data.shabbat.times)) {
        const timeStr = havdalah.date.slice(11, 16);
        const entry = data.shabbat.times.find(t =>
          t.label && (t.label.includes('הבדלה') || t.label.includes('ערבית והבדלה'))
        );
        if (entry) entry.value = timeStr;
      }
    }
    const now = new Date();
    const gy = now.getFullYear();
    const gm = now.getMonth() + 1;
    const gd = now.getDate();
    const convUrl = `https://www.hebcal.com/converter?cfg=json&g2h=1&gy=${gy}&gm=${gm}&gd=${gd}`;
    const convRes = await fetch(convUrl, { cache: 'no-store' });
    if (convRes.ok) {
      const conv = await convRes.json();
      data.date = data.date || {};
      if (conv.hebrew) {
        data.date.hebrew = conv.hebrew.replace(/[\u0591-\u05C7]/g, '');
      }
      const monthsHe = ['ינואר','פברואר','מרץ','אפריל','מאי','יוני','יולי','אוגוסט','ספטמבר','אוקטובר','נובמבר','דצמבר'];
      data.date.gregorian = `${gd} ב${monthsHe[gm - 1]} ${gy}`;
    }
    return data;
  } catch (e) {
    console.warn('Hebcal enrichment failed', e);
    return data;
  }
}

(async function bootstrap() {
  const fallback = loadFallback();
  if (fallback) render(fallback);
  let fresh = await fetchFresh();
  if (fresh) {
    fresh = await enrichWithHebcal(fresh);
    render(fresh);
  } else if (fallback) {
    const enriched = await enrichWithHebcal(JSON.parse(JSON.stringify(fallback)));
    render(enriched);
  }
})();

document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href').slice(1);
    if (!id) return;
    const el = document.getElementById(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.pushState(null, '', '#' + id);
    }
  });
});
