import {createFilter} from './components/filter.js';
import {createSearch} from './components/search.js';
import {createMainMenuControl} from './components/main-menu.js';
import {tasksData, filtersData} from './data.js';
import BoardController from './controller/board-controller.js';

const renderElement = function (container, position, item) {
  container.insertAdjacentHTML(position, item);
};

const application = document.querySelector(`.main`);
const mainMenu = document.querySelector(`.main__control`);

renderElement(mainMenu, `beforeend`, createMainMenuControl());
renderElement(application, `beforeend`, createSearch());
renderElement(application, `beforeend`, createFilter(filtersData));

const boardController = new BoardController(application, tasksData);
boardController.init();
