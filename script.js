// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Simple reveal-on-scroll with IntersectionObserver
const observer = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-in');
        observer.unobserve(entry.target);
      }
    }
  },
  { threshold: 0.12 }
);

document.querySelectorAll('[data-reveal]').forEach((el) => observer.observe(el));

// Reduce motion for users who prefer it
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelectorAll('*').forEach((el) => {
    const style = el.style;
    style.setProperty('animation', 'none', 'important');
    style.setProperty('transition', 'none', 'important');
  });
}

// Removed header canvas and scroll progress logic for simpler UI

// Set CSS var for header height and enable wheel snap from hero to #about
function setHeaderHeightVar() {
  const header = document.querySelector('.site-header');
  if (!header) return;
  const h = header.getBoundingClientRect().height;
  document.documentElement.style.setProperty('--header-h', `${Math.round(h)}px`);
}
setHeaderHeightVar();
window.addEventListener('resize', setHeaderHeightVar);

// Scroll wheel on hero triggers smooth snap to #about
const hero = document.querySelector('.hero');
const about = document.getElementById('about');
if (hero && about) {
  hero.addEventListener('wheel', (e) => {
    // only trigger when wheel intent is to scroll down and we are at top
    if (e.deltaY > 0) {
      e.preventDefault();
      about.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, { passive: false });
}

// 3D tilt cards
const cards = document.querySelectorAll('.card');
cards.forEach((card) => {
  let hovering = false;
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rx = ((y / rect.height) - 0.5) * -8; // rotateX
    const ry = ((x / rect.width) - 0.5) * 8; // rotateY
    card.style.transform = `perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(700px) rotateX(0) rotateY(0)';
  });
});


