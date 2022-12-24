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
import { getNoun } from '../../utils/get-noun';

export class Cart extends BaseComponent {
  private container = new BaseComponent({ className: 'container' });
  private wrapper = new BaseComponent({ className: 'cart__wrapper' });

  private cartButton = new Button({
    className: 'cart__btn',
    text: 'Продолжить покупки',
    onclick: () => {
      window.location.hash = '#store';
    },
  });
  private changeView = new ChangeView();

  private cartList = new CartList();
  private cartItems = DB.cart.list.map((item) => new CartItemElem(item));

  private cartPromoWrapper = new BaseComponent({ className: 'promo' });

  private cartPromoTitle = new BaseComponent({ tag: 'h3', text: 'Активные промокоды', className: 'promo__title' });
  private cartPromoList = new BaseComponent({ tag: 'ul', className: 'promo-active' });

  private cartPromoForm = new PromoForm();
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
  private cartCurrentPrice = new BaseComponent({ tag: 'span', className: 'cart-price-current' });

  private orderBtn = new Button({
    className: 'cart__order',
    text: 'Продолжить оформление',
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
    this.cartPromoWrapper.appendEl([this.cartPromoBtn]);

    this.updateActivePromoList();
    this.updateTotalPrice();
    this.updateTotalQuantity();
  }

  private updateTotalPrice(): void {
    const { promo, sumPrice } = DB.cart;
    const { cartCurrentPrice, cartPriceTotal } = this;
    const { classList } = cartPriceTotal.getNode();

    cartPriceTotal.setText(`${DB.cart.sumPrice}`);
    if (promo.size && sumPrice) {
      cartCurrentPrice.setText(`${promo.getDiscounted(sumPrice)}`);
      classList.add('cart-price__total_is-disc');
      cartPriceTotal.appendEl(cartCurrentPrice);
    } else {
      classList.remove('cart-price__total_is-disc');
    }
  }

  private updateTotalQuantity() {
    this.cartPriceText
    .setText(`Итого: ${DB.cart.sumQuantity} ${getNoun(DB.cart.sumQuantity, 'товар', 'товара', 'товаров')} на сумму`);
  }

  private updateActivePromoList(): void {
    const { list, size } = DB.cart.promo;
    const [promoWrapper, promoTitle] = [this.cartPromoWrapper.getNode(), this.cartPromoTitle.getNode()];
    this.cartPromoList.clear();
    if (size) {
      this.cartPromoList.appendEl(list.map((item) => new ActivePromo(item[0], `${item[1] * 100}%`)));
      promoWrapper.prepend(promoTitle, this.cartPromoList.getNode());
    } else {
      promoTitle.remove();
      this.cartPromoList.destroy();
    }
  }

  updateCart() {
    this.cartList.clear();
    this.cartItems = DB.cart.list.map((item) => new CartItemElem(item));
    this.cartList.appendEl(this.cartItems);
    return this;
  }

  private openOrderForm(): void {
    this.orderForm = new OrderForm();
    document.body.append(this.orderForm.getNode());
    document.body.classList.add('no-scroll');
  }

  subscribe() {
    emitter.subscribe('product-card__buyNowBtn_clicked', () => {
      this.openOrderForm();
    });
    emitter.subscribe('cart__save', () => {
      this.updateTotalPrice();
      this.updateTotalQuantity();
    });
    emitter.subscribe('promo__save', () => {
      this.updateActivePromoList();
      this.updateTotalPrice();
    });
    return this;
  }
}
