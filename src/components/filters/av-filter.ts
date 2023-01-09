import { FormField } from '../elements/form-field';
import { DB } from '../../services/db/database';
import { Component } from '../elements/base-component';
import { Filter } from './filter';
import { FilterCategory } from '../../interfaces/enums';

export class AvFilter extends Filter {
  public category = FilterCategory.available;
  private filterWrapper = new Component({ className: 'filter__wrapper', parent: this });
  private items = [...DB.getVariants(this.category)].map(
    (item, index) =>
      new FormField({
        className: 'filter',
        type: 'radio',
        name: this.category,
        textContent: item === 'true' ? 'В наличии' : 'Всё',
        value: item,
        checked: index ? DB.filter.params.has(this.category) : true,
      }),
  );

  constructor() {
    super('Наличие');
    this.filterWrapper.append(...this.items);
    this.items.forEach((item) => {
      item.input.addEventListener('change', (e) => {
        const { target } = e;
        if (target && target instanceof HTMLInputElement) {
          if (target.value === 'true') {
            DB.filter.add(this.category, target.value);
          } else {
            DB.filter.clear(this.category);
          }
        }
      });
    });
  }

  get inputs() {
    return this.items;
  }
}
