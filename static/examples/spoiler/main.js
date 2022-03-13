const spoilersContent = document.querySelectorAll(".accordion-content");
const openedAccordion = document.querySelector(".accordion.open");
const activeClass = "open";

const closeAccordion = (accordion) => {
  if (accordion) {
    accordion.querySelector(".accordion-content-wrapper").style.maxHeight = 0;
    accordion.classList.remove(activeClass);
  }
};

const openAccordion = (accordion) => {
  accordion.classList.add(activeClass);
  const accordionContent = accordion.querySelector(".accordion-content-wrapper");
  accordionContent.style.maxHeight = accordionContent.dataset.contentWidth;
};

spoilersContent.forEach((content) => {
  content.parentElement.dataset.contentWidth = content.offsetHeight + "px";
});

if (openedAccordion) openAccordion(openedAccordion);

const accordionTogglers = document.querySelectorAll(".accordion-toggler");
accordionTogglers.forEach((toggler) => {
  toggler.addEventListener("click", (event) => {
    const openedAccordion = document.querySelector(".accordion.open");
    if (openedAccordion == toggler.parentElement) {
      closeAccordion(toggler.parentElement);
    } else {
      // If you want to make just a spoiler, then remove the next line
      closeAccordion(openedAccordion);
      openAccordion(toggler.parentElement);
    }
  });
});
