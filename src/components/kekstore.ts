import { BaseComponent } from './elements/base-component';
import { Button } from './elements/button';
import { Filters } from './filters/filtres';
import { ProductCard } from './product/product-card';
import { StoreContent } from './store-content';
import { ProductsListState } from '../states/goods-state';
import { Keyboard } from '../services/db/keyboard';
import { ChangeView } from './elements/change-view';
import { DB } from '../services/db/database';

export class KekStore extends BaseComponent {
  private chunkSize = 20;
  private chunkNumber = 0;

  private container = new BaseComponent({ className: 'container' });
  private wrapper = new BaseComponent({ className: 'store__wrapper' });
  private title = new BaseComponent<HTMLHeadingElement>({ tag: 'h1', className: 'store__title', text: 'Клавиатуры' });
  private showFiltersBtn = new Button({ className: 'store__filter', text: 'Фильтры' });
  private contentWrapper = new BaseComponent({ className: 'store__content' });
  private storeList = new StoreContent();
  private storeItems: ProductCard[] = [];
  private changeView = new ChangeView();
  private notFound = new BaseComponent({ className: 'store__not-found', text: 'Нет результатов' });

  private filters: Filters;
  private nextButton = new Button({
    text: 'next',
    onclick: () => {
      this.storeList.appendEl(this.chunk);
      this.renderBottomButton();
    },
  });
  private scrollButton = new Button({ text: 'NAVERH', onclick: () => window.scrollTo({ behavior: 'smooth', top: 0 }) });

  constructor(private productsState: ProductsListState) {
    super({ tag: 'section', className: 'store' });
    this.filters = new Filters(this.productsState);
    this.showFiltersBtn.getNode().onclick = () => {
      const { classList } = this.wrapper.getNode();
      classList.toggle('store__wrapper_is-open');
      if (!classList.contains('store__wrapper_is-open')) this.filters.destroy();
      else this.contentWrapper.getNode().prepend(this.filters.getNode());
    };

    this.appendEl(this.container);
    this.container.appendEl(this.wrapper);
    this.wrapper.appendEl([this.title, this.showFiltersBtn, this.contentWrapper]);
    this.contentWrapper.appendEl([this.storeList, this.changeView]);

    this.productsState.add(this.update);

    [this.nextButton, this.scrollButton].forEach((el) =>
      el.setStyleAttr(
        ['marginBottom', '.5rem'],
        ['width', '100%'],
        ['height', '100px'],
        ['fontSize', '3rem'],
        ['backgroundColor', '#0f0'],
      ),
    );

    this.update();
  }

  update = () => {
    this.chunkNumber = 0;
    this.scrollButton.getNode().replaceWith(this.nextButton.getNode());
    this.storeItems = this.chunk;
    this.storeList.getNode().replaceChildren();
    this.storeList.appendEl(this.storeItems);
    if (this.storeItems.length === 0) this.storeList.appendEl(this.notFound);
    this.renderBottomButton();
  };

  private get chunk() {
    return DB.getChunk(this.chunkNumber++, this.chunkSize, this.productsState.get()).map(
      (item: Keyboard) => new ProductCard(item),
    );
  }

  private renderBottomButton() {
    const [length, number, size] = [this.productsState.get().length, this.chunkNumber, this.chunkSize];
    const [next, scroll] = [this.nextButton.getNode(), this.scrollButton.getNode()];

    next.remove();

    if (length >= size) this.wrapper.appendEl(next);

    if (number * size >= length) next.replaceWith(scroll);
    else scroll.replaceWith(next);
  }
}
