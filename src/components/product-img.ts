import BaseComponent from './base-component';

export default class ProductImage extends BaseComponent {
  private left: BaseComponent;

  private mid: BaseComponent;

  private right: BaseComponent;

  constructor() {
    super({ className: 'store__img' });
    this.left = new BaseComponent({ className: 'store__img store__img_left' });
    this.mid = new BaseComponent({ className: 'store__img store__img_mid' });
    this.right = new BaseComponent({ className: 'store__img store__img_right' });
    this.appendEl([this.left, this.mid, this.right]);
  }
}
