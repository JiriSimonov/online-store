import BaseComponent from './elements/base-component';
import Button from './elements/button';
import Filters from './filters/filtres';
import ProductCard from './product/product-card';
import StoreContent from './store-content';
import { KeyboardProps } from '../interfaces/interfaces';

const keyboardsList = require('../data/keyboards.json');

export default class Store extends BaseComponent {
  private title: BaseComponent;

  private container: BaseComponent;

  private wrapper: BaseComponent;

  private contentWrapper: BaseComponent;

  private showFiltersBtn: BaseComponent;

  private storeList: StoreContent;

  private storeItems: ProductCard[];

  private filters: Filters;

  constructor() {
    super({ tag: 'section', className: 'store' });
    this.container = new BaseComponent({ className: 'container' });
    this.wrapper = new BaseComponent({ className: 'store__wrapper' });
    this.title = new BaseComponent({ tag: 'h1', className: 'store__title', text: 'Клавиатуры' });
    this.showFiltersBtn = new Button({ className: 'store__filter', text: 'Фильтры' });
    this.contentWrapper = new BaseComponent({ className: 'store__content' });
    this.storeList = new StoreContent();
    this.storeItems = keyboardsList.map((item: KeyboardProps) => new ProductCard(item));
    this.filters = new Filters();
    this.showFiltersBtn.getNode().addEventListener('click', () => {
      this.wrapper.getNode().classList.toggle('store__wrapper_is-open');
    });
  }

  render() {
    this.appendEl(this.container);
    this.container.appendEl(this.wrapper);
    this.wrapper.appendEl([this.title, this.showFiltersBtn, this.contentWrapper]);
    this.contentWrapper.appendEl([this.filters, this.storeList]);
    this.storeList.appendEl(this.storeItems);
  }
}
