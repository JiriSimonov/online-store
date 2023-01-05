import { Component } from '../elements/base-component';

export class ProductPath extends Component {
  private store: Component;

  private brands: Component;

  private product: Component;

  constructor(productName: string) {
    super({ tag: 'ul', className: 'product__path' });
    this.store = new Component({
      tag: 'li',
      className: 'product__path-item',
      textContent: 'store',
      parent: this.node,
    });
    this.store.node.onclick = () => {
      window.location.hash = '#store';
    };
    this.brands = new Component({
      tag: 'li',
      className: 'product__path-item',
      textContent: 'бренды',
      parent: this.node,
    });
    this.product = new Component({
      tag: 'li',
      className: 'product__path-item',
      textContent: productName,
      parent: this.node,
    });
  }
}
