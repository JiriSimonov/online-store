import BaseComponent from '../elements/base-component';

export default class Filter extends BaseComponent {
  private filterTitle: BaseComponent;

  constructor(title: string) {
    super({ tag: 'li', className: 'filter__item' });
    this.filterTitle = new BaseComponent({ tag: 'h2', className: 'filter__title', text: title });
    this.appendEl(this.filterTitle);
  }
}
