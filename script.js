// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('active'));
});

document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
        navLinks.classList.remove('active');
    }
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// Copyright year
document.getElementById('currentYear').textContent = new Date().getFullYear();

// File upload label update
const fileInput = document.getElementById('fileInput');
if (fileInput) {
    fileInput.addEventListener('change', () => {
        const label = document.getElementById('fileLabel');
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

// Contact form AJAX
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('button[type="submit"]');
        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        try {
            const res = await fetch(contactForm.action, {
                method: 'POST',
                body: new FormData(contactForm),
                headers: { 'Accept': 'application/json' }
            });
            if (res.ok) {
                contactForm.style.display = 'none';
                document.getElementById('formSuccess').style.display = 'block';
            } else {
                btn.disabled = false;
                btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
                alert('Something went wrong. Please try again.');
            }
        } catch {
            btn.disabled = false;
            btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
            alert('Network error. Please try again.');
        }
    });
}
