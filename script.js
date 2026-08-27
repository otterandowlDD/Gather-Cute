function submitForm(event){
  event.preventDefault();

  const form = event.target;
  const service = form.querySelector('select').value;
  const name = form.querySelector('input').value.trim();
  const detail = form.querySelector('textarea').value.trim();
  const messageBox = document.getElementById('form-message');

  const inquiry = `Gather Cute inquiry\nService: ${service}\nName/Brand: ${name}\nDetails: ${detail}`;

  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(inquiry).catch(() => {});
  }

  messageBox.textContent = 'กำลังพาไป LINE @nooning_nn 💚 ข้อความถูกเตรียมไว้ให้แล้ว สามารถวางในแชตได้เลย';

  window.open('https://line.me/ti/p/~@nooning_nn', '_blank', 'noopener,noreferrer');
}
