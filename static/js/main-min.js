import{activateNavbar,pasteCurrentYear,activateIdLinks,activateOnscrollAnimations,activateLazyLoading,labelCurrentPageLinks}from"./base.js";import{highlightAllCode,activateCustomCursorExample,activateTabs,activateAccordions,activateSpoilers,activatePopup,textareaUpdate,sendFeedback,activateTilt}from"./tutorials.js";import{loadHelpfulWebsites,loadTutorialCards}from"./load.js";window.onload=()=>{const a=async a=>{window.location.pathname.includes("helpful-websites")&&await loadHelpfulWebsites(a),activateOnscrollAnimations(),activateLazyLoading(a),activateIdLinks(a),labelCurrentPageLinks(),highlightAllCode();const t=qs("[data-tutorial-list]");t&&await loadTutorialCards(t,a).then(a.update());const e=qs("#cursor");e&&activateCustomCursorExample(e,qs("#aura"));const o=qsa(".tab-link");o&&activateTabs(o),qs(".popup")&&activatePopup(a),qs(".accordion")&&activateAccordions(a),qs(".spoiler")&&activateSpoilers(a);const i=qsa("textarea");i&&textareaUpdate(i,a);let s=qs("[data-contact-form]");s&&sendFeedback(s),qsa("[data-tilt], .tilt")&&activateTilt()},t=new LocomotiveScroll({el:qs("[data-scroll-container]"),smooth:!0,reloadOnContextChange:!0,resetNativeScroll:!1,tablet:{breakpoint:0},smartphone:{breakpoint:0}});if(activateNavbar(t),pasteCurrentYear(),a(t).then(t.update()),!prefersReducedMotion()){const e=new Swup({animateHistoryBrowsing:!0});e.on("contentReplaced",(()=>{a(t).then(t.update())})),e.on("animationOutDone",(()=>{window.location.hash||t.scrollTo("top",{duration:0,disableLerp:!0})}))}};