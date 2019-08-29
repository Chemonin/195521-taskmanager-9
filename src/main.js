import {createBoard} from './components/board.js';
import {createTaskCardEdit} from './components/task-card-edit.js';
import {createCardSort} from './components/sorting.js';
import {createTaskCard} from './components/task-card.js';
import {createFilter} from './components/filter.js';
import {createSearch} from './components/search.js';
import {createMainMenuControl} from './components/main-menu.js';
import {createLoadMoreBtn} from './components/load-more-btn.js';
import {tasksData, filtersData, START_VALUE} from './data.js';

let borderElement = 7;
let counter = 0;

const renderElement = function (container, position, item) {
  container.insertAdjacentHTML(position, item);
};

const application = document.querySelector(`.main`);
const mainMenu = document.querySelector(`.main__control`);

renderElement(mainMenu, `beforeend`, createMainMenuControl());
renderElement(application, `beforeend`, createSearch());
renderElement(application, `beforeend`, createFilter(filtersData));
renderElement(application, `beforeend`, createBoard());

const board = application.querySelector(`.board`);
const bordContent = application.querySelector(`.board__tasks`);

renderElement(board, `afterbegin`, createCardSort());

renderElement(bordContent, `afterend`, createLoadMoreBtn());
const loadMoreBtn = document.querySelector(`.load-more`);
const onLoadMoreBtnClick = function () {
  counter = counter + borderElement;
  renderElement(bordContent, `beforeend`, tasksData.slice(counter, counter + borderElement).map(createTaskCard).join(``));
  if (tasksData.length === START_VALUE) {
    board.removeChild(loadMoreBtn);
  }
};
renderElement(bordContent, `afterbegin`, createTaskCardEdit(tasksData[counter]));
renderElement(bordContent, `beforeend`, tasksData.slice(counter, counter + borderElement).map(createTaskCard).join(``));
borderElement++;
loadMoreBtn.addEventListener(`click`, onLoadMoreBtnClick);
