import { BaseComponent } from '../elements/base-component';
import { Filter } from './filter';
import { DB } from '../../services/db/database';
import { FormField } from '../elements/form-field';

export class BrandFilter extends Filter {
  private filterWrapper = new BaseComponent({ className: 'filter__wrapper', parent: this.node });

  private brands = [...DB.getVariants('brand')]
  .map((item) =>
    new FormField({
      className: 'filter',
      type: 'checkbox',
      text: item,
      value: item,
      checked: DB.filter.params.get('brand')?.has(item),
    }));

  constructor() {
    super('Бренды');
    this.brands.forEach((item) => {
      item.getInputNode().addEventListener('change', (e) => {
        const { target } = e;
        if (target && target instanceof HTMLInputElement) 
          if (target.checked) DB.filter.add('brand', target.value);
          else DB.filter.remove('brand', target.value);
      });
    })
    this.filterWrapper.appendEl(this.brands);
  }

  getInputs() {
    return this.brands;
  }
}
