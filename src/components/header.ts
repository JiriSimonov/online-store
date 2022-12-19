import { DB } from '../services/db/database';
import { Anchor } from './elements/anchor';
import { BaseComponent } from './elements/base-component';
import { FormField } from './elements/form-field';
import { Button } from './elements/button';
import { ProductsListState } from '../states/goods-state';
import { emitter } from '../services/event-emitter';

export class Header extends BaseComponent {
  private container: BaseComponent;

  private logo: BaseComponent;

  private wrapper: BaseComponent;

  private controls: BaseComponent;

  private search: BaseComponent;

  private cartPrice: BaseComponent;

  private cartCount: BaseComponent;

  private cart: BaseComponent;

  private searchField: FormField;

  constructor(private productsState: ProductsListState) {
    super({ tag: 'header', className: 'header' });
    this.container = new BaseComponent({ className: 'container' });
    this.wrapper = new BaseComponent({ className: 'header__wrapper' });
    this.controls = new BaseComponent({ className: 'header__controls' });
    this.logo = new Anchor({ className: 'header__logo', text: 'Keyboards Store' });
    this.search = new BaseComponent({ tag: 'button', className: 'header__search' });
    this.cart = new Button({
      className: 'header__cart',
      onclick: () => {
        window.location.hash = '#cart';
      },
    });
    this.cartCount = new BaseComponent({
      tag: 'span',
      className: 'header__count',
      text: `${DB.cart.sumQuantity}`,
    });
    this.cartPrice = new BaseComponent({
      tag: 'span',
      className: 'header__price',
      text: `${DB.cart.sumPrice}`,
    });
    this.searchField = new FormField({
      className: 'header',
      type: 'search',
      placeholder: 'Найти',
      value: '',
    });
    this.search.getNode().addEventListener('click', () => {
      this.searchField.getInputNode().classList.toggle('header__input_is-open');
      this.searchField.getInputNode().addEventListener('input', (e) => {
        if (window.location.hash !== '#store') window.location.hash = '#store';
        const target = e.target as HTMLInputElement;
        productsState.set({ search: target.value });
      });
    });
    emitter.subscribe('cart__save', () => {
      this.cartCount.getNode().textContent = `${DB.cart.sumQuantity}`;
      this.cartPrice.getNode().textContent = `${DB.cart.sumPrice}`;
    });
    this.logo.getNode().onclick = () => {
      window.location.hash = '#home';
      this.searchField.getInputNode().classList.remove('header__input_is-open');
    };
  }

  render() {
    this.appendEl(this.container);
    this.container.appendEl(this.wrapper);
    this.wrapper.appendEl([this.logo, this.controls]);
    this.controls.appendEl([this.searchField, this.search, this.cart, this.cartPrice]);
    this.cart.appendEl(this.cartCount);
  }
}
