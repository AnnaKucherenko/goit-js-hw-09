const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const bodyEl = document.querySelector('body');

startBtn.addEventListener('click', onStartBtnClick);

function onStartBtnClick(evt) {
  evt.preventDefault();
    function getRandomHexColor() {
            return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    }
    bodyEl.style.backgroundColor = getRandomHexColor();
     
    changeColorBgr = setInterval(() => { bodyEl.style.backgroundColor = getRandomHexColor() }, 1000);
    startBtn.setAttribute("disabled", "disabled");
}

stopBtn.addEventListener('click', onStoptBtnClick);

function onStoptBtnClick(evt) {
    evt.preventDefault();
    clearInterval(changeColorBgr);
    stopBtn.setAttribute("disabled", "disabled");
    startBtn.removeAttribute("disabled");
}