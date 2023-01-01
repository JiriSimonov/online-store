import { BaseComponent } from '../elements/base-component';
import { Button } from '../elements/button';

export class ProductModal extends BaseComponent {
  private modalContent = new BaseComponent({ className: 'product__content', parent: this.node });
  private closeModal = new Button({ className: 'modal__close', onclick: () => this.destroy(), parent: this.node });

  constructor(bg: string) {
    super({ className: 'product__modal' });
    this.modalContent.setStyleAttr(['backgroundImage', bg]);
    this.node.onclick = () => this.destroy();
  }
}
