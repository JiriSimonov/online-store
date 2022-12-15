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
    this.goodsProps = {
      search: '',
      inStock: false,
      brand: '',
      features: '',
      size: '',
    };
  }

  set(newVal: Partial<ProductsFilterProps>) {
    this.goodsProps = { ...this.goodsProps, ...newVal };
    this.goodsItemsFiltred = this.goodsItems
      .filter((item) => item.title.includes(this.goodsProps.search ? this.goodsProps.search : '')
    && (this.goodsProps.inStock ? item.isAvailable : item)
    && (item.title.includes(this.goodsProps.brand ? this.goodsProps.brand : ''))
    && (item.brands.join(',').includes(this.goodsProps.brand ? this.goodsProps.brand : ''))
    && (item.size.includes(this.goodsProps.size ? this.goodsProps.size : ''))
    && (item.features.join(',').includes(this.goodsProps.features ? this.goodsProps.features : '')));
    this.emit(this.goodsItemsFiltred);
  } // TODO пока хз как со свичами, не идет

  get props() {
    return this.goodsProps;
  }

  get() {
    return this.goodsItemsFiltred;
  }
}
