import { DB } from '../../services/db/database';
import { FormField } from '../elements/form-field';
import { Component } from '../elements/base-component';
import { Button } from '../elements/button-component';

export class PromoForm extends Component {
  private promoBtn = new Button({
    className: 'promo__submit-btn',
    textContent: 'Применить',
  });
  private promoField = new FormField({
    className: 'promo',
    type: 'text',
    placeholder: 'KEK',
    text: `Промокоды: ${DB.cart.promo.available.join(', ')}`,
  });

  constructor() {
    super({ tag: 'form', className: 'promo__form' });
    this.promoBtn.onclick = () => {
      if (DB.cart.promo.isValid(this.promoField.getInputNode().value)) {
        DB.cart.promo.add(this.promoField.getInputNode().value);
        this.promoField.getInputNode().value = '';
        this.removeChild(this.promoBtn);
      }
      return false;
    };
    this.promoField.getInputNode().oninput = () => {
      if (DB.cart.promo.isValid(this.promoField.getInputNode().value)) this.append(this.promoBtn);
      else this.promoBtn.destroy();
    };
    this.append(this.promoField);
    this.node.addEventListener('submit', () => false)
  }
}
