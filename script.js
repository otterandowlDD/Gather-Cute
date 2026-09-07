let currentLanguage = localStorage.getItem('gatherCuteLanguage') || 'th';

function setLanguage(lang){
  currentLanguage = lang === 'en' ? 'en' : 'th';
  localStorage.setItem('gatherCuteLanguage', currentLanguage);
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
  });

  const messageBox = document.getElementById('form-message');
  if(messageBox) messageBox.textContent = '';
}

document.addEventListener('DOMContentLoaded', () => setLanguage(currentLanguage));

function submitForm(event){
  event.preventDefault();
  const form = event.target;
  const service = form.querySelector('select').value;
  const name = form.querySelector('input').value.trim();
  const detail = form.querySelector('textarea').value.trim();
  const messageBox = document.getElementById('form-message');
  const inquiry = `Gather Cute inquiry\nService: ${service}\nName/Brand: ${name}\nDetails: ${detail}`;

  if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(inquiry).catch(() => {});

  messageBox.textContent = currentLanguage === 'th'
    ? 'กำลังพาไป LINE @nooning_nn 💚 เตรียมข้อความไว้ให้แล้ว สามารถวางในแชตได้เลย'
    : 'Opening LINE @nooning_nn 💚 Your inquiry has been copied and is ready to paste into the chat.';

  window.open('https://line.me/ti/p/~@nooning_nn', '_blank', 'noopener,noreferrer');
}