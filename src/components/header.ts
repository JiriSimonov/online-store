import { Burger } from './elements/burger-menu';
import { DB } from '../services/db/database';
import { Anchor } from './elements/anchor-component';
import { Component } from './elements/base-component';
import { FormField } from './elements/form-field';
import { Button } from './elements/button-component';
import { emitter } from '../services/event-emitter';
import { debounce } from '../utils/utils';

export class Header extends Component {
  private container = new Component({ className: 'container', parent: this });
  private wrapper = new Component({ className: 'header__wrapper', parent: this.container });
  private logo = new Anchor({
    parent: this.wrapper,
    className: 'header__logo',
    text: 'Keyboards Store',
    onclick: () => {
      window.location.hash = '#home';
      this.searchField.input.classList.remove('header__input_is-open');
      this.searchField.destroy();
    },
  });
  private controls = new Component({ className: 'header__controls', parent: this.wrapper });
  private burger = new Burger();
  private searchField = new FormField({ className: 'header', type: 'search', placeholder: 'Найти', value: '' });
  private search = new Button({ className: 'header__search', ariaLabel: 'Поиск', parent: this.controls });
  private cart = new Button({
    className: 'header__cart',
    onclick: () => {
      window.location.hash = '#cart';
    },
    ariaLabel: 'Перейти в корзину',
    parent: this.controls,
  });
  private cartCount = new Component({
    tag: 'span',
    className: 'header__count',
    textContent: `${DB.cart.sumQuantity}`,
    parent: this.cart,
  });
  private cartPrice = new Component({
    tag: 'span',
    className: 'header__price',
    textContent: `${DB.cart.sumPrice}`,
    parent: this.controls,
  });

  constructor() {
    super({ tag: 'header', className: 'header' });
    const searchParam = DB.filter.params.get('search');
    if (searchParam) {
      this.searchField.getInputNode().classList.toggle('header__input_is-open');
      this.searchField.getInputNode().value = `${[...searchParam]}`;
      this.controls.prepend(this.searchField);
    }
    this.search.node.addEventListener('click', () => {
      if (this.searchField.getInputNode().classList.contains('header__input_is-open')) this.searchField.destroy();
      else this.controls.prepend(this.searchField);
      this.searchField.getInputNode().classList.toggle('header__input_is-open');
    });
    this.burger.onclick = () => {
      this.controls.classList.toggle('header__controls_is-open');
      this.burger.classList.toggle('burger_is-open');
    };
    this.wrapper.append(this.burger);
    this.controls.prepend(this.searchField);

    const handleSearchInput = debounce((value: string) => DB.filter.clear('search').add('search', value), 300);
    this.searchField.input.oninput = () => {
      if (!window.location.hash.startsWith('#store')) window.location.hash = '#store';
      handleSearchInput(this.searchField.input.value);
    };
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
