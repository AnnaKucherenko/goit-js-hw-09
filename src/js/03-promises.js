const form = document.querySelector('.form');
const delayEl = document.querySelector('input[name="delay"]');
form.addEventListener('submit', onFormSubmit);

let position = 0;
let delay = 0;
  
function onFormSubmit(evt){
  evt.preventDefault();
  const formElements = evt.currentTarget.elements;

  const valueDelay = formElements.delay.value;
  const valueStep = formElements.step.value;
  const valueAmount = formElements.amount.value;
    
  for (let i = 1; i <= valueAmount; i += 1) {
    position += 1;
    if (position === 1) {
      delay += Number(valueDelay);
    }
    if (position >= 2) {
      delay += Number(valueStep);
    }
    console.log(position, delay);
    createPromise(position, delay)
      .then(result => { console.log(result); })
      .catch (error => { console.log(error); });
  }
}

function createPromise(position, delay) {
  return new Promise ((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`)
      } else {
        reject(`❌ Rejected promise ${position} in ${delay}ms`);
      }
      
    }, delay);
  });
  
}

