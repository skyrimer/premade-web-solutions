export const highlightAllCode = async () => {
  qsa("code").forEach((code) => {
    hljs.highlightElement(code);
  });
};
export const activateCustomCursorExample = async (cursor, aura) => {
  const onClickClassChange = (target, className) =>
    target.addEventListener("click", () => {
      cursor.className = className;
      aura.className = className;
    });
  onClickClassChange(qs("#toggle-cursor-none"), "");
  onClickClassChange(qs("#toggle-cursor-active"), "active");
  onClickClassChange(qs("#toggle-cursor-hidden"), "hidden");
};
export const activateTabs = async (tabLinks) => {
  tabLinks.forEach((link) => {
    link.addEventListener("click", ({ currentTarget, target }) => {
      const newButton = currentTarget;
      const newTab = document.getElementById(newButton.dataset.tabId);
      const activeButton = qs(".tab-link.active", target.parentElement.parentElement);
      const activeTab = qs(".tab-content.active", target.parentElement.parentElement);
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
    toggler.addEventListener("click", () => {
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
export const activatePopup = async (scroll) => {
  const popupOpen = (popup) => {
    if (popup) {
      const popupActive = qs(".popup.open");
      popupActive ? popupClose(popupActive, false) : scroll.stop();
    }
    popup.classList.add("open");
    popup.addEventListener("click", (event) => {
      if (!event.target.closest(".popup-body")) {
        popupClose(event.target.closest(".popup"));
      }
    });
  };

  const popupClose = (popup, scrollLock = true) => {
    popup.classList.remove("open");
    if (scrollLock) {
      scroll.start();
      window.location.hash = "";
    }
  };

  qsa(".popup-link").forEach((popupLink) => {
    popupLink.addEventListener("click", (event) => {
      popupOpen(qs(popupLink.hash));
      event.preventDefault();
    });
  });

  qsa(".popup-close").forEach((popupCloser) => {
    popupCloser.addEventListener("click", (event) => {
      popupClose(popupCloser.closest(".popup"));
      event.preventDefault();
    });
  });

  document.addEventListener("keydown", ({ key }) => {
    const openedPopup = qs(".popup.open");
    if (key == "Escape" && openedPopup) {
      popupClose(openedPopup);
    }
  });
};
export const textareaUpdate = async (textareas, scroll) => {
  const resizeObserver = new ResizeObserver(() => {
    scroll.update();
  });

  textareas.forEach((textarea) => {
    resizeObserver.observe(textarea);
  });
};
export const sendFeedback = async (form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    var request = new XMLHttpRequest();
    request.open("POST", "/contact", true);
    request.setRequestHeader(
      "Content-Type",
      "application/x-www-form-urlencoded; charset=UTF-8"
    );
    request.onload = () => {
      if (request.status) {
        qs("#popup").classList.toggle("open");
      }
    };
    request.send(
      JSON.stringify({
        name: qs("#name", form).value,
        email: qs("#email", form).value,
        feedback: qs("#feedback", form).value,
      })
    );
  });
};
export const activateTilt = async () => {
  const tiltJs = document.createElement("script");
  tiltJs.setAttribute(
    "src",
    "https://cdnjs.cloudflare.com/ajax/libs/vanilla-tilt/1.7.2/vanilla-tilt.min.js"
  );
  tiltJs.setAttribute(
    "integrity",
    "sha512-K9tDZvc8nQXR1DMuT97sct9f40dilGp97vx7EXjswJA+/mKqJZ8vcZLifZDP+9t08osMLuiIjd4jZ0SM011Q+w=="
  );
  tiltJs.setAttribute("crossorigin", "anonymous");
  tiltJs.setAttribute("referrerpolicy", "no-referrer");
  document.body.appendChild(tiltJs);
};
