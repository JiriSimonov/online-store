import { DB } from '../../services/db/database';
import { Filter } from './filter';
import { DualSlider } from '../elements/dual-slider';
import { Component } from '../elements/base-component';

export class PriceFilter extends Filter {
  private filterWrapper = new Component({ className: 'filter__wrapper', parent: this });
  private slider: DualSlider;
  private filteredMax = DB.keyboards.reduce((max, kb) => (kb.priceMax > max ? kb.priceMax : max), 0);
  private filteredMin = DB.keyboards.reduce((min, kb) => (kb.priceMin < min ? kb.priceMin : min), this.filteredMax);

  constructor() {
    super('Цена');
    this.slider = new DualSlider(this.filteredMin, this.filteredMax, 100, 3500, 'Price');
    this.filterWrapper.append(this.slider);
  }
}
