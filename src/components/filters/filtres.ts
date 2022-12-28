import { SortFilter } from './sort-filter';
import { BaseComponent } from '../elements/base-component';
import { DB } from '../../services/db/database';
import { Button } from '../elements/button';
import { QuantityFilter } from './quantity-filter';
import { PriceFilter } from './price-filter';
import { AvFilter } from './av-filter';
import { SwitchFilter } from './switch-filter';
import { BrandFilter } from './brand-filter';
import { SizeFilter } from './size-filter';
import { FeaturesFilter } from './features-filter';
import { Filter } from './filter';

export class Filters extends BaseComponent {
  sortFilter = new SortFilter();
  availableFilter = new AvFilter();
  switchFilter = new SwitchFilter();
  priceFilter = new PriceFilter();
  quantityFilter = new QuantityFilter();
  manufacturerFiler = new BrandFilter();
  sizeFilter = new SizeFilter();
  featuresFilter = new FeaturesFilter();
  clearFilters: Button;
  copyFilters: Button;

  constructor() {
    super({ tag: 'ul', className: 'filters' });
    this.clearFilters = new Button({
      className: 'filter__clear', text: 'Очистить фильтры',
      onclick: () => {
        DB.filter.clearAll();
        Filter.uncheckAll(
          ...this.availableFilter.getInputs(),
          ...this.switchFilter.getInputs(),
          ...this.switchFilter.getRadioInputs(),
          ...this.manufacturerFiler.getInputs(),
          ...this.sizeFilter.getInputs(),
          ...this.featuresFilter.getInputs(),
          );
          this.availableFilter.getInputs()[0].checked = true;
        window.scrollTo(0, 0);
      }
    });
    this.copyFilters = new Button({
      className: 'filter__clear', text: 'Скопировать фильтры',
      onclick: () => {
        const renderCopyAnimation = (result: 'success' | 'fail') => {
          const icon = this.copyFilters.getNode();
          icon.classList.add(`filter__clear_${result}`);
          icon.textContent = 'Скопировано!';
          icon.ontransitionend = () => {
            icon.classList.remove(`filter__clear_${result}`);
            icon.textContent = 'Скопировать фильтры';
            icon.ontransitionend = null;
          };
        };
        navigator.clipboard
          .writeText(encodeURI(window.location.href))
          .then(() => renderCopyAnimation('success'))
          .catch(() => renderCopyAnimation('fail'));
      }
    });
    this.appendEl([
      this.sortFilter,
      this.availableFilter,
      this.switchFilter,
      this.priceFilter,
      this.quantityFilter,
      this.manufacturerFiler,
      this.sizeFilter,
      this.featuresFilter,
      this.copyFilters,
      this.clearFilters,
    ]);
  }
}
