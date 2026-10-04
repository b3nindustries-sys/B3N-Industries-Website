(function () {
  "use strict";
  var root = document.documentElement;
  var themeButton = document.querySelector("[data-theme-toggle]");
  var menuButton = document.querySelector("[data-menu-toggle]");
  var nav = document.querySelector("[data-nav-links]");
  function setTheme(theme, save) {
    if (save) {
      root.classList.add("theme-shift");
      window.setTimeout(function () {
        root.classList.remove("theme-shift");
      }, 450);
    }
    if (theme === "blue") {
      root.setAttribute("data-theme", "blue");
    } else {
      root.removeAttribute("data-theme");
    }
    if (themeButton) {
      var next = theme === "blue" ? "orange" : "blue";
      themeButton.setAttribute("aria-label", "Switch to " + next + " theme");
      themeButton.title = "Switch to " + next + " theme";
    }
    if (save) {
      try {
        localStorage.setItem("b3n-theme", theme);
      } catch (error) {}
    }
  }
  setTheme(
    root.getAttribute("data-theme") === "blue" ? "blue" : "orange",
    false,
  );
  if (themeButton) {
    themeButton.addEventListener("click", function () {
      setTheme(
        root.getAttribute("data-theme") === "blue" ? "orange" : "blue",
        true,
      );
    });
  }
  function closeMenu() {
    if (!nav || !menuButton) return;
    nav.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
  }
  if (menuButton && nav) {
    menuButton.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      menuButton.setAttribute("aria-expanded", String(open));
    });
    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) closeMenu();
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth > 820) closeMenu();
    });
  }
})();
