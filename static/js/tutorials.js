export const highlightAllCode = async () => {
  qsa("code").forEach((code) => {
    hljs.highlightElement(code);
  });
};
export const activateCustomCursorExample = async () => {
  const cursor = document.getElementById("cursor");
  const aura = document.getElementById("aura");
  const onClickClassChange = (target, className) =>
    target.addEventListener("click", () => {
      cursor.className = className;
      aura.className = className;
    });
  onClickClassChange(document.getElementById("toggle-cursor-none"), "");
  onClickClassChange(document.getElementById("toggle-cursor-active"), "active");
  onClickClassChange(document.getElementById("toggle-cursor-hidden"), "hidden");
};
export const activateSlider = async () => {
  const slider = new Swiper(".swiper", {
    effect: "coverflow",
    speed: 500,
    slidesPerView: 1,
    breakpoints: {
      450: {
        slidesPerView: 1.2,
      },
      600: {
        slidesPerView: 1.4,
      },
      700: {
        slidesPerView: 1.7,
      },
    },
    coverflowEffect: {
      rotate: 40,
      stretch: 50,
    },
    watchSlidesProgress: true,
    centeredSlides: true,
    loop: true,
    preloadImages: false,
    lazy: {
      loadPrevNext: true,
      loadOnTransitionStart: true,
      loadPrevNextAmount: 2,
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
};
export const activateTabs = async () => {
  qsa(".tab-link").forEach((link) => {
    link.addEventListener("click", (event) => {
      const newButton = event.currentTarget;
      const newTab = document.getElementById(newButton.dataset.tabId);
      const activeButton = qs(".tab-link.active");
      const activeTab = qs(".tab-content.active");
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
};
export const activateAccordions = async (scroll) => {
  const spoilersContent = qsa(".accordion-content");
  const openedAccordion = qs(".accordion.open");
  const activeClass = "open";
  const animationDuration = 300;

  const closeAccordion = (accordion) => {
    if (accordion) {
      qs(".accordion-content-wrapper", accordion).style.maxHeight = 0;
      accordion.classList.remove(activeClass);
    }
  };

  const openAccordion = (accordion) => {
    accordion.classList.add(activeClass);
    const accordionContent = qs(".accordion-content-wrapper", accordion);
    accordionContent.style.maxHeight = accordionContent.dataset.contentWidth;
  };

  spoilersContent.forEach((content) => {
    content.parentElement.dataset.contentWidth = content.offsetHeight + "px";
  });

  if (openedAccordion) openAccordion(openedAccordion);

  const accordionTogglers = qsa(".accordion-toggler");
  accordionTogglers.forEach((toggler) => {
    toggler.addEventListener("click", (event) => {
      const togglerParent = toggler.parentElement;
      const openedAccordion = qs(".accordion.open", togglerParent.parentElement);
      if (openedAccordion == togglerParent) {
        closeAccordion(togglerParent);
      } else {
        closeAccordion(openedAccordion);
        openAccordion(togglerParent);
      }
      setTimeout(() => {
        scroll.update();
      }, animationDuration);
    });
  });
};
export const activateSpoilers = async (scroll) => {
  const spoilersContent = qsa(".spoiler-content");
  const openedSpoiler = qs(".spoiler.open");
  const spoilerTogglers = qsa(".spoiler-toggler");
  const activeClass = "open";
  const animationDuration = 300;

  const closeSpoiler = (spoiler) => {
    if (spoiler) {
      qs(".spoiler-content-wrapper", spoiler).style.maxHeight = 0;
      spoiler.classList.remove(activeClass);
    }
  };

  const openSpoiler = (spoiler) => {
    spoiler.classList.add(activeClass);
    const spoilerContent = qs(".spoiler-content-wrapper", spoiler);
    spoilerContent.style.maxHeight = spoilerContent.dataset.contentWidth;
  };

  spoilersContent.forEach((content) => {
    content.parentElement.dataset.contentWidth = content.offsetHeight + "px";
  });

  if (openedSpoiler) openSpoiler(openedSpoiler);

  spoilerTogglers.forEach((toggler) => {
    toggler.addEventListener("click", (event) => {
      const togglerParent = toggler.parentElement;
      if (togglerParent.classList.contains(activeClass)) {
        closeSpoiler(togglerParent);
      } else {
        openSpoiler(togglerParent);
      }
      setTimeout(() => {
        scroll.update();
      }, animationDuration);
    });
  });
};
export const activatePopup = async () => {
  const containsPopup = qs(".popup");
  if (!containsPopup) {
    return NaN;
  }
  const popupLinks = qsa(".popup-link");
  const body = qs("body");
  const popupClosers = qsa(".popup-close");
  const paddingLock = [body, ...qsa(".lock-padding")];
  const timeOut = 500;
  let unlock = true;

  const popupOpen = (popup) => {
    if (popup && unlock) {
      const popupActive = qs(".popup.open");
      if (popupActive) {
        popupClose(popupActive, false);
      } else {
        bodyLock(body);
      }
    }
    popup.classList.add("open");
    popup.addEventListener("click", (event) => {
      if (!event.target.closest(".popup-body")) {
        popupClose(event.target.closest(".popup"));
      }
    });
  };

  const popupClose = (popup, scrollLock = true) => {
    if (unlock) {
      popup.classList.remove("open");
      scrollLock ? bodyUnlock(body) : NaN;
    }
  };

  const bodyLock = (body) => {
    const scrollbarWidth = window.innerWidth - body.offsetWidth + "px";
    paddingLock.forEach((element) => {
      element.style.marginRight = scrollbarWidth;
    });
    body.classList.add("lock");
    unlock = false;
    setTimeout(() => {
      unlock = true;
    }, timeOut);
  };

  const bodyUnlock = (body) => {
    setTimeout(() => {
      paddingLock.forEach((element) => {
        element.style.marginRight = 0;
      });
      body.classList.remove("lock");
    }, timeOut);

    unlock = false;
    setTimeout(() => {
      unlock = true;
    }, timeOut);
  };

  popupLinks.forEach((popupLink) => {
    popupLink.addEventListener("click", (event) => {
      const popupName = popupLink.hash.replace("#", "");
      const popup = document.getElementById(popupName);
      popupOpen(popup);
      event.preventDefault();
    });
  });

  popupClosers.forEach((popupCloser) => {
    popupCloser.addEventListener("click", (event) => {
      popupClose(popupCloser.closest(".popup"));
      event.preventDefault();
    });
  });

  document.addEventListener("keydown", (event) => {
    const openedPopup = qs(".popup.open");
    if (event.key == "Escape" && openedPopup) {
      console.log("Closing popup");
      popupClose(openedPopup);
    }
  });
};
