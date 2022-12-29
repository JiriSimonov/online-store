import { SwitchComponent } from '../switches/switch-component';
import { FormField } from '../elements/form-field';
import { BaseComponent } from '../elements/base-component';
import { Filter as DBFilter } from '../../services/db/filter';
import { DB } from '../../services/db/database';

export class Filter extends BaseComponent {
  private filterTitle: BaseComponent;

  protected container: BaseComponent;

  constructor(title: string) {
    super({ tag: 'li', className: 'filter__item' });
    this.filterTitle = new BaseComponent({ tag: 'h2', className: 'filter__title', text: title });
    this.container = new BaseComponent({ className: 'filter__container' });
    this.appendEl([this.filterTitle, this.container]);
  }

  static uncheckAll(...elements: (FormField | SwitchComponent)[]) {
    elements.flat().forEach((item) => Object.assign(item, { checked: false }));
  }

  //?
  static getHeadTail(category: string, value: string) {
    return `${this.getHead(category, value)}/${this.getTail(category, value)}`;
  }
  static getHead(category: string, value: string) {
    return DBFilter.getSearchSample(category, value, DB.filter.list).length;
  }
  static getTail(category: string, value: string) {
    return DBFilter.getSearchSample(category, value, DB.keyboards).length;
  }
}
