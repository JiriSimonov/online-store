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
    const paramMinValue = DB.filter.params.get('minQuantity');
    const paramMaxValue = DB.filter.params.get('maxQuantity');
    this.slider = new DualSlider(
      this.filteredMin,
      this.filteredMax,
      6,
      16,
      `${paramMinValue ? [...paramMinValue] : this.filteredMin}`,
      `${paramMaxValue ? [...paramMaxValue] : this.filteredMax}`,
    );
    this.updateSlider();
    window.addEventListener('hashchange', () => this.updateSlider());
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
    this.filterWrapper.appendEl(this.slider);
  }
  setDefaultValues() {
    const [minNum, maxNum, minRange, maxRange] = [...this.slider.getNumbersNodes(), ...this.slider.getRangesNodes()];
    maxNum.value = maxNum.max;
    minNum.value = minNum.min;
    minRange.value = minRange.min;
    maxRange.value = maxRange.max;
    this.slider.getProgressNode().style.left = '0';
    this.slider.getProgressNode().style.right = '0';
  }

  updateSlider() {
    const paramMinValue = DB.filter.params.get('minQuantity');
    const paramMaxValue = DB.filter.params.get('maxQuantity');
    const limits = DB.filter.getMinMaxValues('quantity');
    const min = this.slider.getNumbersNodes()[0];
    
    if (limits.min && limits.min === 1) this.slider.getNumbersNodes()[0].value = '0';
    if (limits.max) this.slider.setValues(min.value, limits.max);
    if (paramMaxValue && limits.max && limits.max <= +[...paramMaxValue]) limits.max = +[...paramMaxValue];
    if (paramMinValue && limits.min && limits.min > +[...paramMinValue]) limits.min = +[...paramMinValue];
    if (paramMinValue && limits.max) this.slider.setValues(`${[...paramMinValue]}`, limits.max);
    if (paramMaxValue && limits.min) this.slider.setValues(limits.min, `${[...paramMaxValue]}`);
    if (paramMinValue && paramMaxValue) this.slider.setValues(`${[...paramMinValue]}`, `${[...paramMaxValue]}`);
    if (limits.max && limits.min) this.slider.setValues(limits.min, limits.max);
  }
}
