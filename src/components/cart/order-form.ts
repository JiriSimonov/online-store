import BaseComponent from '../elements/base-component';
import Button from '../elements/button';
import { FormField } from '../elements/form-field';

export default class OrderForm extends BaseComponent {
  private modalOverlay: BaseComponent;

  private modalContent: BaseComponent;

  private modalForm: BaseComponent;

  private nameField: FormField;

  private phoneField: FormField;

  private addressField: FormField;

  private emailField: FormField;

  private card: BaseComponent;

  private cardNumber: FormField;

  private cardMonth: FormField;

  private cardYear: FormField;

  private cardCVV: FormField;

  private modalSubmit: Button;

  constructor() {
    super({ className: 'modal' });
    this.modalOverlay = new BaseComponent({ className: 'modal__overlay' });
    this.modalContent = new BaseComponent({ className: 'modal__content' });
    this.modalForm = new BaseComponent({ tag: 'form', className: 'modal__form' });
    this.nameField = new FormField({ className: 'modal', text: 'Имя Фамилия' });
    this.phoneField = new FormField(
      {
        className: 'modal',
        text: 'Телефон',
        type: 'tel',
        placeholder: '+798238622',
        pattern: '[0-9]{3}-[0-9]{3}-[0-9]{4}',
      },
    );
    this.addressField = new FormField({
      className: 'modal',
      text: 'Адрес доставки',
      placeholder: 'Кукушкина 5 дом 10',
    });
    this.emailField = new FormField({
      className: 'modal',
      text: 'E-mail',
      type: 'email',
      placeholder: 'kotopes@mail.ru',
    });
    this.card = new BaseComponent({ className: 'card' });
    this.cardNumber = new FormField({
      className: 'modal',
      text: 'Номер карты',
      type: 'number',
      placeholder: '3333-4444-5555-6666',
    });
    this.cardMonth = new FormField({
      className: 'modal',
      type: 'number',
      placeholder: '12',
    });
    this.cardYear = new FormField({
      className: 'modal',
      type: 'number',
      placeholder: '23',
    });
    this.cardCVV = new FormField({
      className: 'modal',
      text: 'Код на обратной стороне',
      type: 'number',
      placeholder: '123',
    });
    this.modalSubmit = new Button({ className: 'modal__submit', text: 'Заказать' });
    // render
    this.appendEl(this.modalOverlay);
    this.modalOverlay.appendEl(this.modalContent);
    this.modalContent.appendEl(this.modalForm);
    this.card.appendEl([
      this.cardNumber,
      this.cardMonth,
      this.cardYear,
      this.cardCVV,
    ]);
    this.modalForm.appendEl([
      this.nameField,
      this.phoneField,
      this.addressField,
      this.emailField,
      this.card,
      this.modalSubmit,
    ]);
  }
}
