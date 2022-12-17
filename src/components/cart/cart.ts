import { CartItem } from './../../interfaces/database';
import { DB } from './../../services/db/Database';
import BaseComponent from '../elements/base-component';
import Button from '../elements/button';
import CartItemElem from './cart-item';
import CartList from './cart-list';
import PromoForm from './cart-promo';
import OrderForm from './order-form';
import { ChangeView } from '../elements/change-view';

export default class Cart extends BaseComponent {
  private container: BaseComponent;

  private wrapper: BaseComponent;

  private cartList: CartList;

  private cartItems: CartItemElem[];

  private cartButton: Button;

  private CartPromoWrapper: BaseComponent;

  private cartPromoBtn: Button;

  private cartPromoForm: PromoForm;

  private cartPriceWrapper: BaseComponent;

  private cartPriceText: BaseComponent;

  private cartPriceTotal: BaseComponent;

  private orderBtn: Button;

  private orderForm: OrderForm | undefined;

  private changeView: ChangeView;

  constructor() {
    super({ tag: 'section', className: 'cart' });
    this.container = new BaseComponent({ className: 'container' });
    this.wrapper = new BaseComponent({ className: 'cart__wrapper' });
    this.changeView = new ChangeView();
    this.wrapper.appendEl(this.changeView);
    this.cartButton = new Button({
      className: 'cart__btn',
      onclick: () => {
        window.location.hash = '#store';
      },
      text: 'Продолжить покупки',
    });
    this.orderBtn = new Button({ className: 'cart__order', text: 'Продолжить оформление' });
    this.CartPromoWrapper = new BaseComponent({ className: 'promo' });
    this.cartPromoBtn = new Button({ className: 'promo__btn', text: 'Есть промокод?' });
    this.cartPromoForm = new PromoForm();
    this.cartPromoBtn.getNode().onclick = () => {
      this.cartPromoBtn.getNode().setAttribute('disabled', 'true');
      this.CartPromoWrapper.appendEl(this.cartPromoForm);
    };
    this.cartPriceWrapper = new BaseComponent({ className: 'cart-price' });
    this.cartPriceText = new BaseComponent({ tag: 'span', className: 'cart-price__text', text: 'Итог' });
    this.cartPriceTotal = new BaseComponent({ tag: 'span', className: 'cart-price__total', text: `${DB.cartPriceSum}` });
    this.cartList = new CartList();
    this.cartItems = [...DB.cart.map((item) => {
      const name: CartItem = { keyboard: item[0], keyboardSwitch: item[1], quantity: item[2] }; // TODO убрать костыль!
      return new CartItemElem(name, this.cartPriceTotal);
    })];
    this.orderBtn.getNode().onclick = () => {
      this.orderForm = new OrderForm();
      this.wrapper.appendEl(this.orderForm);
      document.body.classList.add('no-scroll');
    };
  }

  render() {
    this.appendEl(this.container);
    this.container.appendEl(this.wrapper);
    this.wrapper.appendEl([this.cartButton, this.cartList]);
    this.cartList.appendEl(this.cartItems);
    this.wrapper.appendEl([this.CartPromoWrapper, this.cartPriceWrapper]);
    this.CartPromoWrapper.appendEl(this.cartPromoBtn);
    this.cartPriceWrapper.appendEl([this.cartPriceText, this.cartPriceTotal]);
    this.wrapper.appendEl(this.orderBtn);
  }
}
