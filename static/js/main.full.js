window.onload = () => {
  // Deleting all event listeners
  const clearAllEventListeners = async (element) => {
    element.parentNode.replaceChild(element.cloneNode(true), element);
  };

  // Navbar activision
  const activateNavbar = async () => {
    const isMobile = window.matchMedia("(min-width: 47rem)");
    const activateMobile = (event) => {
      if (!event.matches) {
        // Navbar effects
        headerTogglerList = [
          document.querySelector("svg.ham"),
          ...document.querySelectorAll("#header li > a"),
        ];
        headerTogglerList.forEach((toggler) => {
          toggler.addEventListener("click", () => {
            document.getElementById("header").classList.toggle("active");
            document.body.classList.toggle("lock");
          });
        });
      }
    };
    isMobile.addListener(activateMobile);
    activateMobile(isMobile);
  };

  // Highlight code
  const highlightAllCode = async () => {
    // Highlight js
    document.querySelectorAll("code").forEach((code) => {
      hljs.highlightElement(code);
    });
  };

  // Copyright
  const pasteCurrentYear = async () => {
    document.getElementById("copyright").textContent = new Date().getFullYear();
  };

  // Onscroll animations
  const activateOnscrollAnimations = async () => {
    const sections = [
      ...document.querySelectorAll("[data-scroll-section]  h2"),
      ...document.querySelectorAll("[data-scroll-section] .text > *"),
    ];
    if (!("IntersectionObserver" in window)) {
      sections.forEach((section) => {
        section.toggle("show");
      });
      return;
    }
    const fadeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.toggle("show");
            fadeObserver.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: "-10%",
      }
    );
    sections.forEach((section) => {
      fadeObserver.observe(section);
    });
  };

  // Picture Lazy loading
  const activateImageLazyLoading = async () => {
    const pictures = document.querySelectorAll('picture[data-loading="lazy"]');
    if (!("IntersectionObserver" in window)) {
      const images = pictures.children;
      for (let index = 0; index < images.length - 1; index++) {
        const element = images[index];
        element.srcset = element.dataset.srcset;
        element.removeAttribute("data-srcset");
      }
      const lastImage = images[images.length - 1];
      lastImage.src = lastImage.dataset.src;
      lastImage.removeAttribute("data-src");
    }
    const pictureObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const images = entry.target.children;
            for (let index = 0; index < images.length - 1; index++) {
              const element = images[index];
              element.srcset = element.dataset.srcset;
              element.removeAttribute("data-srcset");
            }
            const lastImage = images[images.length - 1];
            lastImage.src = lastImage.dataset.src;
            lastImage.removeAttribute("data-src");
            pictureObserver.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: "10%",
      }
    );
    pictures.forEach((picture) => {
      pictureObserver.observe(picture);
    });
  };

  // Update images on scroll
  const updateImagesOnload = async () => {
    document.querySelectorAll("img").forEach((image) => {
      image.onload = () => {
        scroll.update();
      };
    });
  };

  // Change the state of a cursor for custom cursor example
  const activateCustomCursorExample = async () => {
    if (document.querySelector("#togglers-wrapper")) {
      const cursor = document.getElementById("cursor");
      const aura = document.getElementById("aura");
      document.getElementById("toggle-cursor-none").addEventListener("click", () => {
        cursor.className = "";
        aura.className = "";
      });
      document.getElementById("toggle-cursor-active").addEventListener("click", () => {
        cursor.className = "active";
        aura.className = "active";
      });
      document.getElementById("toggle-cursor-hidden").addEventListener("click", () => {
        cursor.className = "hidden";
        aura.className = "hidden";
      });
    }
  };

  // Making default behavior of links with id
  const activateIdLinks = async () => {
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener("click", () => {
        scroll.scrollTo(link.hash, {
          offset: -120,
        });
      });
    });
  };

  // Slider
  const activateSlider = async () => {
    if (document.querySelector(".swiper")) {
      const slider = new Swiper(".swiper", {
        effect: "flip",
        loop: true,
        preloadImages: false,
        lazy: {
          loadPrevNext: true,
        },
        pagination: {
          el: ".swiper-pagination",
          dynamicBullets: true,
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        keyboard: {
          enabled: true,
        },
      });
    }
  };

  // Tabs activision
  const activateTabs = async () => {
    if (document.querySelector(".tab-link")) {
      document.querySelectorAll(".tab-link").forEach((link) => {
        link.addEventListener("click", (event) => {
          const newButton = event.currentTarget;
          const newTab = document.getElementById(newButton.dataset.tabId);
          const activeButton = document.querySelector(".tab-link.active");
          const activeTab = document.querySelector(".tab-content.active");
          if (newButton !== activeButton) {
            activeTab.className = activeTab.className.replace(" active", " disappear");
            activeButton.className = activeButton.className.replace(" active", "");
            setTimeout(() => {
              activeTab.className = activeTab.className.replace(" disappear", "");
              newButton.className += " active";
              newTab.className += " active";
            }, 300);
          }
        });
      });
    }
  };

  // Adds tutorials
  const addTutorialsCards = async () => {
    const tutorialList = document.querySelector("[data-tutorial-list]");
    const cardTemplate = document.querySelector("#tutorial-card-template");
    if (tutorialList) {
      fetch("/static/tutorials.json")
        .then((response) => response.json())
        .then((data) => {
          data.forEach((tutorial) => {
            const card = cardTemplate.content.cloneNode(true).children[0];
            card.href = "/examples/" + tutorial.url;
            const name = card.querySelector("[data-name]");
            name.textContent = tutorial.name;
            tutorialList.appendChild(card);
          });
          cardTemplate.remove();
          scroll.update();
        });
    }
  };

  // Initializing all JavaScript for a page
  const initPage = async () => {
    activateOnscrollAnimations();
    activateImageLazyLoading();
    highlightAllCode();
    activateIdLinks();
    pasteCurrentYear();

    updateImagesOnload();

    activateCustomCursorExample();
    activateSlider();
    activateTabs();
    addTutorialsCards();
    scroll.update();
  };

  // Scroll to top, when the page is reloading
  const outAnimationDone = async () => {
    scroll.scrollTo("top", {
      duration: 0,
    });
  };

  const scroll = new LocomotiveScroll({
    el: document.querySelector("[data-scroll-container]"),
    smooth: true,
    reloadOnContextChange: true,
    getSpeed: true,
    getDirection: true,
    tablet: {
      breakpoint: 0,
    },
    smartphone: {
      breakpoint: 0,
    },
  });
  activateNavbar();
  initPage();
  // Swup
  const swup = new Swup({
    animateHistoryBrowsing: true,
  });
  swup.on("contentReplaced", initPage);
  swup.on("animationOutDone", outAnimationDone);
};
