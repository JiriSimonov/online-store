import { DB } from './../services/db/Database';
import { Anchor } from './elements/anchor';
import { BaseComponent } from './elements/base-component';
import { Button } from './elements/button';
import { Input } from './elements/input';
import { ProductsListState } from '../states/goods-state';
import { emitter } from '../services/EventEmitter';

export class Header extends BaseComponent {
  private container: BaseComponent;

  private logo: BaseComponent;

  private wrapper: BaseComponent;

  private controls: BaseComponent;

  private search: BaseComponent;

  private cartPrice: BaseComponent;

  private cartCount: BaseComponent;

  private cart: BaseComponent;

  private searchInput: Input;

  constructor(private productsState: ProductsListState) {
    super({ tag: 'header', className: 'header' });
    this.container = new BaseComponent({ className: 'container' });
    this.wrapper = new BaseComponent({ className: 'header__wrapper' });
    this.controls = new BaseComponent({ className: 'header__controls' });
    this.logo = new Anchor({ className: 'header__logo', text: 'Keyboards Store', href: './' });
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
      text: `${DB.cartProductsQuantity}`,
    });
    this.cartPrice = new BaseComponent({
      tag: 'span',
      className: 'header__price',
      text: `${DB.cartPriceSum}₽`,
    });
    this.searchInput = new Input({ className: 'header__input' });
    this.search.getNode().addEventListener('click', () => {
      this.searchInput.getNode().classList.toggle('header__input_is-open');
      this.searchInput.getNode().addEventListener('input', (e) => {
        if (window.location.hash !== '#store') window.location.hash = '#store';
        const target = e.target as HTMLInputElement;
        productsState.set({ search: target.value });
      });
    });
    emitter.subscribe('kekboards__storage-saved', () => {
      this.cartCount.getNode().textContent = `${DB.cartProductsQuantity}`;
      this.cartPrice.getNode().textContent = `${DB.cartPriceSum}`;
    });
  }

  render() {
    this.appendEl(this.container);
    this.container.appendEl(this.wrapper);
    this.wrapper.appendEl([this.logo, this.controls]);
    this.controls.appendEl([this.searchInput, this.search, this.cart, this.cartPrice]);
    this.cart.appendEl(this.cartCount);
  }
}
