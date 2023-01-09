import { Component } from '../elements/base-component';
import { ProductImage } from './product-img';
import { SwitchComponent } from '../switches/switch-component';
import { SwitchModal } from '../switches/switch-modal';
import { Button } from '../elements/button-component';
import { Keyboard } from '../../services/db/keyboard';
import { DB } from '../../services/db/database';
import { CartItem } from '../../services/db/cart-item';
import { Emitter, EventName } from '../../services/emitter';
import { Heading } from '../elements/heading-component';

export class ProductCard extends Component {
  private isAvialable: Component;
  private productImage: ProductImage;
  private storeDescr = new Component({ className: 'store__description' });
  private cardTitle: Component;
  private cardCopy = new Button({ className: 'store__card-copy', ariaLabel: 'Скопировать название' });
  private switchList = new Component({ tag: 'ul', className: 'switch' });
  private switchItems: SwitchComponent[];
  private priceWrapper = new Component({ className: 'store__card-wrapper' });
  private cardPrice = new Component({ className: 'store__card-price' });
  private buyNowBtn = new Button({ className: 'store__card-btn', textContent: 'Купить в 1 клик' });
  private cardBtn = new Button({ className: 'store__card-btn' });
  private switchModal: SwitchModal | null | undefined;

  constructor(private keyboard: Keyboard, elemTag?: keyof HTMLElementTagNameMap) {
    super({ tag: elemTag ?? 'li', className: 'store__item' });
    this.isAvialable = new Component({
      className: `store__card-av store__card-av_${keyboard.isAvailable}`,
      textContent: `${keyboard.isAvailable ? 'В наличии' : 'Нет в наличии'}`,
    });
    this.productImage = new ProductImage(keyboard.images);
    this.cardTitle = new Heading({ className: 'store__card-title', textContent: keyboard.title });
    this.switchItems = keyboard.switches.reduce((acc, keyboardSwitch) => {
      if (keyboardSwitch.id === 'null') {
        return acc;
      }

      const switchComponent = new SwitchComponent(keyboardSwitch, `${keyboard.id}`);
      if (!acc.some((item) => item.checked)) {
        switchComponent.checked = keyboardSwitch.isAvailable;
      }
      return [...acc, switchComponent];
    }, [] as SwitchComponent[]);

    this.switchList.addEventListener('mouseover', (e) => {
      if (e.target instanceof HTMLLabelElement) {
        this.renderModal(e.target);
      }
    });
    this.onclick = (e) => {
      if (!(e.target instanceof HTMLElement) || e.target instanceof HTMLLabelElement) {
        return;
      }
      if (e.target.classList.contains('product__path-item')) {
        return;
      }

      if (this.switchItems.some((item) => item.input.node === e.target)) {
        this.renderText();
        return;
      }

      switch (e.target) {
        case this.cardCopy.node:
          this.copyTitle();
          break;
        case this.cardBtn.node:
          if (DB.cart.isInCart(keyboard.id, this.selectedSwitch?.switch.id)) {
            window.location.hash = `/cart`;
          } else {
            this.addToCart();
            this.renderText();
          }
          break;
        case this.buyNowBtn.node:
          if (!DB.cart.isInCart(keyboard.id, this.selectedSwitch?.switch.id)) {
            this.addToCart();
          }
          window.location.hash = `/cart`;
          Emitter.emit(EventName.productCard__buyNowBtnClicked);
          break;
        default:
          window.location.hash = `/${keyboard.id}`;
      }
    };

    this.append(this.isAvialable, this.productImage, this.storeDescr);
    this.storeDescr.append(this.cardTitle, this.switchList, this.priceWrapper);
    this.cardTitle.append(this.cardCopy);
    this.switchList.append(...this.switchItems);
    this.priceWrapper.append(this.cardPrice);
    if (keyboard.isAvailable) {
      this.priceWrapper.append(this.cardBtn, this.buyNowBtn);
    }

    this.renderText();
  }

  private get selectedSwitch(): SwitchComponent | undefined {
    return this.switchItems.find((item) => item.checked);
  }

  private renderText(target?: HTMLLabelElement): void {
    const keyboardSwitch = target ? this.keyboard.getSwitch(target.textContent ?? '') : this.selectedSwitch?.switch;
    const isInCart = DB.cart.isInCart(this.keyboard.id, keyboardSwitch?.id);
    this.cardBtn.setText(isInCart ? 'Перейти в корзину' : 'Добавить в корзину');
    this.cardPrice.setText(`от ${keyboardSwitch?.price ?? this.keyboard.minPrice} ₽`);
  }

  private renderModal(label: HTMLLabelElement): void {
    this.renderText(label);
    const mouseoutListener = () => {
      this.renderText();
      this.cardPrice.classList.remove('store__card-price_is-open');
      this.switchModal?.destroy();
      this.switchModal = null;
      label.removeEventListener('mouseout', mouseoutListener);
    };
    label.addEventListener('mouseout', mouseoutListener);
    this.switchModal = new SwitchModal(
      label.textContent ?? '',
      label.classList.contains('switch__item_true'),
      this.keyboard,
    );
    this.cardPrice.classList.add('store__card-price_is-open');
    this.append(this.switchModal);
  }

  private addToCart(): void {
    const selected = this.selectedSwitch;
    if (selected) {
      DB.cart.add([this.keyboard, selected.switch]);
    } else {
      const availableSwitch = this.keyboard.switches.find((item) => item.isAvailable);
      if (availableSwitch) {
        DB.cart.add(new CartItem(this.keyboard, availableSwitch));
      }
    }
  }

  private copyTitle(): void {
    const renderCopyAnimation = (result: 'success' | 'fail') => {
      const icon = this.cardCopy;
      icon.classList.add(`store__card-copy_${result}`);
      icon.node.ontransitionend = () => {
        icon.classList.remove(`store__card-copy_${result}`);
        icon.node.ontransitionend = null;
      };
    };
    navigator.clipboard
      .writeText(this.keyboard.title)
      .then(() => renderCopyAnimation('success'))
      .catch(() => renderCopyAnimation('fail'));
  }
}
