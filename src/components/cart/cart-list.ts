import BaseComponent from '../elements/base-component';

export default class CartList extends BaseComponent {
  constructor() {
    super({ tag: 'ul', className: 'cart__list' });
  }
}
