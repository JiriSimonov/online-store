import { DB } from '../../services/db/database';
import { BaseComponent } from '../elements/base-component';
import { Button } from '../elements/button';

export class ActivePromo extends BaseComponent {
  private promoName = new BaseComponent({ className: 'promo-active__text', parent: this.node });
  private promoValue = new BaseComponent({ className: 'promo-active__text', parent: this.node });
  private promoDelete = new Button({
    className: 'cart__stock cart__delete',
    parent: this.node,
    textContent: 'Удалить',
  });

  constructor(name: string, value: string) {
    super({ tag: 'li', className: 'promo-active__item' });
    this.promoName.node.textContent = name;
    this.promoValue.node.textContent = value;
    this.promoDelete.node.onclick = () => DB.cart.promo.remove(name);
  }
}
