import BaseComponent from '../elements/base-component';
import Button from '../elements/button';

export default class CartCountBtn extends BaseComponent {
  private count: BaseComponent;

  private cartDec: Button;

  private cartInc: Button;

  constructor() {
    super({ className: 'count-btn' });
    this.cartDec = new Button({ className: 'count-btn__dec', text: '-' });
    this.count = new BaseComponent({ tag: 'span', className: 'count-btn__count', text: '0' });
    this.cartInc = new Button({ className: 'count-btn__inc', text: '+' });
    this.appendEl([this.cartDec, this.count, this.cartInc]);
  }
}
