import View from './View.js';

class EndView extends View {
  _parentElement = document.querySelector(`body`);

  addHandlerAgain(handler) {
    const header = document.querySelector(`header`);
    header.addEventListener(`click`, (e) => {
      e.target.classList.contains(`btn`) && handler();
    });
  }

  _generateMarkup() {
    const content =
      this._data.monster.maxHealth <= 0 && this._data.mage.maxHealth <= 0
        ? `
        <div class="container">
          <img class="icon" src="./img/graveStone.png" alt="${this._data.monster.name}" />
        </div>
        <h1>Все пали смертью храбрых!</h1>`
        : this._data.monster.maxHealth <= 0 && this._data.mage.maxHealth > 0
        ? `
          <div class="container">
            <img class="icon" src="./img/mage.png" alt="${this._data.monster.name}" />
          </div>
          <h1>${this._data.mage.name} победил!<h1>`
        : `
          <div class="container">
            <img class="icon" src="./img/monster.png" alt="${this._data.mage.name}" />
          </div>
          <h1>${this._data.monster.name} победил!<h1>`;
    return `
    <header>
      ${content}
      <ul class="header-btns">
        <li>
          <button class="btn">Ещё раз!</button> 
        </li>
      <ul>
    </header>
    `;
  }
}

export default new EndView();
