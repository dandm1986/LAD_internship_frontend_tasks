'use strict';

const randomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const createRandomNumber = ({ length, minInt, maxInt }) => {
  const arr = [...new Array(length)];
  for (let i = 0; i < arr.length; i++) {
    let int = `${randomInt(minInt, maxInt)}`;
    !arr.find((el) => el == int) ? (arr[i] = int) : (int = randomInt) && i--;
  }
  return arr.join(``);
};

const guess = (num1, num2) => {
  if (num1.length !== num2.length) {
    attempts--;
    attempts > 0 &&
      alert(
        `Будьте внимательнее! Вы ввели неправильное количество цифр!\nПароль содержит ${num1.length} цифр. Осталось попыток: ${attempts}.`
      );
    return;
  }

  const guessedPositions = [],
    guessedNumbers = [],
    arr1 = [...num1],
    arr2 = [...num2];

  if (num1 === num2) {
    win = true;
  } else {
    arr2.forEach((el, i) => {
      arr1.find((elem) => elem === el) &&
        (arr1[i] === el ? guessedPositions.push(el) : guessedNumbers.push(el));
    });
    attempts--;

    attempts > 0 &&
      alert(
        `Ваш вариант ${num2}.\nCовпавших цифр не на своих местах - ${
          guessedNumbers.length
        } (${guessedNumbers.join(`, `)}), цифр на своих местах - ${
          guessedPositions.length
        } (${guessedPositions.join(`, `)}). Осталось попыток: ${attempts}`
      );
  }
};

let win = false,
  attempts = randomInt(5, 10);

const randomNumber = createRandomNumber({
  length: randomInt(3, 6),
  minInt: 0,
  maxInt: 9,
});

alert(
  `Пароль состоит из ${randomNumber.length} цирф. У вас есть ${attempts} попыток, чтобы взломать его!`
);

while (!win && attempts > 0) {
  const answer = prompt(`Есть вариант?`);
  guess(randomNumber, answer);
}

win ? alert(`Вы взломали пароль!`) : alert(`Пароль не взломан!`);
