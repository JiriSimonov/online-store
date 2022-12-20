import { FormField } from '../elements/form-field';
import { BaseComponent } from '../elements/base-component';
import { Button } from '../elements/button';

export class PromoForm extends BaseComponent {

  private promoBtn: Button;

  private promoField: FormField;

  constructor() {
    super({ tag: 'form', className: 'promo__form' });
    this.promoField = new FormField({ className: 'promo', type: 'text', placeholder: 'KEK' });
    this.promoBtn = new Button({ className: 'promo__submit-btn', text: 'Применить' });
    this.appendEl([this.promoField, this.promoBtn]);
  }
}
