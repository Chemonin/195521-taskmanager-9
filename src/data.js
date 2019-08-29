const NUMBER_OF_TASKS = 25;
export const START_VALUE = 0;
const randomElement = (array) => array[Math.floor(Math.random() * array.length)];

const getTask = () => ({
  description: randomElement([
    `изучить теорию`,
    `сделать домашку`,
    `пройти интенсив на соточку`
  ]),
  dueDate: Date.now() + 24 * 60 * 60 * 1000 * (Math.round(Math.random()) ? (1 + Math.floor(Math.random() * 7)) : -(1 + Math.floor(Math.random() * 7))),
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
  color: randomElement([
    `black`,
    `yellow`,
    `blue`,
    `green`,
    `pink`,
  ]),
  isFavorite: Boolean(Math.round(Math.random())),
  isArchive: Boolean(Math.round(Math.random()))
});

const getTasksData = (count) => new Array(count).fill(``).map(getTask);

export const tasksData = getTasksData(NUMBER_OF_TASKS);

export const filtersData = [
  {title: `all`, count: tasksData.length},
  {title: `overdue`, count: tasksData.filter((task) => task.dueDate < Date.now()).length},
  {title: `today`, count: tasksData.filter((task) => new Date(task.dueDate).toDateString() === new Date(Date.now()).toDateString()).length},
  {title: `favorites`, count: tasksData.filter((task) => task.isFavorite).length},
  {title: `repeating`, count: tasksData.filter((task) => Object.keys(task.repeatingDays).some((day) => task.repeatingDays[day])).length},
  {title: `tags`, count: tasksData.filter((task) => task.tags.size !== START_VALUE).length},
  {title: `archive`, count: tasksData.filter((task) => task.isArchive).length}
];
