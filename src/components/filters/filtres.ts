import { BaseComponent } from '../elements/base-component';
import { Filter } from './filter';
import { AvFilter } from './av-filter';
import { SwitchFilter } from './switch-filter';
import { BrandFilter } from './brand-filter';
import { SizeFilter } from './size-filter';
import { FeaturesFilter } from './features-filter';
import { Button } from '../elements/button';
import { ProductsListState } from '../../states/goods-state';

export class Filters extends BaseComponent {
  switchFilter: SwitchFilter;

  manufacturerFiler: Filter;

  availableFilter: Filter;

  sizeFilter: Filter;

  featuresFilter: Filter;

  clearFilters: Button;

  constructor(private productsState: ProductsListState) {
    super({ tag: 'ul', className: 'filters' });
    this.availableFilter = new AvFilter(productsState);
    this.switchFilter = new SwitchFilter(productsState);
    this.manufacturerFiler = new BrandFilter(productsState);
    this.sizeFilter = new SizeFilter(productsState);
    this.featuresFilter = new FeaturesFilter(productsState);
    this.clearFilters = new Button({ className: 'filter__clear', text: 'Очистить фильтры' });
    this.clearFilters.getNode().onclick = () => {
      productsState.set({
        search: '',
        inStock: false,
        brand: '',
        switchType: '',
        size: '',
        features: '',
      });
    };
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
