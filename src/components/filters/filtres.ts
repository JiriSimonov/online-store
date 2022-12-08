import BaseComponent from '../elements/base-component';
import Filter from './filter';
import SwitchFilter from './switch-filter';

export default class Filters extends BaseComponent {
  switchFilter: SwitchFilter;

  manufacturerFiler: Filter;

  availableFilter: Filter;

  sizeFilter: Filter;

  featuresFilter: Filter;

  constructor() {
    super({ tag: 'ul', className: 'filters' });
    this.availableFilter = new Filter('Наличие');
    this.switchFilter = new SwitchFilter();
    this.manufacturerFiler = new Filter('Бренд');
    this.sizeFilter = new Filter('Размер');
    this.featuresFilter = new Filter('Фичи');
    this.appendEl([
      this.availableFilter,
      this.switchFilter,
      this.manufacturerFiler,
      this.sizeFilter,
      this.featuresFilter,
    ]);
  }
}
