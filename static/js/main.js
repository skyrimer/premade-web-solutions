window.onload = () => {
  const init = () => {
    // Locomotive-scrolling
    scroll = new LocomotiveScroll({
      el: document.querySelector("[data-scroll-container]"),
      smooth: true,
      reloadOnContextChange: true,
    });
    // Highlight js
    document.querySelectorAll("code").forEach((code) => {
      hljs.highlightElement(code);
    });
    // for (let code = 0; code < to_highlight.length; code++) {
    //   hljs.highlightElement(to_highlight[code]);
    // }
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
    scroll.update();
  };
  const unload = () => {
    scroll.destroy();
  };
  let scroll = new LocomotiveScroll({
    el: document.querySelector("[data-scroll-container]"),
    smooth: true,
    reloadOnContextChange: true,
  });
  // Navbar
  const header = document.getElementById("header");
  toggler_list = [
    document.querySelector("svg.ham"),
    ...document.querySelectorAll("#header a"),
  ];
  toggler_list.forEach((toggler) => {
    toggler.addEventListener("click", () => {
      header.classList.toggle("active");
      document.body.classList.toggle("lock");
    });
  });

  // Changing states
  // const cursor = document.getElementById("cursor");
  // const aura = document.getElementById("aura");
  // document
  //   .getElementById("toggle-cursor-none")
  //   .addEventListener("click", () => {
  //     cursor.className = "";
  //     aura.className = "";
  //   });
  // document
  //   .getElementById("toggle-cursor-active")
  //   .addEventListener("click", () => {
  //     cursor.className = "active";
  //     aura.className = "active";
  //   });
  // document
  //   .getElementById("toggle-cursor-hidden")
  //   .addEventListener("click", () => {
  //     cursor.className = "hidden";
  //     aura.className = "hidden";
  //   });

  // Copyright
  document.getElementById("copyright").textContent = new Date().getFullYear();
  // Swup
  const swup = new Swup();
  init();
  swup.on("contentReplaced", init);
  swup.on("willReplaceContent", unload);
};
