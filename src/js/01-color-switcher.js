const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
let intervalId = null;
stopBtn.disabled = true; /* przycisk Stop na początku jest nieaktywny, bo nie ma żadnej roli do spełnienia */

startBtn.addEventListener('click', () => {
  intervalId = setInterval(
    () => {
      let randomColor = getRandomHexColor();
      document.body.style.background = randomColor;
    },
    1000,
    (startBtn.disabled = true),
    (stopBtn.disabled = false)
  );
});
stopBtn.addEventListener('click', () => {
  clearInterval(intervalId);
  startBtn.disabled = false;
  stopBtn.disabled = true;
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
