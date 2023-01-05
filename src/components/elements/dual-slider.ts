import { FormField } from './form-field';
import { BaseComponent } from './base-component';
import { DB } from '../../services/db/database';
// import { debounce } from '../../utils/utils';

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
  private minNum: number | string;
  private maxNum: number | string;
  private minRange: number | string;
  private maxRange: number | string;

  constructor(
    private min: number,
    private max: number,
    step: number,
    gap: number,
    private type: 'Price' | 'Quantity' | string) {
    super({ className: 'dual-slider' });
    this.minimumValue = new FormField({
      className: 'dual-slider',
      type: 'number',
      min: `${this.min}`,
      max: `${this.max}`,
      value: `${this.getBasicValue('min', type)}`,
      text: 'От',
    });
    this.maximumValue = new FormField({
      className: 'dual-slider',
      type: 'number',
      min: `${this.min}`,
      max: `${this.max}`,
      value: `${this.getBasicValue('max', type)}`,
      text: 'До',
    });
    this.sliderLeft = new FormField({
      className: 'dual-slider',
      modificator: 'range',
      type: 'range',
      min: `${this.min}`,
      max: `${this.max}`,
      value: `${this.getBasicValue('min', type)}`,
      step: `${step}`,
    });
    this.sliderRight = new FormField({
      className: 'dual-slider',
      modificator: 'range',
      type: 'range',
      min: `${this.min}`,
      max: `${this.max}`,
      value: `${this.getBasicValue('max', type)}`,
      step: `${step}`,
    });
    this.gap = gap;
    this.minNum = +this.minimumValue.value;
    this.maxNum = +this.maximumValue.value;
    this.minRange = +this.sliderLeft.value;
    this.maxRange = +this.sliderRight.value;
    console.warn(this.sliderProgress.getNode());
    this.getValidMin(this.minimumValue.getInputNode(), this.minNum);
    this.getValidMax(this.maximumValue.getInputNode(), this.maxNum);
    this.minimumValue.getInputNode().addEventListener('input', (e) => {
      const { target } = e;
      if (target instanceof HTMLInputElement) {
        this.getValidMin(target, target.value);
        console.warn('input min')
      }
    });
    this.maximumValue.getInputNode().addEventListener('input', (e) => {
      const { target } = e;
      if (target instanceof HTMLInputElement) {
        this.getValidMax(target, target.value);
        console.warn('input max')
      }
    });
    this.sliderLeft.getInputNode().addEventListener('change', (e) => {
      const { target } = e;
      if (target instanceof HTMLInputElement) {
        this.getValidMin(target, target.value);
        this.minimumValue.value = target.value;
        console.warn('input range min')
      }
    });
    this.sliderRight.getInputNode().addEventListener('change', (e) => {
      const { target } = e;
      if (target instanceof HTMLInputElement) {
        this.getValidMax(target, target.value);
        this.maximumValue.value = target.value;
      }
    });
    window.onhashchange = () => {
      this.minimumValue.value = `${this.getBasicValue('min', type)}`;
      this.maximumValue.value = `${this.getBasicValue('max', type)}`;
      this.sliderLeft.value = this.minimumValue.value;
      this.sliderRight.value = this.maximumValue.value;
      this.setLeftPos(this.minimumValue.value, this.minimumValue.value);
      this.setLeftPos(this.maximumValue.value, this.maximumValue.value);
    }
    this.sliderWrapper.appendEl([this.minimumValue, this.maximumValue]);
    this.controls.appendEl([this.sliderLeft, this.sliderRight]);
  }

  setLeftPos(inputVal: string | number, limit: string | number) {
    this.sliderProgress.getNode().style.left = `${((+inputVal / +limit) * 100)}%`;
  }

  setRightPos(inputVal: string | number, limit: string | number) {
    this.sliderProgress.getNode().style.right = `${100 - ((+inputVal / +limit) * 100)}%`;
  }

  getValidMin(elem: HTMLInputElement, value: number | string) {
    const item = elem;
    if (value >= +item.max) item.value = `${+item.max - this.gap}`;
    if (value < +item.min) return;
    DB.filter.clear(`min${this.type}` as 'minQuantity' | 'minPrice')
      .add(`min${this.type}` as 'minQuantity' | 'minPrice', item.value);
    this.sliderLeft.value = item.value;
    this.setLeftPos(item.value, item.max);
  }

  getValidMax(elem: HTMLInputElement, value: number | string) {
    const item = elem;
    const minVal = +this.minimumValue.value;
    if (value > +item.max) {
      item.value = item.max;
      return;
    };
    if (value <= minVal || value <= minVal + this.gap) item.value = `${minVal + this.gap}`;
    DB.filter.clear(`max${this.type}` as 'maxQuantity' | 'maxPrice')
      .add(`max${this.type}` as 'maxQuantity' | 'maxPrice', item.value);
    this.sliderRight.value = item.value;
    this.setRightPos(item.value, item.max);
  }

  getBasicValue(a: string, b: string) {
    const param = DB.filter.params.get(`${a}${b}`);
    const limits = DB.filter.getMinMaxValues(b);
    const limit = a === 'min' ? limits.min : limits.max;
    let current = this[a as keyof this] as number;
    if (limit) current = limit;
    if (param) current = +[...param];
    return current;
  }
} // TODO? что-то не так с сетами QP, надо разобраться
