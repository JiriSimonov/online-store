import { DB } from '../../services/db/database';
import { Filter } from './filter';
import { DualSlider } from '../elements/dual-slider';
import { BaseComponent } from '../elements/base-component';

export class QuantityFilter extends Filter {
  private filterWrapper = new BaseComponent({ className: 'filter__wrapper', parent: this.node });

  private slider: DualSlider;

  constructor() {
    super('Остаток на складе');
    const filteredMax = DB.keyboards.reduce((max, kb) => (kb.sumQuantity > max ? kb.sumQuantity : max), 0);
    this.slider = new DualSlider(0, filteredMax, 6, 2);
    this.filterWrapper.appendEl(this.slider);

    const [minNum, maxNum, minRange, maxRange] = [...this.slider.getNumbersNodes(), ...this.slider.getRangesNodes()];
    [minNum, minRange].forEach((item) =>
      item.addEventListener('change', () => DB.filter.clear('minQuantity').add('minQuantity', item.value)),
    );
    [maxNum, maxRange].forEach((item) =>
      item.addEventListener('change', () => DB.filter.clear('maxQuantity').add('maxQuantity', item.value)),
    );
  }
}
