import { Keyboard } from '../../services/db/keyboard';
import { BaseComponent } from '../elements/base-component';

export class ThumbNails extends BaseComponent {
  private thumbnailList: BaseComponent[];

  constructor(keyboard: Keyboard) {
    super({ tag: 'ul', className: 'thumbnails' });
    this.thumbnailList = keyboard.images.map((image) => {
      const item = new BaseComponent({ tag: 'li', className: 'thumbnails__item', parent: this.node });
      item.setStyleAttr(['backgroundImage', `url('assets/images/keyboards/${image}.webp')`]);
      item.getNode().addEventListener('click', () => item.getNode().classList.toggle('is-selected'));
      return item;
  });
  }
}
