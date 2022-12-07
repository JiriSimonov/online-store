import BaseComponent from '../base-component';
import Filter from './filter';

export default class Filters extends BaseComponent {
  switchFiler: Filter;

  manufacturerFiler: Filter;

  aviableFilter: Filter;

  sizeFilter: Filter;

  featuresFilter: Filter;

  constructor() {
    super({ tag: 'ul', className: 'filters' });
    this.aviableFilter = new Filter('Наличие');
    this.switchFiler = new Filter('Переключатели');
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
