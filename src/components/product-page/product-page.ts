import { ProductPath } from './product-path';
import { Button } from '../elements/button-component';
import { DescriptionField } from '../elements/description-field';
import { Keyboard } from '../../services/db/keyboard';
import { ProductCard } from '../product/product-card';
import { Component } from '../elements/base-component';
import { ThumbNails } from './product-thumbnails';
import { Heading } from '../elements/heading-component';

export class ProductPage extends Component {
  private container = new Component({ className: 'store product' });
  private card: ProductCard;
  private productPath: ProductPath;
  private thumbnails: ThumbNails;
  private title = new Heading({ className: 'product__title', textContent: 'Характеристики' });
  private descrList = new Component({ tag: 'ul', className: 'product__list' });

  private descrFields: DescriptionField[];

  private btnWrapper = new Component({ className: 'product__wrapper' });
  private backBtn = new Button({
    className: 'cart__btn',
    textContent: 'Назад',
    onclick: () => {
      window.history.back();
    },
  });
  private cartBtn = new Button({
    className: 'cart__btn',
    textContent: 'Оформить заказ',
    onclick: () => {
      window.location.hash = '/cart';
    },
  });

  constructor(keyboard: Keyboard) {
    super({ className: 'container' });
    this.card = new ProductCard(keyboard, 'div');
    this.productPath = new ProductPath(keyboard);
    this.thumbnails = new ThumbNails(keyboard);
    this.descrFields = Object.entries(keyboard.properties).map((prop) => {
      const [title, list] = prop;
      return new DescriptionField({ key: title, value: list.join('\n') });
    });

    this.append(this.container);
    this.container.append(this.card, this.btnWrapper);
    this.card.prepend(this.productPath);
    this.card.append(this.thumbnails, this.title, this.descrList);
    this.descrList.append(...this.descrFields);
    this.btnWrapper.append(this.backBtn);
    if (keyboard.isAvailable) {
      this.btnWrapper.append(this.cartBtn);
    }
  }
}
