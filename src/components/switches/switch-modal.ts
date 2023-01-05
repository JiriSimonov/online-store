import { KeyboardSwitch } from '../../services/db/keyboard-switch';
import { Component } from '../elements/base-component';
import { Heading } from '../elements/heading-component';

export class SwitchModal extends Component {
  private modalTitle: Component;

  private modalAvialable: Component;

  private modalInfo: Component;

  private modalDescription: Component;

  private modalImg: Component;

  private modalStats: Component[];

  constructor(id: string, isAvialable: boolean) {
    super({ className: 'modal' });
    this.modalTitle = new Heading({
      className: 'modal__title',
      parent: this,
      textContent: KeyboardSwitch.getDescription(id, 'title') as string,
    });

    this.modalAvialable = new Component({
      className: `${isAvialable ? 'store__card-av store__card-av_true' : 'store__card-av store__card-av_false'}`,
      textContent: `${isAvialable ? 'В наличии' : 'Нет в наличии'}`,
      parent: this.node,
    });
    this.modalInfo = new Component({
      className: 'modal__info',
      parent: this.node,
    });
    this.modalImg = new Component({
      className: 'modal__img',
      parent: this.modalInfo.node,
    });
    this.modalImg.node.style.backgroundImage = `url('assets/images/switches/${id}.webp')`;

    this.modalStats = (KeyboardSwitch.getDescription(id, 'props') as string[]).map(
      (item) =>
        new Component({
          className: 'modal__stats',
          textContent: item,
          parent: this.modalInfo.node,
        }),
    );
    this.modalDescription = new Component({
      tag: 'p',
      className: 'modal__description',
      parent: this.node,
      textContent: KeyboardSwitch.getDescription(id, 'description') as string,
    });
  }
}
