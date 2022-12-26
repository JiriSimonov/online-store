import { FormField } from '../elements/form-field';
import { DB } from '../../services/db/database';
import { BaseComponent } from '../elements/base-component';
import { Filter } from './filter';

export class AvFilter extends Filter {
  private filterWrapper = new BaseComponent({ className: 'filter__wrapper', parent: this.node });
  private items = [...DB.getVariants('available')]
    .map((item) =>
      new FormField({
        className: 'filter',
        type: 'radio',
        name: 'av-filter',
        text: item === 'true' ? 'В наличии' : 'Всё',
        value: item,
      }));

  constructor() {
    super('Наличие');
    this.filterWrapper.appendEl(this.items);
    this.items.forEach((item) => {
      item.getInputNode().addEventListener('change', (e) => {
        const { target } = e;
        if (target && target instanceof HTMLInputElement)
          if (target.value === 'true') DB.filter.add('available', target.value)
          else DB.filter.clear('available');
      });
    })
  }
}
