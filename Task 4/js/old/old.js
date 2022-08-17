const stats = {
  monster: 0,
  mage: 0,
  draw: 0,
};

const game = () => {
  const monster = {
    maxHealth: 10,
    name: 'Лютый',
    moves: [
      {
        name: 'Удар когтистой лапой',
        physicalDmg: 3, // физический урон
        magicDmg: 0, // магический урон
        physicArmorPercents: 20, // физическая броня
        magicArmorPercents: 20, // магическая броня
        cooldown: 0, // ходов на восстановление
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
  };

  const mage = {
    maxHealth: 12,
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
  };

  let round = 1;

  let cooldown = [];

  function dealDamage(monsterMove, mageMove) {
    const damageTypes = [`physic`, `magic`];
    const monsterDamage = calcDamage(monsterMove, mageMove, damageTypes);
    const mageDamage = calcDamage(mageMove, monsterMove, damageTypes);

    monster.maxHealth -= mageDamage;
    // console.log(
    //   `${
    //     monster.name
    //   } получает урон ${mageDamage} от ${mageMove.name.toUpperCase()} и у него остается ${
    //     monster.maxHealth
    //   } здоровья. `
    // );

    mage.maxHealth -= monsterDamage;
    // console.log(
    //   `${
    //     mage.name
    //   } получает урон ${monsterDamage} от ${monsterMove.name.toUpperCase()} и у него остается ${
    //     mage.maxHealth
    //   } здоровья. `
    // );
  }

  function calcDamage(attackerMove, defenderMove, damageTypes) {
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

    // С помощью reduce():

    // return damageTypes.reduce((totalDamage, damageType) => {
    //   totalDamage +=
    //     attackerMove[`${damageType}Dmg`] -
    //     (attackerMove[`${damageType}Dmg`] / 100) *
    //       defenderMove[`${damageType}ArmorPercents`];
    //   return totalDamage;
    // }, 0);
  }

  function randomMove(moves) {
    const randomIndex = randomInt(1, moves.length) - 1;
    return moves[randomIndex];
  }

  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function addToCooldown(move) {
    move.cooldown > 0 && (cooldown = [...cooldown, move]);
  }

  function removeFromCooldown(move) {
    const moveIndex = cooldown.map((move) => move.name).indexOf(move.name);
    cooldown = [
      ...cooldown.slice(0, moveIndex),
      ...cooldown.slice(moveIndex + 1),
    ];
  }

  function coolDownCounter() {
    cooldown.forEach((move) => {
      move.cooldown === 0 ? removeFromCooldown(move) : move.cooldown--;
    });
  }

  function getActiveMoves(moves) {
    return moves.filter(
      (move) => move && !cooldown.find((el) => el.name === move.name)
    );
  }

  function nextRound() {
    // console.log(`Раунд ${round}!`);

    // console.log(`Cooldown:`);
    // console.log(
    //   cooldown
    //     .map((move) => `${move.name.toUpperCase()}: ${move.cooldown}`)
    //     .join(`; `)
    // );

    const monsterMoves = getActiveMoves(monster.moves);
    // console.log(`Monster has ${monsterMoves.length} active moves:`);
    // console.log(
    //   monsterMoves
    //     .map((move) => `${move.name.toUpperCase()}: ${move.cooldown}`)
    //     .join(`; `)
    // );
    const monsterMove = randomMove(monsterMoves);

    const mageMoves = getActiveMoves(mage.moves);
    // console.log(`Mage has ${mageMoves.length} active moves:`);
    // console.log(
    //   mageMoves
    //     .map((move) => `${move.name.toUpperCase()}: ${move.cooldown}`)
    //     .join(`; `)
    // );
    const mageMove = randomMove(mageMoves);

    dealDamage(monsterMove, mageMove);

    coolDownCounter();

    addToCooldown(monsterMove);
    addToCooldown(mageMove);

    round++;
  }

  while (monster.maxHealth > 0 && mage.maxHealth > 0) {
    nextRound();
  }

  // monster.maxHealth <= 0 && mage.maxHealth <= 0
  //   ? console.log(`${mage.name} и ${monster.name} пали смертью храбрых!`) &&
  //     stats.draw++
  //   : monster.maxHealth <= 0 && mage.maxHealth > 0
  //   ? console.log(`${mage.name} победил!`) && stats.mage++
  //   : console.log(`${monster.name} победил!`) && stats.monster++;
  monster.maxHealth <= 0 && mage.maxHealth <= 0
    ? stats.draw++
    : monster.maxHealth <= 0 && mage.maxHealth > 0
    ? stats.mage++
    : stats.monster++;
};

new Array(1000000).fill(1).forEach((el) => game());

console.log(
  `Mage: ${Math.floor((stats.mage / 1000000) * 100)}\nMonster: ${Math.floor(
    (stats.monster / 1000000) * 100
  )}\nDraw: ${Math.floor((stats.draw / 1000000) * 100)}`
);
