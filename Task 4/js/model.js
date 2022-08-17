import { randomInt, deepCopy } from './helpers.js';

const initialState = {
  round: 1,
  cooldown: [],
  monsterMove: ``,
  mageMove: ``,
  monster: {
    maxHealth: 10,
    name: 'Лютый',
    moves: [
      {
        name: 'Удар когтистой лапой',
        physicalDmg: 3,
        magicDmg: 0,
        physicArmorPercents: 20,
        magicArmorPercents: 20,
        cooldown: 0,
      },
      {
        name: 'Огненное дыхание',
        physicalDmg: 0,
        magicDmg: 4,
        physicArmorPercents: 0,
        magicArmorPercents: 0,
        cooldown: 3,
      },
      {
        name: 'Удар хвостом',
        physicalDmg: 2,
        magicDmg: 0,
        physicArmorPercents: 50,
        magicArmorPercents: 0,
        cooldown: 2,
      },
    ],
  },
  mage: {
    maxHealth: 0,
    name: 'Евстафий',
    moves: [
      {
        name: 'Удар боевым кадилом',
        physicalDmg: 2,
        magicDmg: 0,
        physicArmorPercents: 0,
        magicArmorPercents: 50,
        cooldown: 0,
      },
      {
        name: 'Вертушка левой пяткой',
        physicalDmg: 4,
        magicDmg: 0,
        physicArmorPercents: 0,
        magicArmorPercents: 0,
        cooldown: 4,
      },
      {
        name: 'Каноничный фаербол',
        physicalDmg: 0,
        magicDmg: 5,
        physicArmorPercents: 0,
        magicArmorPercents: 0,
        cooldown: 3,
      },
      {
        name: 'Магический блок',
        physicalDmg: 0,
        magicDmg: 0,
        physicArmorPercents: 100,
        magicArmorPercents: 100,
        cooldown: 4,
      },
    ],
  },
};

/* NEW GAME */

export let state;

export const resetState = () => {
  state = deepCopy(initialState);
};

export const setMageHealth = (difficulty) => {
  switch (difficulty) {
    case `hard`:
      state.mage.maxHealth = 8;
      break;
    case `medium`:
      state.mage.maxHealth = 10;
      break;
    default:
      state.mage.maxHealth = 12;
      break;
  }
};

/* HANDLE MOVES */

export const setMonsterMove = () => {
  const activeMoves = state.monster.moves.filter(
    (move) => move && !state.cooldown.find((el) => el.name === move.name)
  );
  const randomIndex = randomInt(1, activeMoves.length) - 1;
  state.monsterMove = activeMoves[randomIndex];
};

export const setMageMove = (move) => {
  state.mageMove = state.mage.moves.filter((el) => el.name === move)[0];
};

/* DEAL DAMAGE */

export const dealDamage = () => {
  const damageTypes = [`physic`, `magic`];
  const monsterDamage = calcDamage(
    state.monsterMove,
    state.mageMove,
    damageTypes
  );
  const mageDamage = calcDamage(state.mageMove, state.monsterMove, damageTypes);

  state.monster.maxHealth -= mageDamage;

  state.mage.maxHealth -= monsterDamage;
};

const calcDamage = (attackerMove, defenderMove, damageTypes) => {
  let totalDamage = 0;

  damageTypes.forEach((damageType) => {
    totalDamage +=
      attackerMove[
        `${damageType === `physic` ? `${damageType}al` : damageType}Dmg`
      ] -
      (attackerMove[
        `${damageType === `physic` ? `${damageType}al` : damageType}Dmg`
      ] /
        100) *
        defenderMove[`${damageType}ArmorPercents`];
  });

  return totalDamage;
};

/* HANDLE COOLDOWNS */

export const addToCooldown = (move) => {
  move.cooldown > 0 && (state.cooldown = [...state.cooldown, deepCopy(move)]);
};

export const coolDownCounter = () => {
  state.cooldown.forEach((move) => {
    move.cooldown--;
    move.cooldown === 0 && removeFromCooldown(move);
  });
};

const removeFromCooldown = (move) => {
  const moveIndex = state.cooldown.map((move) => move.name).indexOf(move.name);
  state.cooldown = [
    ...state.cooldown.slice(0, moveIndex),
    ...state.cooldown.slice(moveIndex + 1),
  ];
};

/* NEXT ROUND */

export const nextRound = () => {
  state.mageMove = ``;
  state.monsterMove = ``;
  state.round++;
};
