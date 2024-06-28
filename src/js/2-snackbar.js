import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
//  Додаємо класи для стилізації
const input = document.querySelector('input');
input.classList.add('s-input');
const label = document.querySelector('label');
label.classList.add('s-label');
const fieldset = document.querySelector('fieldset');
fieldset.classList.add('s-fieldset');
const btn = document.querySelector('button');
btn.classList.add('s-btn');

// Виконання програми
const form = document.querySelector('.form');

form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();

  const delay = event.currentTarget.elements.delay.value;
  const isSuccess =
    event.currentTarget.elements.state.value === 'fulfilled' ? true : false;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (isSuccess) {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  promise
    .then(delay => {
      iziToast.success({
        backgroundColor: '#59a10d',
        timeout: delay,
        title: 'OK',
        theme: 'dark',
        iconUrl: './img/bi_check2-circle.svg',
        message: `Fulfilled promise in ${delay}ms`,
        position: 'topCenter',
      });
    })
    .catch(error => {
      iziToast.error({
        backgroundColor: '#ef4040',
        timeout: delay,
        title: 'Error',
        theme: 'dark',
        iconUrl: './img/bi_x-octagon.svg',
        message: `Rejected promise in ${delay}ms`,
        position: 'topCenter',
      });
    });
  event.currentTarget.reset();
}
