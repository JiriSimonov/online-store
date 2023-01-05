import { Component } from './elements/base-component';
import { Button } from './elements/button-component';
import { Filters } from './filters/filtres';
import { ProductCard } from './product/product-card';
import { Keyboard } from '../services/db/keyboard';
import { StoreContent } from './store-content';
import { ChangeView } from './elements/change-view';
import { SortFilter } from './filters/sort-filter';
import { DB } from '../services/db/database';
import { getChunk, getNoun } from '../utils/utils';
import { Burger } from './elements/burger-menu';
import { Section } from './elements/section-component';
import { Heading } from './elements/heading-component';

export class Store extends Section {
  private chunkSize = 20;
  private chunkNumber = 0;

  private container = new Component({ className: 'container' });
  private wrapper = new Component({
    className: `store__wrapper${DB.filter.getParam('filters') ? ' store__wrapper_is-open' : ''}`,
  });

  private title = new Heading({ tag: 'h1', className: 'store__title', textContent: 'Клавиатуры' });
  private showFiltersBtn = new Button({ className: 'store__filter', textContent: 'Фильтры' });
  private contentWrapper = new Component({ className: 'store__content' });
  private storeList = new StoreContent();
  private storeItems: ProductCard[] = [];
  private changeView = new ChangeView();
  private sortFilter = new SortFilter();
  private burger = new Burger();
  private goodsCount = new Component({ className: 'store__goods-count' });
  private filters = new Filters(this.wrapper);
  private nextButton = new Button({
    textContent: 'Показать еще',
    className: 'store__more',
    onclick: () => {
      this.storeList.append(...this.chunk);
      this.renderBottomButton();
    },
  });
  private scrollButton = new Button({
    textContent: 'Наверх',
    className: 'store__more',
    onclick: () => window.scrollTo({ behavior: 'smooth', top: 0 }),
  });

  constructor() {
    super({ className: 'store' });
    this.showFiltersBtn.node.onclick = () => {
      const { classList } = this.wrapper.node;
      if (!classList.contains('store__wrapper_is-open')) {
        this.contentWrapper.node.prepend(this.filters.node);
        classList.add('store__wrapper_is-open');
        DB.filter.setParam('filters', 'true');
      } else {
        this.filters.destroy();
        classList.remove('store__wrapper_is-open');
        DB.filter.setParam('filters');
      }
    };
    this.burger.node.onclick = () => {
      this.sortFilter.node.classList.toggle('sort_is-open');
      this.burger.node.classList.toggle('burger_is-open');
    };
    this.sortFilter.getResertSortNode().onclick = () => {
      this.sortFilter.node.classList.toggle('sort_is-open');
      this.burger.node.classList.toggle('burger_is-open');
      this.sortFilter.uncheckAll();
    };
    this.append(this.container);
    this.container.append(this.wrapper);
    this.wrapper.append(this.title, this.showFiltersBtn, this.contentWrapper);
    this.contentWrapper.append(this.storeList, this.changeView);
    this.changeView.append(this.sortFilter, this.burger);
    if (DB.filter.getParam('filters')) this.contentWrapper.node.prepend(this.filters.node);
    window.addEventListener('hashchange', () => {
      this.update();
      if (!DB.filter.getParam('sortType')) this.sortFilter.uncheckAll();
    });
    this.update();
  }

  update = () => {
    this.chunkNumber = 0;
    this.storeItems = this.chunk;
    this.storeList.node.replaceChildren();
    this.storeList.append(...this.storeItems);
    this.contentWrapper.append(this.goodsCount);
    const num = DB.filter.list.length;
    let message = 'По вашему запросу ';
    switch (num) {
      case 0:
        message += 'нет результатов';
        break;
      case DB.keyboards.length:
        message = '';
        break;
      default:
        message += `${num > 1 ? 'найдено' : 'найден'} ${num} ${getNoun(num, 'результат', 'результата', 'результатов')}`;
        break;
    }
    this.goodsCount.setText(message);
    this.renderBottomButton();
  };

  private get chunk(): ProductCard[] {
    const [type, direction] = [DB.filter.getParam('sortType'), DB.filter.getParam('sortOrder')];
    const sorted = DB.getSortedKeyboards(type, direction, DB.filter.list);
    return getChunk(this.chunkNumber++, this.chunkSize, sorted).map((item: Keyboard) => new ProductCard(item));
  }

  private renderBottomButton() {
    const [length, number, size] = [DB.filter.list.length, this.chunkNumber, this.chunkSize];
    const [next, scroll] = [this.nextButton.node, this.scrollButton.node];

    next.remove();

    if (length >= size) this.wrapper.append(next);

    if (number * size >= length) next.replaceWith(scroll);
    else scroll.replaceWith(next);
  }
}
