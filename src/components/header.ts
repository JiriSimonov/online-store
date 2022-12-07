import Anchor from './elements/anchor';
import BaseComponent from './elements/base-component';
import Button from './elements/button';
import Input from './elements/input';

export default class Header extends BaseComponent {
  private container: BaseComponent;

  private logo: BaseComponent;

  private wrapper: BaseComponent;

  private controls: BaseComponent;

  private search: BaseComponent;

  private cart: BaseComponent;

  private cartCount: BaseComponent;

  private searchInput: Input;

  constructor() {
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
    this.cartCount = new BaseComponent({ className: 'cart__count' });
    this.searchInput = new Input({ className: 'header__input' });
    this.search.getNode().addEventListener('click', () => {
      this.searchInput.getNode().classList.toggle('header__input_is-open');
    });
  }

  render() {
    this.appendEl(this.container);
    this.container.appendEl(this.wrapper);
    this.wrapper.appendEl([this.logo, this.controls]);
    this.controls.appendEl([this.searchInput, this.search, this.cart, this.cartCount]);
  }
}
