import { Button } from '../elements/button';
import { DescriptionField } from '../elements/description-field';
import { Keyboard } from '../../services/db/keyboard';
import { ProductCard } from '../product/product-card';
import { BaseComponent } from '../elements/base-component';
import { DB } from '../../services/db/database';
import { emitter } from '../../services/event-emitter';

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
    this.card = new ProductCard(keyboard, 'div');
    this.container.appendEl(this.card);
    this.btnWrapper = new BaseComponent({ className: 'product__wrapper', parent: this.node });
    this.backBtn = new Button({
      className: 'cart__btn',
      text: 'Назад',
      parent: this.btnWrapper.getNode(),
      onclick: () => {(window.location.hash = '#store')},
    });
    this.cartBtn = new Button({
      className: 'cart__btn',
      text: 'Оформить заказ',
      onclick: () => {window.location.hash = '#cart'} 
    });
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
    const renderCartBtn = () => {
      if (DB.cart.isInCart(keyboard.id, this.card.getSelectedSwitch()?.getSwitch().id)) {
        this.btnWrapper.appendEl(this.cartBtn);
      } else this.cartBtn.destroy()
    }
    renderCartBtn();

    emitter.subscribe('product-card__cardBtn_clicked', renderCartBtn)
    emitter.subscribe('product-card__switch-radio_clicked', renderCartBtn)

    this.descrList.appendEl(this.descrFields);
  }
}
