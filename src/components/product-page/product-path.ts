import { Component } from '../elements/base-component';

export class ProductPath extends Component {
  private store = new Component({
    tag: 'li',
    className: 'product__path-item',
    textContent: 'store',
    parent: this,
    onclick: () => {
      window.location.hash = '/store';
    },
  });
  private brands = new Component({ tag: 'li', className: 'product__path-item', textContent: 'бренды', parent: this });
  private product = new Component({ tag: 'li', className: 'product__path-item', parent: this });

  constructor(productName: string) {
    super({ tag: 'ul', className: 'product__path' });
    this.product.text = productName;
  }
}
