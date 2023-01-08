import { DB } from '../../services/db/database';
import { FormField } from '../elements/form-field';
import { Component } from '../elements/base-component';
import { Button } from '../elements/button-component';

export class PromoForm extends Component<HTMLFormElement> {
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
    textContent: `Промокоды: ${DB.cart.promo.available.join(', ')}`,
  });

  constructor() {
    super({ tag: 'form', className: 'promo__form' });

    this.promoField.input.addEventListener('input', () => {
      if (DB.cart.promo.isValid(this.promoField.input.value)) {
        this.append(this.promoBtn);
      } else {
        this.promoBtn.destroy();
      }
    });
    this.append(this.promoField);
    this.addEventListener('submit', (e) => e.preventDefault());
  }
}
