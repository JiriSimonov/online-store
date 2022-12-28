import { Filter } from './filter';
import { Button } from '../elements/button';
import { BaseComponent } from '../elements/base-component';
import { FormField } from '../elements/form-field';
import { DB } from '../../services/db/database';

export class SortFilter extends Filter {
  private filterWrapper = new BaseComponent({ className: 'filter__wrapper', parent: this.node });
  private nameFilter = new FormField({
    className: 'filter',
    type: 'radio',
    name: 'filter-sort',
    modificator: 'sort',
    text: 'Алфавиту',
  });
  private priceFilter = new FormField({
    className: 'filter',
    type: 'radio',
    name: 'filter-sort',
    modificator: 'sort',
    text: 'Цене',
  });
  private inStockFilter = new FormField({
    className: 'filter',
    type: 'radio',
    name: 'filter-sort',
    modificator: 'sort',
    text: 'Остатку на складе',
  });
  private filterControls = new BaseComponent({
    className: 'filter__wrapper filter__wrapper_controls',
    parent: this.node,
  });
  private ascendingFilter = new FormField({
    className: 'filter',
    type: 'radio',
    name: 'filter-sort-direction',
    modificator: 'sort',
    text: 'Возрастанию',
  });
  private descendingFilter = new FormField({
    className: 'filter',
    type: 'radio',
    name: 'filter-sort-direction',
    modificator: 'sort',
    text: 'Убыванию',
  });
  private resetSort = new Button({
    className: 'filter__clear',
    text: 'Очистить сортировку',
    onclick: () => {
      DB.filter.setParam('sortType').setParam('sortDirection');
      this.uncheckAll();
    },
    parent: this.node,
  });


  constructor() {
    super('Сортировать по');
    this.nameFilter.getInputNode().onchange = () => DB.filter.setParam('sortType', 'title');
    this.priceFilter.getInputNode().onchange = () => DB.filter.setParam('sortType', 'priceMin');
    this.inStockFilter.getInputNode().onchange = () => DB.filter.setParam('sortType', 'sumQuantity');
    this.ascendingFilter.getInputNode().onchange = () => DB.filter.setParam('sortDirection', 'ascending');
    this.descendingFilter.getInputNode().onchange = () => DB.filter.setParam('sortDirection', 'descending');
    this.filterWrapper.appendEl([
      this.nameFilter,
      this.priceFilter,
      this.inStockFilter]
    );
    this.filterControls.appendEl([this.ascendingFilter,this.descendingFilter]);
  }

  uncheckAll() {
    [this.nameFilter, this.priceFilter, this.inStockFilter, this.ascendingFilter, this.descendingFilter]
      .forEach((item) => {Object.assign(item, { checked: false })});
  }
}
