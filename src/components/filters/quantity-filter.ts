import { DB } from '../../services/db/database';
import { Filter } from './filter';
import { DualSlider } from '../elements/dual-slider';
import { Component } from '../elements/base-component';

export class QuantityFilter extends Filter {
  private filterWrapper = new Component({ className: 'filter__wrapper', parent: this });
  private slider: DualSlider;
  private filteredMax = DB.keyboards.reduce((max, kb) => (kb.sumQuantity > max ? kb.sumQuantity : max), 0);
  private filteredMin = 0;

  constructor() {
    super('Остаток на складе');
    this.slider = new DualSlider(this.filteredMin, this.filteredMax, 6, 18, 'Quantity');
    this.filterWrapper.append(this.slider);
  }
}
