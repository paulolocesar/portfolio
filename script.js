(function () {
  const STORAGE_KEY = "portfolio-theme";
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

  const toggle = document.querySelector(".theme-toggle");
  const scrollLoop = document.querySelector(".scroll-loop");

  function getTheme() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return stored;
    return prefersDark.matches ? "dark" : "light";
  }

  function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme === "dark" ? "dark" : "light");
    localStorage.setItem(STORAGE_KEY, theme);
  }

  if (toggle) {
    const theme = getTheme();
    setTheme(theme);
    toggle.addEventListener("click", function () {
      const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
      setTheme(next);
    });
  }

  document.querySelectorAll(".year").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  if (scrollLoop) {
    const firstPage = scrollLoop.querySelector(".page");
    if (firstPage) {
      const clone = firstPage.cloneNode(true);
      clone.setAttribute("aria-hidden", "true");
      scrollLoop.appendChild(clone);
    }

    function loopScroll() {
      const pageHeight = firstPage.offsetHeight;
      if (window.scrollY >= pageHeight) {
        window.scrollTo(0, window.scrollY - pageHeight);
      }
    }

    window.addEventListener("scroll", loopScroll, { passive: true });
  }
})();
