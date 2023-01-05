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
  private wrapper = new BaseComponent({ className: 'header__wrapper', parent: this.container.getNode() });
  private logo = new Anchor({ className: 'header__logo', text: 'Keyboards Store', parent: this.wrapper.getNode() });
  private controls = new BaseComponent({ className: 'header__controls', parent: this.wrapper.getNode() });
  private burger = new Burger();
  private searchField = new FormField({
    className: 'header',
    type: 'search',
    placeholder: 'Найти',
    value: '',
  });
  private search = new Button({ className: 'header__search', aria: 'Поиск', parent: this.controls.getNode() });
  private cart = new Button({
    className: 'header__cart',
    onclick: () => {
      window.location.hash = '#cart';
    },
    aria: 'Перейти в корзину',
    parent: this.controls.getNode(),
  });
  private cartCount = new BaseComponent({
    tag: 'span',
    className: 'header__count',
    text: `${DB.cart.sumQuantity}`,
    parent: this.cart.getNode(),
  });
  private cartPrice = new BaseComponent({
    tag: 'span',
    className: 'header__price',
    text: `${DB.cart.sumPrice}`,
    parent: this.controls.getNode(),
  });

  constructor() {
    super({ tag: 'header', className: 'header' });
    const searchParam = DB.filter.params.get('search');
    if (searchParam) {
      this.searchField.getInputNode().classList.toggle('header__input_is-open');
      this.searchField.getInputNode().value = `${[...searchParam]}`;
      this.controls.getNode().prepend(this.searchField.getNode());
    }
    this.search.getNode().addEventListener('click', () => {
      if (this.searchField.getInputNode().classList.contains('header__input_is-open')) this.searchField.destroy();
      else this.controls.getNode().prepend(this.searchField.getNode());
      this.searchField.getInputNode().classList.toggle('header__input_is-open');
    });
    this.logo.getNode().onclick = () => {
      window.location.hash = '#home';
      this.searchField.getInputNode().classList.remove('header__input_is-open');
      this.searchField.destroy();
    };
    this.burger.getNode().onclick = () => {
      this.controls.getNode().classList.toggle('header__controls_is-open');
      this.burger.getNode().classList.toggle('burger_is-open');
    };
    this.wrapper.appendEl(this.burger);
    this.controls.getNode().prepend(this.searchField.getNode());

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
