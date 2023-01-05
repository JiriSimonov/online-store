import { Button } from '../elements/button-component';
import { Component } from '../elements/base-component';
import { FormField } from '../elements/form-field';
import { DB } from '../../services/db/database';

export class SortFilter extends Component {
  private alphSortAsc = new FormField({
    className: 'sort',
    modificator: 'alph-asc',
    type: 'radio',
    name: 'sort',
    value: 'title-ascending',
  });
  private alphSortDesc = new FormField({
    className: 'sort',
    modificator: 'alph-desc',
    type: 'radio',
    name: 'sort',
    value: 'title-descending',
  });
  private priceSortAsc = new FormField({
    className: 'sort',
    modificator: 'price-asc',
    type: 'radio',
    name: 'sort',
    value: 'priceMin-ascending',
  });
  private priceSortDesc = new FormField({
    className: 'sort',
    modificator: 'price-desc',
    type: 'radio',
    name: 'sort',
    value: 'priceMin-descending',
  });
  private inStockSortAsc = new FormField({
    className: 'sort',
    modificator: 'stock-asc',
    type: 'radio',
    name: 'sort',
    value: 'sumQuantity-ascending',
  });
  private inStockSortDesc = new FormField({
    className: 'sort',
    modificator: 'stock-desc',
    type: 'radio',
    name: 'sort',
    value: 'sumQuantity-descending',
  });
  private resetSort = new Button({ className: 'sort__clear', textContent: 'Очистить сортировку' });

  constructor() {
    super({ className: 'sort' });

    const sortParams = { type: DB.filter.getParam('sortType'), order: DB.filter.getParam('sortOrder') };

    Object.entries({
      'Отсортировать в алфивитном порядке': this.alphSortAsc,
      'Отсортировать в обратном алфивитном порядке': this.alphSortDesc,
      'Отсортировать по возрастанию цены': this.priceSortAsc,
      'Отсортировать по уменьшению цены': this.priceSortDesc,
      'Отсортировать по увеличению остатка на складе': this.inStockSortAsc,
      'Отсортировать по уменьшению остатка на складе': this.inStockSortDesc,
    }).forEach((entry) => {
      const [title, element] = entry;
      const input = element.input.node;
      const [type, order] = input.value.split('-');
      input.title = title;
      input.addEventListener('change', () => DB.filter.setParam('sortType', type).setParam('sortOrder', order));
      input.checked = sortParams.type === type && sortParams.order === order;
      this.append(element);
    });

    this.append(this.resetSort);
  }

  uncheckAll() {
    [
      this.alphSortAsc,
      this.alphSortDesc,
      this.priceSortAsc,
      this.priceSortDesc,
      this.inStockSortAsc,
      this.inStockSortDesc,
    ].forEach((item) => Object.assign(item.input.node, { checked: false }));
    DB.filter.setParam('sortType').setParam('sortOrder');
  }

  get resetSortNode() {
    return this.resetSort.node;
  }
}
