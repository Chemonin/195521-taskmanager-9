import Board from '../components/board.js';
import TaskList from '../components/task-list.js';
import {Position, render, unrender} from '../utils.js';
import TaskCardEdit from '../components/task-card-edit.js';
import TaskCard from '../components/task-card.js';

export default class BoardController {
  constructor(container, tasks) {
    this._container = container;
    this._tasks = tasks;
    this._board = new Board();
    this._taskList = new TaskList();
  }

  init() {
    render(this._container, this._board.getElement(), Position.BEFOREEND);
    render(this._board.getElement(), this._taskList.getElement(), Position.BEFOREEND);

    this._tasks.forEach((task) => this._renderTask(task));
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
