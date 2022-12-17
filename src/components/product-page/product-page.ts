import { Button } from './../elements/button';
import { DescriptionField } from './../elements/description-field';
import { Keyboard } from './../../services/db/Keyboard';
import { ProductCard } from './../product/product-card';
import { BaseComponent } from '../elements/base-component';

export class ProductPage extends BaseComponent {
  private card: ProductCard;
  private descrFields: DescriptionField[];
  private descrList: BaseComponent;
  private title: BaseComponent;
  private backBtn: Button;

  constructor(keyboard: Keyboard) {
    super({ className: 'container store product'});
    this.card = new ProductCard(keyboard);
    this.appendEl(this.card);
    this.backBtn = new Button({ className: 'cart__btn', text: 'Назад', parent: this.node, onclick: () => window.location.hash = '#store' });
    this.title = new BaseComponent({ tag: 'h2', className: 'product__title', text: 'Характеристики', parent: this.card.getNode() });
    this.descrFields = Object.entries(keyboard.properties).map((item) => new DescriptionField({key: item[0], value: item[1].join('\n')}));
    this.descrList = new BaseComponent({ tag: 'ul', className: 'product__list', parent: this.card.getNode() });
    this.descrList.appendEl(this.descrFields);
  }
}
