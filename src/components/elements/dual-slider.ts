import { FormField } from './form-field';
import { BaseComponent } from './base-component';

export class DualSlider extends BaseComponent {
  private sliderWrapper = new BaseComponent({ className: 'dual-slider__wrapper', parent: this.node });
  private minimumValue: FormField;
  private maximumValue: FormField;
  private sliderLine = new BaseComponent({ className: 'dual-slider__line', parent: this.node });
  private sliderProgress = new BaseComponent({ className: 'dual-slider__progress', parent: this.sliderLine.getNode() });
  private controls = new BaseComponent({ className: 'dual-slider__controls', parent: this.node });
  private sliderLeft: FormField;
  private sliderRight: FormField;
  private gap: number;

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
    this.maximumValue = new FormField({
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
    this.gap = gap;
    this.sliderLeft.getInputNode().value = `${paramMin}`;
    this.sliderRight.getInputNode().value = `${paramMax}`;
    this.minimumValue.getInputNode().value = `${paramMin}`;
    this.maximumValue.getInputNode().value = `${paramMax}`;
    const [minInputNum, maxInputNum] = this.getNumbersNodes();
    const [minRange, maxRange] = this.getRangesNodes();
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
    this.setLeftPos(minInputNum.value, minRange.max);
    this.setRightPos(maxInputNum.value, maxRange.max);
    this.getNumbersNodes().forEach((item) => item.addEventListener('input', (e) => {
      const { target } = e;
      const minValue = +minInputNum.value;
      const maxValue = +maxInputNum.value;
      if (target && target instanceof HTMLInputElement)
        if ((maxValue - minValue >= priceGap) && maxValue <= +maxRange.max)
          if (target === minInputNum) {
            minRange.value = `${minValue}`;
            this.setLeftPos(minValue, minRange.max);
          } else {
            maxRange.value = `${maxValue}`;
            this.setRightPos(maxValue, maxRange.max);
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
          this.setLeftPos(minValue, minRange.max);
          this.setRightPos(maxValue, maxRange.max);
        }
      }
    }));
    this.sliderWrapper.appendEl([this.minimumValue, this.maximumValue]);
    this.controls.appendEl([this.sliderLeft, this.sliderRight]);

  }

  getNumbersNodes() {
    return [this.minimumValue.getInputNode(), this.maximumValue.getInputNode()];
  }

  getRangesNodes() {
    return [this.sliderLeft.getInputNode(), this.sliderRight.getInputNode()];
  }

  getProgressNode() {
    return this.sliderProgress.getNode();
  }

  setValues(min: number | string, max: number | string) {
    // eslint-disable-next-line no-param-reassign
    if ((+max - +min < this.gap) && +max <= +this.sliderRight.getInputNode().max) max = +max + this.gap;
    this.minimumValue.getInputNode().value = `${min}`;
    this.maximumValue.getInputNode().value = `${max}`;
    this.sliderLeft.getInputNode().value = `${min}`;
    this.sliderRight.getInputNode().value = `${max}`;
    const [minNum, maxNum, minRange, maxRange] = [...this.getNumbersNodes(), ...this.getRangesNodes()];
    this.setLeftPos(minNum.value, minRange.max);
    this.setRightPos(maxNum.value, maxRange.max);
  }

  setLeftPos(inputVal: string | number, limit: string | number) {
    this.sliderProgress.getNode().style.left = `${((+inputVal / +limit) * 100)}%`;
  }

  setRightPos(inputVal: string | number, limit: string | number) {
    this.sliderProgress.getNode().style.right = `${100 - ((+inputVal / +limit) * 100)}%`;
  }


  removeStyles() {
    this.sliderLeft.getInputNode().classList.remove('dual-slider__input_is-selected');
    this.sliderRight.getInputNode().classList.remove('dual-slider__input_is-selected');
  }
}
