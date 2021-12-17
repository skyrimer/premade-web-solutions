window.onload = () => {
  // Navigation
  const hamburger = document.getElementsByClassName("ham")[0];
  const header = document.getElementById("header");
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    header.classList.toggle("active");
  });

  // Copyright
  document.getElementById("copyright").innerHTML = new Date().getFullYear();
};
