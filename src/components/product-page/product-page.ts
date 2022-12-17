import { Keyboard } from './../../services/db/Keyboard';
import { ProductCard } from './../product/product-card';
import { DB } from '../../services/db/Database';
import { BaseComponent } from '../elements/base-component';


export class ProductPage extends BaseComponent {
  private card: ProductCard;
  constructor(keyboard: Keyboard) {
    super({ className: 'container store product'});
    this.card = new ProductCard(keyboard);
    this.appendEl(this.card);
  }
}
