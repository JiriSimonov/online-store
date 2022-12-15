import BaseComponent from '../elements/base-component';
import Button from '../elements/button';

export default class Cart extends BaseComponent {
  private container: BaseComponent;

  private wrapper: BaseComponent;

  private cartButton: Button;

  constructor() {
    super({ tag: 'section', className: 'cart' });
    this.container = new BaseComponent({ className: 'container' });
    this.wrapper = new BaseComponent({ className: 'cart__wrapper' });
    this.cartButton = new Button({
      className: 'cart__btn',
      onclick: () => {
        window.location.hash = '#store';
      },
      text: 'Продолжить покупки',
    });
    this.appendEl(this.container);
    this.container.appendEl(this.wrapper);
    this.wrapper.appendEl(this.cartButton);
  }
}
