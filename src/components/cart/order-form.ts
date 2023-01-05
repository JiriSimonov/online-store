import Imask from 'imask';
import { Loader } from '../store/loader';
import { DB } from '../../services/db/database';
import { Component } from '../elements/base-component';
import { Button } from '../elements/button-component';
import { FormField } from '../elements/form-field';
import { Card } from './card';

export class OrderForm extends Component {
  private modalOverlay: Component;

  private modalContent: Component;

  private modalForm: Component;

  private nameField: FormField;

  private phoneField: FormField;

  private addressField: FormField;

  private emailField: FormField;

  private card: Card;

  private modalSubmit: Button;

  private modalClose: Button;

  private loader: Loader;

  constructor() {
    super({ className: 'modal' });
    this.loader = new Loader(true);
    this.modalOverlay = new Component({ className: 'modal__overlay' });
    this.modalContent = new Component({ className: 'modal__content' });
    this.modalForm = new Component({ tag: 'form', className: 'modal__form' });
    this.nameField = new FormField({
      className: 'modal',
      text: 'Имя Фамилия',
      placeholder: 'Василий Клаб',
      type: 'text',
      pattern: '[а-яА-Я]{3,}(\\s[а-яА-Я]{3,})+',
    });
    this.phoneField = new FormField({
      className: 'modal',
      text: 'Телефон',
      type: 'tel',
      placeholder: '+7(982)-386-22-16',
      pattern: `\\+7\\(\\d{3}\\)-\\d{3}-\\d{2}-\\d{2}`,
    });
    const phoneMaskOption = {
      mask: '+{7}(000)-000-00-00',
      lazy: false,
    };
    Imask(this.phoneField.getInputNode(), phoneMaskOption);
    this.addressField = new FormField({
      className: 'modal',
      text: 'Адрес доставки',
      type: 'text',
      placeholder: 'Пенза, Кукушкина 5, квартира 1',
      pattern: '[а-яА-Я]{5,}(\\s[а-яА-Я]{5,})(\\s[а-яА-Я]{5,})+',
    });
    this.emailField = new FormField({
      className: 'modal',
      text: 'E-mail',
      type: 'email',
      placeholder: 'kotopes@mail.ru',
      pattern: '.+@.+\\..+',
    });
    this.card = new Card();
    this.modalSubmit = new Button({
      className: 'modal__submit',
      textContent: 'Заказать',
    });
    this.modalClose = new Button({
      className: 'modal__close',
      ariaLabel: 'Закрыть',
      parent: this.modalContent.node,
      onclick: () => {
        this.destroy();
        document.body.classList.remove('no-scroll');
      },
    });
    this.modalForm.node.onsubmit = () => {
      document.body.append(this.loader.node);
      setTimeout(() => {
        window.location.hash = '#store';
        this.destroy();
        DB.cart.clear();
        DB.cart.promo.clear();
        this.loader.destroy();
        document.body.classList.remove('no-scroll');
      }, 3500);
      return false;
    };

    this.append(this.modalOverlay);
    this.modalOverlay.append(this.modalContent);
    this.modalContent.append(this.modalForm);
    this.modalForm.append(
      this.nameField,
      this.phoneField,
      this.addressField,
      this.emailField,
      this.card,
      this.modalSubmit,
    );
    this.modalOverlay.node.addEventListener('click', (e) => {
      const { target } = e;
      if (target === this.modalOverlay.node) {
        this.destroy();
        document.body.classList.remove('no-scroll');
      }
    });
  }
}
