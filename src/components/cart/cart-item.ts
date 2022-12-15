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

  constructor() {
    super({ tag: 'li', className: 'cart__item' });
    this.cartBtnCount = new CartCountBtn();
    this.images = new ProductImage(['11']);
    this.wrapper = new BaseComponent({ className: 'cart__container' });
    this.title = new BaseComponent({ tag: 'h2', className: 'cart__title', text: 'Vortex', parent: this.wrapper.getNode() });
    this.category = new BaseComponent({ className: 'cart__category', text: 'Клавиатура', parent: this.wrapper.getNode() });
    this.price = new BaseComponent({ className: 'cart__price', text: '21321312  ₽', parent: this.wrapper.getNode() });
    this.stockWrapper = new BaseComponent({ className: 'cart__stock-wrapper', parent:this.wrapper.getNode() });
    this.inStock = new BaseComponent({ className: 'cart__stock', text: 'В наличии', parent: this.stockWrapper.getNode() });
    this.stockWrapper.appendEl(this.cartBtnCount);
    this.appendEl(this.images);
    this.appendEl(this.wrapper);
  }
}
