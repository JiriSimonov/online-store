import Filter from './filter';
import SwitchComponent from '../switches/switch-component';
import BaseComponent from '../elements/base-component';
import SwitchModal from '../switches/switch-modal';
import Button from '../elements/button';
import ProductsListState from '../../states/goods-state';
import { DB } from '../../services/db/Database';

// TODO 🌼 расхардкодить
const switchBtns = ['Cherry', 'Gateron', 'Varmilo', 'Keychron', 'Kailh', 'TTC', 'Topre', 'Akko'];

export default class SwitchFilter extends Filter {
  private switchWrapper: BaseComponent;

  private buttonWrapper: BaseComponent;

  private switchButtons: Button[];

  switchArr: SwitchComponent[];

  private modalWrapper: BaseComponent | null | undefined;

  private switchModal: SwitchModal | null | undefined;

  constructor(private productsState: ProductsListState) {
    super('Переключатели');
    this.buttonWrapper = new BaseComponent({ className: 'filter__wrapper', parent: this.node });
    this.switchWrapper = new BaseComponent({ tag: 'ul', className: 'switch', parent: this.node });
    this.switchButtons = switchBtns.map((item) => new Button({ className: 'filter__btn', text: item, parent: this.buttonWrapper.getNode() }));
    this.switchButtons.map((item) => item.getNode().addEventListener('click', () => {
      this.switchButtons.map((elem) => elem.getNode().classList.remove('active'));
      item.getNode().classList.add('active');
      productsState.set({ manufacturer: item.getNode().textContent as string });
    }));
    this.switchArr = DB.switches.map((item) => new SwitchComponent(item));
    this.switchWrapper.appendEl(this.switchArr);
    this.switchArr.map((item) => item.getNode().addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains('switch__item')) {
        productsState.set({ switchType: target.textContent as string });
      } // TODO REFACTOR
    }));
    // this.switchWrapper.getNode().addEventListener('mouseover', (e) => {
    //   const target = e.target as HTMLElement;
    //   if (target.classList.contains('switch__item')) {
    //     target.setAttribute('id', 'open');
    //     this.modalWrapper = new BaseComponent({ className: 'switch__modal' });
    //     this.switchModal
    //= new SwitchModal(target.textContent || '', !target.classList.contains('switch__item_false'));
    //     target.append(this.modalWrapper.getNode());
    //     this.modalWrapper.appendEl(this.switchModal);
    //     target.addEventListener('mouseout', () => {
    //       target.removeAttribute('id');
    //       this.modalWrapper?.destroy();
    //       this.modalWrapper = null;
    //       this.switchModal?.destroy();
    //       this.switchModal = null;
    //     });
    //   }
    // }); // TODO модалка перебивает свич и не дает зацепить нужный элемент
  }
}
