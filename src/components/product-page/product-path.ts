import { Emitter } from '../../services/emitter';
import { Component } from '../elements/base-component';
import { DB } from '../../services/db/database';
import { Keyboard } from '../../services/db/keyboard';

export class ProductPath extends Component {
  private store = new Component({
    tag: 'li',
    className: 'product__path-item',
    textContent: 'Клавиатуры',
    parent: this,
    onclick: () => {
      window.location.hash = '/store';
    },
  });
  private brands = new Component({
    tag: 'li',
    className: 'product__path-item',
    onclick: () => {
      window.location.hash = '/store';
    },
    parent: this,
  });
  private product = new Component({ tag: 'li', className: 'product__path-item', parent: this });

  constructor(productProps: Keyboard) {
    super({ tag: 'ul', className: 'product__path' });
    [this.brands.text] = productProps.manufacturer;
    if (!productProps.manufacturer.length) {
      this.brands.text = 'Brand';
    }
    this.product.text = productProps.title;
  }
}
