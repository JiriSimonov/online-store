import { DB } from '../../services/db/database';
import { FormField } from '../elements/form-field';
import { BaseComponent } from '../elements/base-component';
import { Button } from '../elements/button';

export class PromoForm extends BaseComponent {
  private promoBtn = new Button({
    className: 'promo__submit-btn',
    text: 'Применить',
  });
  private promoField = new FormField({
    className: 'promo',
    type: 'text',
    placeholder: 'KEK',
    text: `Промокоды: ${DB.cart.promo.available.join(', ')}`
  });

  constructor() {
    super({ tag: 'form', className: 'promo__form' });
    this.promoBtn.onclick = () => {
      if (DB.cart.promo.isValid(this.promoField.getInputNode().value)) {
        DB.cart.promo.add(this.promoField.getInputNode().value);
        this.promoField.getInputNode().value = '';
        this.node.removeChild(this.promoBtn.getNode());
      }
      return false;
    }
    this.promoField.getInputNode().oninput = () => {
      if (DB.cart.promo.isValid(this.promoField.getInputNode().value))
        this.appendEl(this.promoBtn);
      else
        this.promoBtn.destroy();
    }
    this.appendEl(this.promoField);
    this.node.onsubmit = () => false;
  }
}
