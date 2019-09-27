import TaskCardEdit from '../components/task-card-edit.js';
import TaskCard from '../components/task-card.js';
import {Position, render, unrender} from '../utils.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/light.css';
import moment from 'moment';

export default class TaskController {
  constructor(container, data, onDataChange, onChangeView) {
    this._container = container;
    this._data = data;
    this._onDataChange = onDataChange;
    this._onChangeView = onChangeView;
    this._taskCard = new TaskCard(data);
    this._taskCardEdit = new TaskCardEdit(data);
    this.create();
  }
  create() {
    flatpickr(this._taskCardEdit.getElement().querySelector(`.card__date`), {
      altInput: true,
      allowInput: true,
      defaultDate: moment(this._data.dueDate).format(`DD MMMM`),
    });

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        this._container.replaceChild(this._taskCard.getElement(), this._taskCardEdit.getElement());
      }
      document.removeEventListener(`keydown`, onEscKeyDown);
    };

    this._taskCard.getElement().querySelector(`.card__btn--edit`)
    .addEventListener(`click`, () => {
      this._onChangeView();
      this._container.getElement().replaceChild(this._taskCardEdit.getElement(), this._taskCard.getElement());
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    this._taskCardEdit.getElement().querySelector(`textarea`)
    .addEventListener(`focus`, () => {
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

    this._taskCardEdit.getElement().querySelector(`textarea`)
    .addEventListener(`blur`, () => {
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    this._taskCardEdit.getElement().querySelector(`form`)
    .addEventListener(`submit`, (evt) => {
      evt.preventDefault();
      const formData = new FormData(this._taskCardEdit.getElement().querySelector(`.card__form`));
      const entry = {
        description: formData.get(`text`),
        color: formData.get(`color`),
        tags: new Set(formData.getAll(`hashtag`)),
        dueDate: new Date(formData.get(`date`)),
        repeatingDays: formData.getAll(`repeat`).reduce((acc, it) => {
          acc[it] = true;
          return acc;
        }, {
          'mo': false,
          'tu': false,
          'we': false,
          'th': false,
          'fr': false,
          'sa': false,
          'su': false,
        })
      };

      this._onDataChange(entry, this._data);

      document.removeEventListener(`keydown`, onEscKeyDown);
    });

    this._taskCardEdit.getElement().querySelector(`.card__delete`)
    .addEventListener(`click`, () => {
      unrender(this._taskCardEdit.getElement());
      this._taskCardEdit.removeElement();
      this._taskCard.removeElement();
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

    render(this._container.getElement(), this._taskCard.getElement(), Position.BEFOREEND);
  }

  setDefaultView() {
    if (this._container.getElement().contains(this._taskCardEdit.getElement())) {
      this._container.getElement().replaceChild(this._taskCard.getElement(), this._taskCardEdit.getElement());
    }
  }
}
