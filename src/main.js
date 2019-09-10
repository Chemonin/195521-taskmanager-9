import {createBoard} from './components/board.js';
import TaskEdit from './components/task-card-edit.js';
import {createCardSort} from './components/sorting.js';
import Task from './components/task-card.js';
import {createFilter} from './components/filter.js';
import {createSearch} from './components/search.js';
import {createMainMenuControl} from './components/main-menu.js';
import {createLoadMoreBtn} from './components/load-more-btn.js';
import {tasksData, filtersData, NUMBER_OF_TASKS} from './data.js';
import {Position, render, unrender} from './utils.js';

const BORDER_ELEMENT = 8;
let counter = 0;

const renderElement = function (container, position, item) {
  container.insertAdjacentHTML(position, item);
};

const createCardList = (list, startIndex, borderIndex) => list.slice(startIndex, startIndex + borderIndex);

const application = document.querySelector(`.main`);
const mainMenu = document.querySelector(`.main__control`);

renderElement(mainMenu, `beforeend`, createMainMenuControl());
renderElement(application, `beforeend`, createSearch());
renderElement(application, `beforeend`, createFilter(filtersData));
renderElement(application, `beforeend`, createBoard());

const board = application.querySelector(`.board`);
const bordContent = application.querySelector(`.board__tasks`);

const renderTask = (taskData) => {
  const task = new Task(taskData);
  const taskEdit = new TaskEdit(taskData);

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      bordContent.replaceChild(task.getElement(), taskEdit.getElement());
    }
    document.removeEventListener(`keydown`, onEscKeyDown);
  };

  task.getElement().querySelector(`.card__btn--edit`)
  .addEventListener(`click`, () => {
    bordContent.replaceChild(taskEdit.getElement(), task.getElement());
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  taskEdit.getElement().querySelector(`textarea`)
  .addEventListener(`focus`, () => {
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  taskEdit.getElement().querySelector(`textarea`)
  .addEventListener(`blur`, () => {
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  taskEdit.getElement().querySelector(`form`)
  .addEventListener(`submit`, () => {
    bordContent.replaceChild(task.getElement(), taskEdit.getElement());
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  taskEdit.getElement().querySelector(`.card__delete`)
  .addEventListener(`click`, () => {
    unrender(taskEdit.getElement());
    taskEdit.removeElement();
    task.removeElement();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });
  render(bordContent, task.getElement(), Position.BEFOREEND);
};

createCardList(tasksData, counter, BORDER_ELEMENT).forEach((taskData) => renderTask(taskData));

renderElement(board, `afterbegin`, createCardSort());

renderElement(bordContent, `afterend`, createLoadMoreBtn());
const loadMoreBtn = document.querySelector(`.load-more`);
const onLoadMoreBtnClick = function () {
  counter = counter + BORDER_ELEMENT;
  if (counter + BORDER_ELEMENT >= NUMBER_OF_TASKS) {
    board.removeChild(loadMoreBtn);
  }
  createCardList(tasksData, counter, BORDER_ELEMENT).forEach((taskData) => renderTask(taskData));

};

loadMoreBtn.addEventListener(`click`, onLoadMoreBtnClick);
