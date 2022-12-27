import { DB } from '../../services/db/database';
import { Filter } from './filter';
import { DualSlider } from '../elements/dual-slider';
import { BaseComponent } from '../elements/base-component';


export class PriceFilter extends Filter {
  private filterWrapper = new BaseComponent({ className: 'filter__wrapper', parent: this.node });

  private slider: DualSlider;

  constructor() {
    super('Цена');
    const filteredMax = DB.filter.list.reduce((max, kb) => (kb.priceMax > max ? kb.priceMax : max), 0);
    const filteredMin = DB.filter.list.reduce((min, kb) => (kb.priceMin < min ? kb.priceMin : min), filteredMax);
    this.slider = new DualSlider(filteredMin, filteredMax, 100, 1000);
    this.filterWrapper.appendEl(this.slider);
  }
}
