(function () {
  'use strict';
  const data = window.Five10Data;
  if (!data) return;

  const byId = (id) => document.getElementById(id);
  const esc = (value = '') => String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
  const projectById = (id) => data.projects.find((project) => project.id === id);
  const projectTags = (project) => (project.tags || []).map((tag) => `<span class="project-tag">${esc(tag)}</span>`).join('');

  function renderClientLogos() {
    const logoRows = [
      {
        src: 'assets/images/client-logos-row-1.png',
        alt: 'SM Cares, SMDC, IMAX with Laser, SM Cinema, SM Prime Holdings, Robinsons, Global Youth Summit, United Architects of the Philippines, and Kenny Rogers Roasters'
      },
      {
        src: 'assets/images/client-logos-row-2.png',
        alt: 'Pueblo de Panay, 2GO, Ayala Malls, Ayala Center, Santan, Global Peace Foundation, Plantanan, APPTech, Pepsi, and other partner logos'
      }
    ];
    const makeGroup = (hidden = false) => {
      const images = logoRows.map((logo) =>
        `<img class="client-logo-image" src="${logo.src}" alt="${esc(logo.alt)}" loading="lazy" decoding="async">`
      ).join('');
      return `<div class="logo-group"${hidden ? ' aria-hidden="true"' : ''}>${images}</div>`;
    };

    document.querySelectorAll('#client-logo-track').forEach((track) => {
      // Two identical groups create a seamless loop when the track translates by -50%.
      track.innerHTML = `${makeGroup()}${makeGroup(true)}`;
    });
  }

  function renderHeroGallery() {
    const wrapper = byId('home-gallery-slides');
    if (!wrapper || !Array.isArray(data.heroGallerySlides)) return;
    wrapper.innerHTML = data.heroGallerySlides.map((slide, index) => `
      <div class="swiper-slide"><img class="home-gallery-image" src="${esc(slide.image)}" alt="${esc(slide.alt || 'Five10 event photography')}" ${index === 0 ? 'fetchpriority="high"' : 'loading="lazy"'}></div>
    `).join('');
  }

  function renderFeaturedSlides() {
    const wrapper = byId('featured-slides');
    if (!wrapper) return;
    const projectsPage = document.body.dataset.page === 'projects';
    const featuredSlideIds = projectsPage ? ['airasia-philippines', 'power-mac-center'] : data.featuredSlides;
    const slides = featuredSlideIds.map((id) => projectById(id)).filter(Boolean);
    wrapper.innerHTML = slides.map((project) => {
      const imageSource = projectsPage && project.id === 'power-mac-center' ? 'assets/images/pmc pic 1.png' : esc(project.image);
      const imageAlt = projectsPage && project.id === 'power-mac-center' ? 'Power Mac Center store team' : esc(project.title);
      const imageMarkup = projectsPage
        ? project.id === 'power-mac-center'
          ? `<a class="featured-image-button featured-image-button-reference" href="powermac.html" aria-label="Open Power Mac Center projects"><img src="${imageSource}" alt="${imageAlt}" loading="lazy"></a>`
          : `<div class="featured-image-button featured-image-button-reference"><img src="${imageSource}" alt="${imageAlt}" loading="lazy"></div>`
        : `<a class="featured-image-button featured-image-button-reference" href="project.html" aria-label="View all projects"><img src="${imageSource}" alt="${imageAlt}" loading="lazy"></a>`;
      const clientLogo = project.id === 'airasia-philippines'
        ? '<img class="projects-featured-caption__logo projects-featured-caption__logo--airasia" src="assets/images/AirAsia_logo_text 1.png" alt="AirAsia">'
        : '<img class="projects-featured-caption__logo projects-featured-caption__logo--pmc" src="assets/images/PMC logo transparent 1.png" alt="Power Mac Center">';
      const logoMarkup = project.id === 'power-mac-center' ? `<a class="projects-featured-caption__logo-link" href="powermac.html" aria-label="Open Power Mac Center projects">${clientLogo}</a>` : clientLogo;
      const captionMarkup = projectsPage
        ? `<div class="projects-featured-caption">${logoMarkup}<span class="projects-featured-caption__client">${esc(project.client)}</span><div class="projects-featured-caption__tags${project.id === 'power-mac-center' ? ' projects-featured-caption__tags--pmc' : ''}">${(project.id === 'power-mac-center' ? ['Fabrication', 'Store Opening', 'Merchandise', 'Booth Setup'] : project.tags).map((tag) => `<span class="project-tag">#${esc(tag)}</span>`).join('')}</div></div>`
        : `<div class="featured-slide-caption-reference"><h3>AirAsia Fiesta: Iloilo Dinagyang 2026</h3><p><span class="location-pin" aria-hidden="true"><img src="assets/images/map-pin.png" alt=""></span> Iloilo City.</p></div>`;
      return `<div class="swiper-slide"><article class="featured-slide-card-reference">${imageMarkup}${projectsPage ? '' : '<a class="featured-event-badge" href="project.html" aria-label="See all events"><span class="featured-event-badge__label">See All<br>Events</span></a>'}${captionMarkup}</article></div>`;
    }).join('');
  }

  function projectCard(project, index) {
    return `<article class="project-card reveal" style="--card-index:${index % 4}">
      <button class="project-card-image" type="button" data-open-project="${esc(project.id)}" aria-label="View ${esc(project.title)} details"><img src="${esc(project.image)}" alt="${esc(project.title)} event placeholder" loading="lazy"><span class="project-card-number">${String(index + 1).padStart(2, '0')}</span><span class="project-card-open">Explore ↗</span></button>
      <div class="project-card-text"><p class="eyebrow">${esc(project.client)} · ${esc(project.category)}</p><h3><button type="button" data-open-project="${esc(project.id)}">${esc(project.title)}</button></h3><p>${esc(project.excerpt)}</p><div class="project-card-tags">${projectTags(project).split('</span>').slice(0, 3).filter(Boolean).map((tag) => `${tag}</span>`).join('')}</div>${project.href ? `<a class="text-link" href="${esc(project.href)}">View client work <span aria-hidden="true">↗</span></a>` : `<button class="text-link text-button" type="button" data-open-project="${esc(project.id)}">View project <span aria-hidden="true">↗</span></button>`}</div>
    </article>`;
  }

  function renderHomeProjects() {
    const grid = byId('home-project-grid');
    if (!grid) return;
    grid.innerHTML = data.projects.slice(0, 3).map(projectCard).join('');
  }

  function renderAllProjects(filter = 'All') {
    const grid = byId('all-projects-grid');
    const filterRoot = byId('project-filters');
    if (!grid || !filterRoot) return;
    const categories = ['All', ...new Set(data.projects.map((project) => project.category))];
    filterRoot.innerHTML = categories.map((category) => `<button type="button" class="filter-chip${category === filter ? ' is-active' : ''}" data-project-filter="${esc(category)}" aria-pressed="${category === filter}">${esc(category)}</button>`).join('');
    const items = filter === 'All' ? data.projects : data.projects.filter((project) => project.category === filter);
    grid.innerHTML = items.map(projectCard).join('');
    observeReveals(grid);
  }

  function renderPowerMacSections() {
    const root = byId('powermac-work-list');
    if (!root) return;
    root.innerHTML = data.powerMacSections.map((item) => {
      const hasOverlay = Boolean(item.secondaryImage);
      const photo = `<figure class="powermac-work-photo${hasOverlay ? ' has-hover-overlay' : ''}"${hasOverlay ? ' tabindex="0" aria-label="Booth Setup photo. Hover or focus to preview the alternate booth image."' : ''}><img class="powermac-work-photo__base" src="${esc(item.image)}" alt="${esc(item.title)} at Power Mac Center" loading="lazy">${hasOverlay ? `<img class="powermac-work-photo__overlay" src="${esc(item.secondaryImage)}" alt="Alternate booth setup rendering" loading="lazy">` : ''}</figure>`;
      const media = `<div class="powermac-work-media">${photo}<p class="powermac-work-caption"><strong>${esc(item.title === 'Booth Setup' ? 'POWER MAC CENTER Booth - GORunClark' : item.title === 'Store Activations' ? 'POWER MAC CENTER × UnionBank' : 'POWER MAC CENTER')}</strong><span>${esc(item.location)}</span></p></div>`;
      const copy = `<div class="powermac-work-copy"><h2>${esc(item.title)}</h2><p>${esc(item.text)}</p></div>`;
      return `<article class="powermac-work-row ${esc(item.side)}" id="${esc(item.id)}">${item.side === 'image-right' ? `${copy}${media}` : `${media}${copy}`}</article>`;
    }).join('');
  }

  document.querySelectorAll('[data-contact-email]').forEach((link) => {
    link.textContent = data.contactEmail;
    link.href = `mailto:${data.contactEmail}`;
  });

  renderClientLogos();
  renderHeroGallery();
  renderFeaturedSlides();
  renderHomeProjects();
  renderAllProjects();
  renderPowerMacSections();

  if (window.Swiper && byId('home-gallery-slides')) {
    new Swiper('.home-gallery-swiper', {
      loop: true,
      effect: 'fade',
      fadeEffect: { crossFade: true },
      speed: 1000,
      autoplay: { delay: 4800, disableOnInteraction: false, pauseOnMouseEnter: true },
      allowTouchMove: true,
      a11y: { enabled: true }
    });
  }

  if (window.Swiper && byId('featured-slides')) {
    new Swiper('.featured-swiper', {
      loop: true,
      effect: 'fade',
      fadeEffect: { crossFade: true },
      speed: 700,
      autoplay: document.body.dataset.page === 'projects' ? { delay: 1500, disableOnInteraction: false, pauseOnMouseEnter: true } : { delay: 4200, disableOnInteraction: false, pauseOnMouseEnter: true },
      keyboard: { enabled: true },
      navigation: { nextEl: '.featured-next', prevEl: '.featured-prev' },
      a11y: { enabled: true }
    });
  }

  const menuToggle = document.querySelector('.site-header__toggle, .menu-toggle');
  const menuPanel = document.querySelector('.site-header__nav, .menu-panel');
  if (menuPanel) menuPanel.setAttribute('aria-hidden', 'true');
  function setMenuOpen(open) {
    if (!menuToggle || !menuPanel) return;
    menuToggle.classList.toggle('is-open', open);
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
    menuPanel.classList.toggle('is-open', open);
    menuPanel.setAttribute('aria-hidden', String(!open));
    document.body.classList.toggle('menu-open', open);
  }
  if (menuToggle) menuToggle.addEventListener('click', () => setMenuOpen(menuToggle.getAttribute('aria-expanded') !== 'true'));
  if (menuPanel) menuPanel.addEventListener('click', (event) => {
    if (event.target.closest('a')) setMenuOpen(false);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuToggle && menuToggle.getAttribute('aria-expanded') === 'true') {
      setMenuOpen(false);
      menuToggle.focus();
    }
  });

  function observeReveals(scope = document) {
    const nodes = scope.querySelectorAll ? scope.querySelectorAll('.reveal:not(.is-visible)') : [];
    if (!('IntersectionObserver' in window)) {
      nodes.forEach((node) => node.classList.add('is-visible'));
      return;
    }
    if (!window.five10RevealObserver) {
      window.five10RevealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    }
    nodes.forEach((node) => window.five10RevealObserver.observe(node));
  }
  observeReveals();

  let lastFocusedElement = null;
  const contactModal = byId('contact-modal');
  const projectModal = byId('project-modal');
  function showModal(modal) {
    if (!modal) return;
    lastFocusedElement = document.activeElement;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    const focusable = modal.querySelector('input, textarea, button, a[href]');
    window.setTimeout(() => focusable && focusable.focus(), 50);
  }
  function hideModal(modal) {
    if (!modal) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    if (!document.querySelector('.modal-backdrop.is-open')) document.body.classList.remove('modal-open');
    if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') lastFocusedElement.focus();
  }

  document.addEventListener('click', (event) => {
    if (event.target.closest('[data-open-contact]')) {
      setMenuOpen(false);
      showModal(contactModal);
    }
    if (event.target.closest('[data-close-modal]')) hideModal(contactModal);
    if (event.target === contactModal) hideModal(contactModal);
    if (event.target.closest('[data-close-project]')) hideModal(projectModal);
    if (event.target === projectModal) hideModal(projectModal);

    const projectButton = event.target.closest('[data-open-project]');
    if (projectButton) openProjectModal(projectButton.getAttribute('data-open-project'));

    const filterButton = event.target.closest('[data-project-filter]');
    if (filterButton) renderAllProjects(filterButton.getAttribute('data-project-filter'));

    const flipButton = event.target.closest('.flip-trigger');
    if (flipButton) {
      const card = flipButton.previousElementSibling;
      const flipped = card.classList.toggle('is-flipped');
      flipButton.setAttribute('aria-pressed', String(flipped));
      const label = flipButton.querySelector('span');
      if (label) label.textContent = flipped ? 'View primary photo' : 'View alternate photo';
    }
  });

  let activeProjectIndex = 0;
  function openProjectModal(projectId) {
    const index = data.projects.findIndex((project) => project.id === projectId);
    if (index < 0) return;
    activeProjectIndex = index;
    updateProjectModal();
    showModal(projectModal);
  }
  function updateProjectModal() {
    const project = data.projects[activeProjectIndex];
    if (!project || !projectModal) return;
    byId('project-modal-image').src = project.image;
    byId('project-modal-image').alt = `${project.title} placeholder image`;
    byId('project-modal-client').textContent = project.client;
    byId('project-modal-title').textContent = project.title;
    byId('project-modal-location').textContent = project.location;
    byId('project-modal-description').textContent = project.description;
    byId('project-modal-tags').innerHTML = projectTags(project);
    byId('project-modal-count').textContent = `${String(activeProjectIndex + 1).padStart(2, '0')} / ${String(data.projects.length).padStart(2, '0')}`;
    const link = byId('project-modal-link');
    link.href = project.href || 'project.html';
    link.textContent = project.href ? 'View client page ↗' : 'Explore all projects ↗';
  }
  function stepProject(direction) {
    activeProjectIndex = (activeProjectIndex + direction + data.projects.length) % data.projects.length;
    updateProjectModal();
  }
  const prevProject = document.querySelector('.project-modal-prev');
  const nextProject = document.querySelector('.project-modal-next');
  if (prevProject) prevProject.addEventListener('click', () => stepProject(-1));
  if (nextProject) nextProject.addEventListener('click', () => stepProject(1));

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      hideModal(contactModal);
      hideModal(projectModal);
      setMenuOpen(false);
    }
    if (event.key === 'ArrowLeft' && projectModal && projectModal.classList.contains('is-open')) stepProject(-1);
    if (event.key === 'ArrowRight' && projectModal && projectModal.classList.contains('is-open')) stepProject(1);
  });

  document.querySelectorAll('[data-contact-form]').forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const values = new FormData(form);
      const name = String(values.get('name') || '').trim();
      const email = String(values.get('email') || '').trim();
      const phone = String(values.get('phone') || '').trim();
      const message = String(values.get('message') || '').trim();
      const subject = `Five10 website enquiry — ${name}`;
      const body = [`Name: ${name}`, `Email: ${email}`, `Contact number: ${phone || 'Not provided'}`, '', 'Message:', message].join('\n');
      const destination = data.contactEmail || 'hello@five10productions.com';
      const mailto = `mailto:${destination}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      const status = form.querySelector('.form-status');
      if (status) status.textContent = 'Opening your email application with the message details. Please send the email to complete your enquiry.';
      window.location.href = mailto;
    });
  });

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      const targetId = anchor.getAttribute('href');
      if (!targetId || targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        event.preventDefault();
        target.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
      }
    });
  });
})();
