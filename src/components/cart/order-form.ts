import Imask from 'imask';
import { BaseComponent } from '../elements/base-component';
import { Button } from '../elements/button';
import { FormField } from '../elements/form-field';
import { Card } from './card';

export class OrderForm extends BaseComponent {
  private modalOverlay: BaseComponent;

  private modalContent: BaseComponent;

  private modalForm: BaseComponent;

  private nameField: FormField;

  private phoneField: FormField;

  private addressField: FormField;

  private emailField: FormField;

  private card: Card;

  private modalSubmit: Button;

  private modalClose: Button;

  constructor() {
    super({ className: 'modal' });
    this.modalOverlay = new BaseComponent({ className: 'modal__overlay' });
    this.modalContent = new BaseComponent({ className: 'modal__content' });
    this.modalForm = new BaseComponent({ tag: 'form', className: 'modal__form' });
    this.nameField = new FormField({
      className: 'modal',
      text: 'Имя Фамилия',
      placeholder: 'Василий Клаб',
    });
    this.phoneField = new FormField({
      className: 'modal',
      text: 'Телефон',
      type: 'tel',
      placeholder: '+7(982)-386-22-16',
      pattern: '[0-9]{3}-[0-9]{3}-[0-9]{4}',
    });
    const phoneMaskOption = {
      mask: '+{7}(000)-000-00-00',
      lazy: false,
    };
    Imask(this.phoneField.getInputNode(), phoneMaskOption);
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
    this.card = new Card();
    this.modalSubmit = new Button({
      className: 'modal__submit',
      text: 'Заказать',
      onclick: () => {
        this.destroy();
        // window.location.hash = '#store';
        document.body.classList.remove('no-scroll');
      },
    });
    this.modalClose = new Button({
      className: 'modal__close',
      aria: 'Закрыть',
      parent: this.modalContent.getNode(),
      onclick: () => {
        this.destroy();
        document.body.classList.remove('no-scroll');
      },
    });
    // render
    this.appendEl(this.modalOverlay);
    this.modalOverlay.appendEl(this.modalContent);
    this.modalContent.appendEl(this.modalForm);
    this.modalForm.appendEl([
      this.nameField,
      this.phoneField,
      this.addressField,
      this.emailField,
      this.card,
      this.modalSubmit,
    ]);
    this.modalOverlay.getNode().addEventListener('click', (e) => {
      const { target } = e;
      if (target === this.modalOverlay.getNode()) {
        this.destroy();
        document.body.classList.remove('no-scroll');
      }
    });
  }
}
