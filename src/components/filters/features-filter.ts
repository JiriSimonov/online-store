import { Component } from '../elements/base-component';
import { Filter } from './filter';
import { FormField } from '../elements/form-field';
import { DB } from '../../services/db/database';
import { FilterCategory } from '../../interfaces/enums';

export class FeaturesFilter extends Filter {
  private category: keyof typeof FilterCategory = 'features';
  private filterWrapper = new Component({ className: 'filter__wrapper', parent: this });

  private features = [...DB.getVariants(this.category)].map(
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
    super('Фичи');
    this.features.forEach((item) => {
      item.getInputNode().addEventListener('change', (e) => {
        const { target } = e;
        if (target && target instanceof HTMLInputElement)
          if (target.checked) DB.filter.add(this.category, target.value);
          else DB.filter.remove(this.category, target.value);
      });
    });
    this.filterWrapper.append(...this.features);
  }

  getInputs() {
    return this.features;
  }
}
