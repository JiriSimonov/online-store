import Imask from 'imask';
import { FormField } from '../elements/form-field';
import { Component } from '../elements/base-component';

export class Card extends Component {
  cardWrapper: Component;
  logo: Component;
  cardNumber: FormField;
  cardExpires: FormField;
  cardCVV: FormField;

  constructor() {
    super({ className: 'card' });
    this.logo = new Component({ className: 'card__logo', parent: this });
    this.cardWrapper = new Component({ className: 'card__wrapper', parent: this });
    this.cardNumber = new FormField({
      className: 'card',
      modificator: 'number',
      placeholder: '#### #### #### ####',
      pattern: `(\\d{4} ){3}\\d{4}`,
      text: 'Номер карты',
    });
    const curdNumberOptions = {
      mask: '0000 0000 0000 0000',
    };
    Imask(this.cardNumber.input.node, curdNumberOptions);
    this.cardNumber.input.addEventListener('input', (e) => {
      const { target } = e;
      if (target && target instanceof HTMLInputElement) {
        let re = /^4/;
        if (target.value.match(re) != null) {
          this.logo.style.backgroundImage = `url('./assets/icons/cards/visa-logo.webp')`;
          return 'visa';
        }
        re = /^5[1-5]/;
        if (target.value.match(re) != null) {
          this.logo.style.backgroundImage = `url('./assets/icons/cards/mastercard.webp')`;
          return 'mastercard';
        }

        re = /^6011/;
        if (target.value.match(re) != null) {
          this.logo.style.backgroundImage = `url('./assets/icons/cards/discover.webp')`;
          return 'discover';
        }

        re = /^9792/;
        if (target.value.match(re) != null) {
          this.logo.style.backgroundImage = `url('./assets/icons/cards/troy.webp')`;
          return 'troy';
        }
      }
      return 'visa';
    }); // TODO! посмотреть в сторону оптимизации
    this.cardExpires = new FormField({
      className: 'card',
      modificator: 'expires',
      placeholder: 'ММ/ГГ',
      pattern: `\\d{2}\\/\\d{2}`,
      text: 'Срок действия',
    });
    Imask(this.cardExpires.input.node, {
      mask: 'MM/YY',
      blocks: {
        MM: {
          mask: Imask.MaskedRange,
          from: 1,
          to: 12,
          maxLength: 2,
        },
        YY: {
          mask: Imask.MaskedRange,
          from: 23,
          to: 50,
          maxLength: 2,
        },
      },
    });
    this.cardCVV = new FormField({
      className: 'card',
      modificator: 'cvv',
      placeholder: 'CVV',
      pattern: `[0-9]{3}`,
      text: 'CVV код',
    });
    const cvvMaskOptions = { mask: '000' };
    Imask(this.cardCVV.input.node, cvvMaskOptions);
    this.cardWrapper.append(this.cardNumber, this.cardExpires, this.cardCVV);
  }
}
