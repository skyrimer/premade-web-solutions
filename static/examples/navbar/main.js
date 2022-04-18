const body = document.body;
const navbarMediaQuery = window.matchMedia("(min-width: 53.5rem)");
const scrollbarWidth = window.innerWidth - body.offsetWidth + "px";
const navbar = document.querySelector("nav");
const toggler = navbar.querySelector(".navbar-toggler");
const paddingLockList = [navbar, body];
const setPaddingRight = (elements, paddingLeft = "0px") => {
  elements.forEach((element) => {
    element.style.paddingRight = paddingLeft;
  });
};
const handleMobileChange = (event) => {
  if (!event.matches) {
    toggler.onclick = () => {
      navbar.classList.toggle("active");
      body.classList.toggle("lock");
      if (navbar.classList.contains("active")) {
        setPaddingRight(paddingLockList, scrollbarWidth);
      } else {
        setPaddingRight(paddingLockList);
      }
    };
  } else {
    toggler.onclick = () => {};
    body.classList.remove("lock");
    navbar.classList.remove("active");
    setPaddingRight(paddingLockList);
  }
};
navbarMediaQuery.addListener(handleMobileChange);
handleMobileChange(navbarMediaQuery);
