import {
  activateNavbar,
  pasteCurrentYear,
  activateIdLinks,
  activateOnscrollAnimations,
  activateLazyLoading,
  labelCurrentPageLinks,
} from "./base.js";
import {
  highlightAllCode,
  activateCustomCursorExample,
  activateTabs,
  activateAccordions,
  activateSpoilers,
  activatePopup,
  textareaUpdate,
  sendFeedback,
} from "./tutorials.js";
import { loadHelpfulWebsites, loadTutorialCards } from "./load.js";
window.onload = () => {
  const initPage = async (scroll) => {
    if (window.location.pathname.includes("helpful-websites")) {
      await loadHelpfulWebsites(scroll);
    }
    activateOnscrollAnimations();
    activateLazyLoading(scroll);
    activateIdLinks(scroll);
    labelCurrentPageLinks();
    if (qs("code")) highlightAllCode();
    if (qs("[data-tutorial-list]")) loadTutorialCards(scroll);
    if (qs("#togglers-wrapper")) activateCustomCursorExample();
    if (qs(".tab-link")) activateTabs();
    if (qs(".popup")) activatePopup();
    if (qs(".accordion")) activateAccordions(scroll);
    if (qs(".spoiler")) activateSpoilers(scroll);
    if (qs("textarea")) textareaUpdate(scroll);
    let form = qs("[data-contact-form]");
    if (form) sendFeedback(form);
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
