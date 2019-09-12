import Board from '../components/board.js';
import TaskList from '../components/task-list.js';
import {Position, render, unrender} from '../utils.js';
import TaskCardEdit from '../components/task-card-edit.js';
import TaskCard from '../components/task-card.js';
import Sorting from '../components/sorting.js';
import LoadMoreBtn from '../components/load-more-btn.js';
import {NUMBER_OF_TASKS} from '../data.js';

export default class BoardController {
  constructor(container, tasks) {
    this._container = container;
    this._tasks = tasks;
    this._sorting = new Sorting();
    this._board = new Board();
    this._taskList = new TaskList();
    this._loadMoreBtn = new LoadMoreBtn();
    this._counter = 0;
    this._borderElement = 8;
  }

  _createRenderData(list, startIndex, borderIndex) {
    return list.slice(startIndex, startIndex + borderIndex);
  }

  init() {
    // console.log(this._onLoadMoreBtnClick);
    render(this._container, this._board.getElement(), Position.BEFOREEND);
    render(this._board.getElement(), this._taskList.getElement(), Position.BEFOREEND);
    render(this._board.getElement(), this._sorting.getElement(), Position.AFTERBEGIN);
    render(this._board.getElement(), this._loadMoreBtn.getElement(), Position.BEFOREEND);
    this._loadMoreBtn.getElement().addEventListener(`click`, this._onLoadMoreBtnClick.bind(this));
    this._createRenderData(this._tasks, this._counter, this._borderElement).forEach((task) => this._renderTask(task));
  }

  _onLoadMoreBtnClick() {
    this._counter = this._counter + this._borderElement;
    if (this._counter + this._borderElement >= NUMBER_OF_TASKS) {
      unrender(this._loadMoreBtn.getElement());
    }
    this._createRenderData(this._tasks, this._counter, this._borderElement).forEach((task) => this._renderTask(task));
  }

  _renderTask(task) {
    const taskComponent = new TaskCard(task);
    const taskEditComponent = new TaskCardEdit(task);

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        this._taskList.replaceChild(taskComponent.getElement(), taskEditComponent.getElement());
      }
      document.removeEventListener(`keydown`, onEscKeyDown);
    };

    taskComponent.getElement().querySelector(`.card__btn--edit`)
    .addEventListener(`click`, () => {
      this._taskList.getElement().replaceChild(taskEditComponent.getElement(), taskComponent.getElement());
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    taskEditComponent.getElement().querySelector(`textarea`)
    .addEventListener(`focus`, () => {
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

    taskEditComponent.getElement().querySelector(`textarea`)
    .addEventListener(`blur`, () => {
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    taskEditComponent.getElement().querySelector(`form`)
    .addEventListener(`submit`, () => {
      this._taskList.replaceChild(taskComponent.getElement(), taskEditComponent.getElement());
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

    taskEditComponent.getElement().querySelector(`.card__delete`)
    .addEventListener(`click`, () => {
      unrender(taskEditComponent.getElement());
      taskEditComponent.removeElement();
      taskComponent.removeElement();
      document.removeEventListener(`keydown`, onEscKeyDown);
    });
    render(this._taskList.getElement(), taskComponent.getElement(), Position.BEFOREEND);
  }
}
