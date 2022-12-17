import BaseComponent from './elements/base-component';
import Button from './elements/button';
import Filters from './filters/filtres';
import ProductCard from './product/product-card';
import StoreContent from './store-content';
import ProductsListState from '../states/goods-state';
import { Keyboard } from '../services/db/Keyboard';
import { DB } from '../services/db/Database';
import { ChangeView } from './elements/change-view';

export default class Store extends BaseComponent {
  private title: BaseComponent;

  private container: BaseComponent;

  private wrapper: BaseComponent;

  private contentWrapper: BaseComponent;

  private showFiltersBtn: BaseComponent;

  private storeList: StoreContent;

  private storeItems: ProductCard[];

  private notFound: BaseComponent;

  private filters: Filters;

  private changeView: ChangeView;

  constructor(private productsState: ProductsListState) {
    super({ tag: 'section', className: 'store' });
    this.container = new BaseComponent({ className: 'container' });
    this.wrapper = new BaseComponent({ className: 'store__wrapper' });
    this.changeView = new ChangeView();
    this.title = new BaseComponent({ tag: 'h1', className: 'store__title', text: 'Клавиатуры' });
    this.showFiltersBtn = new Button({ className: 'store__filter', text: 'Фильтры' });
    this.contentWrapper = new BaseComponent({ className: 'store__content' });
    this.notFound = new BaseComponent({ className: 'store__not-found', text: 'Нет результатов' });
    this.storeList = new StoreContent();
    this.filters = new Filters(this.productsState);
    this.storeItems = DB.keyboards.map((item: Keyboard) => new ProductCard(item));
    this.showFiltersBtn.getNode().addEventListener('click', () => {
      this.wrapper.getNode().classList.toggle('store__wrapper_is-open');
      if (this.wrapper.getNode().classList.contains('store__wrapper_is-open')) {
        this.contentWrapper.getNode().prepend(this.filters.getNode());
      } else {
        this.filters.destroy();
      }
    });
  }
  
  update = (state: Keyboard[]) => {
    this.storeItems = state.map((item: Keyboard) => new ProductCard(item));
    this.storeList.getNode().replaceChildren();
    this.storeList.appendEl(this.storeItems);
    if (this.storeItems.length === 0) this.storeList.appendEl(this.notFound);
  };
  
  render() {
    this.appendEl(this.container);
    this.container.appendEl(this.wrapper);
    this.wrapper.appendEl([this.title, this.showFiltersBtn, this.contentWrapper]);
    this.contentWrapper.appendEl(this.storeList);
    this.contentWrapper.appendEl(this.changeView);
    this.storeList.appendEl(this.storeItems);
    this.productsState.add(this.update);
    this.update(this.productsState.get());
  }
}
