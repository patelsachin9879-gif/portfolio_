/**
 * SACHIN PATEL - PORTFOLIO INTERACTIVITY
 * Features: Typewriter, Bento Terminal, Filters, ATS Resume Print, Custom Cursor, Toast
 */

document.addEventListener('DOMContentLoaded', () => {
  initTypewriter();
  initTerminal();
  initProjectFilters();
  initNavbar();
  initCustomCursor();
  initClipboardAndToasts();
  initContactForm();
});

/* ===================================================================
   1. TYPEWRITER EFFECT
   =================================================================== */
function initTypewriter() {
  const element = document.getElementById('typed-text');
  if (!element) return;

  const roles = [
    'Software Developer 💻',
    'Competitive Programmer (LeetCode 46+) ⚡',
    'C++ & Data Structures Specialist 🧩',
    'Full-Stack Web Developer 🌐',
    'IIT BHU Hackathon Builder 🚀'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingSpeed = 80;
  const deletingSpeed = 40;
  const pauseEnd = 1600;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      element.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      element.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }

    let delay = isDeleting ? deletingSpeed : typingSpeed;

    if (!isDeleting && charIndex === currentRole.length) {
      delay = pauseEnd;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      delay = 350;
    }

    setTimeout(type, delay);
  }

  type();
}

/* ===================================================================
   2. INTERACTIVE BENTO TERMINAL
   =================================================================== */
function initTerminal() {
  const cliInput = document.getElementById('term-cli');
  const termBody = document.getElementById('term-body');
  if (!cliInput || !termBody) return;

  const commands = {
    help: () => `
      <div class="term-output">
        Available commands:<br/>
        &nbsp;&nbsp;<span class="term-highlight">bio</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- About Sachin Patel<br/>
        &nbsp;&nbsp;<span class="term-highlight">skills</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Technical stack and tools<br/>
        &nbsp;&nbsp;<span class="term-highlight">leetcode</span>&nbsp;&nbsp;&nbsp;- Problem solving & LeetCode statistics<br/>
        &nbsp;&nbsp;<span class="term-highlight">projects</span>&nbsp;&nbsp;&nbsp;- Flagship hackathons & projects<br/>
        &nbsp;&nbsp;<span class="term-highlight">contact</span>&nbsp;&nbsp;&nbsp;&nbsp;- Direct email & social links<br/>
        &nbsp;&nbsp;<span class="term-highlight">clear</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Clear terminal display
      </div>`,
    bio: () => `
      <div class="term-output">
        <strong>Sachin Patel</strong><br/>
        Aspiring Software Developer passionate about high-performance computing, clean architecture, and rapid prototyping. Solved 46+ curated algorithmic problems on LeetCode with strong focus on Medium & Hard complexities. Participant in national-level hackathons including IIT BHU SANGYAN.
      </div>`,
    skills: () => `
      <div class="term-output">
        • Languages: <span class="term-highlight">C++, C, Python, JavaScript (ES6+), Java, SQL</span><br/>
        • Backend & Web: <span class="term-highlight">FastAPI, HTML5, CSS3, REST APIs, Node.js</span><br/>
        • Core CS: <span class="term-highlight">Data Structures, Algorithms, OOPs, DBMS</span><br/>
        • Tools: <span class="term-highlight">Git, GitHub, VS Code, Postman, Linux</span>
      </div>`,
    leetcode: () => `
      <div class="term-output">
        🔥 <span class="term-highlight">LeetCode @patelsachin9879</span><br/>
        • Total Problems Solved: <strong>46+</strong> (79.3% Acceptance Rate)<br/>
        • Breakdown: Easy: 17 | Medium: 24 | Hard: 5<br/>
        • Focus: Arrays, Two Pointers, Linked Lists, Binary Search, Dynamic Programming
      </div>`,
    projects: () => `
      <div class="term-output">
        1. <strong>Sanjeevani (Dhanvantari SetuX)</strong> - Offline-first rural emergency healthcare platform<br/>
        2. <strong>Sangyan-Kavach</strong> - IIT BHU Hackathon Safety API built with FastAPI<br/>
        3. <strong>OmniTutor-AI</strong> - Multimodal AI Hackathon learning assistant<br/>
        4. <strong>LEETCODE-DSA</strong> - Optimized C++ problem solutions vault<br/>
        5. <strong>ShopNest</strong> - Dynamic modern e-commerce storefront
      </div>`,
    contact: () => `
      <div class="term-output">
        📧 Email: <a href="mailto:sp3284251@gmail.com" style="color:#06b6d4;">sp3284251@gmail.com</a><br/>
        🔗 LinkedIn: <a href="https://linkedin.com/in/sachin-patel-sp2803" target="_blank" style="color:#06b6d4;">sachin-patel-sp2803</a><br/>
        💻 GitHub: <a href="https://github.com/patelsachin9879-gif" target="_blank" style="color:#06b6d4;">patelsachin9879-gif</a>
      </div>`,
    clear: () => {
      termBody.innerHTML = `
        <div class="term-line">
          <span class="term-prompt">sachin@dev:~$</span>
          <span class="term-cmd">welcome</span>
        </div>
        <div class="term-output">
          Terminal ready. Type <span class="term-highlight">help</span> to explore developer details.
        </div>`;
      return null;
    }
  };

  cliInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const input = cliInput.value.trim().toLowerCase();
      cliInput.value = '';

      if (!input) return;

      // Create command echo
      const cmdLine = document.createElement('div');
      cmdLine.className = 'term-line';
      cmdLine.innerHTML = `<span class="term-prompt">sachin@dev:~$</span> <span class="term-cmd">${escapeHtml(input)}</span>`;
      termBody.appendChild(cmdLine);

      if (commands[input]) {
        const result = commands[input]();
        if (result) {
          const outDiv = document.createElement('div');
          outDiv.innerHTML = result;
          termBody.appendChild(outDiv);
        }
      } else {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'term-output';
        errorDiv.style.color = '#f87171';
        errorDiv.textContent = `zsh: command not found: ${input}. Type 'help' for available commands.`;
        termBody.appendChild(errorDiv);
      }

      termBody.scrollTop = termBody.scrollHeight;
    }
  });

  // Focus input when clicking anywhere in terminal body
  termBody.addEventListener('click', () => {
    cliInput.focus();
  });
}

function escapeHtml(text) {
  const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
  return text.replace(/[&<>"']/g, m => map[m]);
}

/* ===================================================================
   3. PROJECT FILTER TABS
   =================================================================== */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category.includes(filter)) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.opacity = '1';
          }, 40);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ===================================================================
   4. NAVBAR SCROLL & MOBILE DRAWER
   =================================================================== */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const mobileBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Scroll Spy for nav links
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const navLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

      if (navLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLink.classList.add('active');
        } else {
          navLink.classList.remove('active');
        }
      }
    });
  });

  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const icon = mobileBtn.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
      }
    });

    // Close mobile nav when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        const icon = mobileBtn.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-xmark');
        }
      });
    });
  }
}

/* ===================================================================
   5. CUSTOM CURSOR
   =================================================================== */
function initCustomCursor() {
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorOutline = document.querySelector('.cursor-outline');

  if (!cursorDot || !cursorOutline) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let outlineX = mouseX;
  let outlineY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    cursorDot.style.left = `${mouseX}px`;
    cursorDot.style.top = `${mouseY}px`;
  });

  function animateOutline() {
    outlineX += (mouseX - outlineX) * 0.15;
    outlineY += (mouseY - outlineY) * 0.15;

    cursorOutline.style.left = `${outlineX}px`;
    cursorOutline.style.top = `${outlineY}px`;

    requestAnimationFrame(animateOutline);
  }
  animateOutline();

  // Hover scale on interactive elements
  const interactives = document.querySelectorAll('a, button, input, textarea, .bento-card, .project-card');
  interactives.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorOutline.style.width = '55px';
      cursorOutline.style.height = '55px';
      cursorOutline.style.borderColor = 'rgba(6, 182, 212, 0.8)';
    });
    el.addEventListener('mouseleave', () => {
      cursorOutline.style.width = '36px';
      cursorOutline.style.height = '36px';
      cursorOutline.style.borderColor = 'rgba(6, 182, 212, 0.5)';
    });
  });
}

/* ===================================================================
   6. CLIPBOARD & TOAST NOTIFICATION
   =================================================================== */
function initClipboardAndToasts() {
  const copyButtons = document.querySelectorAll('[data-copy]');

  copyButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;

      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast(`Copied to clipboard: ${textToCopy}`);
      }).catch(() => {
        showToast(`Copy failed, please copy manually.`);
      });
    });
  });
}

function showToast(message) {
  let toast = document.getElementById('toast-notice');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast-notice';
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color:#10b981;"></i> <span>${message}</span>`;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

/* ===================================================================
   7. CONTACT FORM SUBMISSION
   =================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('form-name')?.value || '';
    const email = document.getElementById('form-email')?.value || '';
    const subject = document.getElementById('form-subject')?.value || 'Portfolio Contact Inquiry';
    const message = document.getElementById('form-message')?.value || '';

    // Create mailto fallback link with prefilled parameters
    const mailtoUri = `mailto:sp3284251@gmail.com?subject=${encodeURIComponent(subject + ' - from ' + name)}&body=${encodeURIComponent('From: ' + name + ' (' + email + ')\n\nMessage:\n' + message)}`;

    showToast('Preparing email dispatch to sp3284251@gmail.com...');
    
    setTimeout(() => {
      window.location.href = mailtoUri;
      form.reset();
    }, 800);
  });
}

