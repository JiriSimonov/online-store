import { BaseComponent } from './elements/base-component';
import { Button } from './elements/button';
import { Filters } from './filters/filtres';
import { ProductCard } from './product/product-card';
import { Keyboard } from '../services/db/keyboard';
import { StoreContent } from './store-content';
import { ChangeView } from './elements/change-view';
import { SortFilter } from './filters/sort-filter';
import { DB } from '../services/db/database';
import { getChunk, getNoun } from '../utils/utils';
import { Burger } from './elements/burger-menu';

export class Store extends BaseComponent {
  private chunkSize = 20;
  private chunkNumber = 0;

  private container = new BaseComponent({ className: 'container' });
  private wrapper = new BaseComponent({
    className: `store__wrapper${DB.filter.getParam('filters') ? ' store__wrapper_is-open' : ''}`,
  });
  private title = new BaseComponent({ tag: 'h1', className: 'store__title', text: 'Клавиатуры' });
  private showFiltersBtn = new Button({ className: 'store__filter', text: 'Фильтры' });
  private contentWrapper = new BaseComponent({ className: 'store__content' });
  private storeList = new StoreContent();
  private storeItems: ProductCard[] = [];
  private changeView = new ChangeView();
  private sortFilter = new SortFilter();
  private burger = new Burger();
  private goodsCount = new BaseComponent({ className: 'store__goods-count' });
  private filters = new Filters(this.wrapper);
  private nextButton = new Button({
    text: 'Показать еще',
    className: 'store__more',
    onclick: () => {
      this.storeList.appendEl(this.chunk);
      this.renderBottomButton();
    },
  });
  private scrollButton = new Button({
    text: 'Наверх',
    className: 'store__more',
    onclick: () => window.scrollTo({ behavior: 'smooth', top: 0 }),
  });

  constructor() {
    super({ tag: 'section', className: 'store' });
    this.showFiltersBtn.getNode().onclick = () => {
      const { classList } = this.wrapper.getNode();
      if (!classList.contains('store__wrapper_is-open')) {
        this.contentWrapper.getNode().prepend(this.filters.getNode());
        classList.add('store__wrapper_is-open');
        DB.filter.setParam('filters', 'true');
      } else {
        this.filters.destroy();
        classList.remove('store__wrapper_is-open');
        DB.filter.setParam('filters');
      }
    };
    this.burger.getNode().onclick = () => {
      this.sortFilter.getNode().classList.toggle('sort_is-open');
      this.burger.getNode().classList.toggle('burger_is-open');
    };
    this.sortFilter.getResertSortNode().onclick = () => {
      this.sortFilter.getNode().classList.toggle('sort_is-open');
      this.burger.getNode().classList.toggle('burger_is-open');
    }
    this.appendEl(this.container);
    this.container.appendEl(this.wrapper);
    this.wrapper.appendEl([this.title, this.showFiltersBtn, this.contentWrapper]);
    this.contentWrapper.appendEl([this.storeList, this.changeView]);
    this.changeView.appendEl([this.sortFilter, this.burger]);
    if (DB.filter.getParam('filters')) this.contentWrapper.getNode().prepend(this.filters.getNode());
    window.addEventListener('hashchange', () => this.update());
    this.update();
  }

  update = () => {
    this.chunkNumber = 0;
    this.storeItems = this.chunk;
    this.storeList.getNode().replaceChildren();
    this.storeList.appendEl(this.storeItems);
    this.contentWrapper.appendEl(this.goodsCount);
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
    const [type, direction] = [DB.filter.getParam('sortType'), DB.filter.getParam('sortDirection')];
    const sorted = DB.getSortedKeyboards(type, direction, DB.filter.list);
    return getChunk(this.chunkNumber++, this.chunkSize, sorted).map((item: Keyboard) => new ProductCard(item));
  }

  private renderBottomButton() {
    const [length, number, size] = [DB.filter.list.length, this.chunkNumber, this.chunkSize];
    const [next, scroll] = [this.nextButton.getNode(), this.scrollButton.getNode()];

    next.remove();

    if (length >= size) this.wrapper.appendEl(next);

    if (number * size >= length) next.replaceWith(scroll);
    else scroll.replaceWith(next);
  }
}
