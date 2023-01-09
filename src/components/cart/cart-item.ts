import { SwitchComponent } from '../switches/switch-component';
import { FormField } from '../elements/form-field';
import { Component } from '../elements/base-component';
import { ProductImage } from '../product/product-img';
import { Button } from '../elements/button-component';
import { DB } from '../../services/db/database';
import { CartItem } from '../../services/db/cart-item';
import { Emitter, EventName } from '../../services/emitter';
import { Heading } from '../elements/heading-component';

export class CartItemElem extends Component {
  private wrapper = new Component({ className: 'cart__container' });
  private images = new ProductImage(this.product.keyboard.images);
  private stockWrapper = new Component({ className: 'cart__stock-wrapper' });
  private price = new Component({
    className: 'cart__price',
    textContent: `${this.product.keyboardSwitch.price} ₽`,
  });
  private countBtn = new Component({ className: 'count-btn' });
  private countField = new FormField({
    className: 'count-btn',
    type: 'number',
    value: `${this.product.quantity}`,
    min: '1',
    max: `${this.product.keyboardSwitch.quantity}`,
    pattern: '[0-9]{2}',
  });
  private inStock = new Component({
    className: 'cart__stock',
    textContent:
      this.product.keyboardSwitch.quantity > 0
        ? `Осталось на складе: ${this.product.keyboardSwitch.quantity - +this.countField.input.value}`
        : 'Нет в наличии',
  });
  private category = new Component({
    className: 'cart__category',
    textContent: `Размер: ${this.product.keyboard.size}`,
  });
  private cartDec = new Button({
    className: 'count-btn__dec',
    textContent: '-',
    onclick: () => {
      if (+this.countField.input.value === 1) {
        DB.cart.remove(this.product);
        Emitter.emit(EventName.cart__itemDelete);
      } else {
        this.countField.input.node.stepDown();
        this.countField.input.node.dispatchEvent(new Event('input'));
      }
    },
  });
  private title = new Heading({
    className: 'cart__title',
    textContent: this.product.keyboard.title,
  });
  private cartInc = new Button({
    className: 'count-btn__inc',
    textContent: '+',
    onclick: () => {
      this.countField.input.node.stepUp();
      this.countField.input.node.dispatchEvent(new Event('input'));
    },
  });
  private cartDelete = new Button({
    className: 'cart__stock cart__delete',
    textContent: 'Удалить',
    onclick: () => {
      DB.cart.remove(this.product);
      Emitter.emit(EventName.cart__itemDelete);
    },
  });
  private switchWrapper = new Component({ className: 'switch' });
  private keyboardSwitch = new SwitchComponent(this.product.keyboardSwitch, this.product.key, 'div');
  private cartPosition = new Component({ className: 'cart__position', textContent: `${this.index}` });
  constructor(private product: CartItem, private index: number, private orderBtn: Button) {
    super({ tag: 'li', className: 'cart__item' });
    const { keyboard, keyboardSwitch } = product;
    const buttonOrder = orderBtn;
    this.append(this.images, this.wrapper, this.cartPosition);
    this.wrapper.append(this.title);
    this.switchWrapper.append(this.keyboardSwitch);
    if (keyboardSwitch.title !== 'null') {
      this.wrapper.append(this.switchWrapper);
    }
    if (keyboard.size !== '') {
      this.wrapper.append(this.category);
    }
    this.wrapper.append(this.price, this.stockWrapper);
    this.stockWrapper.append(this.inStock, this.countBtn, this.cartDelete);
    this.countBtn.append(this.cartDec, this.countField, this.cartInc);
    this.countField.input.addEventListener('input', (e) => {
      buttonOrder.disabled = false;
      if (e.target instanceof HTMLInputElement) {
        if (+e.target.value > +e.target.max) {
          e.target.value = e.target.max;
        }
        if (+e.target.value <= +e.target.min && e.target.value !== '') {
          e.target.value = e.target.min;
        }
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
        product.set(+this.countField.input.value);
        this.countField.input.node.dispatchEvent(new Event('input'));
        buttonOrder.disabled = false;
      }
    });
    if (this.countField.input.value === '0') {
      this.countField.input.value = this.countField.input.node.min;
    }
    if (+this.countField.input.value === +this.countField.input.node.max) {
      this.cartInc.disabled = true;
    }
    if (this.countField.input.value === '0') {
      product.set(+this.countField.input.value + 1);
    }
    this.price.setText(`${+this.countField.input.node.value * keyboardSwitch.price} ₽`);
    this.onclick = (e) => {
      if (
        !(e.target instanceof HTMLElement) ||
        e.target instanceof HTMLLabelElement ||
        e.target instanceof HTMLButtonElement ||
        e.target instanceof HTMLInputElement
      ) {
        return;
      }
      window.location.hash = `/${keyboard.id}`;
    };
  }
}
