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
    this.getValidMin(this.minimumValue.getInputNode());
    this.getValidMax(this.maximumValue.getInputNode());
    this.minimumValue.getInputNode().addEventListener('input', (e) => {
      const { target } = e;
      if (target instanceof HTMLInputElement) {
        this.getValidMin(target);
        DB.filter.clear(`min${this.type}` as 'minQuantity' | 'minPrice')
        .add(`min${this.type}` as 'minQuantity' | 'minPrice', target.value);
      }
    });
    this.maximumValue.getInputNode().addEventListener('input', (e) => {
      const { target } = e;
      if (target instanceof HTMLInputElement) {
        this.getValidMax(target);
        DB.filter.clear(`max${this.type}` as 'maxQuantity' | 'maxPrice')
        .add(`max${this.type}` as 'maxQuantity' | 'maxPrice', target.value);
      }
    });
    this.sliderLeft.getInputNode().addEventListener('change', (e) => {
      const { target } = e;
      if (target instanceof HTMLInputElement) {
        this.getValidMin(target);
        this.minimumValue.value = target.value;
        DB.filter.clear(`min${this.type}` as 'minQuantity' | 'minPrice')
        .add(`min${this.type}` as 'minQuantity' | 'minPrice', target.value);
      }
    });
    this.sliderLeft.getInputNode().addEventListener('input', (e) => {
      const { target } = e;
      if (target instanceof HTMLInputElement)
        this.setLeftPos(this.sliderLeft.value, this.sliderLeft.getInputNode().max);
    })
    this.sliderRight.getInputNode().addEventListener('change', (e) => {
      const { target } = e;
      if (target instanceof HTMLInputElement) {
        this.getValidMax(target);
        this.maximumValue.value = target.value;
        DB.filter.clear(`max${this.type}` as 'maxQuantity' | 'maxPrice')
        .add(`max${this.type}` as 'maxQuantity' | 'maxPrice', target.value);
      }
    });
    this.sliderRight.getInputNode().addEventListener('input', (e) => {
      const { target } = e;
      if (target instanceof HTMLInputElement)
        this.setRightPos(this.sliderRight.value, this.sliderRight.getInputNode().max);
    })
    window.onhashchange = () => {
      this.minimumValue.value = `${this.getBasicValue('min', type)}`;
      this.maximumValue.value = `${this.getBasicValue('max', type)}`;
      this.sliderLeft.value = this.minimumValue.value;
      this.sliderRight.value = this.maximumValue.value;
      this.setLeftPos(this.minimumValue.value, this.minimumValue.getInputNode().max);
      this.setRightPos(this.maximumValue.value, this.maximumValue.getInputNode().max);
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

  getValidMin(elem: HTMLInputElement) {
    const item = elem;
    if (+elem.value >= +item.max) item.value = `${+item.max - this.gap}`;
    if (+elem.value < +item.min) return;
    this.sliderLeft.value = item.value;
    this.setLeftPos(item.value, item.max);
  }

  getValidMax(elem: HTMLInputElement) {
    const item = elem;
    const minVal = +this.minimumValue.value;
    if (+elem.value > +item.max) {
      item.value = item.max;
      return;
    };
    if (+elem.value <= minVal || +elem.value <= minVal + this.gap) item.value = `${minVal + this.gap}`;
    this.sliderRight.value = item.value;
    this.setRightPos(item.value, item.max);
  }

  
  getBasicValue(filterParam: string, filterType: string) {
    const param = DB.filter.params.get(`${filterParam}${filterType}`);
    const limits = DB.filter.getMinMaxValues(filterType);
    const limit = filterParam === 'min' ? limits.min : limits.max;
    let current = this[filterParam as keyof this] as number;
    if (limit) current = limit;
    if (param) current = +[...param];
    return current;
  }
}
