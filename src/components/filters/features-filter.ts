import BaseComponent from '../elements/base-component';
import Filter from './filter';
import Button from '../elements/button';

export default class FeaturesFilter extends Filter {
  private filterWrapper: BaseComponent;

  private ru: Button;

  private prog: Button;

  private light: Button;

  private hotswap: Button;

  private multi: Button;

  private formac: Button;

  private bezprovodov: Button;

  private ergo: Button;

  constructor() {
    super('Наличие');
    this.filterWrapper = new BaseComponent({ className: 'filter__wrapper', parent: this.node });
    this.ru = new Button({ className: 'filter__btn', text: 'С русскими буквами', parent: this.filterWrapper.getNode() });
    this.prog = new Button({ className: 'filter__btn', text: 'Программируемая', parent: this.filterWrapper.getNode() });
    this.light = new Button({ className: 'filter__btn', text: 'С подсветкой', parent: this.filterWrapper.getNode() });
    this.hotswap = new Button({ className: 'filter__btn', text: 'HOT-SWAP', parent: this.filterWrapper.getNode() });
    this.multi = new Button({ className: 'filter__btn', text: 'Мультимедиа-клавиши', parent: this.filterWrapper.getNode() });
    this.formac = new Button({ className: 'filter__btn', text: 'Специально под Mac', parent: this.filterWrapper.getNode() });
    this.bezprovodov = new Button({ className: 'filter__btn', text: 'Беспроводная', parent: this.filterWrapper.getNode() });
    this.ergo = new Button({ className: 'filter__btn', text: 'Эргономическая', parent: this.filterWrapper.getNode() });
  }
}
