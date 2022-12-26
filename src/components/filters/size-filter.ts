import { BaseComponent } from '../elements/base-component';
import { Filter } from './filter';
import { FormField } from '../elements/form-field';
import { DB } from '../../services/db/database';

export class SizeFilter extends Filter {
  private filterWrapper = new BaseComponent({ className: 'filter__wrapper', parent: this.node });

  private size = [...DB.getVariants('size')]
  .filter((elem) => elem)
  .map((item) =>
    new FormField({
      className: 'filter',
      type: 'checkbox',
      text: item,
      value: item,
    }));

  constructor() {
    super('Размер');
    this.size.forEach((item) => {
      item.getInputNode().addEventListener('change', (e) => {
        const { target } = e;
        if (target && target instanceof HTMLInputElement) 
          if (target.checked) DB.filter.add('size', target.value);
          else DB.filter.remove('size', target.value);
      });
    })
    this.filterWrapper.appendEl(this.size);
  }
}
