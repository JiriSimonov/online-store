import { CartPagination } from './cart-pagination';
import { ActivePromo } from './active-promo';
import { DB } from '../../services/db/database';
import { Component } from '../elements/base-component';
import { Button } from '../elements/button-component';
import { CartItemElem } from './cart-item';
import { CartList } from './cart-list';
import { PromoForm } from './cart-promo';
import { OrderForm } from './order-form';
import { ChangeView } from '../elements/change-view';
import { FormField } from '../elements/form-field';
import { emitter } from '../../services/event-emitter';
import { getNoun } from '../../utils/utils';
import { Pagination } from '../../services/db/pagination';
import { Section } from '../elements/section-component';
import { Heading } from '../elements/heading-component';

export class Cart extends Section {
  private pagination = new Pagination(DB.cart, 1, 4, DB.filter);

  private container = new Component({ className: 'container' });
  private wrapper = new Component({ className: 'cart__wrapper' });

  private cartTitle = new Heading({ className: 'cart__title', textContent: 'Корзина пуста' });

  private cartButton = new Button({
    className: 'cart__btn',
    textContent: 'Продолжить покупки',
    onclick: () => {
      window.location.hash = '#store';
    },
  });
  private changeView = new ChangeView();

  private cartPagination = new CartPagination(`${this.pagination.pageSize}`);

  private cartList = new CartList();
  private cartItems: CartItemElem[];

  private pagBtn = new Component({ className: 'pagination-btn' });
  private pagDec = new Button({
    className: 'pagination-btn__dec',
    onclick: () => {
      const input = this.pagCountField.getInputNode();

      input.stepDown();
      /* input.dispatchEvent(new Event('input')); */
      input.dispatchEvent(new Event('change'));
      window.scrollTo(0, 0);
    },
  });
  private pagCountField = new FormField({
    className: 'pagination-btn',
    type: 'number',
    value: `${this.pagination.pageNumber}`,
    min: '1',
    max: `${this.pagination.lastPage}`,
    pattern: '[0-9]{2}',
  });
  private pagInc = new Button({
    className: 'pagination-btn__inc',
    onclick: () => {
      const input = this.pagCountField.getInputNode();

      input.stepUp();
      input.dispatchEvent(new Event('change'));
      window.scrollTo(0, 0);
    },
  });

  private cartPromoWrapper = new Component({ className: 'promo' });

  private cartPromoTitle = new Component({ tag: 'h3', textContent: 'Активные промокоды', className: 'promo__title' });
  private cartPromoList = new Component({ tag: 'ul', className: 'promo-active' });

  private cartPromoForm = new PromoForm();
  private cartPromoBtn = new Button({
    className: 'promo__btn',
    textContent: 'Есть промокод?',
    onclick: () => {
      this.cartPromoBtn.disabled = true;
      this.cartPromoWrapper.append(this.cartPromoForm);
    },
  });

  private cartPriceWrapper = new Component({ className: 'cart-price' });
  private cartPriceText = new Component({ tag: 'span', className: 'cart-price__text', textContent: 'Итог' });
  private cartPriceTotal = new Component({
    tag: 'span',
    className: 'cart-price__total',
    textContent: `${DB.cart.sumPrice}`,
  });
  private cartCurrentPrice = new Component({ tag: 'span', className: 'cart-price-current' });

  private orderBtn = new Button({
    className: 'cart__order',
    textContent: 'Продолжить оформление',
    onclick: () => this.openOrderForm(),
  });
  private orderForm = new OrderForm();

  constructor() {
    super({ className: 'cart' });
    this.cartItems = DB.cart.list.map((item, index) => new CartItemElem(item, index, this.orderBtn));
    this.append(this.container);
    this.container.append(this.wrapper);
    this.render();
    this.updateActivePromoList();
    this.updateTotalPrice();
    this.updateTotalQuantity();
    this.subscribe();
    this.pagCountField.getInputNode().addEventListener('input', (e) => {
      const { target } = e;
      if (!(target instanceof HTMLInputElement)) return;

      if (target.value === '') return;
      if (+target.value > +target.max) target.value = target.max;
      if (+target.value < +target.min) target.value = target.min;
    });
    this.pagCountField.getInputNode().addEventListener('change', (e) => {
      const { target } = e;
      if (!(target instanceof HTMLInputElement)) return;
      this.pagination.setPage(target.value);
    });
    window.addEventListener('hashchange', () => this.render());
    window.addEventListener('hashchange', () => {
      Object.assign(this.pagCountField.getInputNode(), {
        value: this.pagination.pageNumber,
        max: this.pagination.lastPage,
      });
      this.cartPagination.selected.getInputNode().value = `${this.pagination.pageSize}`;
    });
  }

  private updateTotalPrice(): void {
    const { promo, sumPrice } = DB.cart;
    const { cartCurrentPrice, cartPriceTotal } = this;
    const { classList } = cartPriceTotal;

    cartPriceTotal.setText(`${DB.cart.sumPrice}`);
    if (promo.size && sumPrice) {
      cartCurrentPrice.setText(`${promo.getDiscounted(sumPrice)}`);
      classList.add('cart-price__total_is-disc');
      cartPriceTotal.append(cartCurrentPrice);
    } else {
      classList.remove('cart-price__total_is-disc');
    }
  }

  private updateTotalQuantity() {
    this.cartPriceText.setText(
      `Итого: ${DB.cart.sumQuantity} ${getNoun(DB.cart.sumQuantity, 'товар', 'товара', 'товаров')} на сумму`,
    );
  }

  private updateActivePromoList(): void {
    const { list, size } = DB.cart.promo;
    this.cartPromoList.clear();
    if (size) {
      this.cartPromoList.append(...list.map((item) => new ActivePromo(item[0], `${item[1] * 100}%`)));
      this.cartPromoWrapper.prepend(this.cartPromoTitle, this.cartPromoList);
    } else {
      this.cartPromoTitle.destroy();
      this.cartPromoList.destroy();
    }
  }

  render() {
    if (DB.cart.list.length > 0) {
      this.cartTitle.destroy();
      this.wrapper.append(
        this.changeView,
        this.cartButton,
        this.cartList,
        this.pagBtn,
        this.cartPromoWrapper,
        this.cartPriceWrapper,
        this.orderBtn,
      );
      this.pagBtn.append(this.pagDec, this.pagCountField, this.pagInc);
      this.changeView.append(this.cartPagination);
      this.cartList.clear();
      this.cartList.append(
        ...this.pagination.chunk.map(
          (item, index) => new CartItemElem(item, index + this.pagination.firstindex, this.orderBtn),
        ),
      );
      this.cartPriceWrapper.append(this.cartPriceText, this.cartPriceTotal);
      this.cartPromoWrapper.append(this.cartPromoBtn);
    } else {
      this.wrapper.clear();
      this.wrapper.append(this.cartButton);
      this.wrapper.append(this.cartTitle);
    }
  }

  private openOrderForm(): void {
    this.orderForm = new OrderForm();
    document.body.append(this.orderForm.node);
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
    emitter.subscribe('cart__delete-item', () => {
      this.render();
      this.pagCountField.getInputNode().max = this.pagination.lastPage;
      this.pagination.setPage(`${Math.ceil(this.pagination.firstindex / this.pagination.pageSize)}`);
    });
    return this;
  }
}
