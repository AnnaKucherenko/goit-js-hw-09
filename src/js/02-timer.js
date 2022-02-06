import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const startBtnEl = document.querySelector('button[data-start]');
startBtnEl.setAttribute('disabled', 'disabled');
const timerEl = document.querySelector('.timer');
timerEl.style.display = 'flex';
const fieldsArrey = document.querySelectorAll('.field');

for (const field of fieldsArrey) {
  field.style.display = 'flex';
  field.style.flexDirection = 'column';
  field.style.alignItems = 'center';
  field.style.marginLeft = '7px';
  field.firstElementChild.style.fontSize = '36px';
}

const daysEl = document.querySelector('span[data-days]');
const hoursEl = document.querySelector('span[data-hours]');
const minutesEl = document.querySelector('span[data-minutes]');
const secondsEl = document.querySelector('span[data-seconds]');

function updateClockface({ days, hours, minutes, seconds }) {
  daysEl.textContent = `${days}`;
  hoursEl.textContent = `${hours}`;
  minutesEl.textContent = `${minutes}`;
  secondsEl.textContent = `${seconds}`;
  
}
let finishTime = 0;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose (selectedDates){
      const date = new Date()
      if (selectedDates[0]<date) {
        window.alert("Please choose a date in the future")
      }
      if (selectedDates[0] > date) {
        startBtnEl.removeAttribute("disabled");
        finishTime = selectedDates[0].getTime();
      }
  },
};

flatpickr("#datetime-picker", options);

startBtnEl.addEventListener('click', timer);

function timer() {
  let intervalId = null;
  startBtnEl.setAttribute('disabled', 'disabled');
  intervalId = setInterval(countdownTimer, 1000);
  function countdownTimer() {
    const currentTime = Date.now();
    const deltaTime = finishTime - currentTime;
    if (deltaTime<0) {
      clearInterval(intervalId);
    }
    const time = convertMs(deltaTime);
    updateClockface(time);
           
  }
  
} 

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
  
}
 
function pad(value) {
  return String(value).padStart(2, '0');
}

