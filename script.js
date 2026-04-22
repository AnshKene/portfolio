document.addEventListener('DOMContentLoaded', () => {

  /* -----------------------------------------
     CUSTOM CURSOR
  ----------------------------------------- */
  const cursorDot = document.getElementById('cursor-dot');
  const cursorRing = document.getElementById('cursor-ring');

  let mouseX = 0;
  let mouseY = 0;
  let ringX = 0;
  let ringY = 0;

  // Follow mouse
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Dot follows exactly
    cursorDot.style.left = `${mouseX}px`;
    cursorDot.style.top = `${mouseY}px`;
  });

  // Ring follows with slight delay
  const animateCursorRing = () => {
    ringX += (mouseX - ringX) * 0.2;
    ringY += (mouseY - ringY) * 0.2;

    cursorRing.style.left = `${ringX}px`;
    cursorRing.style.top = `${ringY}px`;

    requestAnimationFrame(animateCursorRing);
  };
  animateCursorRing();

  // Add hover effect to links and buttons
  const hoverElements = document.querySelectorAll('a, button, .skill-card, .project-card, .highlight-item');

  hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('hover-active'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('hover-active'));
  });

  /* -----------------------------------------
     NAVBAR SCROLL EFFECT
  ----------------------------------------- */
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  /* -----------------------------------------
     INTERSECTION OBSERVER (FADE IN)
  ----------------------------------------- */
  // Wrap sections or elements we want to fade in
  const elementsToFadeIn = document.querySelectorAll('.section-header, .about-text, .about-visual, .skill-card, .project-card, .timeline-item, .contact-info, .contact-form-wrapper');

  elementsToFadeIn.forEach(el => {
    el.classList.add('fade-in-section');
  });

  const fadeObserverOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const fadeObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);

        // Trigger skill bars if it's a skill card
        if (entry.target.classList.contains('skill-card')) {
          const bar = entry.target.querySelector('.skill-bar-fill');
          if (bar) {
            setTimeout(() => {
              bar.style.width = bar.getAttribute('data-width') + '%';
            }, 300); // Slight delay after fade in
          }
        }
      }
    });
  }, fadeObserverOptions);

  elementsToFadeIn.forEach(el => fadeObserver.observe(el));

  /* -----------------------------------------
     NUMBER COUNTER ANIMATION
  ----------------------------------------- */
  const statsCounters = document.querySelectorAll('.stat-number');

  const statsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps

        let current = 0;

        const updateCounter = () => {
          current += increment;
          if (current < target) {
            entry.target.innerText = Math.ceil(current);
            requestAnimationFrame(updateCounter);
          } else {
            entry.target.innerText = target;
          }
        };

        updateCounter();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statsCounters.forEach(counter => statsObserver.observe(counter));

  /* -----------------------------------------
     NEURAL NETWORK BACKGROUND CANVAS
  ----------------------------------------- */
  const canvas = document.getElementById('neural-canvas');
  const ctx = canvas.getContext('2d');

  let width, height;
  let particles = [];

  const initCanvas = () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  };

  window.addEventListener('resize', () => {
    initCanvas();
    createParticles();
  });

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;
      this.radius = Math.random() * 2 + 1;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 240, 255, 0.5)';
      ctx.fill();
    }
  }

  const createParticles = () => {
    particles = [];
    // Number of particles depends on screen size
    const numParticles = Math.floor((width * height) / 15000);
    for (let i = 0; i < numParticles; i++) {
      particles.push(new Particle());
    }
  };

  const animateParticles = () => {
    ctx.clearRect(0, 0, width, height);

    particles.forEach(p => {
      p.update();
      p.draw();
    });

    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          // Opacity based on distance
          const opacity = 1 - (distance / 120);
          ctx.strokeStyle = `rgba(0, 240, 255, ${opacity * 0.2})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      // Connect to mouse
      const dxMouse = particles[i].x - mouseX;
      const dyMouse = particles[i].y - mouseY;
      const distanceMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

      if (distanceMouse < 150) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(mouseX, mouseY);
        const opacity = 1 - (distanceMouse / 150);
        ctx.strokeStyle = `rgba(0, 240, 255, ${opacity * 0.4})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
    }

    requestAnimationFrame(animateParticles);
  };

  initCanvas();
  createParticles();
  animateParticles();

  /* -----------------------------------------
     FORM SUBMISSION (PREVENT DEFAULT)
  ----------------------------------------- */
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = document.getElementById('submit-btn');
      const originalText = btn.innerHTML;

      btn.innerHTML = '<span>Message Sent!</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>';
      btn.style.backgroundColor = '#10b981';
      btn.style.color = '#fff';

      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.backgroundColor = '';
        btn.style.color = '';
        contactForm.reset();
      }, 3000);
    });
  }
});
