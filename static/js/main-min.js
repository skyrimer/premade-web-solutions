import{activateNavbar,pasteCurrentYear,activateIdLinks,activateOnscrollAnimations,activateLazyLoading}from"./base.js";import{highlightAllCode,activateCustomCursorExample,activateSlider,activateTabs,activateAccordions,activateSpoilers,activatePopup}from"./tutorials.js";import{loadHelpfulWebsites,loadTutorialCards}from"./load.js";window.onload=()=>{const a=async a=>{window.location.href.includes("helpful-websites")&&await loadHelpfulWebsites(),activateOnscrollAnimations(),activateLazyLoading(a),activateIdLinks(a),qs("code")&&highlightAllCode(),qs("[data-tutorial-list]")&&loadTutorialCards(a),qs("#togglers-wrapper")&&activateCustomCursorExample(),qs(".swiper")&&activateSlider(),qs(".tab-link")&&activateTabs(),qs(".popup")&&activatePopup(),qs(".accordion")&&activateAccordions(a),qs(".spoiler")&&activateSpoilers(a)},t=new LocomotiveScroll({el:qs("[data-scroll-container]"),smooth:!0,reloadOnContextChange:!0,resetNativeScroll:!1,tablet:{breakpoint:0},smartphone:{breakpoint:0}});activateNavbar(),pasteCurrentYear(),a(t).then(t.update());const o=new Swup({animateHistoryBrowsing:!0});o.on("contentReplaced",(()=>{a(t).then(t.update())})),o.on("animationOutDone",(()=>{window.location.hash||t.scrollTo("top",{duration:0})}))};