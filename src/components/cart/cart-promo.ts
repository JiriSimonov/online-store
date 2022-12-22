import { DB } from '../../services/db/database';
import { FormField } from '../elements/form-field';
import { BaseComponent } from '../elements/base-component';
import { Button } from '../elements/button';

export class PromoForm extends BaseComponent {
  private promoBtn: Button;

  private promoField: FormField;

  constructor() {
    super({ tag: 'form', className: 'promo__form' });
    this.promoField = new FormField({ className: 'promo', type: 'text', placeholder: 'KEK' });
    this.promoField.getInputNode().oninput = (e) => {
      const { target } = e;
      if (target && target instanceof HTMLInputElement)
        if (DB.cart.promo.isValid(target.value)) console.warn('наебалово');
    };
    this.promoBtn = new Button({
      className: 'promo__submit-btn',
      text: 'Применить',
      onclick: () => {
        if (DB.cart.promo.isValid(this.promoField.getInputNode().value)) {
          DB.cart.promo.add(this.promoField.getInputNode().value);
          this.promoField.getInputNode().value = '';
        }
        return false;
      },
    });
    this.appendEl([this.promoField, this.promoBtn]);
  }
}
