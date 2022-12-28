import { DB } from '../../services/db/database';
import { Filter } from './filter';
import { DualSlider } from '../elements/dual-slider';
import { BaseComponent } from '../elements/base-component';

export class PriceFilter extends Filter {
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
    this.filterWrapper.appendEl(this.slider);

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
  }
}
