const butonStart = document.querySelector('[data-start]');
const butonStop = document.querySelector('[data-stop]');
const body = document.body;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
let interval = null;

butonStart.addEventListener('click', () => {
  interval = setInterval(() => {
    const color = getRandomHexColor();
    body.style.backgroundColor = color;
  }, 1000);

  butonStart.disabled = true;
  butonStop.disabled = false;
});

butonStop.addEventListener('click', () => {
  const start = getRandomHexColor();
  body.style.backgroundColor = start;

  clearInterval(interval);

  butonStart.disabled = false;
  butonStop.disabled = true;
});
