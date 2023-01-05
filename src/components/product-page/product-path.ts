import { BaseComponent } from '../elements/base-component';

export class ProductPath extends BaseComponent {
  private store: BaseComponent;

  private brands: BaseComponent;

  private product: BaseComponent;

  constructor(productName: string) {
    super({ tag: 'ul', className: 'product__path' });
    this.store = new BaseComponent({ tag: 'li', className: 'product__path-item', text: 'store', parent: this.node });
    this.store.node.onclick = () => {
      window.location.hash = '#store';
    };
    this.brands = new BaseComponent({ tag: 'li', className: 'product__path-item', text: 'бренды', parent: this.node });
    this.product = new BaseComponent({
      tag: 'li',
      className: 'product__path-item',
      text: productName,
      parent: this.node,
    });
  }
}
