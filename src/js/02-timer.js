import flatpickr from 'flatpickr';
import { Notify } from 'notiflix';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

const picker = document.querySelector('#datetime-picker');
const dateContainers = {
  startBtn: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

let selectedTime = null;
let timerID = null;

dateContainers.startBtn.addEventListener('click', handlerTimer);
dateContainers.startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < Date.now()) {
      return Notify.failure('Please choose a date in the future');
    }

    Notify.success('Selected date is valid !');
    selectedTime = selectedDates[0].getTime();

    return (dateContainers.startBtn.disabled = false);
  },
};

flatpickr(picker, options);

function handlerTimer() {
  dateContainers.startBtn.disabled = true;
  timerID = setInterval(() => {
    const calculatedTime = selectedTime - Date.now();
    const { days, hours, minutes, seconds } = convertMs(calculatedTime);
    if (calculatedTime <= 0) {
      clearInterval(timerID);
      return;
    }
    updateTimer({ days, hours, minutes, seconds });
  }, 1000);
}

function addZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}
function updateTimer({ days, hours, minutes, seconds }) {
  dateContainers.days.textContent = `${days}`;
  dateContainers.hours.textContent = `${hours}`;
  dateContainers.minutes.textContent = `${minutes}`;
  dateContainers.seconds.textContent = `${seconds}`;
}
