import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// 1. Розміщую функції
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

function addZero(value) {
  return value.toString().padStart(2, '0');
}
// 2. Оголошую змінні
const myInput = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');

const spanDays = document.querySelector('span[data-days]');
const spanHours = document.querySelector('span[data-hours]');
const spanMinutes = document.querySelector('span[data-minutes]');
const spanSeconds = document.querySelector('span[data-seconds]');

let userTime;
let startTime;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      startBtn.disabled = true;
      iziToast.error({
        backgroundColor: 'red',
        title: 'Error',
        theme: 'dark',
        iconUrl: './img/bi_x-octagon.svg',
        iconColor: '#ffffff',
        message: 'Please choose a date in the future',
        position: 'topCenter',
      });
      return;
    }
    startTime = options.defaultDate;
    userTime = selectedDates[0];
    startBtn.disabled = false;
  },
};

// 3. Виконання програми
startBtn.disabled = true;

const fp = flatpickr(myInput, options);

startBtn.addEventListener('click', () => {
  startBtn.disabled = true;
  myInput.disabled = true;
  // Встановлюємо дату - поточну дату-час на момент натискання кнопки
  // і дату користувача з поточними годиною-минутами-секундами,
  // не змінюємо дату на поточну, якщо дата-час користувача на момент
  // старту таймера (натискання кнопки Старт) стала < поточної дати=часу
  // і не встановлюємо поточний час користувачу якщо ці дати - один день
  if (new Date() < userTime) {
    startTime = new Date();
  }
  if (
    !(userTime.toString().slice(0, 15) === startTime.toString().slice(0, 15))
  ) {
    userTime.setHours(startTime.getHours());
    userTime.setMinutes(startTime.getMinutes());
    userTime.setSeconds(startTime.getSeconds());
  }

  let intervalTime = userTime.getTime() - startTime.getTime();
  const intervalId = setInterval(() => {
    if (intervalTime > 0) {
      const obj = convertMs(intervalTime);
      spanDays.innerHTML = addZero(obj.days);
      spanHours.innerHTML = addZero(obj.hours);
      spanMinutes.innerHTML = addZero(obj.minutes);
      spanSeconds.innerHTML = addZero(obj.seconds);
      intervalTime -= 1000;
    } else {
      clearInterval(intervalId);
      myInput.disabled = false;
    }
  }, 1000);

  // якщо таймер включився надовго - треба мати можливість його зупинити
  const timer = document.querySelector('.timer');
  timer.onclick = function () {
    clearInterval(intervalId);
    myInput.disabled = false;
    spanDays.innerHTML = '00';
    spanHours.innerHTML = '00';
    spanMinutes.innerHTML = '00';
    spanSeconds.innerHTML = '00';

    console.log('finis');
  };
});
