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

  constructor(min: number, max: number, step: number, gap: number) {
    super({ className: 'dual-slider' });
    this.minimumValue = new FormField({
      className: 'dual-slider',
      type: 'number',
      min: `${min}`,
      max: `${max}`,
      value: `${min}`,
      text: 'От',
    });
    this.miximumValue = new FormField({
      className: 'dual-slider',
      type: 'number',
      min: `${min}`,
      max: `${max}`,
      value: `${max}`,
      text: 'До',
    });
    this.sliderLeft = new FormField({
      className: 'dual-slider',
      modificator: 'range',
      type: 'range',
      min: `${min}`,
      max: `${max}`,
      value: `${min}`,
      step: `${step}`,
    });
    this.sliderRight = new FormField({
      className: 'dual-slider',
      modificator: 'range',
      type: 'range',
      min: `${min}`,
      max: `${max}`,
      value: `${max}`,
      step: `${step}`,
    });
    this.sliderLeft.getInputNode().value = `${min}`;
    this.sliderRight.getInputNode().value = `${max}`;
    const [minInputNum, maxInputNum] = this.getNumbersNodes();
    const [minRange, maxRange] = this.getRangesNodes();
    const progress = this.getProgressNode();
    const priceGap = gap;
    this.getNumbersNodes().forEach((item) => item.addEventListener('input', (e) => {
      if (+minInputNum.value >= +minInputNum.max) minInputNum.value = `${+minInputNum.max - priceGap}`;
      if (+maxInputNum.value >= +maxInputNum.max) maxInputNum.value = maxInputNum.max;
      if (+maxInputNum.value <= +minInputNum.value) maxInputNum.value = `${+minInputNum.value + priceGap}`;
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
}
