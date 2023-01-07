import { SwitchComponent } from '../switches/switch-component';
import { FormField } from '../elements/form-field';
import { Component } from '../elements/base-component';
import { ProductImage } from '../product/product-img';
import { Button } from '../elements/button-component';
import { DB } from '../../services/db/database';
import { CartItem } from '../../services/db/cart-item';
import { Emitter } from '../../services/emitter';
import { Heading } from '../elements/heading-component';

export class CartItemElem extends Component {
  private images: ProductImage;

  private wrapper: Component;

  private title: Component;

  private category: Component;

  private stockWrapper: Component;

  private price: Component;

  private inStock: Component;

  private countBtn: Component;

  private countField: FormField;

  private cartDec: Button;

  private cartInc: Button;

  private cartDelete: Button;

  private switchWrapper: Component;

  private keyboardSwitch: SwitchComponent;

  private cartPosition: Component;

  constructor(product: CartItem, index: number, orderBtn: Button) {
    super({ tag: 'li', className: 'cart__item' });
    const { keyboard, keyboardSwitch, quantity } = product;
    const buttonOrder = orderBtn;
    this.countField = new FormField({
      className: 'count-btn',
      type: 'number',
      value: `${quantity}`,
      min: '1',
      max: `${keyboardSwitch.quantity}`,
      pattern: '[0-9]{2}',
    });
    this.images = new ProductImage(keyboard.images);
    this.wrapper = new Component({ className: 'cart__container' });
    this.title = new Heading({ className: 'cart__title', textContent: keyboard.title, parent: this.wrapper });
    this.switchWrapper = new Component({ className: 'switch' });
    this.keyboardSwitch = new SwitchComponent(keyboardSwitch, product.key, 'div');
    if (keyboardSwitch.title !== 'null') this.wrapper.append(this.switchWrapper);
    this.switchWrapper.append(this.keyboardSwitch);
    this.category = new Component({ className: 'cart__category', textContent: `Размер: ${keyboard.size}` });
    if (keyboard.size !== '') this.wrapper.append(this.category);
    this.price = new Component({
      className: 'cart__price',
      textContent: `${keyboardSwitch.price} ₽`,
      parent: this.wrapper,
    });
    this.stockWrapper = new Component({ className: 'cart__stock-wrapper', parent: this.wrapper });
    this.inStock = new Component({
      className: 'cart__stock',
      textContent:
        keyboardSwitch.quantity > 0
          ? `Осталось на складе: ${keyboardSwitch.quantity - +this.countField.input.value}`
          : 'Нет в наличии',
      parent: this.stockWrapper,
    });
    this.countBtn = new Component({ className: 'count-btn', parent: this.stockWrapper });
    this.cartDec = new Button({
      className: 'count-btn__dec',
      textContent: '-',
      parent: this.countBtn,
      onclick: () => {
        if (+this.countField.input.value === 1) {
          DB.cart.remove(product);
          Emitter.emit('cart__delete-item');
        } else {
          this.countField.input.node.stepDown();
          this.countField.input.node.dispatchEvent(new Event('input'));
        }
      },
    });
    this.cartPosition = new Component({ className: 'cart__position', textContent: `${index}`, parent: this });
    this.countBtn.append(this.countField);
    this.countField.input.addEventListener('input', (e) => {
      if (e.target && e.target instanceof HTMLInputElement) {
        if (+e.target.value > +e.target.max) e.target.value = e.target.max;
        if (+e.target.value <= +e.target.min && e.target.value !== '') e.target.value = e.target.min;
        if (e.target.value === '' || +e.target.value === 0) {
          e.preventDefault();
          buttonOrder.disabled = true;
        }
        product.set(+e.target.value);
        this.inStock.text = `Осталось на складе: ${keyboardSwitch.quantity - +e.target.value}`;
        this.price.text = `${+e.target.value * keyboardSwitch.price} ₽`;
        this.cartInc.disabled = +e.target.value === keyboardSwitch.quantity;
      }
    });
    this.countField.input.addEventListener('focusout', () => {
      if (!this.countField.input.value) {
        this.countField.input.value = '1';
        buttonOrder.disabled = false;
      }
    });

    if (this.countField.input.value === '0') this.countField.input.value = this.countField.input.node.min;
    this.cartInc = new Button({
      className: 'count-btn__inc',
      textContent: '+',
      parent: this.countBtn,
      onclick: () => {
        this.countField.input.node.stepUp();
        this.countField.input.node.dispatchEvent(new Event('input'));
      },
    });
    this.cartDelete = new Button({
      className: 'cart__stock cart__delete',
      textContent: 'Удалить',
      parent: this.stockWrapper,
      onclick: () => {
        DB.cart.remove(product);
        Emitter.emit('cart__delete-item');
      },
    });
    if (+this.countField.input.value === +this.countField.input.node.max) this.cartInc.disabled = true;
    this.price.setText(`${+this.countField.input.node.value * keyboardSwitch.price} ₽`);
    this.append(this.images);
    this.append(this.wrapper);
  }
}
