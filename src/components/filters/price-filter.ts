import { Filter } from './filter';
import { DualSlider } from '../elements/dual-slider';
import { BaseComponent } from '../elements/base-component';

export class PriceFilter extends Filter {
  private filterWrapper = new BaseComponent({ className: 'filter__wrapper', parent: this.node });

  private slider = new DualSlider();

  constructor() {
    super('Цена');
    this.filterWrapper.appendEl(this.slider);
    const [minInputNum, maxInputNum] = this.slider.getNumbersNodes();
    const [minRange, maxRange] = this.slider.getRangesNodes();
    const progress = this.slider.getProgressNode();
    const priceGap = 1000;
    this.slider.getNumbersNodes().forEach((item) => item.addEventListener('input', (e) => {
      const { target } = e;
      if (target && target instanceof HTMLInputElement) {
        const minValue = +minInputNum.value;
        const maxValue = +maxInputNum.value;
        if ((maxValue - minValue >= priceGap) && maxValue <= +maxRange.max)
          if (target === minInputNum) {
            minRange.value = `${minValue}`;
            progress.style.left = `${((minValue / +minRange.max) * 100)}%`;
          } else {
            maxRange.value = `${maxValue}`;
            progress.style.right = `${100 - ((maxValue / +maxRange.max) * 100)}%`;
          }
      }
    }));
    this.slider.getRangesNodes().forEach((item) => item.addEventListener('input', (e) => {
      const { target } = e;
      if (target && target instanceof HTMLInputElement) {
        const minValue = +minRange.value;
        const maxValue = +maxRange.value;
        if ((maxValue - minValue) < priceGap) {
          if (target === minRange)
            minRange.value = `${maxValue - priceGap}`;
          else maxRange.value = `${minValue + priceGap}`;
        } else {
          minInputNum.value = `${minValue}`;
          maxInputNum.value = `${maxValue}`;
          progress.style.left = `${((minValue / +minRange.max) * 100)}%`;
          progress.style.right = `${100 - ((maxValue / +maxRange.max) * 100)}%`;
        }
      }
    }));

  }
}
