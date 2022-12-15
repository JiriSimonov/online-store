import BaseComponent from './elements/base-component';

export default class StoreContent extends BaseComponent {
  constructor() {
    super({ tag: 'ul', className: 'store__list' });
  }
}
