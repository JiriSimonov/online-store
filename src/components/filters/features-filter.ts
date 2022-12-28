import { BaseComponent } from '../elements/base-component';
import { Filter } from './filter';
import { FormField } from '../elements/form-field';
import { DB } from '../../services/db/database';

export class FeaturesFilter extends Filter {
  private filterWrapper = new BaseComponent({ className: 'filter__wrapper', parent: this.node });

  private features = [...DB.getVariants('features')]
  .map((item) =>
    new FormField({
      className: 'filter',
      type: 'checkbox',
      text: item,
      value: item,
      checked: DB.filter.params.get('features')?.has(item),
    }));

  constructor() {
    super('Фичи');
    this.features.forEach((item) => {
      item.getInputNode().addEventListener('change', (e) => {
        const { target } = e;
        if (target && target instanceof HTMLInputElement) 
          if (target.checked) DB.filter.add('features', target.value);
          else DB.filter.remove('features', target.value);
      });
    })
    this.filterWrapper.appendEl(this.features);
  }

  getInputs() {
    return this.features;
  }
}
