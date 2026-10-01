const iconLibrary = window.lucide;
if (iconLibrary) iconLibrary.createIcons();

const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');

menuToggle?.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.main-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

document.querySelectorAll('.filter-button, .birthday-album').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelector('.filter-button.active')?.classList.remove('active');
    document.querySelector('.birthday-album.active')?.classList.remove('active');
    button.classList.add('active');
    const filter = button.dataset.filter;

    document.querySelectorAll('.gallery-item').forEach((item) => {
      item.classList.toggle('is-hidden', filter !== 'tout' && item.dataset.category !== filter);
    });

    document.querySelector('#gallery-grid')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

const lightbox = document.querySelector('.lightbox');
const lightboxImage = document.querySelector('.lightbox-image');
const lightboxCaption = document.querySelector('.lightbox-caption');

document.querySelectorAll('.gallery-item').forEach((item) => {
  item.addEventListener('click', () => {
    const image = item.querySelector('img');
    const title = item.querySelector('strong')?.textContent ?? '';
    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
    lightboxCaption.textContent = title;
    lightbox.showModal();
  });
});

document.querySelector('.lightbox-close')?.addEventListener('click', () => lightbox.close());
lightbox?.addEventListener('click', (event) => {
  if (event.target === lightbox) lightbox.close();
});

document.querySelector('#contact-form')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const message = [
    'Bonjour KYAHPHOTOGRAPHE,',
    `Je m'appelle ${formData.get('name')}.`,
    `Je souhaite réserver une séance ${formData.get('session')} le ${formData.get('date')}.`,
    formData.get('message') ? `Message : ${formData.get('message')}` : ''
  ].filter(Boolean).join('\n');
  window.open(`https://wa.me/50946955819?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
});
