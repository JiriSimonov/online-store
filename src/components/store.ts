import { KeyboardProps } from '../interfaces/interfaces';
// import Anchor from './anchor';
import BaseComponent from './base-component';
import ProductCard from './product-card';
import StoreContent from './store-content';

const keyboardsList = require('../data/keyboards.json');

export default class Store extends BaseComponent {
  private title: BaseComponent;

  private container: BaseComponent;

  private wrapper: BaseComponent;

  private showFiltersBtn: BaseComponent;

  private storeList: StoreContent;

  private storeItems: ProductCard[];

  constructor() {
    super({ tag: 'section', className: 'store' });
    this.container = new BaseComponent({ className: 'container' });
    this.wrapper = new BaseComponent({ className: 'store__wrapper' });
    this.title = new BaseComponent({ tag: 'h1', className: 'store__title', text: 'Клавиатуры' });
    this.showFiltersBtn = new BaseComponent({ tag: 'button', className: 'store__filter', text: 'Фильтры' });
    this.storeList = new StoreContent();
    this.storeItems = keyboardsList.map((item: KeyboardProps) => new ProductCard(item));
  }

  render() {
    this.appendEl(this.container);
    this.container.appendEl(this.wrapper);
    this.wrapper.appendEl([this.title, this.showFiltersBtn, this.storeList]);
    this.storeList.appendEl(this.storeItems);
  }
}
