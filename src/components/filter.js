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

// import AbstractComponent from './abstract-component.js';
//
// export default class Filter extends AbstractComponent {
//   constructor(dataList) {
//     super();
//     this._dataList = dataList;
//   }
//
//   getTemplate() {
//     return `<section class="main__filter filter container">
//       ${Object.keys(this._dataList).map((key) => `<input
//         type="radio"
//         id="filter__${key}"
//         class="filter__input visually-hidden"
//         name="filter"
//         ${key === `all` ? `checked` : ``}
//         ${this._dataList[key] ? `` : `disabled`}
//       />
//       <label for="filter__${key}" class="filter__label">${key}<span class="filter__${key}-count">${this._dataList[key]}</span></label>`).join(``)}
//     </section>`;
//   }
// }
