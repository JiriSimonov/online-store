import { BaseComponent } from '../elements/base-component';

export class CartList extends BaseComponent {
  constructor() {
    super({ tag: 'ul', className: 'cart__list' });
  }
}
