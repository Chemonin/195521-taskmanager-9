export const createFilter = (dataList) => {
  return `<section class="main__filter filter container">
    ${dataList.map(({title, count}) => `<input
      type="radio"
      id="filter__${title}"
      class="filter__input visually-hidden"
      name="filter"
      ${title === `all` ? `checked` : ``}
      ${count ? `disabled` : ``}
    />
    <label for="filter__${title}" class="filter__label">${title}<span class="filter__${title}-count">${count}</span></label>`).join(``)}
  </section>`;
};

// <input
//   type="radio"
//   id="filter__overdue"
//   class="filter__input visually-hidden"
//   name="filter"
//   disabled
// />
// <label for="filter__overdue" class="filter__label"
//   >Overdue <span class="filter__overdue-count">0</span></label
// >
// <input
//   type="radio"
//   id="filter__today"
//   class="filter__input visually-hidden"
//   name="filter"
//   disabled
// />
// <label for="filter__today" class="filter__label"
//   >Today <span class="filter__today-count">0</span></label
// >
// <input
//   type="radio"
//   id="filter__favorites"
//   class="filter__input visually-hidden"
//   name="filter"
//   disabled
// />
// <label for="filter__favorites" class="filter__label"
//   >Favorites <span class="filter__favorites-count">0</span></label
// >
// <input
//   type="radio"
//   id="filter__repeating"
//   class="filter__input visually-hidden"
//   name="filter"
//   disabled
// />
// <label for="filter__repeating" class="filter__label"
//   >Repeating <span class="filter__repeating-count">0</span></label
// >
// <input
//   type="radio"
//   id="filter__tags"
//   class="filter__input visually-hidden"
//   name="filter"
//   disabled
// />
// <label for="filter__tags" class="filter__label"
//   >Tags <span class="filter__tags-count">0</span></label
// >
// <input
//   type="radio"
//   id="filter__archive"
//   class="filter__input visually-hidden"
//   name="filter"
// />
// <label for="filter__archive" class="filter__label"
//   >Archive <span class="filter__archive-count">115</span></label
// >
