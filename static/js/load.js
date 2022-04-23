const copyElement = (element) => {
  return element.content.cloneNode(true).children[0];
};
const strToPath = (string) => {
  return string.toLowerCase().split(" ").join("-");
};
const loadCards = (data) => {
  const main = qs("main#swup");
  const footer = qs("section:last-child", main);
  const tableOfContents = qs("[data-content-list]");
  const tableOfContentsLink = qs("#template-link", tableOfContents);
  const templateSection = qs("#template-section");
  const templateTabs = qs("#template-tab");
  const templateTabWebsite = qs("[data-tab]");
  const templateTabLink = qs("[data-button]");
  for (let category in data) {
    const categoryHref = strToPath(category);
    const categoryLink = copyElement(tableOfContentsLink);
    const link = qs("a", categoryLink);
    link.textContent = category;
    link.href = `#${categoryHref}`;
    tableOfContents.appendChild(categoryLink);
    const section = copyElement(templateSection);
    qs("[data-header]", section).textContent = category;
    section.id = categoryHref;
    const tabs = copyElement(templateTabs);
    const tabsLinksWrapper = qs(".tab-links-wrapper", tabs);
    data[category].forEach((website) => {
      const tabLink = copyElement(templateTabLink);
      tabLink.textContent = website.name;
      tabLink.dataset.tabId = website.name;
      tabsLinksWrapper.appendChild(tabLink);

      const tabWebsite = copyElement(templateTabWebsite);
      tabWebsite.href = website.url;
      tabWebsite.id = website.name;
      qs("h3", tabWebsite).textContent = website.name;
      const tabImage = qs("img", tabWebsite);
      tabImage.alt = website.name;
      tabImage.dataset.src = `/static/images/helpful_websites/${strToPath(
        website.name
      )}.png`;
      qs(".tabs-wrapper", tabs).appendChild(tabWebsite);
    });
    qs(".tab-link", tabs).classList.toggle("active");
    const firstTabContent = qs(".tab-content", tabs);
    firstTabContent.classList.toggle("active");
    const firstTabContentImage = qs("img", firstTabContent);
    firstTabContentImage.setAttribute(
      "src",
      firstTabContentImage.getAttribute("data-src")
    );
    firstTabContentImage.removeAttribute("data-src");
    section.appendChild(tabs);
    main.insertBefore(section, footer);
  }
  templateSection.remove();
  tableOfContentsLink.remove();
  templateTabs.remove();
};
export const loadHelpfulWebsites = async (scroll) => {
  await fetch("/static/helpful-websites.json")
    .then((response) => response.json())
    .then(loadCards);
  scroll.update();
};
export const loadTutorialCards = async (tutorialList) => {
  const cardTemplate = qs("#tutorial-card-template");
  const tutorialSearch = qs("#cards-search");
  let tutorials = [];
  fetch("/static/tutorials.json")
    .then((response) => response.json())
    .then((data) => {
      tutorials = data.map((tutorial) => {
        const card = copyElement(cardTemplate);
        card.href = "/examples/" + tutorial.url;
        qs("[data-name]", card).textContent = tutorial.name;
        tutorialList.appendChild(card);
        return { name: tutorial.name.toLowerCase(), element: card };
      });
    });
  tutorialSearch.addEventListener("input", ({ target }) => {
    tutorials.forEach((tutorial) => {
      const isVisible = tutorial.name.includes(target.value.toLowerCase());
      tutorial.element.classList.toggle("hide", !isVisible);
    });
  });
};
