import BaseComponent from '../elements/base-component';
import Filter from './filter';
import Button from '../elements/button';

export default class AvFilter extends Filter {
  private filterWrapper: BaseComponent;

  private all: Button;

  private inStock: Button;

  private notAvailable: Button;

  constructor() {
    super('Наличие');
    this.filterWrapper = new BaseComponent({ className: 'filter__wrapper', parent: this.node });
    this.all = new Button({ className: 'filter__btn active', text: 'Всё', parent: this.filterWrapper.getNode() });
    this.inStock = new Button({ className: 'filter__btn', text: 'В наличии', parent: this.filterWrapper.getNode() });
    this.notAvailable = new Button({ className: 'filter__btn', text: 'Нет в наличии', parent: this.filterWrapper.getNode() });
  }
}
