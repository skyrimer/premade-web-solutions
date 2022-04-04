import {
  activateNavbar,
  pasteCurrentYear,
  activateIdLinks,
  activateOnscrollAnimations,
  activateLazyLoading,
} from "./base.js";
import {
  highlightAllCode,
  activateCustomCursorExample,
  activateSlider,
  activateTabs,
  activateAccordions,
  activateSpoilers,
  activatePopup,
} from "./tutorials.js";
import { loadHelpfulWebsites, loadTutorialCards } from "./load.js";
window.onload = () => {
  const initPage = async (scroll) => {
    if (window.location.href.includes("helpful-websites")) {
      await loadHelpfulWebsites();
    }
    activateOnscrollAnimations();
    activateLazyLoading(scroll);
    activateIdLinks(scroll);
    if (document.querySelector("code")) highlightAllCode();
    if (document.querySelector("[data-tutorial-list]")) loadTutorialCards(scroll);
    if (document.querySelector("#togglers-wrapper")) activateCustomCursorExample();
    if (document.querySelector(".swiper")) activateSlider();
    if (document.querySelector(".tab-link")) activateTabs();
    if (document.querySelector(".popup")) activatePopup();
    if (document.querySelector(".accordion")) activateAccordions(scroll);
    if (document.querySelector(".spoiler")) activateSpoilers(scroll);
    scroll.update();
  };
  const scroll = new LocomotiveScroll({
    el: document.querySelector("[data-scroll-container]"),
    smooth: true,
    reloadOnContextChange: true,
    resetNativeScroll: false,
    tablet: {
      breakpoint: 0,
    },
    smartphone: {
      breakpoint: 0,
    },
  });
  activateNavbar();
  pasteCurrentYear();
  initPage(scroll);
  // Swup
  const swup = new Swup({
    animateHistoryBrowsing: true,
  });
  swup.on("contentReplaced", () => {
    initPage(scroll);
  });
  swup.on("animationOutDone", () => {
    if (!window.location.hash) {
      scroll.scrollTo("top", { duration: 0 });
    }
  });
};
