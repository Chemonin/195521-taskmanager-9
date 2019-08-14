'use strict';

const MENU_CONTROL_NAMES = [`new-task`, `task`, `statistic`];
const Count = {
  START: 0,
  ARCHIVE: 115
};
const FILTER_NAMES = [`All`, `Overdue`, `Today`, `Favorites`, `Repeating`, `Tags`, `Archive`];
const CARD_BUTTON = [`edit`, `archive`, `favorites`];
const NUMBER_OF_CARDS = 3;
const labelValueMap = {
  'new-task': `+ ADD NEW TASK`,
  'task': `TASKS`,
  'statistic': `STATISTICS`,
  'search': `Search`
};

const cardMock = {
  'text': `some text`,
  'barColor': `red`,
  'settings': {
    'date': `23 September`,
    'time': `11:15 PM`,
    'hashtags': [`#first`, `#second`, `#next`]
  }
};

const mainMenu = document.querySelector(`.main__control`);
const application = document.querySelector(`.main`);
const tasks = document.createElement(`div`);
tasks.classList.add(`board__tasks`);
const board = document.createElement(`section`);
board.classList.add(`board`, `container`);

const renderModule = function (container, element) {
  container.insertAdjacentElement(`beforeend`, element);
};

const makeMenu = function (controlsList) {
  let menuControl = document.createElement(`section`);
  menuControl.classList.add(`control__btn-wrap`);
  for (let i = 0; i < controlsList.length; i++) {
    let menuItem = document.createElement(`input`);
    menuItem.type = `radio`;
    menuItem.name = `control`;
    menuItem.id = `control__${controlsList[i]}`;
    menuItem.classList.add(`control__input`, `visually-hidden`);
    menuControl.appendChild(menuItem);
    let itemLabel = document.createElement(`label`);
    itemLabel.setAttribute(`for`, `control__${controlsList[i]}`);
    itemLabel.classList.add(`control__label`, `control__label--${controlsList[i]}`);
    itemLabel.textContent = labelValueMap[controlsList[i]];
    menuControl.appendChild(itemLabel);
  }
  return menuControl;
};

const makeSearch = function () {
  let searchingBlock = document.createElement(`section`);
  searchingBlock.classList.add(`main__search`, `search`, `container`);
  let search = document.createElement(`input`);
  search.type = `text`;
  search.id = `search__input`;
  search.classList.add(`search__input`);
  search.placeholder = `START TYPING — SEARCH BY WORD, #HASHTAG OR DATE`;
  searchingBlock.appendChild(search);
  let searchLabel = document.createElement(`label`);
  searchLabel.setAttribute(`for`, `search__input`);
  searchLabel.classList.add(`visually-hidden`);
  searchLabel.textContent = labelValueMap[`search`];
  searchingBlock.appendChild(searchLabel);

  return searchingBlock;
};

const makeFilters = function (filtersList) {
  let filtersBlock = document.createElement(`section`);
  filtersBlock.classList.add(`main__filter`, `filter`, `container`);
  for (let i = 0; i < filtersList.length; i++) {
    let filterItem = document.createElement(`input`);
    filterItem.type = `radio`;
    filterItem.name = `filter`;
    filterItem.id = `filter__${filtersList[i].toLowerCase()}`;
    filterItem.classList.add(`filter__input`, `visually-hidden`);
    if (filtersList[i] !== `Archive`) {
      filterItem.disabled = true;
    }
    if (filtersList[i] === `All`) {
      filterItem.setAttribute(`checked`, `true`);
    }
    filtersBlock.appendChild(filterItem);
    let filterLabel = document.createElement(`label`);
    filterLabel.setAttribute(`for`, `filter__${filtersList[i].toLowerCase()}`);
    filterLabel.classList.add(`filter__label`);
    let filterCountValue = (filtersList[i] === `Archive`) ? Count.ARCHIVE : Count.START;
    filterLabel.innerHTML = `${filtersList[i]} <span class="filter__${filtersList[i].toLowerCase()}-count">${filterCountValue}</span>`;
    filtersBlock.appendChild(filterLabel);
  }
  return filtersBlock;
};

const makeCard = function (cardData) {
  let card = document.createElement(`article`);
  card.classList.add(`card`);
  let cardForm = document.createElement(`div`);
  cardForm.classList.add(`card__form`);
  let cardContent = document.createElement(`div`);
  cardContent.classList.add(`card__inner`);
  let cardControl = document.createElement(`div`);
  cardControl.classList.add(`card__control`);
  for (let i = 0; i < CARD_BUTTON.length; i++) {
    let controlBtn = `<button type="button" class="card__btn card__btn--${CARD_BUTTON[i]}">${CARD_BUTTON[i]}</button>`;
    cardControl.insertAdjacentHTML(`beforeend`, controlBtn);
  }
  cardContent.appendChild(cardControl);
  let colorBar = `<div class="card__color-bar">
    <svg class="card__color-bar-wave" width="100%" height="10" fill=${cardData.barColor}>
      <use xlink:href="#wave"></use>
    </svg>
  </div>`;
  cardContent.insertAdjacentHTML(`beforeend`, colorBar);
  let cardText = `<div class="card__textarea-wrap">
    <p class="card__text">${cardData.text}</p>
  </div>`;
  cardContent.insertAdjacentHTML(`beforeend`, cardText);

  if (Object.keys(cardData.settings).length !== 0) {
    let cardSettings = document.createElement(`div`);
    cardSettings.classList.add(`card__settings`);
    let cardDetails = document.createElement(`div`);
    cardDetails.classList.add(`.card__details`);
    if (cardData.settings.date) {
      let cardDates = `<div class="card__dates">
        <div class="card__date-deadline">
          <p class="card__input-deadline-wrap">
            <span class="card__date">${cardData.settings.date}</span>
            <span class="card__time">${cardData.settings.time}</span>
          </p>
        </div>
      </div>`;
      cardDetails.insertAdjacentHTML(`beforeend`, cardDates);
      cardSettings.appendChild(cardDetails);
    }
    if (cardData.settings.hashtags.length !== 0) {
      let hashtagConteiner = document.createElement(`div`);
      hashtagConteiner.classList.add(`card__hashtag`);
      let hashtagsList = document.createElement(`div`);
      hashtagsList.classList.add(`card__hashtag-list`);
      cardData.settings.hashtags.forEach(function (it) {
        let hashtag = `<span class="card__hashtag-inner">
          <span class="card__hashtag-name">
            ${it}
          </span>
        </span>`;
        hashtagsList.insertAdjacentHTML(`beforeend`, hashtag);
        hashtagConteiner.appendChild(hashtagsList);
        cardDetails.appendChild(hashtagConteiner);
        cardContent.appendChild(cardSettings);
      });
    }
  }
  cardForm.appendChild(cardContent);
  card.appendChild(cardForm);
  return card;
};

renderModule(mainMenu, makeMenu(MENU_CONTROL_NAMES));
renderModule(application, makeSearch());
renderModule(application, makeFilters(FILTER_NAMES));
renderModule(application, board);
renderModule(board, tasks);

for (let i = 0; i < NUMBER_OF_CARDS; i++) {
  let cardItem = makeCard(cardMock);
  renderModule(tasks, cardItem);
}
