import { Notify } from 'notiflix';

const form = document.querySelector('.form');
form.addEventListener('submit', handlerSubmit);
function handlerSubmit(evt) {
  evt.preventDefault();
  const options = {
    delay: Number(evt.target.elements.delay.value),
    step: Number(evt.target.elements.step.value),
    amount: Number(evt.target.elements.amount.value),
  };
  for (let i = 0; i < options.amount; i++) {
    createPromise(i, options.delay + i * options.step)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay} ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      }
    }, delay);
  });
}
