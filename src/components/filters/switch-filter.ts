import Filter from './filter';
import SwitchComponent from '../switches/switch-component';
import BaseComponent from '../elements/base-component';
import SwitchModal from '../switches/switch-modal';
import { getAllSwitchesList } from '../../utils/get-keyboards-data';
import { SwitchProps } from '../../interfaces/interfaces';

const switchesList: SwitchProps[] = getAllSwitchesList();

export default class SwitchFilter extends Filter {
  private switchWrapper: BaseComponent;

  private switchModal: SwitchModal | null | undefined;

  constructor() {
    super('Переключатели');
    this.switchWrapper = new BaseComponent({ className: 'switch', parent: this.node });
    this.switchWrapper.appendEl(switchesList.map((item) => new SwitchComponent(item)));
    // this.switchWrapper.getNode().addEventListener('mouseover', (e) => {
    //   const target = e.target as HTMLElement;
    //   if (target.classList.contains('switch__item')) {
    //     this.switchModal =
    // new SwitchModal(target.textContent || '', !target.classList.contains('switch__item_false'));
    //     this.switchWrapper.appendEl(this.switchModal);
    //     target.addEventListener('mouseout', () => {
    //       this.switchModal?.destroy();
    //       this.switchModal = null;
    //     });
    //   }
    // });
  }
}
