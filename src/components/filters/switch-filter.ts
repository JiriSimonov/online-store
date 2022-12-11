import Filter from './filter';
import SwitchComponent from '../switches/switch-component';
import BaseComponent from '../elements/base-component';
import SwitchModal from '../switches/switch-modal';
import { getAllSwitchesList } from '../../utils/get-keyboards-data';
import { SwitchProps } from '../../interfaces/interfaces';
import Button from '../elements/button';

const switchesList: SwitchProps[] = getAllSwitchesList();

export default class SwitchFilter extends Filter {
  private switchWrapper: BaseComponent;

  private buttonWrapper: BaseComponent;

  private cherry: Button;

  private gateron: Button;

  private varmilo: Button;

  private keychron: Button;

  private kailh: Button;

  private ttc: Button;

  private topre: Button;

  private akko: Button;

  private modalWrapper: BaseComponent | null | undefined;

  private switchModal: SwitchModal | null | undefined;

  constructor() {
    super('Переключатели');

    this.buttonWrapper = new BaseComponent({ className: 'filter__wrapper', parent: this.node });
    this.switchWrapper = new BaseComponent({ tag: 'ul', className: 'switch', parent: this.node });
    this.cherry = new Button({ className: 'filter__btn', text: 'Cherry', parent: this.buttonWrapper.getNode() });
    this.gateron = new Button({ className: 'filter__btn', text: 'Gateron', parent: this.buttonWrapper.getNode() });
    this.varmilo = new Button({ className: 'filter__btn', text: 'Varmilo', parent: this.buttonWrapper.getNode() });
    this.keychron = new Button({ className: 'filter__btn', text: 'Keychron', parent: this.buttonWrapper.getNode() });
    this.kailh = new Button({ className: 'filter__btn', text: 'Kailh', parent: this.buttonWrapper.getNode() });
    this.ttc = new Button({ className: 'filter__btn', text: 'TTC', parent: this.buttonWrapper.getNode() });
    this.topre = new Button({ className: 'filter__btn', text: 'Topre', parent: this.buttonWrapper.getNode() });
    this.akko = new Button({ className: 'filter__btn', text: 'Akko', parent: this.buttonWrapper.getNode() });
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
