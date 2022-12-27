import { DB } from '../../services/db/database';
import { Filter } from './filter';
import { DualSlider } from '../elements/dual-slider';
import { BaseComponent } from '../elements/base-component';


export class QuantityFilter extends Filter {
  private filterWrapper = new BaseComponent({ className: 'filter__wrapper', parent: this.node });

  private slider: DualSlider;

  constructor() {
    super('Остаток на складе');
    const filteredMax = DB.filter.list.reduce((max, kb) => (kb.sumQuantity > max ? kb.sumQuantity : max), 0);
    this.slider = new DualSlider(0, filteredMax, 6, 2);
    const [minNum, maxNum] = this.slider.getNumbersNodes();
    const [minRange, maxRange] = this.slider.getRangesNodes();
    [minNum, minRange].forEach((v) => v.addEventListener('change', () => DB.filter.setParam('minQuantity', v.value)));
    [maxNum, maxRange].forEach((v) => v.addEventListener('change', () => DB.filter.setParam('maxQuantity', v.value)));
    this.filterWrapper.appendEl(this.slider);
  }
}
