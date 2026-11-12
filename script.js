// Gather Cute: Thai/English on-page translation.
// A visitor's explicit selection always takes priority over browser preferences.
const LANGUAGE_STORAGE_KEY = 'gatherCuteLanguage';
const supportedLanguages = ['th', 'en'];
function getSavedLanguage() {
  try {
    const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return supportedLanguages.includes(stored) ? stored : null;
  } catch (_) {
    return null;
  }
}
function browserPreferredLanguage() {
  const languages = navigator.languages?.length ? navigator.languages : [navigator.language || ''];
  for (const language of languages) {
    const base = String(language).toLowerCase().split('-')[0];
    if (supportedLanguages.includes(base)) return base;
  }
  return 'en'; // International default when no supported preference is present.
}
let currentLanguage = getSavedLanguage() || browserPreferredLanguage();

function trackGatherCuteEvent(name, params = {}) {
  // Only sends events if analytics has been separately installed and configured.
  if (typeof window.gtag === 'function') window.gtag('event', name, params);
}
function setLanguage(lang, options = {}) {
  currentLanguage = lang === 'en' ? 'en' : 'th';
  if (options.persist !== false) {
    try { localStorage.setItem(LANGUAGE_STORAGE_KEY, currentLanguage); } catch (_) {}
    trackGatherCuteEvent('gather_cute_language_selected', { site_language: currentLanguage });
  }
  document.documentElement.lang = currentLanguage;

  document.querySelectorAll('[data-th][data-en]').forEach(el => {
    el.textContent = el.dataset[currentLanguage];
  });
  document.querySelectorAll('[data-th-html][data-en-html]').forEach(el => {
    el.innerHTML = currentLanguage === 'th' ? el.dataset.thHtml : el.dataset.enHtml;
  });
  document.querySelectorAll('[data-th-label][data-en-label]').forEach(el => {
    el.label = currentLanguage === 'th' ? el.dataset.thLabel : el.dataset.enLabel;
  });
  document.querySelectorAll('[data-th-placeholder][data-en-placeholder]').forEach(el => {
    el.placeholder = currentLanguage === 'th' ? el.dataset.thPlaceholder : el.dataset.enPlaceholder;
  });
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === currentLanguage);
    btn.setAttribute('aria-pressed', String(btn.dataset.lang === currentLanguage));
  });
  const messageBox = document.getElementById('form-message');
  if (messageBox) messageBox.textContent = '';
}

async function detectVisitorCountry() {
  // Country is an approximate IP-based signal, not a reliable language preference.
  // No IP, address, or country is retained in localStorage or sent to third parties here.
  try {
    const response = await fetch('/api/visitor', { cache: 'no-store' });
    if (!response.ok) return;
    const data = await response.json();
    if (!/^[A-Z]{2}$/.test(data.country || '')) return;
    document.documentElement.dataset.visitorCountry = data.country;
    document.dispatchEvent(new CustomEvent('gathercute:country', {
      detail: { country: data.country }
    }));
    // GA4's built-in country dimension should be used for country reporting;
    // avoid sending a redundant custom country parameter.
  } catch (_) {
    // Static hosting, local preview and blocked endpoints remain fully usable.
  }
}

document.addEventListener('DOMContentLoaded', () => {
  setLanguage(currentLanguage, { persist: false });
  detectVisitorCountry();
});

function submitForm(event) {
  event.preventDefault();
  const form = event.target;
  const service = form.querySelector('select').value;
  const name = form.querySelector('input').value.trim();
  const detail = form.querySelector('textarea').value.trim();
  const messageBox = document.getElementById('form-message');
  const inquiry = `Gather Cute inquiry\nService: ${service}\nName/Brand: ${name}\nDetails: ${detail}`;

  if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(inquiry).catch(() => {});

  trackGatherCuteEvent('gather_cute_enquiry_click', {
    site_language: currentLanguage,
    service_category: service
  });

  messageBox.textContent = currentLanguage === 'th'
    ? 'กำลังพาไป LINE @290rxkzl 💚 เตรียมข้อความไว้ให้แล้ว สามารถวางในแชตได้เลย'
    : 'Opening LINE @290rxkzl 💚 Your inquiry has been copied and is ready to paste into the chat.';

  window.open('https://line.me/ti/p/~@290rxkzl', '_blank', 'noopener,noreferrer');
}
