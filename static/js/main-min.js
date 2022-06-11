import{activateNavbar,pasteCurrentYear,activateIdLinks,activateOnscrollAnimations,activateLazyLoading,labelCurrentPageLinks,trackOnlineStatus}from"./base.js";import{highlightAllCode,activateCustomCursorExample,activateTabs,activateAccordions,activateSpoilers,activatePopup,textareaUpdate,sendFeedback,activateTilt}from"./tutorials.js";import{loadTutorialCards}from"./load.js";window.onload=()=>{const a=async a=>{activateOnscrollAnimations(),activateLazyLoading(a),activateIdLinks(a),labelCurrentPageLinks(),highlightAllCode();const t=qs("ol.cards-wrapper");t&&loadTutorialCards(t,a);const e=qs("#cursor");e&&activateCustomCursorExample(e,qs("#aura"));const o=qsa(".tab-link");o&&activateTabs(o),qs(".popup")&&activatePopup(a),qs(".accordion")&&activateAccordions(a),qs(".spoiler")&&activateSpoilers(a);const i=qsa("textarea");i&&textareaUpdate(i,a);let r=qs("[data-contact-form]");r&&sendFeedback(r),qsa("[data-tilt], .tilt")&&activateTilt(),trackOnlineStatus(window)},t=new LocomotiveScroll({el:qs("[data-scroll-container]"),smooth:!0,reloadOnContextChange:!0,resetNativeScroll:!1,tablet:{breakpoint:0},smartphone:{breakpoint:0}});if(activateNavbar(t),pasteCurrentYear(),a(t).then(t.update()),!prefersReducedMotion()){const e=new Swup({animateHistoryBrowsing:!0});e.on("contentReplaced",(()=>{a(t).then(t.update())})),e.on("animationOutDone",(()=>{window.location.hash||t.scrollTo("top",{duration:0,disableLerp:!0})}))}};