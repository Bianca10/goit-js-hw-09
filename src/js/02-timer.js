import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = new Date();

    if (selectedDate < currentDate) {
      window.alert('Please choose a date in the future');
      return;
    }

    const startButton = document.querySelector('[data-start]');
    startButton.removeAttribute('disabled');
  },
};

flatpickr('#datetime-picker', options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

const startButton = document.querySelector('[data-start]');
const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');

let countdownInterval;

startButton.addEventListener('click', () => {
  const selectedDate = flatpickr.parseDate(
    document.querySelector('#datetime-picker').value
  );
  const currentDate = new Date();

  if (selectedDate <= currentDate) {
    window.alert('Please choose a date in the future');
    return;
  }

  startButton.setAttribute('disabled', 'true');

  countdownInterval = setInterval(() => {
    const timeDifference = selectedDate.getTime() - new Date().getTime();

    if (timeDifference <= 0) {
      clearInterval(countdownInterval);
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(timeDifference);

    daysElement.textContent = addLeadingZero(days);
    hoursElement.textContent = addLeadingZero(hours);
    minutesElement.textContent = addLeadingZero(minutes);
    secondsElement.textContent = addLeadingZero(seconds);
  }, 1000);
});
