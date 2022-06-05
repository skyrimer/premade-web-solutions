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
  activateTilt,
} from "./tutorials.js";
import {loadTutorialCards } from "./load.js";
window.onload = () => {
  const initPage = async (scroll) => {
    activateOnscrollAnimations();
    activateLazyLoading(scroll);
    activateIdLinks(scroll);
    labelCurrentPageLinks();
    highlightAllCode();
    const tutorialList = qs("ol.cards-wrapper");
    if (tutorialList) loadTutorialCards(tutorialList, scroll);
    const customCursor = qs("#cursor");
    if (customCursor) activateCustomCursorExample(customCursor, qs("#aura"));
    const tabLinks = qsa(".tab-link");
    if (tabLinks) activateTabs(tabLinks);
    if (qs(".popup")) activatePopup(scroll);
    if (qs(".accordion")) activateAccordions(scroll);
    if (qs(".spoiler")) activateSpoilers(scroll);
    const textareas = qsa("textarea");
    if (textareas) textareaUpdate(textareas, scroll);
    let form = qs("[data-contact-form]");
    if (form) sendFeedback(form);
    if (qsa("[data-tilt], .tilt")) activateTilt();
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
  activateNavbar(scroll);
  pasteCurrentYear();
  initPage(scroll).then(scroll.update());
  // Swup
  if (!prefersReducedMotion()) {
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
  }
};
