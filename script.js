function submitForm(event){
  event.preventDefault();
  const message = document.getElementById('form-message');
  message.textContent = 'ได้รับไอเดียแล้ว ✨ เดี๋ยวขั้นต่อไปเราจะต่อฟอร์มนี้เข้ากับ LINE / Google Form หรือ email จริง';
  event.target.reset();
}
