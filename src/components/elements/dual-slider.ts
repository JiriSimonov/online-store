import { FormField } from './form-field';
import { BaseComponent } from './base-component';

export class DualSlider extends BaseComponent {
  private sliderWrapper = new BaseComponent({ className: 'dual-slider__wrapper', parent: this.node });
  private minimumValue: FormField;
  private miximumValue: FormField;
  private sliderLine = new BaseComponent({ className: 'dual-slider__line', parent: this.node });
  private sliderProgress = new BaseComponent({ className: 'dual-slider__progress', parent: this.sliderLine.getNode() });
  private controls = new BaseComponent({ className: 'dual-slider__controls', parent: this.node });
  private sliderLeft: FormField;
  private sliderRight: FormField;

  constructor(min: number, max: number, step: number, gap: number, paramMin: string, paramMax: string) {
    super({ className: 'dual-slider' });
    this.minimumValue = new FormField({
      className: 'dual-slider',
      type: 'number',
      min: `${min}`,
      max: `${max}`,
      value: `${paramMin}`,
      text: 'От',
    });
    this.miximumValue = new FormField({
      className: 'dual-slider',
      type: 'number',
      min: `${min}`,
      max: `${max}`,
      value: `${paramMax}`,
      text: 'До',
    });
    this.sliderLeft = new FormField({
      className: 'dual-slider',
      modificator: 'range',
      type: 'range',
      min: `${min}`,
      max: `${max}`,
      value: `${paramMin}`,
      step: `${step}`,
    });
    this.sliderRight = new FormField({
      className: 'dual-slider',
      modificator: 'range',
      type: 'range',
      min: `${min}`,
      max: `${max}`,
      value: `${paramMax}`,
      step: `${step}`,
    });
    this.sliderLeft.getInputNode().value = `${paramMin}`;
    this.sliderRight.getInputNode().value = `${paramMax}`;
    const [minInputNum, maxInputNum] = this.getNumbersNodes();
    const [minRange, maxRange] = this.getRangesNodes();
    const progress = this.getProgressNode();
    const priceGap = gap;
    if (+minInputNum.value >= +maxInputNum.value) {
      minInputNum.value = `${+maxInputNum.value - priceGap}`;
      maxInputNum.value = `${+minInputNum.value + priceGap}`;
    };
    if (+maxInputNum.value >= +maxInputNum.max) maxInputNum.value = maxInputNum.max;
    if (+maxInputNum.value <= min && minInputNum.value !== '') {
      maxInputNum.value = `${min + gap}`;
      minInputNum.value = `${min}`;
    }
    if (+minInputNum.value < 0) minInputNum.value = `${min}`;
    progress.style.left = `${((+minInputNum.value / +minRange.max) * 100)}%`;
    progress.style.right = `${100 - ((+maxInputNum.value / +maxRange.max) * 100)}%`;
    this.getNumbersNodes().forEach((item) => item.addEventListener('input', (e) => {
      const { target } = e;
      const minValue = +minInputNum.value;
      const maxValue = +maxInputNum.value;
      if (target && target instanceof HTMLInputElement)
        if ((maxValue - minValue >= priceGap) && maxValue <= +maxRange.max)
          if (target === minInputNum) {
            minRange.value = `${minValue}`;
            progress.style.left = `${((minValue / +minRange.max) * 100)}%`;
          } else {
            maxRange.value = `${maxValue}`;
            progress.style.right = `${100 - ((maxValue / +maxRange.max) * 100)}%`;
          }
    }));
    this.getRangesNodes().forEach((item) => item.addEventListener('input', (e) => {
      const { target } = e;
      if (target && target instanceof HTMLInputElement) {
        const minValue = +minRange.value;
        const maxValue = +maxRange.value;
        if (target === minRange) {
          minRange.classList.add('dual-slider__input_is-selected');
          maxRange.classList.remove('dual-slider__input_is-selected');
        } else {
          minRange.classList.remove('dual-slider__input_is-selected');
          maxRange.classList.add('dual-slider__input_is-selected');
        }
        if ((maxValue - minValue) < priceGap) {
          if (target === minRange)
            minRange.value = `${maxValue - priceGap}`;
          else
            maxRange.value = `${minValue + priceGap}`;
        } else {
          minInputNum.value = `${minValue}`;
          maxInputNum.value = `${maxValue}`;
          progress.style.left = `${((minValue / +minRange.max) * 100)}%`;
          progress.style.right = `${100 - ((maxValue / +maxRange.max) * 100)}%`;
        }
      }
    }));
    this.sliderWrapper.appendEl([this.minimumValue, this.miximumValue]);
    this.controls.appendEl([this.sliderLeft, this.sliderRight]);

  }

  getNumbersNodes() {
    return [this.minimumValue.getInputNode(), this.miximumValue.getInputNode()];
  }

  getRangesNodes() {
    return [this.sliderLeft.getInputNode(), this.sliderRight.getInputNode()];
  }

  getProgressNode() {
    return this.sliderProgress.getNode();
  }

  removeStyles() {
    this.sliderLeft.getInputNode().classList.remove('dual-slider__input_is-selected');
    this.sliderRight.getInputNode().classList.remove('dual-slider__input_is-selected');
  }
}
