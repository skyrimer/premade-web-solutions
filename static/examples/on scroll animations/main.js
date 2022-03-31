const boxes = document.querySelectorAll(".box");
let observerConfig = {
  rootMargin: "-15%",
};
const observerHandler = (entries, observer) => {
  entries.forEach((entry) => {
    entry.target.classList.toggle("show", entry.isIntersecting);
    // if you want to unobserve after it intersects
    // if (entry.isIntersecting) observer.unobserve(entry.target);
  });
};
let boxObserver = new IntersectionObserver(observerHandler, observerConfig);

boxes.forEach((box) => {
  boxObserver.observe(box);
});
console.log(boxObserver);

const type = document.querySelector("#offset");
const typeValue = document.querySelector("#offsetValue");

const changeObserver = () => {
  boxObserver.disconnect();
  observerConfig = {};
  observerConfig[type.value] = typeValue.value;
  boxObserver = new IntersectionObserver(observerHandler, observerConfig);
  boxes.forEach((box) => {
    boxObserver.observe(box);
  });
  console.log(boxObserver);
};

typeValue.addEventListener("input", changeObserver);

type.addEventListener("change", changeObserver);

// let observerConfig = {
//   // Ration of the element after which the entry.isIntersecting will become true
//   // if the array is set like [0, 0.5, 1]
//   // the event will be triggered several times according to the ratio
//   // Can be any float from 0 to 1
//   // threshold: "0.1",
//   // Distance from the screen on which the entry.isIntersecting will become true
//   // Can be in pixels or in percent (percent of the screen)
//   // Can be positive (value before the object appears on the screen)
//   // and negative (value after the object hits the screen)
//   rootMargin: "-15%",
// };
// const observerHandler = (entries, observer) => {
//   entries.forEach((entry) => {
//     entry.target.classList.toggle("show", entry.isIntersecting);
//     // if you want to unobserve after it intersects
//     // if (entry.isIntersecting) observer.unobserve(entry.target);
//   });
// };
