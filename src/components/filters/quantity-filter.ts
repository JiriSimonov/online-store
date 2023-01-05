import { DB } from '../../services/db/database';
import { Filter } from './filter';
import { DualSlider } from '../elements/dual-slider';
import { BaseComponent } from '../elements/base-component';

export class QuantityFilter extends Filter {
  private filterWrapper = new BaseComponent({ className: 'filter__wrapper', parent: this.node });
  private slider: DualSlider;
  private filteredMax = DB.keyboards.reduce((max, kb) => (kb.sumQuantity > max ? kb.sumQuantity : max), 0);
  private filteredMin = 0;

  constructor() {
    super('Остаток на складе');
    this.slider = new DualSlider(
      this.filteredMin,
      this.filteredMax,
      6,
      16,
      'Quantity',
    );
    this.filterWrapper.appendEl(this.slider);
  }
}
