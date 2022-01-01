window.onload = () => {
  // Navigation
  const hamburger = document.getElementsByClassName("ham")[0];
  const header = document.getElementById("header");
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    header.classList.toggle("active");
  });
  // Locomotive-scrolling
  const scroll = new LocomotiveScroll({
    el: document.querySelector("[data-scroll-container]"),
    smooth: true,
    reloadOnContextChange: true,
  });
  // Highlight js
  to_highlight = document.querySelectorAll("code");
  for (let code = 0; code < to_highlight.length; code++) {
    hljs.highlightElement(to_highlight[code]);
  }
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
  // Intersection Observer
  const sections = [
    ...document.querySelectorAll(".fade-in-animate  h2"),
    ...document.querySelectorAll(".fade-in-animate .text > *"),
  ];
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle("show", entry.isIntersecting);
        if (entry.isIntersecting) observer.unobserve(entry.target);
      });
    },
    {
      rootMargin: "-10%",
    }
  );
  sections.forEach((section) => {
    observer.observe(section);
  });
  // Copyright
  document.getElementById("copyright").textContent = new Date().getFullYear();
  scroll.update();

};
