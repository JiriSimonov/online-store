import BaseComponent from '../elements/base-component';
import CartCountBtn from './cart-count-btn';

export default class CartItem extends BaseComponent {
  private cartBtnCount: CartCountBtn;

  private wrapper: BaseComponent;

  private title: BaseComponent;

  private price: BaseComponent;

  private category: BaseComponent;

  private inStock: BaseComponent;

  constructor() {
    super({ tag: 'li', className: 'cart__item' });
    this.cartBtnCount = new CartCountBtn();
    this.wrapper = new BaseComponent({ className: 'cart__container' });
    this.title = new BaseComponent({ className: 'cart__title', text: 'Vortex', parent: this.wrapper.getNode() });
    this.category = new BaseComponent({ className: 'cart__category', text: 'Клавиатура', parent: this.wrapper.getNode() });
    this.inStock = new BaseComponent({ className: 'cart__stock', text: 'Нет в наличии', parent: this.wrapper.getNode() });
    this.price = new BaseComponent({ className: 'cart__price', text: '21321312', parent: this.wrapper.getNode() });
    this.appendEl(this.wrapper);
    this.wrapper.appendEl(this.cartBtnCount);
  }
}
