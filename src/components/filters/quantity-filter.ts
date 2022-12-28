import { DB } from '../../services/db/database';
import { Filter } from './filter';
import { DualSlider } from '../elements/dual-slider';
import { BaseComponent } from '../elements/base-component';

export class QuantityFilter extends Filter {
  private filterWrapper = new BaseComponent({ className: 'filter__wrapper', parent: this.node });
  private slider: DualSlider;
  private filteredMax = DB.keyboards.reduce((max, kb) => (kb.sumQuantity > max ? kb.sumQuantity : max), 0);

  constructor() {
    super('Остаток на складе');
    const paramMinValue = DB.filter.params.get('minQuantity');
    const paramMaxValue = DB.filter.params.get('maxQuantity');
    this.slider = new DualSlider(
      0,
      this.filteredMax,
      6,
      16,
      `${paramMinValue ? [...paramMinValue] : 0}`,
      `${paramMaxValue ? [...paramMaxValue] : this.filteredMax}`,
    );
    this.filterWrapper.appendEl(this.slider);

    const [minNum, maxNum, minRange, maxRange] = [...this.slider.getNumbersNodes(), ...this.slider.getRangesNodes()];
    minNum.addEventListener('input', () => DB.filter.clear('minQuantity').add('minQuantity', minNum.value));
    maxNum.addEventListener('input', () => DB.filter.clear('maxQuantity').add('maxQuantity', maxNum.value));
    minRange.addEventListener('change', () => {
      DB.filter.clear('minQuantity').add('minQuantity', minRange.value);
      this.slider.removeStyles();
    });
    maxRange.addEventListener('change', () => {
      DB.filter.clear('maxQuantity').add('maxQuantity', maxRange.value);
      this.slider.removeStyles();
    });
  }
  setDefaultValues() {
    const [minNum, maxNum, minRange, maxRange] = [...this.slider.getNumbersNodes(), ...this.slider.getRangesNodes()];
    const progress = this.slider.getProgressNode();
    minNum.value = `${0}`;
    maxNum.value = `${this.filteredMax}`;
    console.warn(`${this.filteredMax}`, 'кв');
    progress.style.left = `${((+minNum.value / +minRange.max) * 100)}%`;
    progress.style.right = `${100 - ((+maxNum.value / +maxRange.max) * 100)}%`;
  }
}
