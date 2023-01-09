import { SwitchComponent } from '../switches/switch-component';
import { FormField } from '../elements/form-field';
import { Component } from '../elements/base-component';
import { DB } from '../../services/db/database';
import { Heading } from '../elements/heading-component';
import { FilterCategory } from '../../interfaces/enums';

export class Filter extends Component {
  private filterTitle: Component;

  constructor(title: string) {
    super({ tag: 'li', className: 'filter__item' });
    this.filterTitle = new Heading({ className: 'filter__title', textContent: title });
    this.append(this.filterTitle);
  }

  static uncheckAll(...elements: (FormField | SwitchComponent)[]) {
    elements.flat().forEach((element) => Object.assign(element, { checked: false }));
  }
  static updateChecks(category: FilterCategory, ...elements: (FormField | SwitchComponent)[]) {
    const params = DB.filter.params.get(category);
    if (params) {
      elements.flat().forEach((element) => Object.assign(element, { checked: params.has(element.input.value) }));
    } else {
      this.uncheckAll(...elements);
    }
  }

  static getHeadTail(category: FilterCategory, value: string) {
    return `${this.getHead(category, value)}/${this.getTail(category, value)}`;
  }
  static getHead(category: FilterCategory, value: string) {
    return DB.filter.getSearchSample(category, value, DB.filter.list).length;
  }
  static getTail(category: FilterCategory, value: string) {
    return DB.filter.getSearchSample(category, value, DB.keyboards).length;
  }
}
