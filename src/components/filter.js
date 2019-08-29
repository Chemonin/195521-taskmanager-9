export const createFilter = (dataList) => {
  return `<section class="main__filter filter container">
    ${dataList.map(({title, count}) => `<input
      type="radio"
      id="filter__${title}"
      class="filter__input visually-hidden"
      name="filter"
      ${title === `all` ? `checked` : ``}
      ${count ? `` : `disabled`}
    />
    <label for="filter__${title}" class="filter__label">${title}<span class="filter__${title}-count">${count}</span></label>`).join(``)}
  </section>`;
};
