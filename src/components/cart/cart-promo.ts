import { BaseComponent } from '../elements/base-component';
import { Button } from '../elements/button';
import { Input } from '../elements/input';

export class PromoForm extends BaseComponent {
  private promoLabel: BaseComponent;

  private promoInput: Input;

  private promoBtn: Button;

  constructor() {
    super({ tag: 'form', className: 'promo__form' });
    this.promoLabel = new BaseComponent({ tag: 'label', className: 'promo__label' });
    this.promoInput = new Input({ className: 'promo__input', type: 'text' });
    this.promoBtn = new Button({ className: 'promo__submit-btn', text: 'Применить' });

    this.appendEl([this.promoLabel, this.promoBtn]);
    this.promoLabel.appendEl(this.promoInput);
  }
}
