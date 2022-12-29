import { DB } from '../../services/db/database';
import { Filter } from './filter';
import { DualSlider } from '../elements/dual-slider';
import { BaseComponent } from '../elements/base-component';
// import { FilterCategory } from '../../interfaces/enums';

export class QuantityFilter extends Filter {
  // private category: keyof typeof FilterCategory = 'minQuantity';
  // private category: keyof typeof FilterCategory = 'maxQuantity';
  private filterWrapper = new BaseComponent({ className: 'filter__wrapper', parent: this.node });
  private slider: DualSlider;
  private limits = DB.filter.getMinMaxValues('quantity')

  constructor() {
    super('Остаток на складе');
    const paramMinValue = DB.filter.params.get('minQuantity');
    const paramMaxValue = DB.filter.params.get('maxQuantity');
    this.slider = new DualSlider(
      this.limits.min, //? тут был ноль
      this.limits.max,
      6,
      16,
      `${paramMinValue ? [...paramMinValue] : this.limits.min}`,
      `${paramMaxValue ? [...paramMaxValue] : this.limits.max}`,
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
    maxNum.value = maxNum.max;
    minNum.value = minNum.min;
    minRange.value = minRange.min;
    maxRange.value = maxRange.max;
    progress.style.left = `0`;
    progress.style.right = `0`;
  }
}
