import { emitter } from '../../services/event-emitter';
import { BaseComponent } from '../elements/base-component';
import { ProductImage } from './product-img';
import { SwitchComponent } from '../switches/switch-component';
import { SwitchModal } from '../switches/switch-modal';
import { Button } from '../elements/button';
import { Keyboard } from '../../services/db/keyboard';
import { KeyboardSwitch } from '../../services/db/keyboard-switch';
import { DB } from '../../services/db/database';
import { CartItem } from '../../services/db/cart-item';

export class ProductCard extends BaseComponent {
  private ProductImage: ProductImage;

  private cardTitle: BaseComponent;

  private switchList: BaseComponent;

  private switchItems: SwitchComponent[];

  private switchArr: KeyboardSwitch[];

  private priceWrapper: BaseComponent;

  private cardCopy: Button;

  private cardBtn: BaseComponent;

  private cardPrice: BaseComponent;

  private isAvialable: BaseComponent;

  private switchModal: SwitchModal | null | undefined;

  private storeDescr: BaseComponent;

  private buyNowBtn: Button;

  constructor(props: Keyboard, elemTag?: keyof HTMLElementTagNameMap) {
    super({ tag: elemTag ?? 'li', className: 'store__item' });
    this.ProductImage = new ProductImage(props.images);
    this.appendEl(this.ProductImage);
    this.storeDescr = new BaseComponent({ className: 'store__description', parent: this.node });
    this.cardTitle = new BaseComponent({
      tag: 'h2',
      className: 'store__card-title',
      text: props.title,
      parent: this.storeDescr.getNode(),
    });
    this.switchList = new BaseComponent({
      tag: 'ul',
      className: 'switch',
      parent: this.storeDescr.getNode(),
    });
    this.switchArr = props.switches.filter((item) => item.id !== 'null');
    this.switchItems = this.switchArr.map((item) => new SwitchComponent(item, `${props.id}`));
    this.switchItems.find((item) => item.getSwitch().isAvailable)?.getInputNode().setAttribute('checked', 'true');
    //? перебросил в делегирование. вроде работает
    /* this.switchItems.filter((item) => item.getSwitch().isAvailable).map((item) => item.getInputNode().oninput = () => {
      emitter.emit('product-card__switch-radio_clicked');
    }); */
    this.switchList.appendEl(this.switchItems);
    this.priceWrapper = new BaseComponent({
      className: 'store__card-wrapper',
      parent: this.storeDescr.getNode(),
    });
    this.cardPrice = new BaseComponent({
      className: 'store__card-price',
      text: `от ${props.minPrice} ₽`,
      parent: this.priceWrapper.getNode(),
    });
    this.cardCopy = new Button({
      className: 'store__card-copy',
      parent: this.cardTitle.getNode(),
      aria: 'Скопировать название'
    });
    this.cardCopy.getNode().onclick = () => {
      if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(props.title);
        this.cardCopy.getNode().classList.add('store__card-copy_success');
        setTimeout(() => {
          this.cardCopy.getNode().classList.remove('store__card-copy_success');
        }, 1000);
      } else {
        navigator.clipboard.writeText(props.title);
        this.cardCopy.getNode().classList.add('store__card-copy_fail');
        setTimeout(() => {
          this.cardCopy.getNode().classList.remove('store__card-copy_fail');
        }, 1000);
      } // TODO refactor
    };
    this.cardBtn = new Button({
      className: 'store__card-btn',
      text: 'Добавить в корзину',
      onclick: () => {
        const selected = this.getSelectedSwitch();
        if (selected) {
          DB.cart.add([props, selected.getSwitch()]);
        } else {
          const hiddenSwitch = props.switches.find(item => item.isAvailable)
          if (hiddenSwitch) DB.cart.add(new CartItem(props, hiddenSwitch))
        };
        emitter.emit('product-card__cardBtn_clicked');
      },
    });
    this.buyNowBtn = new Button({
      className: 'store__card-btn',
      text: 'Купить в 1 клик',
      onclick: () => {window.location.hash = '#cart'}, // TODO добавить функциональность согласно ТЗ!!!
    });
    if (props.isAvailable) {
      if (DB.cart.isInCart(props.id, this.getSelectedSwitch()?.getSwitch().id)) {
        this.cardBtn.getNode().textContent = 'Уже в корзине';
        this.cardBtn.getNode().setAttribute('disabled', 'true');
      }
      this.priceWrapper.appendEl([this.buyNowBtn, this.cardBtn]);
    }
    this.isAvialable = new BaseComponent({
      className: `${
        props.isAvailable
          ? 'store__card-av store__card-av_true'
          : 'store__card-av store__card-av_false'
      }`,
      text: `${props.isAvailable ? 'В наличии' : 'Нет в наличии'}`,
      parent: this.node,
    });
    this.switchList.getNode().addEventListener('mouseover', (e) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains('switch__label')) {
        this.switchModal = new SwitchModal(
          target.textContent || '',
          !target.classList.contains('switch__item_false'),
        );
        this.appendEl(this.switchModal);
        target.addEventListener('mouseout', () => {
          this.switchModal?.destroy();
          this.switchModal = null;
        });
      }
    });
    this.node.onclick = (e) => {
      if (!(e.target instanceof HTMLElement)) return;
      const { target } = e;
      const { classList } = target;

      if (classList.contains('switch__input') || classList.contains('switch__label')) {
        emitter.emit('product-card__switch-radio_clicked');
      } else if (target !== this.cardBtn.getNode() && target !== this.cardCopy.getNode()) {
        window.location.hash = `${props.id}`;
      }
    };

    const changeText = () => {
      const selectedSwitch = this.getSelectedSwitch()?.getSwitch();
      const cardBtn = this.cardBtn.getNode();
      const cardPrice = this.cardPrice.getNode();
      cardBtn.textContent = DB.cart.isInCart(props.id, selectedSwitch?.id)
        ? 'Уже в корзине'
        : 'Добавить в корзину';
      cardPrice.textContent = `от ${selectedSwitch?.price ?? props.minPrice} ₽`;
    };
    emitter.subscribe('product-card__cardBtn_clicked', changeText);
    emitter.subscribe('product-card__switch-radio_clicked', changeText);
  }

  getSelectedSwitch() {
    return this.switchItems.find((item) => item.getInputNode().checked);
  }
}
