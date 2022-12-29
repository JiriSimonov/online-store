import { BaseComponent } from '../elements/base-component';
import { Filter } from './filter';
import { FormField } from '../elements/form-field';
import { DB } from '../../services/db/database';
import { FilterCategory } from '../../interfaces/enums';

export class SizeFilter extends Filter {
  private category: keyof typeof FilterCategory = 'size';
  private filterWrapper = new BaseComponent({ className: 'filter__wrapper', parent: this.node });

  private size = [...DB.getVariants(this.category)]
    .filter((elem) => elem)
    .sort((a, b) => +b.slice(0, -1) - +a.slice(0, -1))
    .map(
      (item) =>
        new FormField({
          className: 'filter',
          type: 'checkbox',
          text: item,
          name: this.category,
          value: item,
          checked: DB.filter.params.get(this.category)?.has(item),
        }),
    );

  constructor() {
    super('Размер');
    this.size.forEach((item) => {
      item.getInputNode().addEventListener('change', (e) => {
        const { target } = e;
        if (target && target instanceof HTMLInputElement)
          if (target.checked) DB.filter.add(this.category, target.value);
          else DB.filter.remove(this.category, target.value);
      });
    });
    this.filterWrapper.appendEl(this.size);
  }

  getInputs() {
    return this.size;
  }
}
