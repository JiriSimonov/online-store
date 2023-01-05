import { CartPagination } from './cart-pagination';
import { ActivePromo } from './active-promo';
import { DB } from '../../services/db/database';
import { BaseComponent } from '../elements/base-component';
import { Button } from '../elements/button';
import { CartItemElem } from './cart-item';
import { CartList } from './cart-list';
import { PromoForm } from './cart-promo';
import { OrderForm } from './order-form';
import { ChangeView } from '../elements/change-view';
import { FormField } from '../elements/form-field';
import { emitter } from '../../services/event-emitter';
import { getNoun } from '../../utils/utils';
import { Pagination } from '../../services/db/pagination';

export class Cart extends BaseComponent {
  private pagination = new Pagination(DB.cart, 1, 4, DB.filter);

  private container = new BaseComponent({ className: 'container' });
  private wrapper = new BaseComponent({ className: 'cart__wrapper' });

  private cartTitle = new BaseComponent({ tag: 'h2', className: 'cart__title', text: 'Корзина пока что пуста' });

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

  private pagBtn = new BaseComponent({ className: 'pagination-btn' });
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

  private cartPromoWrapper = new BaseComponent({ className: 'promo' });

  private cartPromoTitle = new BaseComponent({ tag: 'h3', text: 'Активные промокоды', className: 'promo__title' });
  private cartPromoList = new BaseComponent({ tag: 'ul', className: 'promo-active' });

  private cartPromoForm = new PromoForm();
  private cartPromoBtn = new Button({
    className: 'promo__btn',
    textContent: 'Есть промокод?',
    onclick: () => {
      this.cartPromoBtn.node.setAttribute('disabled', 'true');
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
    textContent: 'Продолжить оформление',
    onclick: () => this.openOrderForm(),
  });
  private orderForm = new OrderForm();

  constructor() {
    super({ tag: 'section', className: 'cart' });
    this.cartItems = DB.cart.list.map((item, index) => new CartItemElem(item, index, this.orderBtn));
    this.appendEl(this.container);
    this.container.appendEl(this.wrapper);
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
    const { classList } = cartPriceTotal.node;

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
    this.cartPriceText.setText(
      `Итого: ${DB.cart.sumQuantity} ${getNoun(DB.cart.sumQuantity, 'товар', 'товара', 'товаров')} на сумму`,
    );
  }

  private updateActivePromoList(): void {
    const { list, size } = DB.cart.promo;
    const [promoWrapper, promoTitle] = [this.cartPromoWrapper.node, this.cartPromoTitle.node];
    this.cartPromoList.clear();
    if (size) {
      this.cartPromoList.appendEl(list.map((item) => new ActivePromo(item[0], `${item[1] * 100}%`)));
      promoWrapper.prepend(promoTitle, this.cartPromoList.node);
    } else {
      promoTitle.remove();
      this.cartPromoList.destroy();
    }
  }

  render() {
    if (DB.cart.list.length > 0) {
      this.cartTitle.destroy();
      this.wrapper.appendEl([
        this.changeView,
        this.cartButton,
        this.cartList,
        this.pagBtn,
        this.cartPromoWrapper,
        this.cartPriceWrapper,
        this.orderBtn,
      ]);
      this.pagBtn.appendEl([this.pagDec, this.pagCountField, this.pagInc]);
      this.changeView.appendEl(this.cartPagination);
      this.cartList.clear();
      this.cartList.appendEl(
        this.pagination.chunk.map(
          (item, index) => new CartItemElem(item, index + this.pagination.firstindex, this.orderBtn),
        ),
      );
      this.cartPriceWrapper.appendEl([this.cartPriceText, this.cartPriceTotal]);
      this.cartPromoWrapper.appendEl([this.cartPromoBtn]);
    } else {
      this.wrapper.clear();
      this.wrapper.appendEl(this.cartButton);
      this.wrapper.appendEl(this.cartTitle);
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
