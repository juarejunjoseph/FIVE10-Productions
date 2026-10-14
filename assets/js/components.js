(function () {
  'use strict';
  const data = window.Five10Data;
  if (!data) return;

  const headerRoot = document.getElementById('site-header');
  const footerRoot = document.getElementById('site-footer');
  const modalRoot = document.getElementById('global-modal-root');
  const currentPage = document.body.dataset.page || '';

  if (headerRoot) {
    const links = [
      { label: 'Home', href: 'index.html', page: 'home' },
      { label: 'About', href: 'about.html', page: 'about' },
      { label: 'Projects', href: 'project.html', page: 'projects' },
      { label: 'Contact Us', href: 'contact.html', page: 'contact' }
    ];
    const navLinks = links.map((item) => {
      const active = currentPage === item.page || (currentPage === 'powermac' && item.page === 'projects');
      return `<a href="${item.href}"${active ? ' aria-current="page"' : ''}>${item.label}</a>`;
    }).join('');

    headerRoot.innerHTML = `
      <header class="site-header">
        <div class="site-header__inner">
          <a href="index.html" class="site-header__brand" aria-label="Five10 Productions home">
            <img class="site-header__logo" src="assets/images/five10-logo-dark.png" alt="Five10 Productions Corp. Est. 2016" width="137" height="62">
          </a>
          <button class="site-header__toggle" type="button" aria-label="Open navigation menu" aria-expanded="false" aria-controls="primary-navigation">
            <span></span><span></span><span></span>
          </button>
          <nav class="site-header__nav" id="primary-navigation" aria-label="Main navigation" aria-hidden="false">${navLinks}</nav>
        </div>
      </header>`;
  }

  if (footerRoot) {
    footerRoot.innerHTML = `
      <footer class="site-footer">
        <div class="site-footer__grid">
          <div class="site-footer__brand">
            <a href="index.html" aria-label="Five10 Productions home">
              <img src="assets/images/five10-logo-white.png" alt="Five10 Productions Corp. Est. 2016" width="458" height="194" loading="lazy">
            </a>
          </div>
          <div class="site-footer__link-column">
            <h2>Useful Links</h2>
            <nav class="site-footer__links" aria-label="Footer navigation">
              <a href="index.html">Home</a>
              <a href="about.html">Who We Are</a>
              <a href="project.html">Projects</a>
              <a href="contact.html">Feedback</a>
            </nav>
            <h2 class="site-footer__social-heading">Follow Us on Social Media</h2>
            <div class="site-footer__social">
              <a href="https://www.facebook.com/five10productions" target="_blank" rel="noopener noreferrer" aria-label="Five10 Productions on Facebook">
                <svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="16" r="16" fill="#1877F2"/><path d="M18.1 27V17.4h3.2l.48-3.75H18.1v-2.39c0-1.09.3-1.83 1.86-1.83h1.99V6.08c-.35-.05-1.57-.15-2.99-.15-2.96 0-4.99 1.81-4.99 5.14v2.58h-3.35v3.75h3.35V27z" fill="#fff"/></svg>
              </a>
              <a href="https://www.instagram.com/five10productions/" target="_blank" rel="noopener noreferrer" aria-label="Five10 Productions on Instagram">
                <svg viewBox="0 0 32 32" aria-hidden="true"><defs><linearGradient id="five10-instagram-gradient" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#ffca55"/><stop offset=".45" stop-color="#f02b76"/><stop offset="1" stop-color="#7b45c6"/></linearGradient></defs><rect x="1" y="1" width="30" height="30" rx="8" fill="url(#five10-instagram-gradient)"/><rect x="7.3" y="7.3" width="17.4" height="17.4" rx="5" fill="none" stroke="#fff" stroke-width="2.2"/><circle cx="16" cy="16" r="4.2" fill="none" stroke="#fff" stroke-width="2.2"/><circle cx="22.1" cy="9.9" r="1.35" fill="#fff"/></svg>
              </a>
            </div>
          </div>
          <div class="site-footer__contact">
            <h2>Contact Us</h2>
            <p><strong>MAIN OFFICE</strong><span>2nd Floor, Josefina Bldg., Magallanes St., Roxas City</span><span>09123456789</span></p>
            <p><strong>SATELLITE OFFICE</strong><span>4th Floor, Exanne Bldg., One Asia Business Center, Binan, Laguna</span><span>09123456789</span></p>
            <p><strong>EMAIL:</strong><a href="mailto:${data.contactEmail}">${data.contactEmail}</a></p>
            <p><strong>OFFICE HOURS:</strong><span>7:30 AM - 6:00 PM</span></p>
          </div>
        </div>
      </footer>`;
  }

  if (modalRoot) {
    modalRoot.innerHTML = `
      <div class="contact-modal modal-backdrop" id="contact-modal" aria-hidden="true" role="dialog" aria-modal="true" aria-labelledby="contact-modal-title">
        <div class="contact-modal-panel" role="document">
          <button class="modal-close" type="button" data-close-modal aria-label="Close contact form">×</button>
          <h2 id="contact-modal-title">LET’S MAKE THINGS <em>HAPPEN!</em></h2>
          <form class="modal-contact-form" data-contact-form>
            <div class="form-row"><label for="modal-name">Name</label><input id="modal-name" name="name" autocomplete="name" required></div>
            <div class="form-row"><label for="modal-email">Email Address</label><input id="modal-email" name="email" type="email" autocomplete="email" required></div>
            <div class="form-row"><label for="modal-phone">Contact Number</label><input id="modal-phone" name="phone" autocomplete="tel" type="tel"></div>
            <div class="form-row form-row-message"><label for="modal-message">Your Message</label><textarea id="modal-message" name="message" rows="4" required></textarea></div>
            <button class="button form-submit" type="submit">Submit</button>
            <p class="form-status visually-hidden" role="status" aria-live="polite"></p>
          </form>
        </div>
      </div>
      <div class="project-modal modal-backdrop" id="project-modal" aria-hidden="true" role="dialog" aria-modal="true" aria-labelledby="project-modal-title">
        <div class="project-modal-panel" role="document">
          <button class="modal-close project-modal-close" type="button" data-close-project aria-label="Close project details">×</button>
          <button class="project-modal-arrow project-modal-prev" type="button" aria-label="Previous project">‹</button>
          <div class="project-modal-media"><img id="project-modal-image" src="" alt=""><div class="project-modal-image-count" id="project-modal-count"></div></div>
          <div class="project-modal-copy"><p class="eyebrow" id="project-modal-client"></p><h2 id="project-modal-title"></h2><p class="project-modal-location" id="project-modal-location"></p><p id="project-modal-description"></p><div class="tag-list" id="project-modal-tags"></div><a class="button button-light project-modal-link" id="project-modal-link" href="project.html">Explore related work</a></div>
          <button class="project-modal-arrow project-modal-next" type="button" aria-label="Next project">›</button>
        </div>
      </div>`;
  }
})();
