export const activateNavbar = async (scroll) => {
  const isMobile = window.matchMedia("(min-width: 47rem)");
  const activateMobile = (event) => {
    if (!event.matches) {
      const header = qs("#header");
      [qs("svg.ham"), ...qsa("li > a", header)].forEach((toggler) => {
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
  qsa('a[href^="#"]:not(.popup-link)').forEach((link) => {
    link.addEventListener("click", () => {
      scroll.scrollTo(link.hash, {
        offset: -120,
      });
    });
  });
};
export const activateOnscrollAnimations = async () => {
  const sections = [
    ...qsa("[data-scroll-section]  h2"),
    ...qsa("[data-scroll-section] .text > *"),
  ];
  if (!("IntersectionObserver" in window) || prefersReducedMotion()) {
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
  const images = qsa("img[data-src]");
  const sources = qsa("picture>source[data-srcset]");
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
    image.onload = () => {
      scroll.update();
    };
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
export const trackOnlineStatus = async () => {
  const toast = qs("#statusTracker");
  window.addEventListener("online", (event) => {
    toast.classList.remove("active");
    setTimeout(() => {
      toast.classList.add("active");
      qs("p", toast).textContent = "🟢 You are back to online 🟢";
      setTimeout(() => {
        toast.classList.remove("active");
      }, 3000);
    }, 300);
  });
  window.addEventListener("offline", (event) => {
    qs("p", toast).textContent =
      "🔴 Connection is down. The website might not work properly 🔴";
    toast.classList.add("active");
  });
};
