import BaseComponent from '../elements/base-component';
import CartCountBtn from './cart-count-btn';

export default class CartItem extends BaseComponent {
  private cartBtnCount: CartCountBtn;

  constructor() {
    super({ tag: 'li', className: 'cart__item' });
    this.cartBtnCount = new CartCountBtn();
    this.appendEl(this.cartBtnCount);
  }
}
