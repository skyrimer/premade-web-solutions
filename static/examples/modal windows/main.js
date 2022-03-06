const popupLinks = document.querySelectorAll(".popup-link");
const body = document.querySelector("body");
const popupClosers = document.querySelectorAll(".popup-close");
const paddingLock = [body, ...document.querySelectorAll(".lock-padding")];
const timeOut = 500;
let unlock = true;
const scrollbarWidth = window.innerWidth - body.offsetWidth + "px";

const popupOpen = (popup) => {
  if (popup && unlock) {
    const popupActive = document.querySelector(".popup.open");
    if (popupActive) {
      popupClose(popupActive, false);
    } else {
      bodyLock(body);
    }
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
  scrollLock ? bodyUnlock(body) : NaN;
};

const bodyLock = (body) => {
  paddingLock.forEach((element) => {
    element.style.marginRight = scrollbarWidth;
  });
  body.classList.add("lock");
  unlock = false;
  setTimeout(() => {
    unlock = true;
  }, timeOut);
};

const bodyUnlock = (body) => {
  setTimeout(() => {
    paddingLock.forEach((element) => {
      element.style.marginRight = 0;
    });
    body.classList.remove("lock");
  }, timeOut);

  unlock = false;
  setTimeout(() => {
    unlock = true;
  }, timeOut);
};

popupLinks.forEach((popupLink) => {
  popupLink.addEventListener("click", (event) => {
    const popupName = popupLink.hash.replace("#", "");
    popupOpen(document.getElementById(popupName));
    event.preventDefault();
  });
});

popupClosers.forEach((popupCloser) => {
  popupCloser.addEventListener("click", (event) => {
    popupClose(popupCloser.closest(".popup"));
    event.preventDefault();
  });
});

document.addEventListener("keydown", (event) => {
  const openedPopup = document.querySelector(".popup.open");
  if (event.key == "Escape" && openedPopup) {
    popupClose(openedPopup);
  }
});
