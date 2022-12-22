import { SwitchComponent } from '../switches/switch-component';
import { FormField } from '../elements/form-field';
import { BaseComponent } from '../elements/base-component';
import { ProductImage } from '../product/product-img';
import { Button } from '../elements/button';
import { DB } from '../../services/db/database';
import { CartItem } from '../../services/db/cart-item';

export class CartItemElem extends BaseComponent {
  private images: ProductImage;

  private wrapper: BaseComponent;

  private title: BaseComponent;

  private category: BaseComponent;

  private stockWrapper: BaseComponent;

  private price: BaseComponent;

  private inStock: BaseComponent;

  private countBtn: BaseComponent;

  private countField: FormField;

  private cartDec: Button;

  private cartInc: Button;

  private cartDelete: Button;

  private switchWrapper: BaseComponent;

  private keyboardSwitch: SwitchComponent;

  constructor(product: CartItem) {
    super({ tag: 'li', className: 'cart__item' });
    const { keyboard, keyboardSwitch, quantity } = product;
    this.countField = new FormField({
      className: 'count-btn',
      type: 'number',
      value: `${quantity}`,
      min: '1',
      max: `${keyboardSwitch.quantity}`,
      pattern: '[0-9]{2}' });
    this.images = new ProductImage(keyboard.images);
    this.wrapper = new BaseComponent({ className: 'cart__container' });
    this.title = new BaseComponent({
      tag: 'h2',
      className: 'cart__title',
      text: keyboard.title,
      parent: this.wrapper.getNode(),
    });
    this.switchWrapper = new BaseComponent({ className: 'switch', parent: this.wrapper.getNode() });
    this.keyboardSwitch = new SwitchComponent(keyboardSwitch, product.key, 'div');
    this.switchWrapper.appendEl(this.keyboardSwitch);
    this.category = new BaseComponent({
      className: 'cart__category',
      text: `Размер: ${keyboard.size}`,
      parent: this.wrapper.getNode(),
    });
    this.price = new BaseComponent({
      className: 'cart__price',
      text: `${keyboardSwitch.price} ₽`,
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
          ? `Осталось на складе: ${keyboardSwitch.quantity - +this.countField.getInputNode().value}`
          : 'Нет в наличии',
      parent: this.stockWrapper.getNode(),
    });
    this.countBtn = new BaseComponent({
      className: 'count-btn',
      parent: this.stockWrapper.getNode(),
    });
    this.cartDec = new Button({
      className: 'count-btn__dec',
      text: '-',
      parent: this.countBtn.getNode(),
      onclick: () => {
        this.countField.getInputNode().stepDown();
        this.countField.getInputNode().dispatchEvent(new Event('input'));
      }
    });
    this.countBtn.appendEl(this.countField);
    this.countField.getInputNode().oninput = (e) => {
      if (e.target && e.target instanceof HTMLInputElement) {
        if (+e.target.value > +e.target.max) e.target.value = e.target.max;
        if (+e.target.value < +e.target.min) e.target.value = e.target.min;
        product.set(+e.target.value);
        this.inStock.getNode().textContent = `Осталось на складе: ${
          keyboardSwitch.quantity - +e.target.value
        }`;
        this.price.getNode().textContent = `${+e.target.value * keyboardSwitch.price} ₽`;
        (this.cartDec.getNode() as HTMLButtonElement).disabled =
          +e.target.value === +this.countField.getInputNode().min;
        (this.cartInc.getNode() as HTMLButtonElement).disabled =
          +e.target.value === keyboardSwitch.quantity;
      }
    }
    this.countField.getInputNode().onkeydown = (e) => {
      // TODO посмотреть что убрать
      if (e.target && e.target instanceof HTMLInputElement && ['e', 'E', '-', '+', '.', ','].includes(e.key))
        e.preventDefault();
    }
    this.cartInc = new Button({
      className: 'count-btn__inc',
      text: '+',
      parent: this.countBtn.getNode(),
      onclick: () => {
        this.countField.getInputNode().stepUp();
        this.countField.getInputNode().dispatchEvent(new Event('input'));
      }
    });
    this.cartDelete = new Button({
      className: 'cart__stock cart__delete',
      text: 'Удалить',
      parent: this.stockWrapper.getNode(),
      onclick: () => {
        DB.cart.remove(product);
        this.destroy();
      },
    });
    if (+this.countField.getInputNode().value === +this.countField.getInputNode().min)
      this.cartDec.getNode().setAttribute('disabled', 'true');
    if (+this.countField.getInputNode().value === +this.countField.getInputNode().max)
      this.cartInc.getNode().setAttribute('disabled', 'true');
    this.price.setText(`${+this.countField.getInputNode().value * keyboardSwitch.price} ₽`);
    this.appendEl(this.images);
    this.appendEl(this.wrapper);
  }
}
