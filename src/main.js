import {tasksData, filtersData} from './data.js';
import BoardController from './controller/board-controller.js';
import Statistics from './components/statistics.js';
import MainMenu from './components/main-menu.js';
import Search from './components/search.js';
import Filter from './components/filter.js';
import {Position, render} from './utils.js';

const application = document.querySelector(`.main`);
const siteHeader = document.querySelector(`.main__control`);

const statistics = new Statistics();
const mainMenu = new MainMenu();
const search = new Search();
const filter = new Filter(filtersData);
statistics.getElement().classList.add(`visually-hidden`);

render(siteHeader, mainMenu.getElement(), Position.BEFOREEND);
render(application, search.getElement(), Position.BEFOREEND);
render(application, filter.getElement(), Position.BEFOREEND);
render(application, statistics.getElement(), Position.BEFOREEND);

const boardController = new BoardController(application, tasksData);
boardController.init();

mainMenu.getElement().addEventListener(`change`, (evt) => {
  evt.preventDefault();

  if (evt.target.tagName !== `INPUT`) {
    return;
  }

  switch (evt.target.id) {
    case `control__task`:
      statistics.getElement().classList.add(`visually-hidden`);
      boardController.show();
      break;
    case `control__statistic`:
      statistics.getElement().classList.remove(`visually-hidden`);
      boardController.hide();
      break;
    case `control__new-task`:
      boardController.createTask();
      mainMenu.getElement().querySelector(`#control__task`).checked = true;
      break;
  }
});
