window.onload = () => {
  const toggleHeader = () => {
    document.getElementById("header").classList.toggle("active");
    document.body.classList.toggle("lock");
  };
  const init = () => {
    // Locomotive scrolling
    scroll = new LocomotiveScroll({
      el: document.querySelector("[data-scroll-container]"),
      smooth: true,
      reloadOnContextChange: true,
      getSpeed: true,
      getDirection: true,
    });
    // Highlight js
    document.querySelectorAll("code").forEach((code) => {
      hljs.highlightElement(code);
    });
    // Intersection Observer
    const sections = [
      ...document.querySelectorAll(".fade-in-animate  h2"),
      ...document.querySelectorAll(".fade-in-animate .text > *"),
    ];
    if (!("IntersectionObserver" in window)) {
      section.forEach((section) => {
        section.toggle("show");
      });
    } else {
      const fadeObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            entry.target.classList.toggle("show", entry.isIntersecting);
            if (entry.isIntersecting) fadeObserver.unobserve(entry.target);
          });
        },
        {
          rootMargin: "-10%",
        }
      );
      sections.forEach((section) => {
        fadeObserver.observe(section);
      });
    }
    // Update the scroll on image load
    document.querySelectorAll("img").forEach((image) => {
      image.onload = () => {
        scroll.update();
      };
    });
    scroll.update();
  };
  const unload = () => {
    scroll.destroy();
  };
  // Navbar
  const isMobile = window.matchMedia("(min-width: 47rem)");
  const activateMobile = (event) => {
    if (!event.matches) {
      headerTogglerList = [
        document.querySelector("svg.ham"),
        ...document.querySelectorAll("#header li > a"),
      ];
      headerTogglerList.forEach((toggler) => {
        toggler.addEventListener("click", toggleHeader);
      });
    }
  };
  isMobile.addListener(activateMobile);
  activateMobile(isMobile);

  // Changing states
  if (document.getElementById("togglers-wrapper")) {
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
  }
  // Copyright
  document.getElementById("copyright").textContent = new Date().getFullYear();
  // Swup
  const swup = new Swup({
    animateHistoryBrowsing: true,
  });
  init();
  swup.on("contentReplaced", init);
  swup.on("willReplaceContent", unload);
};