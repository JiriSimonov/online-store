import { FormField } from './form-field';
import { Component } from './base-component';
import { DB } from '../../services/db/database';
import { debounce } from '../../utils/utils';
// import { debounce } from '../../utils/utils';

export class DualSlider extends Component {
  private sliderWrapper = new Component({ className: 'dual-slider__wrapper', parent: this.node });
  private minimumValue: FormField;
  private maximumValue: FormField;
  private sliderLine = new Component({ className: 'dual-slider__line', parent: this.node });
  private sliderProgress = new Component({ className: 'dual-slider__progress', parent: this.sliderLine.node });
  private controls = new Component({ className: 'dual-slider__controls', parent: this.node });
  private sliderLeft: FormField;
  private sliderRight: FormField;
  private gap: number;
  private minNum: number | string;
  private maxNum: number | string;
  private minRange: number | string;
  private maxRange: number | string;

  constructor(private min: number, private max: number, step: number, gap: number, private type: 'Price' | 'Quantity') {
    super({ className: 'dual-slider' });
    const minParam: `min${typeof this.type}` = `min${this.type}`;
    const maxParam: `max${typeof this.type}` = `max${this.type}`;
    this.minimumValue = new FormField({
      className: 'dual-slider',
      type: 'number',
      min: `${min}`,
      max: `${max}`,
      value: this.getBasicValue('min'),
      text: 'От',
    });
    this.maximumValue = new FormField({
      className: 'dual-slider',
      type: 'number',
      min: `${min}`,
      max: `${max}`,
      value: this.getBasicValue('max'),
      text: 'До',
    });
    this.sliderLeft = new FormField({
      className: 'dual-slider',
      modificator: 'range',
      type: 'range',
      min: `${min}`,
      max: `${max}`,
      value: this.getBasicValue('min'),
      step: `${step}`,
    });
    this.sliderRight = new FormField({
      className: 'dual-slider',
      modificator: 'range',
      type: 'range',
      min: `${min}`,
      max: `${max}`,
      value: this.getBasicValue('max'),
      step: `${step}`,
    });
    this.gap = gap;
    this.minNum = +this.minimumValue.value;
    this.maxNum = +this.maximumValue.value;
    this.minRange = +this.sliderLeft.value;
    this.maxRange = +this.sliderRight.value;
    this.setValidMin(this.minimumValue.input);
    this.setValidMax(this.maximumValue.input);
    const handleMinInput = debounce((value: string) => DB.filter.clear(minParam).add(minParam, value), 350);
    this.minimumValue.input.addEventListener('input', () => {
      this.setValidMin(this.minimumValue.input);
      handleMinInput(this.minimumValue.input.value);
    });
    const handleMaxInput = debounce((value: string) => DB.filter.clear(maxParam).add(maxParam, value), 350);
    this.maximumValue.input.addEventListener('input', () => {
      this.setValidMax(this.maximumValue.input);
      handleMaxInput(this.maximumValue.input.value);
    });
    this.sliderLeft.input.addEventListener('input', () =>
      this.setLeftPos(this.sliderLeft.value, this.sliderLeft.input.max),
    );
    this.sliderLeft.input.addEventListener('change', () => {
      this.setValidMin(this.sliderLeft.input);
      this.minimumValue.value = this.sliderLeft.input.value;
      DB.filter.clear(minParam).add(minParam, this.sliderLeft.input.value);
    });
    this.sliderRight.input.addEventListener('input', () =>
      this.setRightPos(this.sliderRight.value, this.sliderRight.input.max),
    );
    this.sliderRight.input.addEventListener('change', () => {
      this.setValidMax(this.sliderRight.input);
      this.maximumValue.value = this.sliderRight.input.value;
      DB.filter.clear(maxParam).add(maxParam, this.sliderRight.input.value);
    });
    window.addEventListener('hashchange', () => {
      this.minimumValue.value = this.getBasicValue('min');
      this.maximumValue.value = this.getBasicValue('max');
      this.sliderLeft.value = this.minimumValue.value;
      this.sliderRight.value = this.maximumValue.value;
      this.setLeftPos(this.minimumValue.value, this.minimumValue.input.max);
      this.setRightPos(this.maximumValue.value, this.maximumValue.input.max);
    });
    this.sliderWrapper.append(this.minimumValue, this.maximumValue);
    this.controls.append(this.sliderLeft, this.sliderRight);
  }

  setLeftPos(inputVal: string, limit: string): void {
    this.sliderProgress.node.style.left = `${(+inputVal / +limit) * 100}%`;
  }

  setRightPos(inputVal: string, limit: string): void {
    this.sliderProgress.node.style.right = `${100 - (+inputVal / +limit) * 100}%`;
  }

  setValidMin(elem: HTMLInputElement): void {
    if (+elem.value >= +elem.max) Object.assign(elem, { value: `${+elem.max - this.gap}` });
    if (+elem.value < +elem.min) return;
    this.sliderLeft.value = elem.value;
    this.setLeftPos(elem.value, elem.max);
  }

  setValidMax(elem: HTMLInputElement): void {
    const minVal = +this.minimumValue.value;
    if (+elem.value > +elem.max) {
      Object.assign(elem, { value: elem.max });
      return;
    }
    if (+elem.value <= minVal || +elem.value <= minVal + this.gap)
      Object.assign(elem, { value: `${minVal + this.gap}` });
    this.sliderRight.value = elem.value;
    this.setRightPos(elem.value, elem.max);
  }

  getBasicValue(edge: 'min' | 'max'): string {
    /*     const param = DB.filter.params.get(`${edge}${this.type}`);
    const limit = DB.filter.getMinMaxValues(this.type)[edge];
    let current = this[edge];
    if (limit) current = limit;
    if (param) current = +[...param]; */
    const param = DB.filter.params.get(`${edge}${this.type}`);
    const limit = DB.filter.getMinMaxValues(this.type)[edge];
    const current = param ? +[...param] : limit;
    return `${current ?? this[edge]}`;
  }
}
