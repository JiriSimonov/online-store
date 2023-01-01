import { ProductPath } from './product-path';
import { Button } from '../elements/button';
import { DescriptionField } from '../elements/description-field';
import { Keyboard } from '../../services/db/keyboard';
import { ProductCard } from '../product/product-card';
import { BaseComponent } from '../elements/base-component';
import { ThumbNails } from './product-thumbnails';

export class ProductPage extends BaseComponent {
  private container = new BaseComponent({ className: 'store product' });
  private card: ProductCard;
  private productPath: ProductPath;
  private thumbnails: ThumbNails;
  private title = new BaseComponent({ tag: 'h2', className: 'product__title', text: 'Характеристики' });
  private descrList = new BaseComponent({ tag: 'ul', className: 'product__list' });

  private descrFields: DescriptionField[];

  private btnWrapper = new BaseComponent({ className: 'product__wrapper' });
  private backBtn = new Button({
    className: 'cart__btn',
    text: 'Назад',
    onclick: () => {
      window.location.hash = '#store';
    },
  });
  private cartBtn = new Button({
    className: 'cart__btn',
    text: 'Оформить заказ',
    onclick: () => {
      window.location.hash = '#cart';
    },
  });

  constructor(keyboard: Keyboard) {
    super({ className: 'container' });
    this.card = new ProductCard(keyboard, 'div');
    this.productPath = new ProductPath(keyboard.title);
    this.thumbnails = new ThumbNails(keyboard);
    this.descrFields = Object.entries(keyboard.properties).map((prop) => {
      const [title, list] = prop;
      return new DescriptionField({ key: title, value: list.join('\n') });
    });

    this.appendEl(this.container);
    this.container.appendEl([this.card, this.btnWrapper]);
    this.card.getNode().prepend(this.productPath.getNode());
    this.card.appendEl([this.thumbnails, this.title, this.descrList]);
    this.descrList.appendEl(this.descrFields);
    this.btnWrapper.appendEl(this.backBtn);
    if (keyboard.isAvailable) this.btnWrapper.appendEl(this.cartBtn);
  }
}
