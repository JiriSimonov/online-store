import { Keyboard } from '../../services/db/keyboard';
import { KeyboardSwitch } from '../../services/db/keyboard-switch';
import { Component } from '../elements/base-component';
import { Heading } from '../elements/heading-component';

export class SwitchModal extends Component {
  private modalTitle = new Heading({
    className: 'modal__title',
    parent: this,
    textContent: KeyboardSwitch.getDescription(this.id, 'title') as string,
  });
  private modalAvialable = new Component({
    className: `${this.isAvialable ? 'store__card-av store__card-av_true' : 'store__card-av store__card-av_false'}`,
    textContent: `${this.isAvialable
      ? `В наличии ${this.keyboard?.getSwitch(this.id).quantity} шт.`
      : 'Нет в наличии'}`,
    parent: this,
  });
  private modalInfo = new Component({ className: 'modal__info', parent: this });
  private modalImg = new Component({
    className: 'modal__img',
    parent: this.modalInfo });
  private modalStats = (KeyboardSwitch.getDescription(this.id, 'props') as string[]).map(
    (item) => new Component({ className: 'modal__stats', textContent: item, parent: this.modalInfo }),
  );
  private modalDescription = new Component({
    tag: 'p', 
    className: 'modal__description',
    parent: this,
    textContent: KeyboardSwitch.getDescription(this.id, 'description') as string,
  });

  constructor(private id: string, private isAvialable: boolean, private keyboard?: Keyboard) {
    super({ className: 'modal' });
    this.modalImg.style.backgroundImage = `url('assets/images/switches/${id}.webp')`;
  }
}
