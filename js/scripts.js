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
});
