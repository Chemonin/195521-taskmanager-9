import Board from '../components/board.js';
import TaskList from '../components/task-list.js';
import {Position, render, unrender} from '../utils.js';
import TaskController from './task-controller.js';
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
    this._subscriptions = [];
    this._onDataChange = this._onDataChange.bind(this);
    this._onChangeView = this._onChangeView.bind(this);
  }

  _createRenderData(list, startIndex, borderIndex) {
    return list.slice(startIndex, startIndex + borderIndex);
  }

  init() {
    render(this._container, this._board.getElement(), Position.BEFOREEND);
    render(this._board.getElement(), this._taskList.getElement(), Position.BEFOREEND);
    render(this._board.getElement(), this._sorting.getElement(), Position.AFTERBEGIN);
    render(this._board.getElement(), this._loadMoreBtn.getElement(), Position.BEFOREEND);
    this._loadMoreBtn.getElement().addEventListener(`click`, this._onLoadMoreBtnClick.bind(this));
    this._sorting.getElement().addEventListener(`click`, (evt) => this._onSortingClick(evt));
    this._createRenderData(this._tasks, this._counter, this._borderElement).forEach((task) => this._renderTask(task));
  }

  _onLoadMoreBtnClick() {
    this._counter = this._counter + this._borderElement;
    if (this._counter + this._borderElement >= NUMBER_OF_TASKS) {
      unrender(this._loadMoreBtn.getElement());
    }
    this._createRenderData(this._tasks, this._counter, this._borderElement).forEach((task) => this._renderTask(task));
  }

  _renderBoard(tasks) {
    this._counter = 0;
    unrender(this._taskList.getElement());
    unrender(this._loadMoreBtn.getElement());
    this._taskList.removeElement();
    render(this._board.getElement(), this._taskList.getElement(), Position.BEFOREEND);
    render(this._board.getElement(), this._loadMoreBtn.getElement(), Position.BEFOREEND);
    this._createRenderData(tasks, this._counter, this._borderElement).forEach((task) => this._renderTask(task));
  }

  _renderTask(task) {
    const taskController = new TaskController(this._taskList, task, this._onDataChange, this._onChangeView);
    this._subscriptions.push(taskController.setDefaultView.bind(taskController));
  }

  _onChangeView() {
    this._subscriptions.forEach((it) => it());
  }

  _onDataChange(newData, oldData) {
    this._tasks[this._tasks.findIndex((it) => it === oldData)] = newData;

    this._renderBoard(this._tasks);
  }


  _onSortingClick(evt) {
    evt.preventDefault();

    if (evt.target.tagName !== `A`) {
      return;
    }

    this._taskList.getElement().innerHTML = ``;

    switch (evt.target.textContent) {
      case `SORT BY DATE up`:
        const sortByDateUp = this._tasks.slice().sort((a, b) => a.dueDate - b.dueDate);
        sortByDateUp.forEach((task) => this._renderTask(task));
        break;
      case `SORT BY DATE down`:
        const sortByDateDown = this._tasks.slice().sort((a, b) => b.dueDate - a.dueDate);
        sortByDateDown.forEach((task) => this._renderTask(task));
        break;
      case `SORT BY DEFAULT`:
        this._tasks.forEach((task) => this._renderTask(task));
        break;
    }
  }
}
