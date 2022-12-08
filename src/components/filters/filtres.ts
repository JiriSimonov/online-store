import BaseComponent from '../elements/base-component';
import Filter from './filter';
import SwitchFilter from './switch-filter';

export default class Filters extends BaseComponent {
  switchFiler: SwitchFilter;

  manufacturerFiler: Filter;

  aviableFilter: Filter;

  sizeFilter: Filter;

  featuresFilter: Filter;

  constructor() {
    super({ tag: 'ul', className: 'filters' });
    this.aviableFilter = new Filter('Наличие');
    this.switchFiler = new SwitchFilter();
    this.manufacturerFiler = new Filter('Бренд');
    this.sizeFilter = new Filter('Размер');
    this.featuresFilter = new Filter('Фичи');
    this.appendEl([
      this.aviableFilter,
      this.switchFiler,
      this.manufacturerFiler,
      this.sizeFilter,
      this.featuresFilter,
    ]);
  }
}
