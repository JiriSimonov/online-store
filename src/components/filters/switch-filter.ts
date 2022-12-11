import Filter from './filter';
import SwitchComponent from '../switches/switch-component';
import BaseComponent from '../elements/base-component';
import SwitchModal from '../switches/switch-modal';
import { getAllSwitchesList } from '../../utils/get-keyboards-data';
import { SwitchProps } from '../../interfaces/interfaces';

const switchesList: SwitchProps[] = getAllSwitchesList();

export default class SwitchFilter extends Filter {
  private switchWrapper: BaseComponent;

  private modalWrapper: BaseComponent | null | undefined;

  private switchModal: SwitchModal | null | undefined;

  constructor() {
    super('Переключатели');
    this.switchWrapper = new BaseComponent({ tag: 'ul', className: 'switch', parent: this.node });
    this.switchWrapper.appendEl(switchesList.map((item) => new SwitchComponent(item)));
    this.switchWrapper.getNode().addEventListener('mouseover', (e) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains('switch__item')) {
        target.setAttribute('id', 'open');
        this.modalWrapper = new BaseComponent({ className: 'switch__modal' });
        this.switchModal = new SwitchModal(target.textContent || '', !target.classList.contains('switch__item_false'));
        target.append(this.modalWrapper.getNode());
        this.modalWrapper.appendEl(this.switchModal);
        target.addEventListener('mouseout', () => {
          target.removeAttribute('id');
          this.modalWrapper?.destroy();
          this.modalWrapper = null;
          this.switchModal?.destroy();
          this.switchModal = null;
        });
      }
    });
  }
}
