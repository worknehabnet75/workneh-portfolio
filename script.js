// ── Mobile menu ────────────────────────────────────────────────
const menuToggle = document.querySelector('.menu-toggle');
const navLinks   = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => navLinks.classList.toggle('active'));
document.querySelectorAll('.nav-links a').forEach(link =>
    link.addEventListener('click', () => navLinks.classList.remove('active'))
);
document.addEventListener('click', e => {
    if (!navLinks.contains(e.target) && !menuToggle.contains(e.target))
        navLinks.classList.remove('active');
});

// ── Smooth scrolling ───────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// ── Copyright year ─────────────────────────────────────────────
document.getElementById('currentYear').textContent = new Date().getFullYear();

// ── File upload label ──────────────────────────────────────────
const fileInput = document.getElementById('fileInput');
if (fileInput) {
    fileInput.addEventListener('change', () => {
        const label   = document.getElementById('fileLabel');
        const wrapper = fileInput.nextElementSibling;
        if (fileInput.files.length > 0) {
            label.textContent = fileInput.files[0].name;
            wrapper.classList.add('has-file');
        } else {
            label.textContent = 'Choose a file or drag & drop';
            wrapper.classList.remove('has-file');
        }
    });
}

// ── Typed role animation ───────────────────────────────────────
const roles       = ['SOC Analyst', 'Security Engineer', 'SIEM Developer', 'Blue Team Specialist', 'Full Stack Developer'];
const typedEl     = document.getElementById('typed-role');
let   roleIndex   = 0;
let   charIndex   = 0;
let   isDeleting  = false;

function typeRole() {
    if (!typedEl) return;
    const current = roles[roleIndex];
    if (isDeleting) {
        typedEl.textContent = current.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typedEl.textContent = current.substring(0, charIndex + 1);
        charIndex++;
    }

    let delay = isDeleting ? 60 : 110;

    if (!isDeleting && charIndex === current.length) {
        delay = 2000;           // pause at end of word
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex  = (roleIndex + 1) % roles.length;
        delay = 400;            // pause before next word
    }
    setTimeout(typeRole, delay);
}
typeRole();

// ── Active nav link on scroll ──────────────────────────────────
const sections    = document.querySelectorAll('section[id]');
const navAnchors  = document.querySelectorAll('.nav-links a');

function setActiveNav() {
    let current = '';
    sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 120)
            current = section.getAttribute('id');
    });
    navAnchors.forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href') === '#' + current)
            a.classList.add('active');
    });
}
window.addEventListener('scroll', setActiveNav, { passive: true });
setActiveNav();

// ── Stats counter animation ────────────────────────────────────
function animateCounters() {
    document.querySelectorAll('.stat-number[data-target]').forEach(el => {
        const target   = parseInt(el.dataset.target, 10);
        const duration = 1500;
        const step     = Math.ceil(duration / target);
        let   count    = 0;
        const timer    = setInterval(() => {
            count++;
            el.textContent = count;
            if (count >= target) clearInterval(timer);
        }, step);
    });
}

// Trigger counters when stats bar enters the viewport
const statsBar = document.querySelector('.stats-bar');
if (statsBar) {
    let counted = false;
    const observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && !counted) {
            counted = true;
            animateCounters();
        }
    }, { threshold: 0.4 });
    observer.observe(statsBar);
}
