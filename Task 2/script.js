var formElement = document.forms['formElement'];

// Вариант 1

formElement.addEventListener(`focusin`, (evt) => {
  var activeElement = formElement.querySelector('.focused');
  if (activeElement) {
    activeElement.classList.remove('focused');
  }
  evt.target.classList.add('focused');
});

formElement.addEventListener(`focusout`, (evt) => {
  var activeElement = formElement.querySelector('.focused');
  if (activeElement) {
    activeElement.classList.remove('focused');
  }
});

// Вариант 2

// var inputs = formElement.querySelectorAll(`input`);

// inputs.forEach((el) => {
//   el.onfocus = () => {
//     el.classList.add(`focused`);
//   };
//   el.onblur = () => {
//     el.classList.remove(`focused`);
//   };
// });
