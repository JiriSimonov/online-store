import { BaseComponent } from '../elements/base-component';
import { Filter } from './filter';
import { AvFilter } from './av-filter';
import { SwitchFilter } from './switch-filter';
import { BrandFilter } from './brand-filter';
import { SizeFilter } from './size-filter';
import { FeaturesFilter } from './features-filter';
import { Button } from '../elements/button';

export class Filters extends BaseComponent {
  switchFilter: SwitchFilter;

  manufacturerFiler: Filter;

  availableFilter: Filter;

  sizeFilter: Filter;

  featuresFilter: Filter;

  clearFilters: Button;

  constructor() {
    super({ tag: 'ul', className: 'filters' });
    this.availableFilter = new AvFilter();
    this.switchFilter = new SwitchFilter();
    this.manufacturerFiler = new BrandFilter();
    this.sizeFilter = new SizeFilter();
    this.featuresFilter = new FeaturesFilter();
    this.clearFilters = new Button({ className: 'filter__clear', text: 'Очистить фильтры' });
    this.appendEl([
      this.availableFilter,
      this.switchFilter,
      this.manufacturerFiler,
      this.sizeFilter,
      this.featuresFilter,
      this.clearFilters,
    ]);
  }
}
