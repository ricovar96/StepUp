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
    // MODIFICACIÓN: Seleccionar los dots
    const dots = carousel.querySelectorAll('.carousel-dot');
    let current = 0;
    let itemsPerView = 2;
    const totalDots = dots.length;

    function updateItemsPerView() {
      // MODIFICACIÓN: Siempre mostrar 2 items por vez
      itemsPerView = 2;
    }

    function updateCarousel() {
      const offset = current * (100 / itemsPerView);
      track.style.transform = `translateX(-${offset}%)`;
      // MODIFICACIÓN: Actualizar el estado activo de los dots
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === current);
      });
    }

    function goTo(index) {
      current = Math.max(0, Math.min(index, totalDots - 1));
      updateCarousel();
    }

    // MODIFICACIÓN: Eventos para los dots
    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => goTo(i));
    });

    window.addEventListener('resize', () => {
      updateItemsPerView();
      goTo(current);
    });
    updateItemsPerView();
    goTo(0);
  })();
});
