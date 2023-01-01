import { BaseComponent } from '../elements/base-component';
import { ProductImage } from './product-img';
import { SwitchComponent } from '../switches/switch-component';
import { SwitchModal } from '../switches/switch-modal';
import { Button } from '../elements/button';
import { Keyboard } from '../../services/db/keyboard';
import { DB } from '../../services/db/database';
import { CartItem } from '../../services/db/cart-item';
import { emitter } from '../../services/event-emitter';

export class ProductCard extends BaseComponent {
  private isAvialable: BaseComponent;
  private productImage: ProductImage;
  private storeDescr = new BaseComponent({ className: 'store__description' });
  private cardTitle: BaseComponent;
  private cardCopy = new Button({ className: 'store__card-copy', aria: 'Скопировать название' });
  private switchList = new BaseComponent({ tag: 'ul', className: 'switch' });
  private switchItems: SwitchComponent[];
  private priceWrapper = new BaseComponent({ className: 'store__card-wrapper' });
  private cardPrice = new BaseComponent({ className: 'store__card-price' });
  private buyNowBtn = new Button({ className: 'store__card-btn', text: 'Купить в 1 клик' });
  private cardBtn = new Button({ className: 'store__card-btn' });
  private switchModal: SwitchModal | null | undefined;

  constructor(private keyboard: Keyboard, elemTag?: keyof HTMLElementTagNameMap) {
    super({ tag: elemTag ?? 'li', className: 'store__item' });
    this.isAvialable = new BaseComponent({
      className: `store__card-av store__card-av_${keyboard.isAvailable}`,
      text: `${keyboard.isAvailable ? 'В наличии' : 'Нет в наличии'}`,
    });
    this.productImage = new ProductImage(keyboard.images);
    this.cardTitle = new BaseComponent({ tag: 'h2', className: 'store__card-title', text: keyboard.title });
    this.switchItems = keyboard.switches.reduce((acc, keyboardSwitch) => {
      if (keyboardSwitch.id === 'null') return acc;

      const switchComponent = new SwitchComponent(keyboardSwitch, `${keyboard.id}`);
      if (!acc.some((item) => item.checked)) switchComponent.checked = keyboardSwitch.isAvailable;
      return [...acc, switchComponent];
    }, [] as SwitchComponent[]);

    this.switchList.getNode().onmouseover = (e) => {
      if (e.target instanceof HTMLLabelElement) this.renderModal(e.target);
    };
    this.node.onclick = (e) => {
      if (!(e.target instanceof HTMLElement) || e.target instanceof HTMLLabelElement) return;
      if (e.target.classList.contains('product__path-item')) return;

      if (this.switchItems.some((item) => item.getInputNode() === e.target)) {
        this.renderText();
        return;
      }

      switch (e.target) {
        case this.cardCopy.getNode():
          this.copyTitle();
          break;
        case this.cardBtn.getNode():
          this.addToCart();
          this.renderText();
          break;
        case this.buyNowBtn.getNode():
          if (!DB.cart.isInCart(keyboard.id, this.getSelectedSwitch()?.getSwitch().id)) this.addToCart();
          window.location.hash = `#cart`;
          emitter.emit('product-card__buyNowBtn_clicked');
          break;
        default:
            if (window.location.hash.match('store')) window.location.hash = `${keyboard.id}`;
      }
    };

    this.appendEl([this.isAvialable, this.productImage, this.storeDescr]);
    this.storeDescr.appendEl([this.cardTitle, this.switchList, this.priceWrapper]);
    this.cardTitle.appendEl(this.cardCopy);
    this.switchList.appendEl(this.switchItems);
    this.priceWrapper.appendEl(this.cardPrice);
    if (keyboard.isAvailable) this.priceWrapper.appendEl([this.buyNowBtn, this.cardBtn]);

    this.renderText();
  }

  getSelectedSwitch(): SwitchComponent | undefined {
    return this.switchItems.find((item) => item.checked);
  }

  private renderText(target?: HTMLLabelElement): void {
    const keyboardSwitch = target
      ? this.keyboard.getSwitch(target.textContent ?? '')
      : this.getSelectedSwitch()?.getSwitch();
    const isInCart = DB.cart.isInCart(this.keyboard.id, keyboardSwitch?.id);
    this.cardBtn.disabled = isInCart;
    this.cardBtn.setText(isInCart ? 'Уже в корзине' : 'Добавить в корзину');
    this.cardPrice.setText(`от ${keyboardSwitch?.price ?? this.keyboard.minPrice} ₽`);
  }

  private renderModal(label: HTMLLabelElement): void {
    this.renderText(label);
    const mouseoutListener = () => {
      this.renderText();
      this.cardPrice.getNode().classList.remove('store__card-price_is-open');
      this.switchModal?.destroy();
      this.switchModal = null;
      label.removeEventListener('mouseout', mouseoutListener);
    };
    label.addEventListener('mouseout', mouseoutListener);
    this.switchModal = new SwitchModal(label.textContent ?? '', label.classList.contains('switch__item_true'));
    this.cardPrice.getNode().classList.add('store__card-price_is-open');
    this.appendEl(this.switchModal);
  }

  private addToCart(): void {
    const selected = this.getSelectedSwitch();
    if (selected) {
      DB.cart.add([this.keyboard, selected.getSwitch()]);
    } else {
      const availableSwitch = this.keyboard.switches.find((item) => item.isAvailable);
      if (availableSwitch) DB.cart.add(new CartItem(this.keyboard, availableSwitch));
    }
  }

  private copyTitle(): void {
    const renderCopyAnimation = (result: 'success' | 'fail') => {
      const icon = this.cardCopy.getNode();
      icon.classList.add(`store__card-copy_${result}`);
      icon.ontransitionend = () => {
        icon.classList.remove(`store__card-copy_${result}`);
        icon.ontransitionend = null;
      };
    };
    navigator.clipboard
      .writeText(this.keyboard.title)
      .then(() => renderCopyAnimation('success'))
      .catch(() => renderCopyAnimation('fail'));
  }
}
