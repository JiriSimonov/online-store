import { Component } from '../elements/base-component';

export class CartList extends Component {
  constructor() {
    super({ tag: 'ul', className: 'cart__list' });
  }
}
