export const createFilter = (dataList) => {
  return `<section class="main__filter filter container">
    ${Object.keys(dataList).map((key) => `<input
      type="radio"
      id="filter__${key}"
      class="filter__input visually-hidden"
      name="filter"
      ${key === `all` ? `checked` : ``}
      ${dataList[key] ? `` : `disabled`}
    />
    <label for="filter__${key}" class="filter__label">${key}<span class="filter__${key}-count">${dataList[key]}</span></label>`).join(``)}
  </section>`;
};
