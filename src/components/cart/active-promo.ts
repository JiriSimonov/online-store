import { DB } from '../../services/db/database';
import { Component } from '../elements/base-component';
import { Button } from '../elements/button-component';

export class ActivePromo extends Component {
  private promoName = new Component({ className: 'promo-active__text', textContent: this.name, parent: this });
  private promoValue = new Component({ className: 'promo-active__text', textContent: this.value, parent: this });
  private promoDelete = new Button({
    className: 'cart__stock cart__delete',
    onclick: () => {DB.cart.promo.remove(this.name)},
    parent: this, textContent: 'Удалить'
  });

  constructor(private name: string, private value: string) {
    super({ tag: 'li', className: 'promo-active__item' });
  }
}
