import Imask from 'imask';
import { FormField } from '../elements/form-field';
import { Component } from '../elements/base-component';

enum CardTypes {
  visa = '4',
  mastercard = '5',
  discover = '6',
  troy = '9',
}

export class Card extends Component {
  cardWrapper = new Component({ className: 'card__wrapper', parent: this });
  logo = new Component({ className: 'card__logo', parent: this });
  cardNumber = new FormField({
    className: 'card',
    modificator: 'number',
    placeholder: '#### #### #### ####',
    pattern: `(\\d{4} ){3}\\d{4}`,
    textContent: 'Номер карты',
    parent: this.cardWrapper,
  });
  cardExpires = new FormField({
    className: 'card',
    modificator: 'expires',
    placeholder: 'ММ/ГГ',
    pattern: `\\d{2}\\/\\d{2}`,
    textContent: 'Срок действия',
    parent: this.cardWrapper,
  });
  cardCVV = new FormField({
    className: 'card',
    modificator: 'cvv',
    placeholder: 'CVV',
    pattern: `[0-9]{3}`,
    textContent: 'CVV код',
    parent: this.cardWrapper,
  });

  constructor() {
    super({ className: 'card' });
    const curdNumberOptions = {
      mask: '0000 0000 0000 0000',
    };
    Imask(this.cardNumber.input.node, curdNumberOptions);
    this.cardNumber.input.addEventListener('input', () => {
      const cardTypes = Object.entries(CardTypes);
      cardTypes.forEach((cardType) => {
        const node = this.cardNumber.input.value;
        const [ typeName, typeNum ] = cardType
        if (node[0] === typeNum) {
          this.logo.style.backgroundImage = `url('./assets/icons/cards/${typeName}.webp')`;
        };
      });
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
    const cvvMaskOptions = { mask: '000' };
    Imask(this.cardCVV.input.node, cvvMaskOptions);
    this.cardWrapper.append(this.cardNumber, this.cardExpires, this.cardCVV);
  }
}
