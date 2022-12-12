import { ProductsFilterProps, KeyboardProps } from '../interfaces/interfaces';
import Observable from '../services/observer';

export default class ProductsListState extends Observable<KeyboardProps[]> {
  private goodsItems;

  private goodsItemsFiltred;

  private goodsProps: Partial<ProductsFilterProps>;

  constructor(initialVal: KeyboardProps[]) {
    super();
    this.goodsItems = initialVal;
    this.goodsItemsFiltred = initialVal;
    this.goodsProps = { search: '', inStock: false };
  }

  set(newVal: Partial<ProductsFilterProps>) {
    this.goodsProps = { ...this.goodsProps, ...newVal };
    this.goodsItemsFiltred = this.goodsItems
      .filter((item) => item.title.includes(this.goodsProps.search ? this.goodsProps.search : '')
      && (this.goodsProps.inStock ? item.isAvailable : item));
    this.emit(this.goodsItemsFiltred);
  }

  get props() {
    return this.goodsProps;
  }

  get() {
    return this.goodsItemsFiltred;
  }
}
