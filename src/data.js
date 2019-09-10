export const NUMBER_OF_TASKS = 25;
const MS_IN_WEEK = 604800000;
export const START_VALUE = 0;
export const COLOR_LIST = [`black`, `yellow`, `blue`, `green`, `pink`];
export const month = {
  0: `January`,
  1: `February`,
  2: `March`,
  3: `April`,
  4: `May`,
  5: `June`,
  6: `July`,
  7: `August`,
  8: `September`,
  9: `October`,
  10: `November`,
  11: `December`,
};

const randomInteger = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));
const getRandomElement = (element) => element[Math.floor(Math.random() * element.length)];

const getTask = () => ({
  description: getRandomElement([
    `изучить теорию`,
    `сделать домашку`,
    `пройти интенсив на соточку`
  ]),
  dueDate: Date.now() + randomInteger(-MS_IN_WEEK, MS_IN_WEEK),
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
  color: getRandomElement(COLOR_LIST),
  isFavorite: Boolean(Math.round(Math.random())),
  isArchive: Boolean(Math.round(Math.random()))
});

const getTasksData = (count) => new Array(count).fill(``).map(getTask);

export const tasksData = getTasksData(NUMBER_OF_TASKS);
export const filtersData = tasksData.reduce(function (previous, current) {
  previous.all = previous.all + (tasksData.length ? 1 : 0);
  previous.overdue = previous.overdue + (current.dueDate < Date.now() ? 1 : 0);
  previous.today = previous.today + (new Date(current.dueDate).toDateString() === new Date(Date.now()).toDateString() ? 1 : 0);
  previous.favorites = previous.favorites + (current.isFavorite ? 1 : 0);
  previous.repeating = previous.repeating + (Object.keys(current.repeatingDays).some((day) => current.repeatingDays[day]) ? 1 : 0);
  previous.tags = previous.tags + (current.tags.size !== START_VALUE ? 1 : 0);
  previous.archive = previous.archive + (current.isArchive ? 1 : 0);
  return previous;
}, {'all': 0, 'overdue': 0, 'today': 0, 'favorites': 0, 'repeating': 0, 'tags': 0, 'archive': 0});
