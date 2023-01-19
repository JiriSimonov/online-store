import { getChunk } from '../../utils/utils';
import { Cart } from './cart';
import { Filter } from './filter';

export class Pagination {
  constructor(private cart: Cart, private defaultNumber: number, private defaultSize: number, private filter: Filter) {}

  private getValue(param: 'cartPageSize' | 'cartPage', defaultValue: number, max: number) {
    const query = +this.filter.getParam(param);
    const value = Number.isInteger(query) && query > 0 ? query : defaultValue;
    return value < max ? value : max;
  }

  private get list() {
    return this.cart.list;
  }

  get pageSize() {
    const { length } = this.list;
    return this.getValue('cartPageSize', this.defaultSize, length > this.defaultSize ? length : this.defaultSize);
  }

  get lastPage() {
    return `${Math.ceil(this.list.length / this.pageSize)}`;
  }

  get pageNumber() {
    return this.getValue('cartPage', this.defaultNumber, +this.lastPage);
  }

  get chunk() {
    return getChunk(this.pageNumber - 1, this.pageSize, this.list);
  }

  get firstindex() {
    return (this.pageNumber - 1) * this.pageSize + 1;
  }

  setPage(n: string) {
    this.filter.setParam('cartPage', n);
  }
}
