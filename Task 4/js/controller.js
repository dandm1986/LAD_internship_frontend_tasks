import * as model from './model.js';
import startView from './view/startView.js';
import gameView from './view/gameView.js';
import endView from './view/endView.js';

const newGame = (difficulty) => {
  model.resetState();
  model.setMageHealth(difficulty);
  newRound();
};

const newRound = () => {
  model.setMonsterMove();
  gameView.render(model.state);
  gameView.addHandlerSelectMove(makePlayerMove);
};

const makePlayerMove = (move) => {
  model.setMageMove(move);
  gameView.render(model.state);
  gameView.addHandlerSelectMove(makePlayerMove);
  gameView.addHandlerMakeMove(dealDamage);
};

const dealDamage = () => {
  model.dealDamage(model.state.monsterMove, model.state.mageMove);
  resetCooldowns();
  model.nextRound();
  if (model.state.monster.maxHealth > 0 && model.state.mage.maxHealth > 0) {
    newRound();
  } else {
    endView.render(model.state);
    endView.addHandlerAgain(init);
  }
};

const resetCooldowns = () => {
  model.coolDownCounter();
  model.addToCooldown(model.state.monsterMove);
  model.addToCooldown(model.state.mageMove);
};

const init = () => {
  startView.render();
  startView.addHandlerDifficulty(newGame);
};

init();
