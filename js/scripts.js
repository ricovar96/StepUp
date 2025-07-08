document.addEventListener("DOMContentLoaded", function () {
  var yearSpans = document.querySelectorAll(".js-current-year");
  var year = new Date().getFullYear();
  yearSpans.forEach(function (span) {
    span.textContent = year;
  });

  var header = document.querySelector("header");
  function onScrollHeader() {
    if (window.scrollY > 10) {
      header.classList.add("header-scrolled");
    } else {
      header.classList.remove("header-scrolled");
    }
  }
  window.addEventListener("scroll", onScrollHeader);
  onScrollHeader();
  
  var hamburger = document.getElementById("hamburger-menu");
  var navUl = document.querySelector("nav ul");
  var overlay = document.getElementById("menu-overlay");
  if (hamburger && navUl && overlay) {
    function closeMenu() {
      navUl.classList.remove("active");
      hamburger.classList.remove("active");
      overlay.classList.remove("active");
    }
    hamburger.addEventListener("click", function (e) {
      var isActive = navUl.classList.toggle("active");
      hamburger.classList.toggle("active");
      if (isActive) {
        overlay.classList.add("active");
      } else {
        overlay.classList.remove("active");
      }
      e.stopPropagation();
    });
    overlay.addEventListener("click", function () {
      closeMenu();
    });
    navUl.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        closeMenu();
      }
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth > 1023) {
        closeMenu();
      }
    });
  }

  // Carousel for featured services
  (function () {
    const carousel = document.querySelector('.featured-services-carousel');
    if (!carousel) return;
    const track = carousel.querySelector('.featured-services-track');
    const items = track.querySelectorAll('.featured-services-item');
    const controls = carousel.querySelector('.carousel-controls');
    let current = 0;
    let itemsPerView = 2;
    let totalDots = 3;

    function updateItemsPerView() {
      if (window.innerWidth < 800) {
        itemsPerView = 1;
        totalDots = items.length; // 5 dots para 5 artículos
      } else {
        itemsPerView = 2;
        totalDots = Math.ceil(items.length / 2); // 3 dots para 5 artículos
      }
    }

    function renderDots() {
      controls.innerHTML = '';
      for (let i = 0; i < totalDots; i++) {
        const dot = document.createElement('button');
        dot.className = 'carousel-dot';
        dot.setAttribute('data-index', i);
        dot.setAttribute('aria-label', `Ver artículos ${i + 1}${itemsPerView === 2 ? ' y ' + (i * 2 + 2) : ''}`);
        dot.addEventListener('click', () => goTo(i));
        controls.appendChild(dot);
      }
    }

    function updateCarousel() {
      const offset = current * (100 / itemsPerView);
      track.style.transform = `translateX(-${offset}%)`;
      const dots = controls.querySelectorAll('.carousel-dot');
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === current);
      });
    }

    function goTo(index) {
      const maxIndex = Math.max(0, items.length - itemsPerView);
      current = Math.max(0, Math.min(index, totalDots - 1, maxIndex));
      updateCarousel();
    }

    function onResize() {
      const prevItemsPerView = itemsPerView;
      updateItemsPerView();
      renderDots();
      // Si cambiaron los dots, ajusta current
      if (current > totalDots - 1) current = totalDots - 1;
      goTo(current);
    }

    window.addEventListener('resize', onResize);
    updateItemsPerView();
    renderDots();
    goTo(0);
  })();
});
