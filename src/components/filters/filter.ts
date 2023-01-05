import { SwitchComponent } from '../switches/switch-component';
import { FormField } from '../elements/form-field';
import { Component } from '../elements/base-component';
import { DB } from '../../services/db/database';

export class Filter extends Component {
  private filterTitle: Component;

  constructor(title: string) {
    super({ tag: 'li', className: 'filter__item' });
    this.filterTitle = new Component({ tag: 'h2', className: 'filter__title', textContent: title });
    this.append(this.filterTitle);
  }

  static uncheckAll(...elements: (FormField | SwitchComponent)[]) {
    elements.flat().forEach((item) => Object.assign(item, { checked: false }));
  }

  //?
  static getHeadTail(category: string, value: string) {
    return `${this.getHead(category, value)}/${this.getTail(category, value)}`;
  }
  static getHead(category: string, value: string) {
    return DB.filter.getSearchSample(category, value, DB.filter.list).length;
  }
  static getTail(category: string, value: string) {
    return DB.filter.getSearchSample(category, value, DB.keyboards).length;
  }
}
