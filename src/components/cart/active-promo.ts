import { BaseComponent } from '../elements/base-component';
import { Button } from '../elements/button';

export class ActivePromo extends BaseComponent {
  private promoName = new BaseComponent({ className: 'promo-active__text', parent: this.node });
  private promoValue = new BaseComponent({ className: 'promo-active__text', parent: this.node });
  private promodelete = new Button({ className: 'cart__stock cart__delete', text: 'Удалить', parent: this.node });

  constructor(name: string, value: string) {
    super({ tag: 'li', className: 'promo-active__item' });
    this.promoName.getNode().textContent = name;
    this.promoValue.getNode().textContent = value;
  }
}
