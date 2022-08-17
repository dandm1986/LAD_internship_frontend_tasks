import View from './View.js';

class StartView extends View {
  _parentElement = document.querySelector(`body`);

  addHandlerDifficulty(handler) {
    const header = document.querySelector(`header`);
    header.addEventListener(`click`, (e) => {
      e.target.classList.contains(`btn`) &&
        handler(e.target.dataset.difficulty);
    });
  }

  _generateMarkup() {
    return `
    <header>
      <h1>RPG Battle</h1>
      <ul class="header-btns">
        <li>
          <button class="btn" data-difficulty="easy">Легко</button>
        </li>
        <li>
          <button class="btn" data-difficulty="medium">Средне</button>
        </li>
        <li>
          <button class="btn" data-difficulty="hard">Сложно</button>
        </li>
      <ul>
    </header>
    `;
  }
}

export default new StartView();
