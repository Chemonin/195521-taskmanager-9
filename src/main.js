const NUMBER_OF_TASKS = 3;

import {createBoard} from './components/board.js';
import {createTaskCardEdit} from './components/task-card-edit.js';
import {createCardSort} from './components/sorting.js';
import {createTaskCard} from './components/task-card.js';
import {createFilter} from './components/filter.js';
import {createSearch} from './components/search.js';
import {createMainMenuControl} from './components/main-menu.js';
import {createLoadMoreBtn} from './components/load-more-btn.js';


const renderElement = function (container, position, item) {
  container.insertAdjacentHTML(position, item);
};

const application = document.querySelector(`.main`);
const mainMenu = document.querySelector(`.main__control`);

renderElement(mainMenu, `beforeend`, createMainMenuControl());
renderElement(application, `beforeend`, createSearch());
renderElement(application, `beforeend`, createFilter());
renderElement(application, `beforeend`, createBoard());

const board = application.querySelector(`.board`);
const bordContent = application.querySelector(`.board__tasks`);

renderElement(board, `afterbegin`, createCardSort());
renderElement(bordContent, `afterbegin`, createTaskCardEdit());
for (let i = 0; i < NUMBER_OF_TASKS; i++) {
  renderElement(bordContent, `beforeend`, createTaskCard());
}
renderElement(bordContent, `afterend`, createLoadMoreBtn());
