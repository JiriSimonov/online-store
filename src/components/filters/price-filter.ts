import { DB } from '../../services/db/database';
import { Filter } from './filter';
import { DualSlider } from '../elements/dual-slider';
import { BaseComponent } from '../elements/base-component';
// import { FilterCategory } from '../../interfaces/enums';

export class PriceFilter extends Filter {
  // private categoryMin: keyof typeof FilterCategory = 'minPrice';
  // private categoryMax: keyof typeof FilterCategory = 'maxPrice';
  private filterWrapper = new BaseComponent({ className: 'filter__wrapper', parent: this.node });
  private slider: DualSlider;

  constructor() {
    super('Цена');
    const filteredMax = DB.keyboards.reduce((max, kb) => (kb.priceMax > max ? kb.priceMax : max), 0);
    const filteredMin = DB.keyboards.reduce((min, kb) => (kb.priceMin < min ? kb.priceMin : min), filteredMax);
    const paramMinValue = DB.filter.params.get('minPrice');
    const paramMaxValue = DB.filter.params.get('maxPrice');
    this.slider = new DualSlider(
      filteredMin, filteredMax,
      100,
      3500,
      `${paramMinValue ? [...paramMinValue] : filteredMin}`,
      `${paramMaxValue ? [...paramMaxValue] : filteredMax}`,
    );
    const [minNum, maxNum, minRange, maxRange] = [...this.slider.getNumbersNodes(), ...this.slider.getRangesNodes()];
    minNum.addEventListener('input', () => DB.filter.clear('minPrice').add('minPrice', minNum.value));
    maxNum.addEventListener('input', () => DB.filter.clear('maxPrice').add('maxPrice', maxNum.value));
    minRange.addEventListener('change', () => {
      DB.filter.clear('minPrice').add('minPrice', minRange.value);
      this.slider.removeStyles();
    });
    maxRange.addEventListener('change', () => {
      DB.filter.clear('maxPrice').add('maxPrice', maxRange.value);
      this.slider.removeStyles();
    });
    this.updateSlider();
    window.onhashchange = () => {this.updateSlider()}
    this.filterWrapper.appendEl(this.slider);
  }
  setDefaultValues() {
    const [minNum, maxNum, minRange, maxRange] = [...this.slider.getNumbersNodes(), ...this.slider.getRangesNodes()];
    maxNum.value = maxNum.max;
    minNum.value = minNum.min;
    minRange.value = minRange.min;
    maxRange.value = maxRange.max;
    this.slider.setLeftPos(minNum.value, minRange.value);
    this.slider.setLeftPos(maxNum.value, maxRange.value);
  }

  updateSlider() {
    const paramMinValue = DB.filter.params.get('minPrice');
    const paramMaxValue = DB.filter.params.get('maxPrice');
    const limits = DB.filter.getMinMaxValues('price')
    if (paramMinValue && paramMaxValue)
      this.slider.setValues(`${[...paramMinValue]}`, `${[...paramMaxValue]}`);
    else if (paramMinValue)
      this.slider.setValues(`${[...paramMinValue]}`, limits.max);
    else if (paramMaxValue)
      this.slider.setValues(limits.min, `${[...paramMaxValue]}`);
    else
      this.slider.setValues(limits.min, limits.max);
  }
}
