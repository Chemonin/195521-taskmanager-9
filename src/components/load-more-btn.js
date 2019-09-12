import AbstractComponent from './abstract-component.js';

export default class loadMoreBtn extends AbstractComponent {
  getTemplate() {
    return `<button class="load-more" type="button">load more</button>`;
  }
}
