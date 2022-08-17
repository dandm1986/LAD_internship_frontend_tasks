'use strict';

import * as model from './model.js';
import { render, addHandlerGuess, addHandlerAgain } from './view.js';

const makeAttempt = (guess) => {
  model.makeGuess(guess);

  if (model.gameOver() || model.guessIsRight()) {
    render(model.state);
    addHandlerAgain(newGame);
  } else {
    model.guessIsValid();
    model.checkGuessNumbers();
    render(model.state);
    addHandlerGuess(makeAttempt);
    addHandlerAgain(newGame);
  }
};

const newGame = () => {
  model.newGame();
  render(model.state);
  addHandlerGuess(makeAttempt);
  addHandlerAgain(newGame);
};

newGame();
