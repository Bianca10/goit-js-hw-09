document.querySelector('.form').addEventListener('submit', event => {
  event.preventDefault();

  const delay = parseInt(document.querySelector('[name="delay"]').value);
  const step = parseInt(document.querySelector('[name="step"]').value);
  const amount = parseInt(document.querySelector('[name="amount"]').value);

  for (let i = 1; i <= amount; i++) {
    const promiseDelay = delay + step * (i - 1);

    createPromise(i, promiseDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.Success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.Failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
});

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
