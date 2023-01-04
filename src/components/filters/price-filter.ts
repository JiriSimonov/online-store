import { DB } from '../../services/db/database';
import { Filter } from './filter';
import { DualSlider } from '../elements/dual-slider';
import { BaseComponent } from '../elements/base-component';
// import { FilterCategory } from '../../interfaces/enums';

export class PriceFilter extends Filter {
  // private categoryMin: keyof typeof FilterCategory = 'minPrice';
  // private categoryMax: keyof typeof FilterCategory = 'maxPrice';
  private filterWrapper = new BaseComponent({ className: 'filter__wrapper', parent: this.node });
  private limits = DB.filter.getMinMaxValues('price')
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
    if (paramMinValue && paramMaxValue)
      this.slider.setValues(`${[...paramMinValue]}`, `${[...paramMaxValue]}`);
    else if (paramMinValue)
      this.slider.setValues(`${[...paramMinValue]}`, this.limits.max);
    else if (paramMaxValue)
      this.slider.setValues(this.limits.min, `${[...paramMaxValue]}`);
    else
      this.slider.setValues(this.limits.min, this.limits.max);
    window.onhashchange = () => {
      const paramMinValue1 = DB.filter.params.get('minPrice');
      const paramMaxValue1 = DB.filter.params.get('maxPrice');
      const limit1 = DB.filter.getMinMaxValues('price');
      console.warn(paramMinValue1, paramMaxValue1)
      if (paramMinValue1 && paramMaxValue1) {
        this.slider.setValues(`${[...paramMinValue1]}`, `${[...paramMaxValue1]}`);
        console.warn('есть оба парамса');
      }
      else if (paramMinValue1) {
        this.slider.setValues(`${[...paramMinValue1]}`, limit1.max);
        console.warn('есть мин парам');
      }
      else if (paramMaxValue1) {
        this.slider.setValues(limit1.min, `${[...paramMaxValue1]}`);
        console.warn('есть мин парам');
      }
      else {
        this.slider.setValues(limit1.min, limit1.max);
        console.warn('нет парамсов');
      }
    }
    this.filterWrapper.appendEl(this.slider);
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
