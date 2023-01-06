import { DB } from '../../services/db/database';
import { Component } from '../elements/base-component';
import { Button } from '../elements/button-component';

export class ActivePromo extends Component {
  private promoName = new Component({ className: 'promo-active__text', parent: this });
  private promoValue = new Component({ className: 'promo-active__text', parent: this });
  private promoDelete = new Button({ className: 'cart__stock cart__delete', parent: this, textContent: 'Удалить' });

  constructor(name: string, value: string) {
    super({ tag: 'li', className: 'promo-active__item' });
    this.promoName.text = name;
    this.promoValue.text = value;
    this.promoDelete.onclick = () => DB.cart.promo.remove(name);
  }
}
