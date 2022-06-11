const contextMenu = document.getElementById("context-menu");
const contextMenuScope = document.querySelector("body");
const normalizeContextMenuPosition = (clientX, clientY) => {
  const { left: scopeOffsetX, top: scopeOffsetY } =
    contextMenuScope.getBoundingClientRect();
  const scopeX = clientX - scopeOffsetX;
  const scopeY = clientY - scopeOffsetY;
  let normalizerX = clientX;
  let normalizerY = clientY;
  if (scopeX + contextMenu.clientWidth > contextMenuScope.clientWidth) {
    normalizerX = scopeOffsetX + contextMenuScope.clientWidth - contextMenu.clientWidth;
  }
  if (scopeY + contextMenu.clientHeight > contextMenuScope.clientHeight) {
    normalizerY = scopeOffsetY + contextMenuScope.clientHeight - contextMenu.clientHeight;
  }
  return { normalizerX, normalizerY };
};

contextMenuScope.addEventListener("contextmenu", (event) => {
  event.preventDefault();
  const { clientX: mouseX, clientY: mouseY } = event;
  const { normalizerX, normalizerY } = normalizeContextMenuPosition(mouseX, mouseY);
  if (contextMenu.classList.contains("active")) {
    contextMenu.classList.remove("active");
    setTimeout(() => {
      contextMenu.style.top = `${normalizerY}px`;
      contextMenu.style.left = `${normalizerX}px`;
      contextMenu.classList.add("active");
    }, 200);
  } else {
    contextMenu.style.top = `${normalizerY}px`;
    contextMenu.style.left = `${normalizerX}px`;
    contextMenu.classList.add("active");
  }
});
contextMenuScope.addEventListener("click", (event) => {
  if (event.target.offsetParent != contextMenu) {
    contextMenu.classList.remove("active");
  }
});