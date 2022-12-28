import { Filter } from './filter';
import { BaseComponent } from '../elements/base-component';
import { FormField } from '../elements/form-field';

export class SortFilter extends Filter {
  private filterWrapper = new BaseComponent({ className: 'filter__wrapper', parent: this.node });
  private nameFilter = new FormField({
    className: 'filter',
    type: 'checkbox',
    modificator: 'sort',
    text: 'Алфавиту',
  });
  private priceFilter = new FormField({
    className: 'filter',
    type: 'checkbox',
    modificator: 'sort',
    text: 'Возрастанию / убыванию цены',
  });
  private inStockFilter = new FormField({
    className: 'filter',
    type: 'checkbox',
    modificator: 'sort',
    text: 'Остатку на складе',
  });

  constructor() {
    super('Сортировать по');
    this.filterWrapper.appendEl([this.nameFilter, this.priceFilter, this.inStockFilter]);
  }
}
