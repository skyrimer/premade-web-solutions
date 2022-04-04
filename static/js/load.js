export const loadHelpfulWebsites = async () => {
  const copyElement = (element) => {
    return element.content.cloneNode(true).children[0];
  };
  const strToPath = (string) => {
    return string.toLowerCase().split(" ").join("-");
  };
  const main = document.querySelector("main#swup");
  const footer = main.querySelector("section:last-child");
  const tableOfContents = document.querySelector("[data-content-list]");
  const templateLink = tableOfContents.querySelector("#template-link");
  const templateSlider = document.querySelector("#template-slider");
  const templateSlide = document.querySelector("#template-slide");
  const response = await fetch("/static/helpful-websites.json");
  const data = await response.json();
  for (let section in data) {
    const sectionHref = strToPath(section);
    // Table of Contents
    const sectionLink = copyElement(templateLink);
    const link = sectionLink.querySelector("a");
    link.textContent = section;
    link.href = sectionHref;
    tableOfContents.appendChild(sectionLink);
    // Sliders
    const slider = copyElement(templateSlider);
    slider.id = sectionHref;
    data[section].forEach((slideData) => {
      const slide = copyElement(templateSlide);
      const slideLink = slide.querySelector("[data-link");
      slideLink.href = slideData.url;
      slideLink.textContent = slideData.name;
      const slideImage = slide.querySelector("[data-image]");
      slideImage.alt = slideData.name;
      slideImage.dataset.src = `/static/images/helpful_websites/${strToPath(
        slideData.name
      )}.png`;
      slider.querySelector(".swiper-wrapper").appendChild(slide);
    });
    slider.querySelector("[data-header]").textContent = section;
    main.insertBefore(slider, footer);
  }
  templateLink.remove();
  templateSlider.remove();
  templateSlide.remove();
};
export const loadTutorialCards = async (scroll) => {
  const tutorialList = document.querySelector("[data-tutorial-list]");
  const cardTemplate = document.querySelector("#tutorial-card-template");
  fetch("/static/tutorials.json")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((tutorial) => {
        const card = cardTemplate.content.cloneNode(true).children[0];
        card.href = "/examples/" + tutorial.url;
        const name = card.querySelector("[data-name]");
        name.textContent = tutorial.name;
        tutorialList.appendChild(card);
      });
      cardTemplate.remove();
      scroll.update();
    });
};
