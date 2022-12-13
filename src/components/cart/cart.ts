import BaseComponent from '../elements/base-component';
import Button from '../elements/button';
import CartItem from './cart-item';
import CartList from './cart-list';

export default class Cart extends BaseComponent {
  private container: BaseComponent;

  private wrapper: BaseComponent;

  private cartList: CartList;

  private cartItems: CartItem[];

  private cartButton: Button;

  private orderBtn: Button;

  constructor() {
    super({ tag: 'section', className: 'cart' });
    this.container = new BaseComponent({ className: 'container' });
    this.wrapper = new BaseComponent({ className: 'cart__wrapper' });
    this.cartButton = new Button({
      className: 'cart__btn',
      onclick: () => {
        window.location.hash = '#store';
      },
      text: 'Продолжить покупки',
    });
    this.orderBtn = new Button({ className: 'cart__order', text: 'Сделать заказ' });
    this.cartList = new CartList();
    this.cartItems = [new CartItem(), new CartItem()];
  }

  render() {
    this.appendEl(this.container);
    this.container.appendEl(this.wrapper);
    this.wrapper.appendEl([this.cartList, this.cartButton, this.orderBtn]);
    this.cartList.appendEl(this.cartItems);
  }
}
