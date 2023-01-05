import { DB } from '../../services/db/database';
import { FormField } from '../elements/form-field';
import { Component } from '../elements/base-component';
import { Button } from '../elements/button-component';

export class PromoForm extends Component {
  private promoBtn = new Button({
    className: 'promo__submit-btn',
    textContent: 'Применить',
    onclick: () => {
      if (DB.cart.promo.isValid(this.promoField.input.value)) {
        DB.cart.promo.add(this.promoField.input.value);
        this.promoField.input.value = '';
        this.removeChild(this.promoBtn);
      }
      return false;
    },
  });
  private promoField = new FormField({
    className: 'promo',
    type: 'text',
    placeholder: 'KEK',
    text: `Промокоды: ${DB.cart.promo.available.join(', ')}`,
  });

  constructor() {
    super({ tag: 'form', className: 'promo__form' });

    this.promoField.input.node.oninput = () => {
      if (DB.cart.promo.isValid(this.promoField.input.value)) this.append(this.promoBtn);
      else this.promoBtn.destroy();
    };
    this.append(this.promoField);
    this.node.addEventListener('submit', () => false);
  }
}
