// ─── NAVBAR: sombra ao rolar ───────────────────────────
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 10);
});

// ─── SCROLL SUAVE PARA ÂNCORAS ────────────────────────
function smoothScrollTo(targetId) {
    const target = document.querySelector(targetId);
    if (!target) return;

    const headerHeight = document.getElementById('header').offsetHeight;
    const targetTop = target.getBoundingClientRect().top + window.scrollY - headerHeight;
    const startY = window.scrollY;
    const distance = targetTop - startY;
    const duration = 800;
    let startTime = null;

    function easeInOutCubic(t) {
        return t < 0.5
            ? 4 * t * t * t
            : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    function step(timestamp) {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        window.scrollTo(0, startY + distance * easeInOutCubic(progress));
        if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
}

// Intercepta todos os links âncora da página
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
        const href = link.getAttribute('href');
        if (href === '#') return;
        e.preventDefault();
        smoothScrollTo(href);
    });
});

// ─── MENU MOBILE ──────────────────────────────────────
const mobileBtn      = document.getElementById('mobile_btn');
const mobileCloseBtn = document.getElementById('mobile_close_btn');
const mobileMenu     = document.getElementById('mobile_menu');
const mobileOverlay  = document.getElementById('mobile_overlay');
const mobileLinks    = document.querySelectorAll('#mobile_nav_list .nav_item a, .mobile-cta');

function openMenu() {
    mobileMenu.classList.add('active');
    mobileOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeMenu() {
    mobileMenu.classList.remove('active');
    mobileOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

mobileBtn.addEventListener('click', openMenu);
mobileCloseBtn.addEventListener('click', closeMenu);
mobileOverlay.addEventListener('click', closeMenu);

mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
});

// ─── ACTIVE NAV ITEM ao rolar ─────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('#nav_list .nav_item a');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach(link => {
                link.parentElement.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.parentElement.classList.add('active');
                }
            });
        }
    });
}, { threshold: 0.4 });

sections.forEach(section => observer.observe(section));

// ─── FADE-IN DAS SEÇÕES ───────────────────────────────
const fadeEls = document.querySelectorAll('.section-fade');

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            fadeObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

fadeEls.forEach(el => fadeObserver.observe(el));
