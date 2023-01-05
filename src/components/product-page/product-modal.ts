import { Component } from '../elements/base-component';
import { Button } from '../elements/button-component';

export class ProductModal extends Component {
  private modalContent = new Component({ className: 'product__content', parent: this.node });
  private closeModal = new Button({
    className: 'modal__close',
    onclick: () => {
      this.destroy();
      window.scrollTo(0, 0);
    },
    parent: this.node,
  });

  constructor(bg: string) {
    super({ className: 'product__modal' });
    this.modalContent.style.backgroundImage = bg;
    this.node.onclick = () => {
      this.destroy();
      window.scrollTo(0, 0);
    };
  }
}
