import View from './View.js';
import { renderFloat } from '../helpers.js';

class GameView extends View {
  _parentElement = document.querySelector(`body`);

  addHandlerSelectMove(handler) {
    const moves = document.querySelector(`.mage .moves`);
    moves.addEventListener(`click`, (e) => {
      const btn = e.target.closest(`button`);
      btn && handler(btn.dataset.move);
    });
  }

  addHandlerMakeMove(handler) {
    const container = document.querySelector(`#make-move`);
    container.addEventListener(`click`, (e) => {
      e.target.classList.contains(`btn`) && handler();
    });
  }

  _generateMarkup() {
    return `
    <header>
      <h1>Раунд ${this._data.round}</h1>
    </header>
    <main>
      <section class="monster">
        <div class="header">
          <div class="container">
            <img class="icon" src="./img/monster.png" alt="${
              this._data.monster.name
            }" />
          </div>
          ${this._generateMarkUpStats(`monster`)}
        </div>
        <ul class="moves">
        ${this._data.monster.moves
          .map((move) => this._generateMarkUpMoves(move, this._data, true))
          .join(``)}
        </ul>
        ${this._data.monsterMove && this._generateMarkUpCard(`monsterMove`)}
      </section>
      <section class="mage">
        <div class="header">
          ${this._generateMarkUpStats(`mage`)}
          <div class="container">
            <img class="icon" src="./img/mage.png" alt="${
              this._data.mage.name
            }" />
          </div>
        </div>
        <ul class="moves">
        ${this._data.mage.moves
          .map((move) => this._generateMarkUpMoves(move, this._data))
          .join(``)}
        </ul>
          ${this._data.mageMove && this._generateMarkUpCard(`mageMove`)}
      </section>
    </main>
    `;
  }

  _generateMarkUpStats(hero) {
    return `
    <div class="header-stats">
      <h2 class="name">${this._data[hero][`name`]}</h2>
      <h3 class="health">Здоровье: ${renderFloat(
        this._data[hero][`maxHealth`]
      )}</h3>
      <p class="move-name">${
        this._data[`${hero}Move`]
          ? this._data[`${hero}Move`][`name`]
          : hero === `monster`
          ? ``
          : `Чем ответишь?`
      }</p>
    </div>
    `;
  }

  _generateMarkUpCard(move) {
    return `
      <div class="card">
        <div class="container" id="physical-attack">
          <img
            class="icon"
            src="./img/physAttack.png"
            alt="physical attack"
          />
          <div class="icon-stats">
            <p class="stats-text">${this._data[move][`physicalDmg`]}</p>
          </div>
        </div>
        <div class="container" id="magical-attack">
          <img class="icon" src="./img/magAttack.png" alt="magical attack" />
          <div class="icon-stats">
            <p class="stats-text">${this._data[move][`magicDmg`]}</p>
          </div>
        </div>
        <div class="container" id="move-picture">
          <img class="icon" src="./img/${this._data[move][`name`]}.png" alt="${
      this._data[move][`name`]
    }" />
        </div>
        <div class="container" id="physical-defense">
          <img class="icon" src="./img/physDef.png" alt="physical defense" />
          <div class="icon-stats">
            <p class="stats-text">${
              this._data[move][`physicArmorPercents`]
            }%</p>
          </div>
        </div>
        <div class="container" id="magical-defense">
          <img class="icon" src="./img/magDef.png" alt="magical defense" />
          <div class="icon-stats">
            <p class="stats-text">${this._data[move][`magicArmorPercents`]}%</p>
          </div>
        </div>
        <div class="container" id="cooldown">
          <img class="icon" src="./img/cooldown.png" alt="cooldown time" />
          <div class="icon-stats">
            <p class="stats-text">${this._data[move][`cooldown`]}</p>
          </div>
        </div>
        ${
          move === `mageMove`
            ? `
          <div class="container" id="make-move">
            <button class="btn">Выбрать</button>
          </div>
        `
            : ``
        }
      </div>
    `;
  }

  _generateMarkUpMoves(move, data, isMonster) {
    const underCooldown = data.cooldown?.find((el) => el.name === move.name);
    return `
    <li>
      <${
        underCooldown || isMonster
          ? `div class="container"`
          : `button class="btn--select-move container" data-move="${move.name}"`
      } >
        <img class="icon" src="./img/${move.name}.png" alt="${move.name}" />
        ${
          underCooldown
            ? `<div class="icon-stats"><p class="stats-text">${underCooldown.cooldown}</p></div>`
            : ``
        }
      </${underCooldown || isMonster ? `div` : `button`}>
    </li>
    `;
  }
}

export default new GameView();
