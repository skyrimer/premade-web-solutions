window.onload = () => {
  // Navigation
  const hamburger = document.getElementsByClassName("ham")[0];
  const header = document.getElementById("header");
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    header.classList.toggle("active");
  });
  // Highlight js
  to_highlight = document.querySelectorAll("code");
  for (let code = 0; code < to_highlight.length; code++) {
    hljs.highlightBlock(to_highlight[code]);
  }
  // Locomotive-scrolling
  const scroll = new LocomotiveScroll({
    el: document.querySelector("[data-scroll-container]"),
    smooth: true,
  });
  // Changing states
  const cursor = document.getElementById("cursor");
  const aura = document.getElementById("aura");
  document
    .getElementById("toggle-cursor-none")
    .addEventListener("click", () => {
      cursor.className = "";
      aura.className = "";
    });
  document
    .getElementById("toggle-cursor-active")
    .addEventListener("click", () => {
      cursor.className = "active";
      aura.className = "active";
    });
  document
    .getElementById("toggle-cursor-hidden")
    .addEventListener("click", () => {
      cursor.className = "hidden";
      aura.className = "hidden";
    });
  // Copyright
  document.getElementById("copyright").textContent = new Date().getFullYear();
};
