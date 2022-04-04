const qs = (selector, body = document) => {
  return body.querySelector(selector);
};
const qsa = (selector, body = document) => {
  return [...body.querySelectorAll(selector)];
};