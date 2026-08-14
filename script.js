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
