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
      await loadHelpfulWebsites(scroll);
    }
    activateOnscrollAnimations();
    activateLazyLoading(scroll);
    activateIdLinks(scroll);
    if (qs("code")) highlightAllCode();
    if (qs("[data-tutorial-list]")) loadTutorialCards(scroll);
    if (qs("#togglers-wrapper")) activateCustomCursorExample();
    if (qs(".swiper")) activateSlider();
    if (qs(".tab-link")) activateTabs();
    if (qs(".popup")) activatePopup();
    if (qs(".accordion")) activateAccordions(scroll);
    if (qs(".spoiler")) activateSpoilers(scroll);
  };
  const scroll = new LocomotiveScroll({
    el: qs("[data-scroll-container]"),
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
  initPage(scroll).then(scroll.update());
  // Swup
  const swup = new Swup({
    animateHistoryBrowsing: true,
  });
  swup.on("contentReplaced", () => {
    initPage(scroll).then(scroll.update());
  });
  swup.on("animationOutDone", () => {
    if (!window.location.hash) {
      scroll.scrollTo("top", { duration: 0, disableLerp: true });
    }
  });
};
