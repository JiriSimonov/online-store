import { DB } from '../../services/db/database';
import { Component } from '../elements/base-component';
import { Button } from '../elements/button-component';

export class ActivePromo extends Component {
  private promoName = new Component({ className: 'promo-active__text', parent: this.node });
  private promoValue = new Component({ className: 'promo-active__text', parent: this.node });
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
