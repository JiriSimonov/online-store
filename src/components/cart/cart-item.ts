import { CartItem } from './../../interfaces/database';
import { BaseComponent } from '../elements/base-component';
import { ProductImage } from '../product/product-img';
import { Button } from '../elements/button';
import { DB } from '../../services/db/Database';

export class CartItemElem extends BaseComponent {
  private images: ProductImage;

  private wrapper: BaseComponent;

  private title: BaseComponent;

  private category: BaseComponent;

  private stockWrapper: BaseComponent;

  private price: BaseComponent;

  private inStock: BaseComponent;

  private countBtn: BaseComponent;

  private count: BaseComponent;

  private currentNum: number;

  private cartDec: Button;

  private cartInc: Button;

  private cartDelete: Button;

  constructor(product: CartItem, totalPrice: BaseComponent) {
    super({ tag: 'li', className: 'cart__item' });
    const { keyboard, keyboardSwitch, quantity } = product;
    this.currentNum = quantity;
    const printPrices = (diff = 0) => {
      this.currentNum += diff;
      DB.addToCart([keyboard, keyboardSwitch], this.currentNum);
      this.inStock.getNode().textContent = `Осталось на складе: ${
        keyboardSwitch.quantity - this.currentNum
      }`;
      this.count.getNode().textContent = `${this.currentNum}`;
      this.price.getNode().textContent = `${this.currentNum * keyboardSwitch.price}  ₽`;
      this.cartInc.getNode();
      totalPrice.getNode().textContent = `${DB.cartPriceSum}`;
      (this.cartDec.getNode() as HTMLButtonElement).disabled = this.currentNum < 1;
      (this.cartInc.getNode() as HTMLButtonElement).disabled =
        this.currentNum === keyboardSwitch.quantity;
    };
    this.images = new ProductImage(keyboard.images);
    this.wrapper = new BaseComponent({ className: 'cart__container' });
    this.title = new BaseComponent({
      tag: 'h2',
      className: 'cart__title',
      text: keyboard.title,
      parent: this.wrapper.getNode(),
    });
    this.category = new BaseComponent({
      className: 'cart__category',
      text: 'Клавиатура',
      parent: this.wrapper.getNode(),
    });
    this.price = new BaseComponent({
      className: 'cart__price',
      text: `${keyboardSwitch.price}₽`,
      parent: this.wrapper.getNode(),
    });
    this.stockWrapper = new BaseComponent({
      className: 'cart__stock-wrapper',
      parent: this.wrapper.getNode(),
    });
    this.inStock = new BaseComponent({
      className: 'cart__stock',
      text:
        keyboardSwitch.quantity > 0
          ? `Осталось на складе: ${keyboardSwitch.quantity - 1}`
          : 'Нет в наличии',
      parent: this.stockWrapper.getNode(),
    });
    this.countBtn = new BaseComponent({
      className: 'count-btn',
      parent: this.stockWrapper.getNode(),
    });
    this.currentNum = quantity;
    this.cartDec = new Button({
      className: 'count-btn__dec',
      text: '-',
      parent: this.countBtn.getNode(),
      onclick: () => {
        printPrices(-1);
      },
    });
    this.count = new BaseComponent({
      tag: 'span',
      className: 'count-btn__count',
      text: `${quantity}`,
      parent: this.countBtn.getNode(),
    });
    this.cartInc = new Button({
      className: 'count-btn__inc',
      text: '+',
      parent: this.countBtn.getNode(),
      onclick: () => {
        printPrices(+1);
      },
    });
    this.cartDelete = new Button({
      className: 'cart__stock cart__delete',
      text: 'Удалить',
      parent: this.stockWrapper.getNode(),
      onclick: () => {
        DB.removeFromCart([keyboard, keyboardSwitch]);
        this.destroy();
      },
    });
    printPrices();
    this.appendEl(this.images);
    this.appendEl(this.wrapper);
  }
}
