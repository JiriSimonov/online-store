import { Keyboard } from '../../services/db/keyboard';
import { Button } from '../elements/button-component';
import { Component } from '../elements/base-component';
import { ProductModal } from './product-modal';

export class ThumbNails extends Component {
  private thumbnailList: Component[];

  constructor(keyboard: Keyboard) {
    super({ tag: 'ul', className: 'thumbnails' });
    this.thumbnailList = keyboard.images.map((image) => {
      const item = new Component({ tag: 'li', className: 'thumbnails__item', parent: this.node });
      const modal = new ProductModal(`url('assets/images/keyboards/${image}.webp')`);
      const button = new Button({
        parent: item,
        className: 'thumbnails__button',
        style: { backgroundImage: `url('assets/images/keyboards/${image}.webp')` } as CSSStyleDeclaration,
        onclick: () => {
          item.append(modal);
          window.scrollTo(0, 0);
        },
      });
      item.append(button.node);
      return item;
    });
  }
}
