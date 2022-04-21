export const activateNavbar = async (scroll) => {
  const isMobile = window.matchMedia("(min-width: 47rem)");
  const activateMobile = (event) => {
    if (!event.matches) {
      const header = qs("#header");
      let headerTogglerList = [qs("svg.ham"), qs("li > a", header)];
      headerTogglerList.forEach((toggler) => {
        toggler.addEventListener("click", () => {
          header.classList.toggle("active");
          header.classList.contains("active") ? scroll.stop() : scroll.start();
        });
      });
    }
  };
  isMobile.addListener(activateMobile);
  activateMobile(isMobile);
};
export const pasteCurrentYear = async () => {
  qs("#copyright").textContent = new Date().getFullYear();
};
export const activateIdLinks = async (scroll) => {
  document.querySelectorAll('a[href^="#"]:not(.popup-link)').forEach((link) => {
    link.addEventListener("click", () => {
      scroll.scrollTo(link.hash, {
        offset: -120,
      });
    });
  });
};
export const activateOnscrollAnimations = async () => {
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
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.toggle("show");
          observer.unobserve(entry.target);
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
export const activateLazyLoading = async (scroll) => {
  const images = document.querySelectorAll("img[data-src]");
  const sources = document.querySelectorAll("picture>source[data-srcset]");
  const replaceDataValue = (target, dataValue, value) => {
    target.setAttribute(value, target.getAttribute(dataValue));
    target.removeAttribute(dataValue);
  };
  if (!("IntersectionObserver" in window)) {
    images.forEach((image) => {
      replaceDataValue(image, "data-src", "src");
    });
    images.forEach((image) => {
      replaceDataValue(image, "data-srcset", "srcset");
    });
    return;
  }
  const createImageObserver = (dataValue, value) => {
    return new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((image) => {
          if (image.isIntersecting) {
            replaceDataValue(image.target, dataValue, value);
            scroll.update();
            observer.unobserve(image.target);
          }
        });
      },
      { rootMargin: "10%" }
    );
  };
  const imageObserver = createImageObserver("data-src", "src");
  const sourceObserver = createImageObserver("data-srcset", "srcset");
  images.forEach((image) => {
    imageObserver.observe(image);
  });
  sources.forEach((source) => {
    sourceObserver.observe(source);
  });
};
export const labelCurrentPageLinks = async () => {
  qsa("a").forEach((link) => {
    link.getAttribute("href") == window.location.pathname
      ? link.setAttribute("aria-current", "page")
      : link.removeAttribute("aria-current");
  });
};
