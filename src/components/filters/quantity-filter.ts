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
    const paramMinValue = DB.filter.params.get('minQuantity');
    const paramMaxValue = DB.filter.params.get('maxQuantity');
    this.slider = new DualSlider(
      0,
      filteredMax,
      6,
      2,
      `${paramMinValue ? [...paramMinValue] : 0}`,
      `${paramMaxValue ? [...paramMaxValue] : filteredMax}`,
    );
    this.filterWrapper.appendEl(this.slider);

    const [minNum, maxNum, minRange, maxRange] = [...this.slider.getNumbersNodes(), ...this.slider.getRangesNodes()];
    minNum.addEventListener('input', () => DB.filter.clear('minQuantity').add('minQuantity', minNum.value));
    maxNum.addEventListener('input', () => DB.filter.clear('maxQuantity').add('maxQuantity', maxNum.value));
    minRange.addEventListener('change', () => DB.filter.clear('minQuantity').add('minQuantity', minRange.value));
    maxRange.addEventListener('change', () => DB.filter.clear('maxQuantity').add('maxQuantity', maxRange.value));
  }
}
