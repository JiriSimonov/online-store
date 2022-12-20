import { FormField } from '../elements/form-field';
import { BaseComponent } from '../elements/base-component';

export class Card extends BaseComponent {
  cardWrapper: BaseComponent;
  logo: BaseComponent;
  cardNumber: FormField
  cardExpires: FormField;
  cardCVV: FormField;

  constructor() {
    super({ className: 'card' });
    this.logo = new BaseComponent({ className: 'card__logo', parent: this.node });
    this.cardWrapper = new BaseComponent({ className: 'card__wrapper', parent: this.node });
    this.cardNumber = new FormField({
      className: 'card',
      modificator: 'number',
      type: 'number',
      placeholder: '####  ####  ####  ####',
      text: 'Номер карты'
    });
    this.cardExpires = new FormField({
      className: 'card',
      type: 'number',
      modificator: 'expires',
      placeholder: 'ММ/ГГ',
      text: 'Срок действия'
    });
    this.cardCVV = new FormField({
      className: 'card',
      type: 'number',
      modificator: 'cvv',
      placeholder: 'CVV',
      text: 'CVV код'
    });
    this.cardWrapper.appendEl([this.cardNumber, this.cardExpires, this.cardCVV]);
  }
}
