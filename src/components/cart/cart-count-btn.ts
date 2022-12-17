import { DB } from './../../services/db/Database';
import { CartItem } from './../../interfaces/database';
import { BaseComponent } from '../elements/base-component';
import { Button } from '../elements/button';

export class CartCountBtn extends BaseComponent {
  private count: BaseComponent;

  private currentNum: number;

  private cartDec: Button;

  private cartInc: Button;

  constructor(product: CartItem, inStock: BaseComponent) {
    super({ className: 'count-btn' });
    const { keyboard, keyboardSwitch, quantity } = product;
    const printQuantity = () => {
      this.count.getNode().textContent = `${this.currentNum}`;
      inStock.getNode().textContent = `Осталось на складе ${
        keyboardSwitch.quantity - this.currentNum
      }`;
    };
    this.currentNum = quantity;
    this.cartDec = new Button({ className: 'count-btn__dec', text: '-' });
    this.count = new BaseComponent({
      tag: 'span',
      className: 'count-btn__count',
      text: `${quantity}`,
    });
    this.cartInc = new Button({
      className: 'count-btn__inc',
      text: '+',
      onclick: () => {
        this.currentNum++;
        if (keyboardSwitch.quantity - this.currentNum === 0) {
          printQuantity();
          this.cartInc.getNode().setAttribute('disabled', 'true');
        }
        printQuantity();

        DB.addToCart([keyboard, keyboardSwitch], this.currentNum);
        console.log(keyboardSwitch.quantity - this.currentNum);
      },
    });
    this.appendEl([this.cartDec, this.count, this.cartInc]);
  }

  getSum(price: number) {
    return price * this.currentNum;
  }
}
