import { Filter } from './filter';
import { BaseComponent } from '../elements/base-component';
import { FormField } from '../elements/form-field';
import { DB } from '../../services/db/database';

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
    this.perepisat(); //? метод написан чисто под тестирование онкликов, чтоб не трогать остальное
  }

  perepisat() {
    const buttons = ['🅰', '💰', '📦', '☝', '👇', '🧼'].map((name, index) => {
      const btn = document.createElement('button');
      btn.style.width = index > 2 ? '32%' : '30%';
      btn.style.margin = '.2em';
      btn.textContent = name;
      return btn;
    });
    this.node.append(...buttons);
    buttons[0].onclick = () => DB.filter.setParam('sortType', 'title');
    buttons[1].onclick = () => DB.filter.setParam('sortType', 'priceMin');
    buttons[2].onclick = () => DB.filter.setParam('sortType', 'sumQuantity');
    buttons[3].onclick = () => DB.filter.setParam('sortDirection', 'ascending');
    buttons[4].onclick = () => DB.filter.setParam('sortDirection', 'descending');
    buttons[5].onclick = () => DB.filter.setParam('sortType').setParam('sortDirection');
  }
}
