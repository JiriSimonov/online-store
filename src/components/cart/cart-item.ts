import { KeyboardSwitch } from './../../services/db/KeyboardSwitch';
import { Keyboard } from './../../services/db/Keyboard';
import BaseComponent from '../elements/base-component';
import ProductImage from '../product/product-img';
import CartCountBtn from './cart-count-btn';

export default class CartItem extends BaseComponent {
  private images: ProductImage;

  private cartBtnCount: CartCountBtn;

  private wrapper: BaseComponent;

  private title: BaseComponent;

  private category: BaseComponent;

  private stockWrapper: BaseComponent;
  
  private price: BaseComponent;

  private inStock: BaseComponent;

  constructor(props: Keyboard, switchprops: KeyboardSwitch, switchQ: number) {
    super({ tag: 'li', className: 'cart__item' });
    this.cartBtnCount = new CartCountBtn(switchQ);
    this.images = new ProductImage(props.images);
    this.wrapper = new BaseComponent({ className: 'cart__container' });
    this.title = new BaseComponent({ tag: 'h2', className: 'cart__title', text: props.title, parent: this.wrapper.getNode() });
    this.category = new BaseComponent({ className: 'cart__category', text: 'Клавиатура', parent: this.wrapper.getNode() });
    this.price = new BaseComponent({ className: 'cart__price', text: `${switchprops.price}₽`, parent: this.wrapper.getNode() });
    this.stockWrapper = new BaseComponent({ className: 'cart__stock-wrapper', parent:this.wrapper.getNode() });
    this.inStock = new BaseComponent({ className: 'cart__stock', text: switchprops.quantity > 0 ? `В наличии: ${switchprops.quantity}` : 'Нет в наличии', parent: this.stockWrapper.getNode() });
    this.stockWrapper.appendEl(this.cartBtnCount);
    this.appendEl(this.images);
    this.appendEl(this.wrapper);
  }
}
