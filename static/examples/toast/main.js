const toastRaisers = document.querySelectorAll("[data-toast-activate]");
const toastClosers = document.querySelectorAll("[data-toast-close]");
const activateToast = (toast) => {
  const activeToast = document.querySelector("[data-toast].active");
  if (activeToast) {
    activeToast.classList.remove("active");
  }
  toast.classList.add("active");
  const toastTimeout = toast.getAttribute("data-toast-timeout");
  if (toastTimeout) {
    setTimeout(() => {
      toast.classList.remove("active");
    }, toastTimeout * 1000);
  }
  toast.querySelectorAll("[data-time]").forEach((toastTime) => {
    toastTimeUpdater(toast, toastTime);
  });
};
const toastTimeUpdater = (toast, toastTime) => {
  toastTime.textContent = "Right now";
  let minuteCounter = 0;
  let timeUpdate;
  setTimeout(() => {
    toastTime.textContent = "1 minute ago";
  }, 60000);
  timeUpdate = setInterval(() => {
    if (!toast.classList.contains("active")) clearInterval(timeUpdate);
    minuteCounter += 1;
    toastTime.textContent = `${minuteCounter} minutes ago`;
  }, 60000);
};
toastRaisers.forEach((toastRaiser) => {
  toastRaiser.addEventListener("click", () => {
    activateToast(
      document.querySelector(
        `[data-toast="${toastRaiser.getAttribute(["data-toast-activate"])}"]`
      )
    );
  });
});
toastClosers.forEach((toastCloser) => {
  toastCloser.addEventListener("click", (event) => {
    event.target.closest(".toast").classList.remove("active");
  });
});
