const NUMBER_OF_TASKS = 25;
const LAST_ELEMENT = 7;
const START_VALUE = 0;

import {createBoard} from './components/board.js';
import {createTaskCardEdit} from './components/task-card-edit.js';
import {createCardSort} from './components/sorting.js';
import {createTaskCard} from './components/task-card.js';
import {createFilter} from './components/filter.js';
import {createSearch} from './components/search.js';
import {createMainMenuControl} from './components/main-menu.js';
import {createLoadMoreBtn} from './components/load-more-btn.js';

const getTask = () => ({
  description: [
    `изучить теорию`,
    `сделать домашку`,
    `пройти интенсив на соточку`
  ] [Math.floor(Math.random() * 3)],
  dueDate: Date.now() + 1 + Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000,
  tags: new Set([`homework`, `theory`, `practice`, `intensive`, `keks`].splice(Math.floor(Math.random() * 3), Math.floor(Math.random() * 4))),
  repeatingDays: {
    'mo': false,
    'tu': false,
    'we': Boolean(Math.round(Math.random())),
    'th': false,
    'fr': false,
    'sa': false,
    'su': false,
  },
  color: [
    `black`,
    `yellow`,
    `blue`,
    `green`,
    `pink`,
  ][Math.floor(Math.random() * 5)],
  isFavorite: Boolean(Math.round(Math.random())),
  isArchive: Boolean(Math.round(Math.random()))
});

const saveTasksData = (count) => new Array(count).fill(``).map(getTask);

let tasksData = saveTasksData(NUMBER_OF_TASKS);

const filtersData = [
  {title: `all`, count: tasksData.length},
  {title: `overdue`, count: tasksData.filter((task) => task.dueDate < Date.now()).length},
  {title: `today`, count: tasksData.filter((task) => new Date(task.dueDate).toDateString() === new Date(Date.now()).toDateString()).length},
  {title: `favorites`, count: tasksData.filter((task) => task.isFavorite).length},
  {title: `repeating`, count: tasksData.filter((task) => Object.keys(task.repeatingDays).some((day) => task.repeatingDays[day])).length},
  {title: `tags`, count: tasksData.filter((task) => task.tags.size !== START_VALUE).length},
  {title: `archive`, count: tasksData.filter((task) => task.isArchive).length}
];

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

const renderTasks = (container, elementsData) => {
  container.insertAdjacentHTML(`beforeend`, elementsData.slice(START_VALUE, LAST_ELEMENT).map(getTask).map(createTaskCard).join(``));
  tasksData.splice(START_VALUE, LAST_ELEMENT);
};

renderElement(bordContent, `afterend`, createLoadMoreBtn());
const loadMoreBtn = document.querySelector(`.load-more`);
const onLoadMoreBtnClick = () => {
  renderTasks(bordContent, tasksData);
  if (tasksData.length === START_VALUE) {
    board.removeChild(loadMoreBtn);
  }
};
renderElement(bordContent, `afterbegin`, createTaskCardEdit(tasksData.shift()));
renderTasks(bordContent, tasksData);
loadMoreBtn.addEventListener(`click`, onLoadMoreBtnClick);
