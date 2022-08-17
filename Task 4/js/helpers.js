export const renderFloat = (number) => {
  return number % 1 === 0 ? number : number.toFixed(1);
};

export const randomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const deepCopy = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};
