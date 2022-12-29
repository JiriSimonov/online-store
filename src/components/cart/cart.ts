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
import { getChunk, getNoun } from '../../utils/utils';

export class Cart extends BaseComponent {
  private defaultPageSize = 20;

  private container = new BaseComponent({ className: 'container' });
  private wrapper = new BaseComponent({ className: 'cart__wrapper' });

  private cartTitle = new BaseComponent({ tag: 'h2', className: 'cart__title', text: 'Корзина пока что пуста' });

  private cartButton = new Button({
    className: 'cart__btn',
    text: 'Продолжить покупки',
    onclick: () => {
      window.location.hash = '#store';
    },
  });
  private changeView = new ChangeView();

  private cartPagination = new CartPagination();

  private cartList = new CartList();
  private cartItems = DB.cart.list.map((item, index) => new CartItemElem(item, index));

  private pagBtn = new BaseComponent({ className: 'pagination-btn' });
  private pagDec = new Button({
    className: 'pagination-btn__dec',
    onclick: () => {
      this.pagination.prevPage();
      this.pagCountField.getInputNode().stepDown();
      this.pagCountField.getInputNode().dispatchEvent(new Event('input'));
      window.scrollTo(0, 0);
    },
  });
  private pagCountField = new FormField({
    className: 'pagination-btn',
    type: 'number',
    value: `${DB.filter.getParam('cartPage') ? DB.filter.getParam('cartPage') : 1}`,
    min: '1',
    max: `${this.pagination.lastPage}`,
    pattern: '[0-9]{2}',
  });
  private pagInc = new Button({
    className: 'pagination-btn__inc',
    onclick: () => {
      this.pagination.nextPage();
      this.pagCountField.getInputNode().stepUp();
      this.pagCountField.getInputNode().dispatchEvent(new Event('input'));
      window.scrollTo(0, 0);
    },
  });

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
    this.render();
    this.updateActivePromoList();
    this.updateTotalPrice();
    this.updateTotalQuantity();
    this.subscribe();
    this.pagCountField.getInputNode().oninput = (e) => {
      if (e.target && e.target instanceof HTMLInputElement) {
        if (+e.target.value > +e.target.max) e.target.value = e.target.max;
        if (+e.target.value < +e.target.min && e.target.value !== '') e.target.value = e.target.min;
        if (e.target.value === '') return;
        DB.filter.setParam('cartPage', e.target.value); //! работает, но еще в тесте
      }
    };
    window.addEventListener('hashchange', () => this.render());
    // TODO 👇
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
    this.cartPriceText.setText(
      `Итого: ${DB.cart.sumQuantity} ${getNoun(DB.cart.sumQuantity, 'товар', 'товара', 'товаров')} на сумму`,
    );
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
        this.pagination.page.chunk.map(
          (item, index) => new CartItemElem(item, index + this.pagination.page.firstindex),
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
    emitter.subscribe('cart__delete-item', () => {
      this.render();
    });
    return this;
  }

  private get pagination() {
    const querySize: number = +DB.filter.getParam('cartPageSize');
    const queryPage: number = +DB.filter.getParam('cartPage');
    const size: number = Number.isInteger(querySize) && querySize > 0 ? querySize : this.defaultPageSize;
    const lastPageNumber = Math.floor(DB.cart.list.length / size);
    const page: number = Number.isInteger(queryPage) && queryPage > 0 ? queryPage : 0;
    return {
      get page() {
        //! присутствует баг с переходом на последнюю страницу при очистке текущей
        return { chunk: getChunk(page, size, DB.cart.list), firstindex: page * size };
      },
      prevPage() {
        // TODO добавить условия для сброса страниц при выходе за ренж
        if (page > 0) DB.filter.setParam('cartPage', `${page - 1}`);
      },
      nextPage() {
        // TODO добавить условия для сброса страниц при выходе за ренж
        if (page < lastPageNumber) DB.filter.setParam('cartPage', `${page + 1}`);
      },
      get lastPage() {
        return lastPageNumber;
      }
    };
  }
}
