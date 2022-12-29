import { DB } from '../../services/db/database';
import { Filter } from './filter';
import { DualSlider } from '../elements/dual-slider';
import { BaseComponent } from '../elements/base-component';
// import { FilterCategory } from '../../interfaces/enums';

export class PriceFilter extends Filter {
  // private category: keyof typeof FilterCategory = 'minPrice';
  // private category: keyof typeof FilterCategory = 'maxPrice';
  private filterWrapper = new BaseComponent({ className: 'filter__wrapper', parent: this.node });
  private filteredMax = DB.keyboards.reduce((max, kb) => (kb.priceMax > max ? kb.priceMax : max), 0);
  private filteredMin = DB.keyboards.reduce((min, kb) => (kb.priceMin < min ? kb.priceMin : min), this.filteredMax);
  private slider: DualSlider;

  constructor() {
    super('Цена');
    const paramMinValue = DB.filter.params.get('minPrice');
    const paramMaxValue = DB.filter.params.get('maxPrice');
    this.slider = new DualSlider(
      this.filteredMin,
      this.filteredMax,
      100,
      3500,
      `${paramMinValue ? [...paramMinValue] : this.filteredMin}`,
      `${paramMaxValue ? [...paramMaxValue] : this.filteredMax}`,
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
