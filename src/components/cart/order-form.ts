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
  private loader?: Loader;

  constructor() {
    super({ className: 'modal' });
    this.modalOverlay = new Component({ className: 'modal__overlay' });
    this.modalContent = new Component({ className: 'modal__content' });
    this.modalForm = new Component<HTMLFormElement>({ tag: 'form', className: 'modal__form' });
    this.nameField = new FormField({
      className: 'modal',
      textContent: 'Имя Фамилия',
      placeholder: 'Василий Клаб',
      type: 'text',
      pattern: '[а-яА-Я]{3,}(\\s[а-яА-Я]{3,})+',
    });
    this.phoneField = new FormField({
      className: 'modal',
      textContent: 'Телефон',
      type: 'tel',
      placeholder: '+7(982)-386-22-16',
      pattern: `\\+7\\(\\d{3}\\)-\\d{3}-\\d{2}-\\d{2}`,
    });
    const phoneMaskOption = { mask: '+{7}(000)-000-00-00', lazy: false };
    Imask(this.phoneField.input.node, phoneMaskOption);
    this.addressField = new FormField({
      className: 'modal',
      textContent: 'Адрес доставки',
      type: 'text',
      placeholder: 'Пенза, Кукушкина 5, квартира 1',
      pattern: '[а-яА-Я]{5,}(\\s[а-яА-Я]{5,})(\\s[а-яА-Я]{5,})+',
    });
    this.emailField = new FormField({
      className: 'modal',
      textContent: 'E-mail',
      type: 'email',
      placeholder: 'kotopes@mail.ru',
      pattern: '.+@.+\\..+',
    });
    this.card = new Card();
    this.modalSubmit = new Button({ className: 'modal__submit', textContent: 'Заказать' });
    this.modalClose = new Button({
      className: 'modal__close',
      ariaLabel: 'Закрыть',
      parent: this.modalContent,
      onclick: () => {
        this.destroy();
        document.body.classList.remove('no-scroll', 'is-modal-open');
      },
    });
    this.modalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      this.loader ??= new Loader(true);
      document.body.append(this.loader.node);
      setTimeout(() => {
        this.destroy();
        DB.cart.clear();
        DB.cart.promo.clear();
        this.loader?.destroy();
        document.body.classList.remove('no-scroll', 'is-modal-open');
        window.location.hash = '/store';
      }, 3500);
    });

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
    this.modalOverlay.addEventListener('click', (e) => {
      if (e.target === this.modalOverlay.node) {
        this.destroy();
        document.body.classList.remove('no-scroll', 'is-modal-open');
      }
    });
  }
}
