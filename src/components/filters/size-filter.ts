import { Component } from '../elements/base-component';
import { Filter } from './filter';
import { FormField } from '../elements/form-field';
import { DB } from '../../services/db/database';
import { FilterCategory } from '../../interfaces/enums';

export class SizeFilter extends Filter {
  public category= FilterCategory.size;
  private filterWrapper = new Component({ className: 'filter__wrapper', parent: this });

  private size = [...DB.getVariants(this.category)]
    .filter((elem) => elem)
    .sort((a, b) => +b.slice(0, -1) - +a.slice(0, -1))
    .map(
      (item) =>
        new FormField({
          className: 'filter',
          type: 'checkbox',
          textContent: item,
          name: this.category,
          value: item,
          checked: DB.filter.params.get(this.category)?.has(item),
        }),
    );

  constructor() {
    super('Размер');
    this.size.forEach((item) => {
      item.input.addEventListener('change', (e) => {
        const { target } = e;
        if (target && target instanceof HTMLInputElement)
          {if (target.checked) {DB.filter.add(this.category, target.value);}
          else {DB.filter.remove(this.category, target.value);}}
      });
    });
    this.filterWrapper.append(...this.size);
  }

  get inputs() {
    return this.size;
  }
}
