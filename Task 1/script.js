let str = `Старший братец ПОНЕДЕЛЬНИК –
работяга, не бездельник.
Он неделю открывает
всех трудиться зазывает.

ВТОРНИК следует за братом
у него идей богато.

А потом СРЕДА-сестрица,
не пристало ей лениться.

Брат ЧЕТВЕРГ и так, и сяк,
он мечтательный чудак.

ПЯТНИЦА-сестра сумела
побыстрей закончить дело.

Предпоследний брат СУББОТА
не выходит на работу.

В гости ходит ВОСКРЕСЕНЬЕ,
очень любит угощенье.
`;

const ruEng = {
  понедельник: 'monday',
  вторник: 'tuesday',
  среда: 'wednesday',
  четверг: 'thursday',
  пятница: 'friday',
  суббота: 'satturday',
  воскресенье: 'sunday',
};

// Вариант 1

// for (let [key, value] of Object.entries(ruEng)) {
//   key = key.toUpperCase();
//   value = value.toUpperCase();
//   str = str.replace(key, value);
// }

// console.log(str);

// Вариант 2

function changeString(langPair, initStr) {
  let changedStr = initStr;

  for (let [key, value] of Object.entries(langPair)) {
    const foundStrings = changedStr.match(new RegExp(`${key}`, `gi`));

    // С помощью if:
    /*
    if (foundStrings) {
      foundStrings.forEach((el) => {
        let resultValue;

        if (key.toLowerCase() === el) {
          resultValue = value.toLowerCase();
        } else if (key.toUpperCase() === el) {
          resultValue = value.toUpperCase();
        } else {
          resultValue = value[0].toUpperCase() + value.slice(1).toLowerCase();
        }

        changedStr = changedStr.replace(new RegExp(`${key}`, `i`), resultValue);
      });
    }
    */

    // С помощью логических операторов:

    foundStrings &&
      foundStrings.forEach((el) => {
        let resultValue;

        (key.toLowerCase() === el && (resultValue = value.toLowerCase())) ||
          (key.toUpperCase() === el && (resultValue = value.toUpperCase())) ||
          (resultValue = value[0].toUpperCase() + value.slice(1).toLowerCase());

        changedStr = changedStr.replace(new RegExp(`${key}`, `i`), resultValue);
      });
  }

  return changedStr;
}

console.log(changeString(ruEng, str));
