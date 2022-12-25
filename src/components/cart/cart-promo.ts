import { DB } from '../../services/db/database';
import { FormField } from '../elements/form-field';
import { BaseComponent } from '../elements/base-component';
import { Button } from '../elements/button';

export class PromoForm extends BaseComponent {
  private promoBtn: Button;

  private promoField = new FormField({
    className: 'promo',
    type: 'text',
    placeholder: 'KEK',
    text: `Промокоды: ${DB.cart.promo.available.join(', ')}` });

  constructor() {
    super({ tag: 'form', className: 'promo__form' });
    this.promoBtn = new Button({
      className: 'promo__submit-btn',
      text: 'Применить',
      onclick: () => {
        if (DB.cart.promo.isValid(this.promoField.getInputNode().value)) {
          DB.cart.promo.add(this.promoField.getInputNode().value);
          this.promoField.getInputNode().value = '';
          this.node.removeChild(this.promoBtn.getNode());
        }
        return false;
      },
    });
    this.promoField.getInputNode().oninput = () => {
      if (DB.cart.promo.isValid(this.promoField.getInputNode().value)) 
        this.appendEl(this.promoBtn)
       else 
        if (this.node.children.length > 1) this.node.removeChild(this.promoBtn.getNode());
    }
    this.appendEl(this.promoField);
  }
}
