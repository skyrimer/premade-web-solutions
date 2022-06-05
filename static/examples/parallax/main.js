let rellax = new Rellax(".rellax");

const activateMouseParallax = (scene) => {
  scene.addEventListener("mousemove", (event) => {
    scene.style.setProperty(
      "--x-displacement",
      (scene.clientWidth - event.clientX) / 100 + "px"
    );
    scene.style.setProperty(
      "--y-displacement",
      (scene.clientHeight - event.clientY) / 100 + "px"
    );
  });
};
const scene = document.querySelector("#scene");
activateMouseParallax(scene);
