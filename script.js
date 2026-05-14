// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            if (window.innerWidth <= 768) {
                navLinks.style.display = 'none';
            }
        }
    });
});

// Update copyright year
const currentYear = new Date().getFullYear();
document.getElementById('currentYear').textContent = currentYear;

// Add current year to hero if needed
const yearElements = document.querySelectorAll('.current-year');
yearElements.forEach(el => {
    el.textContent = currentYear;
});

// CV Download functionality
const downloadCVBtn = document.getElementById('downloadCV');
if (downloadCVBtn) {
    downloadCVBtn.addEventListener('click', function(e) {
        e.preventDefault();

        // Create a simple text-based CV content
        const cvContent = `
WORKINEH ABENET
Cybersecurity Student | Blue Team/SOC Analyst | Developer
================================================================================

CONTACT INFORMATION
-------------------
Email: worknehabnet75@gmail.com | bdu1508108@bdu.edu.et
Phone: +251960153336
LinkedIn: linkedin.com/in/workineh-abenet-6b5257387
GitHub: github.com/worknehabnet75
Location: Bahir Dar, Ethiopia

PROFESSIONAL SUMMARY
--------------------
I am WORKINEH ABENET fourth year Cyber Security student at Bahirdar university.
specializing in Blue Team operations, threat detection, Ethical Hacking and secure
software development(FULL STUCK DEVELOPER). Experienced in SIEM Development,
Incident Response, malware investigation and hands-on vulnerability assessments in
open source labs like Tryhack me, Hack the box and Letsdefend platforms. I enjoy
practical learning and building security projects that solve real-world problems.

EDUCATION
---------
Bachelor of Science in Cybersecurity (2022 - 2026)
Bahir Dar University, Ethiopia
Expected Graduation: 2026
Specialization: Blue Team Operations, SOC Analysis, SIEM Development

PROFESSIONAL EXPERIENCE
-----------------------
Network Infrastructure Intern (2024 - 2 Months)
Bahir Dar University IT Department
- Configured and maintained Cisco routers and switches for university network
- Designed and implemented VLANs for department segmentation and security
- Deployed access control lists (ACLs) for network traffic filtering
- Troubleshooted network connectivity issues and performed maintenance
- Assisted in network documentation and security policy implementation

TECHNICAL SKILLS
----------------
Security Tools: SIEM Development, Wazuh, Kali Linux, Metasploit, Wireshark, Burp Suite, DVWA
Programming: Python, Bash Scripting, PowerShell
Networking: Router/Switch Configuration, VLAN Setup, Network Security, Cisco IOS

KEY PROJECTS
------------
1. SIEM Development & Implementation
   - Designed backend agent deployment and endpoint security modules
   - Configured real-time logging, alerting, and analysis for network traffic
   - Integrated AI-based monitoring to detect anomalies
   - Technologies: Wazuh, Python, Elastic Stack, Linux

2. Blue Team Lab Practice
   - Deployed Wazuh agents and monitored endpoint security events
   - Conducted threat detection and mitigation in lab environments
   - Performed log analysis, correlation rules testing, and alert tuning
   - Platforms: TryHackMe, HackTheBox, LetsDefend

3. University Network Configuration
   - Configured routers and switches for university infrastructure
   - Set up VLANs for department segmentation
   - Implemented ACLs for network security

CERTIFICATIONS
--------------
- TryHackMe: Complete Ethical Hacking Path
- Wazuh Security Monitoring Workshop
- AI Fundamentals

LANGUAGES
---------
- English: Fluent
- Amharic: Native

PLATFORMS & PROFILES
--------------------
- TryHackMe: tryhackme.com/p/worknehabnet75
- HackTheBox: app.hackthebox.com/users/2471567
- LetsDefend: app.letsdefend.io/my-rewards
`;

        // Create blob and download
        const blob = new Blob([cvContent], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Workineh_Abenet_CV.txt';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);

        // Show confirmation
        alert('CV downloaded successfully! For a formatted PDF version, please contact me directly.');
    });
}

// Close menu when clicking outside on mobile
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
        if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
            navLinks.style.display = 'none';
        }
    }
});

// Form submission confirmation (optional - doesn't interfere with Formspree)
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    // REMOVED the event listener that was preventing Formspree submission
    // Form will now submit directly to Formspree
}
