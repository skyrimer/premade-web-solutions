export const loadHelpfulWebsites = async () => {
  const copyElement = (element) => {
    return element.content.cloneNode(true).children[0];
  };
  const strToPath = (string) => {
    return string.toLowerCase().split(" ").join("-");
  };
  const main = qs("main#swup");
  const footer = qs("section:last-child", main);
  const tableOfContents = qs("[data-content-list]");
  const templateLink = qs("#template-link", tableOfContents);
  const templateSlider = qs("#template-slider");
  const templateSlide = qs("#template-slide");
  const response = await fetch("/static/helpful-websites.json");
  const data = await response.json();
  for (let section in data) {
    const sectionHref = strToPath(section);
    // Table of Contents
    const sectionLink = copyElement(templateLink);
    const link = qs("a", sectionLink);
    link.textContent = section;
    link.href = `#${sectionHref}`;
    tableOfContents.appendChild(sectionLink);
    // Sliders
    const slider = copyElement(templateSlider);
    slider.id = sectionHref;
    data[section].forEach((slideData) => {
      const slide = copyElement(templateSlide);
      const slideLink = qs("[data-link", slide);
      slideLink.href = slideData.url;
      slideLink.textContent = slideData.name;
      const slideImage = qs("[data-image]", slide);
      slideImage.alt = slideData.name;
      slideImage.dataset.src = `/static/images/helpful_websites/${strToPath(
        slideData.name
      )}.png`;
      qs(".swiper-wrapper", slider).appendChild(slide);
    });
    qs("[data-header]", slider).textContent = section;
    main.insertBefore(slider, footer);
  }
  templateLink.remove();
  templateSlider.remove();
  templateSlide.remove();
};
export const loadTutorialCards = async (scroll) => {
  const tutorialList = qs("[data-tutorial-list]");
  const cardTemplate = qs("#tutorial-card-template");
  fetch("/static/tutorials.json")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((tutorial) => {
        const card = cardTemplate.content.cloneNode(true).children[0];
        card.href = "/examples/" + tutorial.url;
        const name = qs("[data-name]", card);
        name.textContent = tutorial.name;
        tutorialList.appendChild(card);
      });
      cardTemplate.remove();
      scroll.update();
    });
};
