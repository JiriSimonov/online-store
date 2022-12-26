import { FormField } from './form-field';
import { BaseComponent } from './base-component';

export class DualSlider extends BaseComponent {
  private sliderWrapper = new BaseComponent({ className: 'dual-slider__wrapper', parent: this.node });
  private minimumValue = new FormField({
    className: 'dual-slider',
    type: 'number',
    placeholder: '0',
    value: '0',
    text: 'От'
  });
  private miximumValue = new FormField({
    className: 'dual-slider',
    type: 'number',
    placeholder: '20000',
    value: '20000',
    text: 'До'
  });
  private sliderLine = new BaseComponent({ className: 'dual-slider__line', parent: this.node });
  private sliderProgress = new BaseComponent({ className: 'dual-slider__progress', parent: this.sliderLine.getNode() });
  private controls = new BaseComponent({ className: 'dual-slider__controls', parent: this.node });
  private sliderLeft = new FormField({
    className: 'dual-slider',
    modificator: 'range',
    type: 'range',
    min: '0',
    max: '20000',
    value: '0',
    step: '100',
    parent: this.controls.getNode(),
  });
  private sliderRight = new FormField({
    className: 'dual-slider',
    modificator: 'range',
    type: 'range',
    min: '0',
    max: '20000',
    value: '20000',
    step: '100',
    parent: this.controls.getNode(),
  });

  constructor() {
    super({ className: 'dual-slider' });
    this.sliderWrapper.appendEl([this.minimumValue, this.miximumValue]);
    this.controls.appendEl([this.sliderLeft, this.sliderRight]);
    this.sliderLeft.getInputNode().value = this.sliderLeft.getInputNode().min;
    this.sliderRight.getInputNode().value = this.sliderRight.getInputNode().max;
    // TODO!!! без присвоения в валуе макс и мин не работает, я не понимаю почему так работает
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
