const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
let timer = null;
startButton.addEventListener('click', handlerStart);
function handlerStart() {
  timer = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  startButton.setAttribute('disabled', '');
}
stopButton.addEventListener('click', handlerStop);
function handlerStop() {
  clearInterval(timer);
  startButton.removeAttribute('disabled');
}
