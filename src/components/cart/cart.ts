import { ActivePromo } from './active-promo';
import { DB } from '../../services/db/database';
import { BaseComponent } from '../elements/base-component';
import { Button } from '../elements/button';
import { CartItemElem } from './cart-item';
import { CartList } from './cart-list';
import { PromoForm } from './cart-promo';
import { OrderForm } from './order-form';
import { ChangeView } from '../elements/change-view';
import { emitter } from '../../services/event-emitter';

export class Cart extends BaseComponent {
  private container = new BaseComponent({ className: 'container' });
  private wrapper = new BaseComponent({ className: 'cart__wrapper' });
  private changeView = new ChangeView();
  private cartButton = new Button({
    className: 'cart__btn',
    text: 'Продолжить покупки',
    onclick: () => {
      window.location.hash = '#store';
    },
  });
  private cartList = new CartList();
  private cartItems = DB.cart.list.map((item) => new CartItemElem(item));
  private cartPromoWrapper = new BaseComponent({ className: 'promo' });
  private cartPromoForm = new PromoForm();
  private cartPromoTitle = new BaseComponent({
    tag: 'h3',
    text: 'Активные промокоды',
    className: 'promo__title',
    parent: this.cartPromoWrapper.getNode()
  });
  private cartPromoItems = [
    new ActivePromo('hesoyam', '20%'),
    new ActivePromo('hesoyam', '20%'),
    new ActivePromo('hesoyam', '20%')
  ];
  private cartPromoList = new BaseComponent({ tag: 'ul', className: 'promo-active' });
  private cartPromoBtn = new Button({
    className: 'promo__btn',
    text: 'Есть промокод?',
    onclick: () => {
      this.cartPromoBtn.getNode().setAttribute('disabled', 'true');
      this.cartPromoWrapper.appendEl(this.cartPromoForm);
    },
  });
  private cartPriceWrapper = new BaseComponent({ className: 'cart-price' });
  private cartPriceText = new BaseComponent({ tag: 'span', className: 'cart-price__text', text: 'Итог' });
  private cartPriceTotal = new BaseComponent({
    tag: 'span',
    className: 'cart-price__total',
    text: `${DB.cart.sumPrice}`,
  });
  private cartCurrentPrice = new BaseComponent({ tag: 'span', className: 'cart-currrent-price', text: '' });
  private orderBtn = new Button({
    className: 'cart__order', text: 'Продолжить оформление',
    onclick: () => this.openOrderForm(),
  });
  private orderForm = new OrderForm();

  constructor() {
    super({ tag: 'section', className: 'cart' });

    this.appendEl(this.container);
    this.container.appendEl(this.wrapper);
    this.wrapper.appendEl([
      this.changeView,
      this.cartButton,
      this.cartList,
      this.cartPromoWrapper,
      this.cartPriceWrapper,
      this.orderBtn,
    ]);
    this.cartList.appendEl(this.cartItems);
    this.cartPriceWrapper.appendEl([this.cartPriceText, this.cartPriceTotal]);
    this.cartPromoWrapper.appendEl([this.cartPromoList, this.cartPromoBtn]);
    this.cartPromoList.appendEl(this.cartPromoItems);

    emitter.subscribe('product-card__buyNowBtn_clicked', () => {
      //? либо так либо так
      // this.orderBtn.getNode().click()
      // openOrderForm();
    });
    emitter.subscribe('cart__save', () => {
      this.cartPriceTotal.getNode().textContent
        = `${DB.cart.sumPrice}`;
        this.cartCurrentPrice.getNode().textContent
        = `${DB.cart.promo.getDiscounted(DB.cart.sumPrice)}`;
        this.cartPriceTotal.getNode().classList.add('cart-price__total_is-disc');
        // TODO! нужна проверка на наличие активного промокода
    });
    emitter.subscribe('cart-promocode-click', () => {
      this.cartPriceTotal.appendEl(this.cartCurrentPrice);
      this.cartCurrentPrice.getNode().textContent
        = `${DB.cart.promo.getDiscounted(DB.cart.sumPrice)}`;
        this.cartPriceTotal.getNode().classList.add('cart-price__total_is-disc');
    });
  }

  private openOrderForm() {
    this.orderForm = new OrderForm();
    //? если аппендить в body, то хотя бы отрисовывается
    // this.wrapper.appendEl(this.orderForm);
    // document.body.append(this.orderForm.getNode());
    document.body.append(this.orderForm.getNode());
    document.body.classList.add('no-scroll');
  }
}
