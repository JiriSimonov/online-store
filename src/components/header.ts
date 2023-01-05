import { Burger } from './elements/burger-menu';
import { DB } from '../services/db/database';
import { Anchor } from './elements/anchor';
import { BaseComponent } from './elements/base-component';
import { FormField } from './elements/form-field';
import { Button } from './elements/button';
import { emitter } from '../services/event-emitter';
import { debounce } from '../utils/utils';

export class Header extends BaseComponent {
  private container = new BaseComponent({ className: 'container', parent: this.node });
  private wrapper = new BaseComponent({ className: 'header__wrapper', parent: this.container.node });
  private logo = new Anchor({
    parent: this.wrapper.node,
    className: 'header__logo',
    text: 'Keyboards Store',
    onclick: () => {
      window.location.hash = '#home';
      this.searchField.input.classList.remove('header__input_is-open');
      this.searchField.destroy();
    },
  });
  private controls = new BaseComponent({ className: 'header__controls', parent: this.wrapper.node });
  private burger = new Burger();
  private searchField = new FormField({
    className: 'header',
    type: 'search',
    placeholder: 'Найти',
    value: '',
  });
  private search = new Button({ className: 'header__search', ariaLabel: 'Поиск', parent: this.controls.node });
  private cart = new Button({
    className: 'header__cart',
    onclick: () => {
      window.location.hash = '#cart';
    },
    ariaLabel: 'Перейти в корзину',
    parent: this.controls.node,
  });
  private cartCount = new BaseComponent({
    tag: 'span',
    className: 'header__count',
    text: `${DB.cart.sumQuantity}`,
    parent: this.cart.node,
  });
  private cartPrice = new BaseComponent({
    tag: 'span',
    className: 'header__price',
    text: `${DB.cart.sumPrice}`,
    parent: this.controls.node,
  });

  constructor() {
    super({ tag: 'header', className: 'header' });
    const searchParam = DB.filter.params.get('search');
    if (searchParam) {
      this.searchField.getInputNode().classList.toggle('header__input_is-open');
      this.searchField.getInputNode().value = `${[...searchParam]}`;
      this.controls.node.prepend(this.searchField.node);
    }
    this.search.node.addEventListener('click', () => {
      if (this.searchField.getInputNode().classList.contains('header__input_is-open')) this.searchField.destroy();
      else this.controls.node.prepend(this.searchField.node);
      this.searchField.getInputNode().classList.toggle('header__input_is-open');
    });
    this.burger.node.onclick = () => {
      this.controls.node.classList.toggle('header__controls_is-open');
      this.burger.node.classList.toggle('burger_is-open');
    };
    this.wrapper.appendEl(this.burger);
    this.controls.node.prepend(this.searchField.node);

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
