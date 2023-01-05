import { Keyboard } from '../../services/db/keyboard';
import { Button } from '../elements/button';
import { BaseComponent } from '../elements/base-component';
import { ProductModal } from './product-modal';

export class ThumbNails extends BaseComponent {
  private thumbnailList: BaseComponent[];

  constructor(keyboard: Keyboard) {
    super({ tag: 'ul', className: 'thumbnails' });
    this.thumbnailList = keyboard.images.map((image) => {
      const item = new BaseComponent({ tag: 'li', className: 'thumbnails__item', parent: this.node });
      const button = new Button({ className: 'thumbnails__button' });
      button.setStyleAttr(['backgroundImage', `url('assets/images/keyboards/${image}.webp')`]);
      const modal = new ProductModal(`url('assets/images/keyboards/${image}.webp')`);
      button.getNode().addEventListener('click', () => {
        item.appendEl(modal);
        window.scrollTo(0,0);
      });
      item.appendEl(button);
      return item;
  });
  }
}
