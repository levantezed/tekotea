// ─── NAVBAR: sombra ao rolar ───────────────────────────
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
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

// Fecha ao clicar em qualquer link do menu
mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
});

// ─── ACTIVE NAV ITEM ao rolar ─────────────────────────
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('#nav_list .nav_item a');

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
