(function () {
  'use strict';

  // ----- Translations (EN / Canadian French) -----
  var translations = {
    en: {
      'nav.who': 'Who We Are',
      'nav.events': 'Events',
      'nav.team': 'The Team',
      'nav.photos': 'Photos',
      'nav.faq': 'FAQ',
      'hero.tagline': 'Where business meets technology. Connect, learn, and lead.',
      'hero.learnMore': 'Learn More',
      'who.title': 'Who We Are',
      'who.missionTitle': 'Our Mission',
      'who.missionText': 'BTA bridges the gap between business strategy and technology. We help members understand how tech drives growth, innovation, and efficiency in the modern workplace.',
      'who.whatTitle': 'What We Do',
      'who.whatText': 'Workshops, speaker events, hackathons, and networking. We explore AI, data, automation, and digital transformation—always with a business lens.',
      'who.forTitle': "Who It's For",
      'who.forText': 'Students and professionals who care about the intersection of business and tech. No coding required—curiosity and ambition are enough.',
      'events.title': 'Upcoming Events',
      'events.subtitle': 'Winter 2026',
      'team.title': 'The Team',
      'team.subtitle': 'The people behind BTA',
      'companies.title': "Companies We've Worked With",
      'companies.subtitle': 'Partners and sponsors',
      'photos.title': 'Fun Photos',
      'photos.subtitle': 'Behind the scenes with the BTA team',
      'faq.title': 'FAQ',
      'faq.q1': 'How do I join BTA?',
      'faq.a1': 'Come to any of our events or sign up through our membership form. We welcome everyone interested in business and technology.',
      'faq.q2': 'Do I need a tech background?',
      'faq.a2': 'No. BTA is for anyone curious about how technology shapes business. We cover concepts in an accessible way and offer beginner-friendly workshops.',
      'faq.q3': 'Is there a membership fee?',
      'faq.a3': 'Membership is free for students. Some special events or workshops may have a small fee to cover materials or venue costs.',
      'faq.q4': 'How can I get involved as a volunteer or leader?',
      'faq.a4': 'Reach out to our exec team at events or via email. We often look for event helpers, content creators, and future committee members.',
      'faq.q5': 'Where are events held?',
      'faq.a5': 'Most events are on campus. Check each event listing for the exact room or venue. We also host occasional virtual sessions.',
      'footer.name': 'BTA — Business Technology Association',
      'footer.copyright': '© 2026 BTA. All rights reserved.',
      'preferences.btn': 'Preferences',
      'preferences.theme': 'Theme',
      'preferences.language': 'Language'
    },
    'fr-CA': {
      'nav.who': 'Qui nous sommes',
      'nav.events': 'Événements',
      'nav.team': 'L\'équipe',
      'nav.photos': 'Photos',
      'nav.faq': 'FAQ',
      'hero.tagline': 'Là où les affaires rencontrent la technologie. Connectez-vous, apprenez et menez.',
      'hero.learnMore': 'En savoir plus',
      'who.title': 'Qui nous sommes',
      'who.missionTitle': 'Notre mission',
      'who.missionText': 'BTA comble l\'écart entre la stratégie d\'affaires et la technologie. Nous aidons les membres à comprendre comment la technologie stimule la croissance, l\'innovation et l\'efficacité en milieu de travail.',
      'who.whatTitle': 'Ce que nous faisons',
      'who.whatText': 'Ateliers, conférences, hackathons et réseautage. Nous explorons l\'IA, les données, l\'automatisation et la transformation numérique—toujours avec une perspective d\'affaires.',
      'who.forTitle': 'Pour qui',
      'who.forText': 'Étudiants et professionnels intéressés par l\'intersection des affaires et de la technologie. Aucun codage requis—curiosité et ambition suffisent.',
      'events.title': 'Prochains événements',
      'events.subtitle': 'Hiver 2026',
      'team.title': 'L\'équipe',
      'team.subtitle': 'Les gens derrière BTA',
      'companies.title': 'Entreprises avec lesquelles nous avons travaillé',
      'companies.subtitle': 'Partenaires et commanditaires',
      'photos.title': 'Photos amusantes',
      'photos.subtitle': 'Dans les coulisses avec l\'équipe BTA',
      'faq.title': 'FAQ',
      'faq.q1': 'Comment rejoindre BTA?',
      'faq.a1': 'Participez à l\'un de nos événements ou inscrivez-vous via notre formulaire d\'adhésion. Nous accueillons toute personne intéressée par les affaires et la technologie.',
      'faq.q2': 'Ai-je besoin d\'un bagage technique?',
      'faq.a2': 'Non. BTA s\'adresse à toute personne curieuse de la façon dont la technologie façonne les affaires. Nous présentons les concepts de manière accessible et offrons des ateliers pour débutants.',
      'faq.q3': 'Y a-t-il des frais d\'adhésion?',
      'faq.a3': 'L\'adhésion est gratuite pour les étudiants. Certains événements ou ateliers peuvent avoir des frais pour couvrir le matériel ou les locaux.',
      'faq.q4': 'Comment m\'impliquer comme bénévole ou leader?',
      'faq.a4': 'Contactez notre équipe dirigeante lors des événements ou par courriel. Nous recherchons souvent des aides aux événements, des créateurs de contenu et des membres pour les comités.',
      'faq.q5': 'Où ont lieu les événements?',
      'faq.a5': 'La plupart des événements ont lieu sur le campus. Consultez chaque annonce pour la salle ou le lieu exact. Nous offrons aussi occasionnellement des séances virtuelles.',
      'footer.name': 'BTA — Association affaires et technologie',
      'footer.copyright': '© 2026 BTA. Tous droits réservés.',
      'preferences.btn': 'Préférences',
      'preferences.theme': 'Thème',
      'preferences.language': 'Langue'
    }
  };

  function applyLanguage(lang) {
    var doc = document.documentElement;
    doc.setAttribute('lang', lang === 'fr-CA' ? 'fr' : 'en');
    doc.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (translations[lang] && translations[lang][key]) {
        el.textContent = translations[lang][key];
      }
    });
    doc.querySelectorAll('.lang-option').forEach(function (btn) {
      var btnLang = btn.getAttribute('data-lang');
      btn.classList.toggle('active', btnLang === lang);
      btn.setAttribute('aria-pressed', btnLang === lang);
    });
    try { localStorage.setItem('bta-lang', lang); } catch (e) {}
  }

  function applyTheme(theme) {
    var doc = document.documentElement;
    doc.setAttribute('data-theme', theme);
    var logoDark = 'assets/logo-dark.png';
    var logoLight = 'assets/logo-light.png';
    var logoSrc = theme === 'dark' ? logoLight : logoDark;
    document.querySelectorAll('.logo-img, .hero-logo-img, .footer-logo-img').forEach(function (img) {
      if (img) img.src = logoSrc;
    });
    try { localStorage.setItem('bta-theme', theme); } catch (e) {}
  }

  var savedTheme = null;
  var savedLang = null;
  try {
    savedTheme = localStorage.getItem('bta-theme');
    savedLang = localStorage.getItem('bta-lang');
  } catch (e) {}
  applyTheme(savedTheme === 'light' || savedTheme === 'dark' ? savedTheme : 'dark');
  if (savedLang === 'fr-CA' || savedLang === 'en') {
    applyLanguage(savedLang);
  }

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
  document.querySelectorAll('.lang-option').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var lang = btn.getAttribute('data-lang');
      if (lang) applyLanguage(lang);
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
