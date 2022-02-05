const form = document.querySelector('.form');
const delayEl = document.querySelector('input[name="delay"]');
form.addEventListener('submit', onFormSubmit);

function onFormSubmit(evt){
  evt.preventDefault();
  const formElements = evt.currentTarget.elements;

  const valueDelay = formElements.delay.value;
  const valueStep = formElements.step.value;
  const valueAmount = formElements.amount.value;

  const formData = {
        valueDelay,
        valueStep,
        valueAmount,
  }
  console.log(formData);
  console.log(formData.valueAmount);
  let position = 0;
  let delay = 0;
  for (let i = 1; i <= formData.valueAmount; i += 1) {
    position += 1;
    if (position === 1) {
      delay += Number(formData.valueDelay);
    }
    if (position >= 2) {
      delay += Number(formData.valueStep);
    }
    console.log(position, delay);
    createPromise(position, delay)
    .then(({ position, delay }) => {
      console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      console.log(`❌ Rejected promise ${position} in ${delay}ms`);
    });
  }
  
}

function createPromise(position, delay) {
    return new Promise((resolve, reject) => {
      const shouldResolve = Math.random() > 0.3;
      setTimeout(() => {
        if (shouldResolve) {
          resolve()
        } else {
          reject();
        }
      }, delay);
    })
   
}

