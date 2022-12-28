/* eslint-disable @typescript-eslint/no-unused-vars */
import { DB } from '../services/db/database';
import { Anchor } from './elements/anchor';
import { BaseComponent } from './elements/base-component';
import { FormField } from './elements/form-field';
import { Button } from './elements/button';
import { emitter } from '../services/event-emitter';

export class Header extends BaseComponent {
  private container = new BaseComponent({ className: 'container' });
  private wrapper = new BaseComponent({ className: 'header__wrapper' });
  private logo = new Anchor({ className: 'header__logo', text: 'Keyboards Store' });
  private controls = new BaseComponent({ className: 'header__controls' });
  private searchField = new FormField({ className: 'header', type: 'search', placeholder: 'Найти', value: '' });
  private search = new Button({ className: 'header__search', aria: 'Поиск' });
  private cart = new Button({
    className: 'header__cart',
    onclick: () => {
      window.location.hash = '#cart';
    },
    aria: 'Перейти в корзину',
  });
  private cartCount = new BaseComponent({ tag: 'span', className: 'header__count', text: `${DB.cart.sumQuantity}` });
  private cartPrice = new BaseComponent({ tag: 'span', className: 'header__price', text: `${DB.cart.sumPrice}` });

  constructor() {
    super({ tag: 'header', className: 'header' });
    this.search.getNode().addEventListener('click', () => {
      this.searchField.getInputNode().classList.toggle('header__input_is-open');
    });
    this.logo.getNode().onclick = () => {
      window.location.hash = '#home';
      this.searchField.getInputNode().classList.remove('header__input_is-open');
    };
    this.searchField.getInputNode().oninput = (e) => {
      if (window.location.hash !== '#store') window.location.hash = '#store';
      const { target } = e;
      if (target instanceof HTMLInputElement) DB.filter.clear('search').add('search', target.value);
    }
    this.appendEl(this.container);
    this.container.appendEl(this.wrapper);
    this.wrapper.appendEl([this.logo, this.controls]);
    this.controls.appendEl([this.searchField, this.search, this.cart, this.cartPrice]);
    this.cart.appendEl(this.cartCount);

    this.subscribe();
  }

  subscribe() {
    emitter.subscribe('cart__save', () => {
      this.cartCount.setText(`${DB.cart.sumQuantity}`);
      this.cartPrice.setText(`${DB.cart.sumPrice}`);
    });
    return this;
  }
}
