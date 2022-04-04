const scriptToLoad = [
  ["", NaN],
  ["", NaN],
];
const qs = (selector, body = document) => {
  return body.querySelector(selector);
};
const qsa = (selector, body = document) => {
  return [...body.querySelectorAll(selector)];
};

const isScriptLoaded = (path, body = document) => {
  return qsa(`script[src="${path}"`, body) == false ? false : true;
};

const loadScript = (path, integrity = NaN) => {
  const script = document.createElement("script");
  script.src = path;
  if (integrity) {
    script.integrity = integrity;
    script.crossorigin = "anonymous";
    script.referrerpolicy = "no-referrer";
  }
  document.body.appendChild(script);
};

const loadScriptIfDoesnt = (path, integrity = NaN) => {
  if (isScriptLoaded(path)) return;
  loadScript(path, integrity);
};
