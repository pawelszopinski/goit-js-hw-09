import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
let intervalID = null;
const btnEl = document.querySelector('button');
const inputDaysEl = document.querySelector('span[data-days]');
const inputHoursEl = document.querySelector('span[data-hours]');
const inputMinutesEl = document.querySelector('span[data-minutes]');
const inputSecondsEl = document.querySelector('span[data-seconds]');

btnEl.disabled = true;

const inputEl = document.getElementById('datetime-picker');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < options.defaultDate) {
      alert('Please choose a date in the future');
    } else {
      btnEl.disabled = false;
    }
  },
};

const fp = flatpickr(inputEl, options);

function addLeadingZero(value) {
  if (value < 10) return value.toString().padStart(2, '0');
  return value;
}
function start() {
  intervalID = setInterval(() => {
    const flatPickrDate = inputEl.value;
    const pickedDate = new Date(flatPickrDate).getTime();
    const currentTime = new Date().getTime();
    const targetDate = pickedDate - currentTime;
    const givenTime = convertMs(targetDate);
    inputDaysEl.innerText = `${addLeadingZero(givenTime.days)}`;
    inputHoursEl.innerText = `${addLeadingZero(givenTime.hours)}`;
    inputMinutesEl.innerText = `${addLeadingZero(givenTime.minutes)}`;
    inputSecondsEl.innerText = `${addLeadingZero(givenTime.seconds)}`;
    if (givenTime.seconds === 0) {
      clearInterval(intervalID);
    }
  }, 1000);
}

btnEl.addEventListener('click', start);
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
