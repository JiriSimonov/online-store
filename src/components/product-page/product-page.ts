import { DB } from './../../services/db/db';
import { Button } from './../elements/button';
import { DescriptionField } from './../elements/description-field';
import { Keyboard } from '../../services/db/keyboard';
import { ProductCard } from './../product/product-card';
import { BaseComponent } from '../elements/base-component';

export class ProductPage extends BaseComponent {
  private container: BaseComponent;

  private card: ProductCard;

  private descrFields: DescriptionField[];

  private descrList: BaseComponent;

  private title: BaseComponent;

  private btnWrapper: BaseComponent;

  private backBtn: Button;

  private cartBtn: Button;

  constructor(keyboard: Keyboard) {
    super({ className: 'container' });
    this.container = new BaseComponent({ className: 'store product', parent: this.node });
    this.card = new ProductCard(keyboard);
    this.container.appendEl(this.card);
    this.btnWrapper = new BaseComponent({ className: 'product__wrapper', parent: this.node });
    this.backBtn = new Button({
      className: 'cart__btn',
      text: 'Назад',
      parent: this.btnWrapper.getNode(),
      onclick: () => (window.location.hash = '#store'),
    });
    this.cartBtn = new Button({  className: 'cart__btn', text: 'Оформить заказ', onclick: () => window.location.hash = '#cart' });
    this.title = new BaseComponent({
      tag: 'h2',
      className: 'product__title',
      text: 'Характеристики',
      parent: this.card.getNode(),
    });
    this.descrFields = Object.entries(keyboard.properties).map(
      (item) => new DescriptionField({ key: item[0], value: item[1].join('\n') }),
    );
    this.descrList = new BaseComponent({
      tag: 'ul',
      className: 'product__list',
      parent: this.card.getNode(),
    });
    if(DB.cart.some((item) => item[0] === keyboard)) this.btnWrapper.appendEl(this.cartBtn); // TODO прокинуть эммитер сюда, что бы появлялась кнопка перейти в корзину
    this.descrList.appendEl(this.descrFields);
  }
}
