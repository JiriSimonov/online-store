import Anchor from './anchor';
import BaseComponent from './base-component';
import Button from './button';

export default class Header extends BaseComponent {
  private container: BaseComponent;

  private logo: BaseComponent;

  private wrapper: BaseComponent;

  private controls: BaseComponent;

  private search: BaseComponent;

  private cart: BaseComponent;

  constructor() {
    super({ tag: 'header', className: 'header' });
    this.container = new BaseComponent({ className: 'container' });
    this.wrapper = new BaseComponent({ className: 'header__wrapper' });
    this.controls = new BaseComponent({ className: 'header__controls' });
    this.logo = new Anchor({ className: 'header__logo', text: 'Keyboards Store', href: './' });
    this.search = new BaseComponent({ tag: 'button', className: 'header__search' });
    this.cart = new Button({
      tag: 'button',
      className: 'header__cart',
      onclick: () => {
        window.location.hash = '#cart';
      },
    });
  }

  render() {
    this.appendEl(this.container);
    this.container.appendEl(this.wrapper);
    this.wrapper.appendEl([this.logo, this.controls]);
    this.controls.appendEl([this.search, this.cart]);
  }
}
