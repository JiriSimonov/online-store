import BaseComponent from '../elements/base-component';
import Button from '../elements/button';
import Input from '../elements/input';

export default class OrderForm extends BaseComponent {
  private modalOverlay: BaseComponent;

  private modalContent: BaseComponent;

  private modalForm: BaseComponent;

  private modalNameLabel: BaseComponent;

  private modalName: Input;

  private modalPhoneLabel: BaseComponent;

  private modalPhone: Input;

  private modalAddressLabel: BaseComponent;

  private modalAddress: Input;

  private modalEmailLabel: BaseComponent;

  private modalEmail: Input;

  private card: BaseComponent;

  private cardNumberLabel: BaseComponent;

  private cardNumber: Input;

  private cardMonthLabel: BaseComponent;

  private cardMonth: Input;

  private cardYearLabel: BaseComponent;

  private cardYear: Input;

  private cardCVVLabel: BaseComponent;

  private cardCVV: Input;

  private modalSubmit: Button;

  constructor() {
    super({ className: 'modal' });
    this.modalOverlay = new BaseComponent({ className: 'modal__overlay' });
    this.modalContent = new BaseComponent({ className: 'modal__content' });
    this.modalForm = new BaseComponent({ tag: 'form', className: 'modal__form' });
    this.modalNameLabel = new BaseComponent({ tag: 'label', className: 'modal__label', text: 'Имя Фамилия' });
    this.modalName = new Input({ className: 'modal__name', type: 'text' });
    this.modalPhoneLabel = new BaseComponent({ tag: 'label', className: 'modal__label', text: 'Телефон' });
    this.modalPhone = new Input({ className: 'modal__phone', type: 'number' });
    this.modalAddressLabel = new BaseComponent({ tag: 'label', className: 'modal__label', text: 'Адрес доставки' });
    this.modalAddress = new Input({ className: 'modal__address', type: 'text' });
    this.modalPhone = new Input({ className: 'modal__phone', type: 'tel' });
    this.modalEmailLabel = new BaseComponent({ tag: 'label', className: 'modal__label', text: 'E-mail' });
    this.modalEmail = new Input({ className: 'modal__email', type: 'email' });
    this.card = new BaseComponent({ className: 'card' });
    this.cardNumberLabel = new BaseComponent({ tag: 'label', className: 'modal__label' });
    this.cardNumber = new Input({ className: 'modal__email', type: 'number' });
    this.cardMonthLabel = new BaseComponent({ tag: 'label', className: 'modal__label' });
    this.cardMonth = new Input({ className: 'modal__email', type: 'number' });
    this.cardYearLabel = new BaseComponent({ tag: 'label', className: 'modal__label' });
    this.cardYear = new Input({ className: 'modal__email', type: 'number' });
    this.cardCVVLabel = new BaseComponent({ tag: 'label', className: 'modal__label' });
    this.cardCVV = new Input({ className: 'modal__email', type: 'number' });
    this.modalSubmit = new Button({ className: 'modal__submit', text: 'Заказать' });
    // render
    this.appendEl(this.modalOverlay);
    this.modalOverlay.appendEl(this.modalContent);
    this.modalContent.appendEl(this.modalForm);
    this.modalNameLabel.appendEl(this.modalName);
    this.modalAddressLabel.appendEl(this.modalAddress);
    this.modalPhoneLabel.appendEl(this.modalPhone);
    this.modalEmailLabel.appendEl(this.modalEmail);
    this.cardNumberLabel.appendEl(this.cardNumber);
    this.cardMonthLabel.appendEl(this.cardMonth);
    this.cardYearLabel.appendEl(this.cardYear);
    this.cardCVVLabel.appendEl(this.cardCVV);
    this.card.appendEl([
      this.cardNumberLabel,
      this.cardMonthLabel,
      this.cardYearLabel,
      this.cardCVVLabel,
    ]);
    this.modalForm.appendEl([
      this.modalNameLabel,
      this.modalPhoneLabel,
      this.modalAddressLabel,
      this.modalEmailLabel,
      this.modalSubmit,
      this.card,
    ]);
  }
}
