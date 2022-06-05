export const loadTutorialCards = async (tutorialList, scroll) => {
  let tutorials = [];
  qsa("a.card").forEach((tutorial) => {
    tutorials.push({
      name: qs("h3", tutorial).textContent.toLowerCase(),
      element: tutorial,
    });
  });
  qs("#cards-search").addEventListener("input", ({ target }) => {
    tutorials.forEach((tutorial) => {
      tutorial.element.classList.toggle(
        "hide",
        !tutorial.name.includes(target.value.toLowerCase())
      );
    });
    tutorialList.classList.toggle(
      "empty",
      qsa(".card:not(.hide)", tutorialList).length == 0
    );
    scroll.update();
  });
};
