document.addEventListener('DOMContentLoaded', () => {

  /* -----------------------------------------
     CUSTOM CURSOR
  ----------------------------------------- */
  const cursorDot = document.getElementById('cursor-dot');
  const cursorRing = document.getElementById('cursor-ring');
  let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = `${mouseX}px`;
    cursorDot.style.top = `${mouseY}px`;
  });

  const animateCursorRing = () => {
    ringX += (mouseX - ringX) * 0.2;
    ringY += (mouseY - ringY) * 0.2;
    cursorRing.style.left = `${ringX}px`;
    cursorRing.style.top = `${ringY}px`;
    requestAnimationFrame(animateCursorRing);
  };
  animateCursorRing();

  const hoverElements = document.querySelectorAll('a, button, .skill-card, .project-card, .highlight-item');
  hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('hover-active'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('hover-active'));
  });

  /* -----------------------------------------
     HAMBURGER MENU
  ----------------------------------------- */
  const hamburger = document.querySelector('.hamburger');
  const navLinksMenu = document.querySelector('.nav-links');

  if (hamburger && navLinksMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinksMenu.classList.toggle('active');
    });
    navLinksMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinksMenu.classList.remove('active');
      });
    });
  }

  /* -----------------------------------------
     NAVBAR SCROLL EFFECT
  ----------------------------------------- */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });

  /* -----------------------------------------
     SCROLL SPY — ACTIVE NAV LINK
  ----------------------------------------- */
  const allNavLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  const spyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        allNavLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) link.classList.add('active');
        });
      }
    });
  }, { threshold: 0.35, rootMargin: '-80px 0px -20% 0px' });

  sections.forEach(s => spyObserver.observe(s));

  /* -----------------------------------------
     TYPEWRITER EFFECT
  ----------------------------------------- */
  const typewriterEl = document.getElementById('typewriter-role');
  if (typewriterEl) {
    const roles = [
      'Full Stack MERN Developer',
      'AI & Deep Learning Engineer',
      'Real-time App Architect',
      'Open Source Enthusiast'
    ];
    let roleIndex = 0, charIndex = 0, isDeleting = false;

    function typeWriter() {
      const current = roles[roleIndex];
      typewriterEl.textContent = isDeleting
        ? current.substring(0, charIndex - 1)
        : current.substring(0, charIndex + 1);
      isDeleting ? charIndex-- : charIndex++;

      let delay = isDeleting ? 45 : 95;
      if (!isDeleting && charIndex === current.length) {
        delay = 2200; isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        delay = 400;
      }
      setTimeout(typeWriter, delay);
    }
    typeWriter();
  }

  /* -----------------------------------------
     INTERSECTION OBSERVER (FADE IN)
  ----------------------------------------- */
  const elementsToFadeIn = document.querySelectorAll(
    '.section-header, .about-text, .about-visual, .skill-card, .project-card, .timeline-item, .contact-info, .contact-form-wrapper'
  );
  elementsToFadeIn.forEach(el => el.classList.add('fade-in-section'));

  const fadeObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
        if (entry.target.classList.contains('skill-card')) {
          const bar = entry.target.querySelector('.skill-bar-fill');
          if (bar) setTimeout(() => { bar.style.width = bar.getAttribute('data-width') + '%'; }, 300);
        }
      }
    });
  }, { root: null, rootMargin: '0px', threshold: 0.15 });

  elementsToFadeIn.forEach(el => fadeObserver.observe(el));

  /* -----------------------------------------
     NUMBER COUNTER ANIMATION
  ----------------------------------------- */
  const statsCounters = document.querySelectorAll('.stat-number');
  const statsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.getAttribute('data-target'));
        const increment = target / (2000 / 16);
        let current = 0;
        const update = () => {
          current += increment;
          if (current < target) { entry.target.innerText = Math.ceil(current); requestAnimationFrame(update); }
          else entry.target.innerText = target;
        };
        update();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  statsCounters.forEach(c => statsObserver.observe(c));

  /* -----------------------------------------
     NEURAL NETWORK BACKGROUND CANVAS
  ----------------------------------------- */
  const canvas = document.getElementById('neural-canvas');
  const ctx = canvas.getContext('2d');
  let width, height, particles = [];

  const initCanvas = () => { width = canvas.width = window.innerWidth; height = canvas.height = window.innerHeight; };
  window.addEventListener('resize', () => { initCanvas(); createParticles(); });

  class Particle {
    constructor() {
      this.x = Math.random() * width; this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.5; this.vy = (Math.random() - 0.5) * 0.5;
      this.radius = Math.random() * 2 + 1;
    }
    update() {
      this.x += this.vx; this.y += this.vy;
      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;
    }
    draw() {
      ctx.beginPath(); ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 240, 255, 0.5)'; ctx.fill();
    }
  }

  const createParticles = () => {
    particles = [];
    const n = Math.floor((width * height) / 15000);
    for (let i = 0; i < n; i++) particles.push(new Particle());
  };

  const animateParticles = () => {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => { p.update(); p.draw(); });
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0, 240, 255, ${(1 - dist / 120) * 0.2})`; ctx.lineWidth = 1; ctx.stroke();
        }
      }
      const dxM = particles[i].x - mouseX, dyM = particles[i].y - mouseY;
      const dM = Math.sqrt(dxM * dxM + dyM * dyM);
      if (dM < 150) {
        ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(mouseX, mouseY);
        ctx.strokeStyle = `rgba(0, 240, 255, ${(1 - dM / 150) * 0.4})`; ctx.lineWidth = 1.5; ctx.stroke();
      }
    }
    requestAnimationFrame(animateParticles);
  };

  initCanvas(); createParticles(); animateParticles();

  /* -----------------------------------------
     FORM VALIDATION + MAILTO FALLBACK
  ----------------------------------------- */
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      document.querySelectorAll('.form-error').forEach(el => el.remove());
      document.querySelectorAll('.input-error').forEach(el => el.classList.remove('input-error'));

      const nameInput = document.getElementById('name-input');
      const emailInput = document.getElementById('email-input');
      const msgInput = document.getElementById('message-input');
      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const message = msgInput.value.trim();
      let valid = true;

      const showError = (inputEl, msg) => {
        inputEl.classList.add('input-error');
        const err = document.createElement('span');
        err.className = 'form-error';
        err.textContent = msg;
        inputEl.parentNode.appendChild(err);
        valid = false;
      };

      if (!name) showError(nameInput, 'Name is required.');
      if (!email) showError(emailInput, 'Email is required.');
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) showError(emailInput, 'Please enter a valid email address.');
      if (!message) showError(msgInput, 'Message cannot be empty.');
      if (!valid) return;

      const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
      window.location.href = `mailto:anshkene10@gmail.com?subject=${subject}&body=${body}`;

      const btn = document.getElementById('submit-btn');
      const originalHTML = btn.innerHTML;
      btn.innerHTML = '<span>Opening Mail Client...</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>';
      btn.style.backgroundColor = '#10b981';
      btn.style.color = '#fff';
      setTimeout(() => {
        btn.innerHTML = originalHTML;
        btn.style.backgroundColor = '';
        btn.style.color = '';
        contactForm.reset();
      }, 3000);
    });
  }
});
