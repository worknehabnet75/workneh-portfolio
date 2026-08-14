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
    // Error banner element (injected once)
    let errorBanner = document.getElementById('formError');
    if (!errorBanner) {
        errorBanner = document.createElement('div');
        errorBanner.id = 'formError';
        errorBanner.style.cssText = [
            'display:none',
            'align-items:flex-start',
            'gap:1rem',
            'padding:1.2rem 1.5rem',
            'background:linear-gradient(135deg,rgba(239,68,68,0.08),rgba(239,68,68,0.15))',
            'border:1.5px solid #ef4444',
            'border-radius:var(--radius-lg)',
            'margin-bottom:1.5rem',
            'color:#b91c1c',
            'font-size:0.95rem'
        ].join(';');
        contactForm.parentNode.insertBefore(errorBanner, contactForm);
    }

    function showError(msg) {
        errorBanner.innerHTML = `<i class="fas fa-exclamation-circle" style="font-size:1.4rem;flex-shrink:0;margin-top:0.1rem"></i><div><strong>Message not sent</strong><p style="margin:0.3rem 0 0;font-size:0.9rem">${msg}</p></div>`;
        errorBanner.style.display = 'flex';
        errorBanner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    function hideError() {
        errorBanner.style.display = 'none';
    }

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        hideError();
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
                hideError();
                const successEl = document.getElementById('formSuccess');
                successEl.style.display = 'flex';
                successEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            } else {
                // Try to get Formspree error detail
                let errMsg = 'Something went wrong. Please try again or email directly at worknehabnet75@gmail.com';
                try {
                    const data = await res.json();
                    if (data && data.errors) {
                        errMsg = data.errors.map(err => err.message).join(' ');
                    } else if (data && data.error) {
                        errMsg = data.error;
                    }
                } catch (_) { /* ignore JSON parse errors */ }

                btn.disabled = false;
                btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
                showError(errMsg);
            }
        } catch (networkErr) {
            btn.disabled = false;
            btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
            showError('Network error — please check your connection and try again.');
        }
    });
}
