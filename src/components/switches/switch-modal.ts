import { KeyboardSwitch } from '../../services/db/keyboard-switch';
import { BaseComponent } from '../elements/base-component';

export class SwitchModal extends BaseComponent {
  private modalTitle: BaseComponent;

  private modalAvialable: BaseComponent;

  private modalInfo: BaseComponent;

  private modalDescription: BaseComponent;

  private modalImg: BaseComponent;

  private modalStats: BaseComponent[];

  constructor(id: string, isAvialable: boolean) {
    super({ className: 'modal' });
    this.modalTitle = new BaseComponent({
      tag: 'h2',
      className: 'modal__title',
      parent: this.node,
      text: KeyboardSwitch.getDescription(id, 'title') as string,
    });

    this.modalAvialable = new BaseComponent({
      className: `${isAvialable ? 'store__card-av store__card-av_true' : 'store__card-av store__card-av_false'}`,
      text: `${isAvialable ? 'В наличии' : 'Нет в наличии'}`,
      parent: this.node,
    });
    this.modalInfo = new BaseComponent({
      className: 'modal__info',
      parent: this.node,
    });
    this.modalImg = new BaseComponent({
      className: 'modal__img',
      parent: this.modalInfo.node,
    });
    this.modalImg.node.style.backgroundImage = `url('assets/images/switches/${id}.webp')`;

    this.modalStats = (KeyboardSwitch.getDescription(id, 'props') as string[]).map(
      (item) =>
        new BaseComponent({
          className: 'modal__stats',
          text: item,
          parent: this.modalInfo.node,
        }),
    );
    this.modalDescription = new BaseComponent({
      tag: 'p',
      className: 'modal__description',
      parent: this.node,
      text: KeyboardSwitch.getDescription(id, 'description') as string,
    });
  }
}
