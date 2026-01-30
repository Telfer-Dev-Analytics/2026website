(function () {
  'use strict';

  function applyTheme(theme) {
    var doc = document.documentElement;
    doc.setAttribute('data-theme', theme);
    var logoLight = 'assets/logo-light.png';
    var logoSrc = logoLight;
    document.querySelectorAll('.logo-img, .hero-logo-img, .footer-logo-img').forEach(function (img) {
      if (img) img.src = logoSrc;
    });
    try { localStorage.setItem('bta-theme', theme); } catch (e) {}
  }

  var savedTheme = null;
  try {
    savedTheme = localStorage.getItem('bta-theme');
  } catch (e) {}
  applyTheme(savedTheme === 'light' || savedTheme === 'dark' ? savedTheme : 'dark');

  function syncThemePanel(theme) {
    document.querySelectorAll('.theme-option').forEach(function (btn) {
      var btnTheme = btn.getAttribute('data-theme');
      btn.classList.toggle('active', btnTheme === theme);
      btn.setAttribute('aria-pressed', btnTheme === theme);
    });
  }

  var preferencesBtn = document.querySelector('.preferences-btn');
  var preferencesPanel = document.getElementById('preferences-panel');
  if (preferencesBtn && preferencesPanel) {
    preferencesBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = preferencesPanel.classList.toggle('is-open');
      preferencesBtn.setAttribute('aria-expanded', open);
      preferencesPanel.setAttribute('aria-hidden', !open);
    });
    document.addEventListener('click', function () {
      preferencesPanel.classList.remove('is-open');
      preferencesBtn.setAttribute('aria-expanded', 'false');
      preferencesPanel.setAttribute('aria-hidden', 'true');
    });
    preferencesPanel.addEventListener('click', function (e) { e.stopPropagation(); });
  }

  document.querySelectorAll('.theme-option').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var theme = btn.getAttribute('data-theme');
      if (theme) {
        applyTheme(theme);
        syncThemePanel(theme);
      }
    });
  });

  syncThemePanel(document.documentElement.getAttribute('data-theme') || 'dark');

  // ----- Mobile nav -----
  var navToggle = document.querySelector('.nav-toggle');
  var navLinks = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      navToggle.classList.toggle('is-open');
      navLinks.classList.toggle('is-open');
      document.body.style.overflow = navLinks.classList.contains('is-open') ? 'hidden' : '';
    });

    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navToggle.classList.remove('is-open');
        navLinks.classList.remove('is-open');
        document.body.style.overflow = '';
      });
    });
  }

  // ----- Scroll reveal -----
  var revealOptions = { rootMargin: '0px 0px -60px 0px', threshold: 0.1 };
  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal');
      }
    });
  }, revealOptions);

  document.querySelectorAll('.section').forEach(function (el) { revealObserver.observe(el); });
  document.querySelectorAll('.who-card, .team-card, .event-card, .faq-item').forEach(function (el) {
    revealObserver.observe(el);
  });

  // ----- Nav active section -----
  var sections = document.querySelectorAll('.section[id]');
  var navLinksList = document.querySelectorAll('.nav-link');

  function setActiveNav() {
    var scrollY = window.pageYOffset;
    var headerHeight = document.querySelector('.header') ? document.querySelector('.header').offsetHeight : 60;

    var current = '';
    sections.forEach(function (section) {
      var top = section.offsetTop - headerHeight;
      var height = section.offsetHeight;
      if (scrollY >= top && scrollY < top + height) {
        current = section.getAttribute('id');
      }
    });

    navLinksList.forEach(function (link) {
      var href = link.getAttribute('href');
      if (href && href.startsWith('#') && href.slice(1) === current) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  window.addEventListener('scroll', setActiveNav);
  setActiveNav();

  // ----- Back to top -----
  var backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    var backToTopObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        backToTop.classList.toggle('is-visible', !entry.isIntersecting);
      });
    }, { threshold: 0.1 });

    var hero = document.querySelector('.hero');
    if (hero) backToTopObserver.observe(hero);

    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ----- Konami code easter egg -----
  var konami = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
  var konamiIndex = 0;
  var toast = document.getElementById('easter-toast');

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.removeAttribute('hidden');
    toast.classList.add('is-visible');
    setTimeout(function () {
      toast.classList.remove('is-visible');
      setTimeout(function () { toast.setAttribute('hidden', ''); }, 300);
    }, 3000);
  }

  document.addEventListener('keydown', function (e) {
    if (e.code === konami[konamiIndex]) {
      konamiIndex++;
      if (konamiIndex === konami.length) {
        konamiIndex = 0;
        showToast('BTA loves you 💜');
      }
    } else {
      konamiIndex = 0;
    }
  });

  // ----- Logo click counter (5 clicks = mini easter egg) -----
  var logo = document.querySelector('.logo');
  var logoClicks = 0;
  var logoReset = 0;
  if (logo) {
    logo.addEventListener('click', function (e) {
      e.preventDefault();
      logoClicks++;
      clearTimeout(logoReset);
      logoReset = setTimeout(function () { logoClicks = 0; }, 1000);
      if (logoClicks >= 5) {
        logoClicks = 0;
        showToast('You found the node 🟣');
      }
    });
  }

  // ----- Companies carousel -----
  var companiesCarousel = document.querySelector('.companies-carousel');
  if (companiesCarousel) {
    var companiesTrack = companiesCarousel.querySelector('.companies-track');
    var companySlides = companiesCarousel.querySelectorAll('.company-slide');
    var companiesPrev = companiesCarousel.querySelector('.companies-prev');
    var companiesNext = companiesCarousel.querySelector('.companies-next');
    var companiesViewport = companiesCarousel.querySelector('.companies-viewport');
    var companiesIndex = 0;
    var companiesTotal = companySlides.length;
    var companiesVisible = 4;

    function getCompaniesVisible() {
      return window.innerWidth <= 699 ? 2 : 4;
    }

    function companiesGoTo(i) {
      companiesVisible = getCompaniesVisible();
      var maxIndex = Math.max(0, companiesTotal - companiesVisible);
      companiesIndex = Math.max(0, Math.min(i, maxIndex));
      if (companySlides.length && companySlides[0]) {
        var slideWidth = companySlides[0].offsetWidth;
        var gap = 20;
        companiesTrack.style.transform = 'translateX(-' + (companiesIndex * (slideWidth + gap)) + 'px)';
      }
    }

    if (companiesPrev) companiesPrev.addEventListener('click', function () { companiesGoTo(companiesIndex - 1); });
    if (companiesNext) companiesNext.addEventListener('click', function () { companiesGoTo(companiesIndex + 1); });
    window.addEventListener('resize', function () { companiesGoTo(companiesIndex); });
  }

  // ----- Photos carousel (multiple images per view) -----
  var carousel = document.querySelector('.carousel');
  if (carousel) {
    var track = carousel.querySelector('.carousel-track');
    var slides = carousel.querySelectorAll('.carousel-slide');
    var prevBtn = carousel.querySelector('.carousel-prev');
    var nextBtn = carousel.querySelector('.carousel-next');
    var dotsEl = carousel.querySelector('.carousel-dots');
    var carouselIndex = 0;
    var totalSlides = slides.length;
    var carouselGap = 16;

    function getPhotosVisible() {
      var w = window.innerWidth;
      if (w < 500) return 1;
      if (w < 900) return 2;
      return 3;
    }

    function photosCarouselGoTo(i) {
      var visible = getPhotosVisible();
      var maxIndex = Math.max(0, totalSlides - visible);
      carouselIndex = Math.max(0, Math.min(i, maxIndex));
      if (track && slides.length && slides[0]) {
        var slideWidth = slides[0].offsetWidth;
        track.style.transform = 'translateX(-' + (carouselIndex * (slideWidth + carouselGap)) + 'px)';
      }
      if (dotsEl) {
        dotsEl.querySelectorAll('.carousel-dot').forEach(function (dot, idx) {
          dot.classList.toggle('is-active', idx === carouselIndex);
          dot.setAttribute('aria-selected', idx === carouselIndex);
        });
      }
    }

    if (dotsEl && totalSlides > 0) {
      for (var d = 0; d < totalSlides; d++) {
        var dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'carousel-dot' + (d === 0 ? ' is-active' : '');
        dot.setAttribute('role', 'tab');
        dot.setAttribute('aria-label', 'Photo ' + (d + 1));
        dot.setAttribute('aria-selected', d === 0);
        (function (idx) {
          dot.addEventListener('click', function () { photosCarouselGoTo(idx); });
        })(d);
        dotsEl.appendChild(dot);
      }
    }

    if (prevBtn) prevBtn.addEventListener('click', function () { photosCarouselGoTo(carouselIndex - 1); });
    if (nextBtn) nextBtn.addEventListener('click', function () { photosCarouselGoTo(carouselIndex + 1); });

    carousel.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') { e.preventDefault(); photosCarouselGoTo(carouselIndex - 1); }
      if (e.key === 'ArrowRight') { e.preventDefault(); photosCarouselGoTo(carouselIndex + 1); }
    });

    window.addEventListener('resize', function () { photosCarouselGoTo(carouselIndex); });

    // ----- Photo lightbox (click image to enlarge) -----
    var lightbox = document.getElementById('photo-lightbox');
    var lightboxImg = lightbox && lightbox.querySelector('.photo-lightbox-img');
    var lightboxClose = lightbox && lightbox.querySelector('.photo-lightbox-close');
    var lightboxBackdrop = lightbox && lightbox.querySelector('.photo-lightbox-backdrop');

    function openPhotoLightbox(src) {
      if (!lightbox || !lightboxImg) return;
      lightboxImg.src = src;
      lightbox.setAttribute('aria-hidden', 'false');
      lightbox.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }

    function closePhotoLightbox() {
      if (!lightbox) return;
      lightbox.setAttribute('aria-hidden', 'true');
      lightbox.classList.remove('is-open');
      document.body.style.overflow = '';
    }

    slides.forEach(function (slide) {
      var img = slide.querySelector('img');
      if (img) {
        slide.addEventListener('click', function () {
          openPhotoLightbox(img.src);
        });
      }
    });

    if (lightboxClose) lightboxClose.addEventListener('click', closePhotoLightbox);
    if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closePhotoLightbox);

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && lightbox && lightbox.classList.contains('is-open')) {
        closePhotoLightbox();
      }
    });
  }
})();
