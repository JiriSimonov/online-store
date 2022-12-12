import BaseComponent from './elements/base-component';
import Button from './elements/button';
import Filters from './filters/filtres';
import ProductCard from './product/product-card';
import StoreContent from './store-content';
import { KeyboardProps } from '../interfaces/interfaces';
import { getKeyboardsList } from '../utils/get-keyboards-data';
import ProductsListState from '../states/goods-state';

const keyboardsList: KeyboardProps[] = getKeyboardsList();

export default class Store extends BaseComponent {
  private title: BaseComponent;

  private container: BaseComponent;

  private wrapper: BaseComponent;

  private contentWrapper: BaseComponent;

  private showFiltersBtn: BaseComponent;

  private storeList: StoreContent;

  private storeItems: ProductCard[];

  private filters: Filters;

  constructor(private productsState: ProductsListState) {
    super({ tag: 'section', className: 'store' });
    this.container = new BaseComponent({ className: 'container' });
    this.wrapper = new BaseComponent({ className: 'store__wrapper' });
    this.title = new BaseComponent({ tag: 'h1', className: 'store__title', text: 'Клавиатуры' });
    this.showFiltersBtn = new Button({ className: 'store__filter', text: 'Фильтры' });
    this.contentWrapper = new BaseComponent({ className: 'store__content' });
    this.storeList = new StoreContent();
    this.filters = new Filters(this.productsState);
    this.storeItems = keyboardsList.map((item: KeyboardProps) => new ProductCard(item));
    this.showFiltersBtn.getNode().addEventListener('click', () => {
      this.wrapper.getNode().classList.toggle('store__wrapper_is-open');
      if (this.wrapper.getNode().classList.contains('store__wrapper_is-open')) {
        this.contentWrapper.getNode().prepend(this.filters.getNode());
      } else {
        this.filters.destroy();
      }
    });
  }

  update = (state: KeyboardProps[]) => {
    this.storeItems = state.map((item: KeyboardProps) => new ProductCard(item));
    this.storeList.getNode().replaceChildren();
    this.storeList.appendEl(this.storeItems);
    console.log(this.productsState.get());
  };

  render() {
    this.appendEl(this.container);
    this.container.appendEl(this.wrapper);
    this.wrapper.appendEl([this.title, this.showFiltersBtn, this.contentWrapper]);
    this.contentWrapper.appendEl(this.storeList);
    this.storeList.appendEl(this.storeItems);
    this.productsState.add(this.update);
    this.update(this.productsState.get());
  }
}
