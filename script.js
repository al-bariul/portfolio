document.addEventListener('DOMContentLoaded', () => {

  // --- 2. NAVBAR SCROLL EFFECT & ACTIVE LINK HIGHLIGHTING ---
  const headerEl = document.getElementById('header');
  const sections = document.querySelectorAll('section[id]');
  const desktopNavLinks = document.querySelectorAll('.desktop-nav .nav-link');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  function handleScroll() {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;

    // Header glass background on scroll
    if (scrollY > 50) {
      headerEl.classList.add('scrolled');
    } else {
      headerEl.classList.remove('scrolled');
    }

    // Active Section Spy
    let currentSectionId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    if (currentSectionId) {
      desktopNavLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
          link.classList.add('active');
        }
      });
      mobileNavLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
          link.classList.add('active');
        }
      });
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();


  // --- 3. MOBILE MENU DRAWER TOGGLE ---
  const mobileToggleBtn = document.getElementById('mobile-menu-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');

  function toggleMobileMenu() {
    const isActive = mobileDrawer.classList.toggle('active');
    mobileToggleBtn.classList.toggle('active', isActive);
    mobileToggleBtn.setAttribute('aria-expanded', isActive);
    document.body.style.overflow = isActive ? 'hidden' : '';
  }

  function closeMobileMenu() {
    mobileDrawer.classList.remove('active');
    mobileToggleBtn.classList.remove('active');
    mobileToggleBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (mobileToggleBtn) {
    mobileToggleBtn.addEventListener('click', toggleMobileMenu);
  }

  // Close when clicking mobile links
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // Close when clicking outside drawer
  document.addEventListener('click', (e) => {
    if (mobileDrawer.classList.contains('active') &&
        !mobileDrawer.contains(e.target) &&
        !mobileToggleBtn.contains(e.target)) {
      closeMobileMenu();
    }
  });


  // --- 4. DETAILED PROJECTS DATA & MODAL LOGIC ---
  const projectDatabase = {
    'toy-topia': {
      title: 'Toy-Topia: Supporting Local Sellers',
      subtitle: 'Full-Featured Marketplace for Local Artisans & Toy Makers',
      tags: ['React.js', 'Firebase', 'DaisyUI', 'React Router'],
      liveLink: 'https://toy-topia-3f784.web.app/',
      githubLink: 'https://github.com/al-bariul/Toy-ToPia',
      stack: ['React (v18)', 'JavaScript (ES6+)', 'Firebase Auth & DB', 'React Router DOM', 'Tailwind CSS', 'DaisyUI'],
      description: `
        <p><strong>Toy-Topia</strong> is a dedicated web platform designed to empower local toy makers and independent sellers. It features a modern, fluid user interface and robust client-side routing tailored for both shoppers and sellers.</p>
        <ul>
          <li><strong>Secure Routes:</strong> Protected toy item details and seller profile dashboards with role-aware route guards.</li>
          <li><strong>Smart Authentication:</strong> Google and Email/Password authentication with real-time input validation.</li>
          <li><strong>Dynamic Profiles:</strong> Direct updates to user profile information, display name, and avatar using Firebase <code>updateProfile</code>.</li>
          <li><strong>Ultra-Responsive:</strong> Fluid layouts engineered for mobile, tablet, desktop, and ultra-wide displays.</li>
        </ul>
      `,
      challenges: `
        <p>One of the primary challenges was managing authentication state synchronization across reloads to prevent premature redirects away from protected routes. This was resolved by implementing an authentication state observer with a graceful loading skeleton.</p>
        <p>Additionally, organizing Firebase CRUD operations for local seller listings required careful data modeling to keep queries performant and UI state in sync without unnecessary re-renders.</p>
      `,
      future: `
        <ul>
          <li>Integrate Stripe / SSLCommerz payment gateway for direct online transactions.</li>
          <li>Real-time chat messaging between buyers and local sellers via Firebase Firestore / WebSockets.</li>
          <li>Customer review and star-rating system with verified buyer badges.</li>
          <li>Automated inventory management alerts for sellers.</li>
        </ul>
      `
    },
    'payooo': {
      title: 'Payooo – Simple Online Mobile Banking Web App',
      subtitle: 'Interactive Fintech Simulation with Real-Time DOM State Logic',
      tags: ['JavaScript (ES6+)', 'Tailwind CSS', 'DaisyUI', 'DOM Manipulation'],
      liveLink: 'https://al-bariul.github.io/payoo-mobile-banking/',
      githubLink: 'https://github.com/al-bariul/payoo-mobile-banking',
      stack: ['HTML5', 'Tailwind CSS', 'DaisyUI', 'Vanilla JavaScript (ES6+)', 'DOM API'],
      description: `
        <p><strong>Payooo</strong> is an interactive online mobile banking application mimicking a modern fintech mobile wallet (such as bKash or Nagad). It focuses purely on responsive UI design and robust client-side state manipulation.</p>
        <ul>
          <li><strong>Dynamic Balance Updates:</strong> Instant calculations for Add Money, Cash Out, and Transfer Money without requiring page reloads.</li>
          <li><strong>Interactive Section Toggling:</strong> Clean tab state transitions between dashboard sections using efficient DOM manipulation.</li>
          <li><strong>UI State Management:</strong> Show/hide logic, active button state toggles, and transaction history logging.</li>
          <li><strong>Validation & Security Flow:</strong> Account number formatting and 4-digit PIN verification simulations with feedback alerts.</li>
        </ul>
      `,
      challenges: `
        <p>Building a multi-screen mobile experience with complete transaction logic using vanilla JavaScript without a reactive framework required strict separation of UI handlers and calculation logic.</p>
        <p>Ensuring input validation against invalid balance subtractions, empty fields, and incorrect PINs was solved with comprehensive validation helpers and live user alerts.</p>
      `,
      future: `
        <ul>
          <li>Connect with a Node.js / Express backend with JWT session management.</li>
          <li>Downloadable PDF transaction receipts with timestamp verification.</li>
          <li>Multi-currency support and interactive monthly spending analytics charts.</li>
          <li>Biometric mock login (FaceID / Fingerprint) for web mobile users.</li>
        </ul>
      `
    },
    'green-earth': {
      title: 'Green Earth – Frontend Web Application',
      subtitle: 'Dynamic Environmental & Eco-Friendly Platform with External REST API',
      tags: ['HTML5', 'Tailwind CSS', 'JavaScript (ES6+)', 'REST APIs'],
      liveLink: 'https://glowing-monstera-2a0d33.netlify.app/',
      githubLink: 'https://github.com/al-bariul',
      stack: ['HTML5', 'Tailwind CSS', 'JavaScript (ES6+)', 'Fetch API', 'Netlify Deployment'],
      description: `
        <p><strong>Green Earth</strong> is a modern frontend web application built to champion environmental sustainability and plant care. It connects users with dynamic botanical and ecological information through clean UI architecture.</p>
        <ul>
          <li><strong>External API Integration:</strong> Asynchronously queries third-party REST APIs to fetch and render dynamic environmental datasets.</li>
          <li><strong>Clean & Interactive UI:</strong> Aesthetic nature-inspired design with modern typography and interactive card layouts.</li>
          <li><strong>JavaScript DOM Logic:</strong> Dynamic client-side filtering, search queries, and content rendering without heavy library overhead.</li>
          <li><strong>Full Responsiveness:</strong> Fully optimized across mobile, tablet, and desktop screens for fast load times.</li>
        </ul>
      `,
      challenges: `
        <p>Handling API latency, rate limits, and asynchronous states (loading spinners and error fallbacks) was key to ensuring a smooth user experience even on slower connections.</p>
        <p>Responsive design was tailored to ensure visual consistency across complex responsive grid layouts without overflow issues.</p>
      `,
      future: `
        <ul>
          <li>Add an e-commerce checkout flow for purchasing eco-friendly saplings, seeds, and pots.</li>
          <li>Integrate an interactive plant care guide with water reminder notifications.</li>
          <li>Community blog and discussion forum for green enthusiasts.</li>
          <li>Dark / Light theme toggle with custom botanical accent color palettes.</li>
        </ul>
      `
    }
  };

  const modalBackdrop = document.getElementById('project-modal-backdrop');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalTitle = document.getElementById('modal-title');
  const modalSubtitle = document.getElementById('modal-subtitle');
  const modalTags = document.getElementById('modal-tags');
  const modalLiveLink = document.getElementById('modal-live-link');
  const modalGithubLink = document.getElementById('modal-github-link');
  const modalTechStack = document.getElementById('modal-tech-stack');
  const modalDescription = document.getElementById('modal-description');
  const modalChallenges = document.getElementById('modal-challenges');
  const modalFuture = document.getElementById('modal-future');

  function openProjectModal(projectId) {
    const project = projectDatabase[projectId];
    if (!project) return;

    modalTitle.textContent = project.title;
    modalSubtitle.textContent = project.subtitle;

    // Tags
    modalTags.innerHTML = project.tags.map(tag => `<span class="tech-tag">${tag}</span>`).join('');

    // Links
    modalLiveLink.href = project.liveLink;
    modalGithubLink.href = project.githubLink;

    // Tech stack pills
    modalTechStack.innerHTML = project.stack.map(s => `<span class="modal-pill">${s}</span>`).join('');

    // Sections
    modalDescription.innerHTML = project.description;
    modalChallenges.innerHTML = project.challenges;
    modalFuture.innerHTML = project.future;

    // Open modal
    modalBackdrop.classList.add('active');
    modalBackdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeProjectModal() {
    modalBackdrop.classList.remove('active');
    modalBackdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Open modal on button click
  document.querySelectorAll('.open-modal-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const projectId = btn.getAttribute('data-project');
      openProjectModal(projectId);
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeProjectModal);
  }

  // Close modal when clicking backdrop
  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) {
        closeProjectModal();
      }
    });
  }

  // Close modal on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (modalBackdrop.classList.contains('active')) {
        closeProjectModal();
      }
      if (mobileDrawer.classList.contains('active')) {
        closeMobileMenu();
      }
    }
  });


  // --- 5. CONTACT FORM INTERACTIVE FEEDBACK ---
  const contactForm = document.getElementById('contact-form');
  const formFeedback = document.getElementById('form-feedback');
  const submitBtn = document.getElementById('submit-btn');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('form-name').value.trim();
      const email = document.getElementById('form-email').value.trim();
      const subject = document.getElementById('form-subject').value.trim();
      const message = document.getElementById('form-message').value.trim();

      if (!name || !email || !message) {
        formFeedback.className = 'form-feedback error';
        formFeedback.textContent = 'Please fill in all required fields.';
        return;
      }

      // Simulate sending
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> <span>Sending...</span>';

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fa-regular fa-paper-plane"></i> <span>Send Message</span>';
        formFeedback.className = 'form-feedback success';
        formFeedback.innerHTML = `<strong>Thank you, ${name}!</strong> Your message has been prepared. You can also reach me directly at <a href="mailto:albariul475@gmail.com" style="text-decoration:underline;">albariul475@gmail.com</a>.`;
        contactForm.reset();

        // Also offer to open default email client with prefilled details
        const mailtoUrl = `mailto:albariul475@gmail.com?subject=${encodeURIComponent(subject || 'Portfolio Inquiry')}&body=${encodeURIComponent(`Hi Al Bariul,\n\nName: ${name}\nEmail: ${email}\n\n${message}`)}`;
        window.location.href = mailtoUrl;
      }, 1000);
    });
  }


  // --- 6. FOOTER COPYRIGHT YEAR & BACK TO TOP ---
  const currentYearEl = document.getElementById('current-year');
  if (currentYearEl) {
    currentYearEl.textContent = new Date().getFullYear();
  }

  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

});
