'use strict';
const toggle = document.querySelector('.menu-toggle');
const menu = document.getElementById('mobile-nav');
function closeMenu() {
  menu.hidden = true;
  toggle.setAttribute('aria-expanded', 'false');
}
toggle.addEventListener('click', () => {
  const opening = toggle.getAttribute('aria-expanded') !== 'true';
  toggle.setAttribute('aria-expanded', String(opening));
  menu.hidden = !opening;
});
menu.addEventListener('click', (event) => {
  if (event.target.closest('a')) closeMenu();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !menu.hidden) {
    closeMenu();
    toggle.focus();
  }
});
window.matchMedia('(min-width: 851px)').addEventListener('change', (event) => {
  if (event.matches) closeMenu();
});
const form = document.getElementById('contact-form');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const ru = document.documentElement.lang === 'ru';
  const subject = (ru ? 'Обсуждение проекта' : 'Project inquiry') + (data.get('company') ? ' — ' + data.get('company') : '');
  const body = `${ru ? 'Имя' : 'Name'}: ${data.get('name')}\nEmail: ${data.get('email')}\n${ru ? 'Компания' : 'Company'}: ${data.get('company')}\n\n${data.get('message')}`;
  document.getElementById('form-status').hidden = false;
  window.location.href = `mailto:contact@amaryllis.by?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});
