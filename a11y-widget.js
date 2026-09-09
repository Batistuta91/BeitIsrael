(function () {
  const STORAGE_KEY = 'beit-israel-a11y';
  const FONT_STEPS = [17, 19, 21, 23, 25];
  let state = { fontStep: 0, contrast: false, grayscale: false, underline: false, reduceMotion: false };

  function loadState() {
    try {
      const s = localStorage.getItem(STORAGE_KEY);
      if (s) state = Object.assign(state, JSON.parse(s));
    } catch (e) {}
  }
  function saveState() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (e) {}
  }
  function setPressed(id, val) {
    const el = document.getElementById(id);
    if (el) el.setAttribute('aria-pressed', String(val));
  }
  function apply() {
    document.documentElement.style.fontSize = FONT_STEPS[state.fontStep] + 'px';
    document.documentElement.classList.toggle('a11y-contrast', state.contrast);
    document.documentElement.classList.toggle('a11y-grayscale', state.grayscale);
    document.documentElement.classList.toggle('a11y-underline', state.underline);
    document.documentElement.classList.toggle('a11y-reduce-motion', state.reduceMotion);
    setPressed('a11y-btn-contrast', state.contrast);
    setPressed('a11y-btn-grayscale', state.grayscale);
    setPressed('a11y-btn-underline', state.underline);
    setPressed('a11y-btn-motion', state.reduceMotion);
  }

  function buildWidget() {
    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'a11y-toggle';
    toggle.setAttribute('aria-label', 'אפשרויות נגישות');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.textContent = '♿';

    const panel = document.createElement('div');
    panel.className = 'a11y-panel';
    panel.hidden = true;
    panel.setAttribute('role', 'region');
    panel.setAttribute('aria-label', 'אפשרויות נגישות');
    panel.innerHTML =
      '<h2>אפשרויות נגישות</h2>' +
      '<div style="display:flex;gap:6px;margin-bottom:8px;">' +
        '<button type="button" class="a11y-opt" id="a11y-font-dec" style="flex:1">א-</button>' +
        '<button type="button" class="a11y-opt" id="a11y-font-inc" style="flex:1">א+</button>' +
      '</div>' +
      '<button type="button" class="a11y-opt" id="a11y-btn-contrast" aria-pressed="false">ניגודיות גבוהה</button>' +
      '<button type="button" class="a11y-opt" id="a11y-btn-grayscale" aria-pressed="false">גווני אפור</button>' +
      '<button type="button" class="a11y-opt" id="a11y-btn-underline" aria-pressed="false">הדגשת קישורים</button>' +
      '<button type="button" class="a11y-opt" id="a11y-btn-motion" aria-pressed="false">עצירת אנימציות</button>' +
      '<button type="button" class="a11y-reset" id="a11y-reset">איפוס הגדרות</button>' +
      '<a href="accessibility.html" class="a11y-statement-link">הצהרת נגישות</a>';

    document.body.appendChild(toggle);
    document.body.appendChild(panel);

    toggle.addEventListener('click', () => {
      const willOpen = panel.hidden;
      panel.hidden = !willOpen;
      toggle.setAttribute('aria-expanded', String(willOpen));
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !panel.hidden) {
        panel.hidden = true;
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });
    document.addEventListener('click', (e) => {
      if (!panel.hidden && !panel.contains(e.target) && e.target !== toggle) {
        panel.hidden = true;
        toggle.setAttribute('aria-expanded', 'false');
      }
    });

    document.getElementById('a11y-font-inc').addEventListener('click', () => {
      state.fontStep = Math.min(state.fontStep + 1, FONT_STEPS.length - 1);
      saveState(); apply();
    });
    document.getElementById('a11y-font-dec').addEventListener('click', () => {
      state.fontStep = Math.max(state.fontStep - 1, 0);
      saveState(); apply();
    });
    document.getElementById('a11y-btn-contrast').addEventListener('click', () => { state.contrast = !state.contrast; saveState(); apply(); });
    document.getElementById('a11y-btn-grayscale').addEventListener('click', () => { state.grayscale = !state.grayscale; saveState(); apply(); });
    document.getElementById('a11y-btn-underline').addEventListener('click', () => { state.underline = !state.underline; saveState(); apply(); });
    document.getElementById('a11y-btn-motion').addEventListener('click', () => { state.reduceMotion = !state.reduceMotion; saveState(); apply(); });
    document.getElementById('a11y-reset').addEventListener('click', () => {
      state = { fontStep: 0, contrast: false, grayscale: false, underline: false, reduceMotion: false };
      saveState(); apply();
    });
  }

  loadState();
  function start() { buildWidget(); apply(); }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
