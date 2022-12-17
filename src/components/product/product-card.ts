import { BaseComponent } from '../elements/base-component';
import { ProductImage } from './product-img';
import { SwitchComponent } from '../switches/switch-component';
import { SwitchModal } from '../switches/switch-modal';
import { Button } from '../elements/button';
import { Keyboard } from '../../services/db/keyboard';
import { KeyboardSwitch } from '../../services/db/keyboard-switch';
import { DB } from '../../services/db/db';

export class ProductCard extends BaseComponent {
  private ProductImage: ProductImage;

  private cardTitle: BaseComponent;

  private switchList: BaseComponent;

  private switchItem: SwitchComponent[];

  private switchArr: KeyboardSwitch[];

  private priceWrapper: BaseComponent;

  private cardCopy: Button;

  private cardBtn: BaseComponent;

  private cardPrice: BaseComponent;

  private isAvialable: BaseComponent;

  private switchModal: SwitchModal | null | undefined;

  private storeDescr: BaseComponent;

  constructor(props: Keyboard) {
    super({ tag: 'li', className: 'store__item' });
    this.ProductImage = new ProductImage(props.images);
    this.appendEl(this.ProductImage);
    this.storeDescr = new BaseComponent({ className: 'store__description', parent: this.node });
    this.cardTitle = new BaseComponent({
      tag: 'h3',
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
    this.switchItem = this.switchArr.map((item) => new SwitchComponent(item));
    this.switchList.appendEl(this.switchItem);
    this.priceWrapper = new BaseComponent({
      className: 'store__card-wrapper',
      parent: this.storeDescr.getNode(),
    });
    this.cardPrice = new BaseComponent({
      className: 'store__card-price',
      text: `от ${props.minPrice} ₽`,
      parent: this.priceWrapper.getNode(),
    });
    this.cardCopy = new Button({ className: 'store__card-copy', parent: this.cardTitle.getNode() });
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
    // TODO посмотреть вариант без создания кнопки!!!
    this.cardBtn = new Button({
      className: 'store__card-btn',
      text: 'Добавить в корзину',
      onclick: () => {
        DB.addToCart(
          [props, props.switches.find((item) => item.isAvailable) ?? props.switches[0]],
          1,
        );
        this.cardBtn.getNode().textContent = 'Уже в корзине';
        this.cardBtn.getNode().setAttribute('disabled', 'true');
      },
    });
    if (props.isAvailable) {
      if (DB.cart.some((item) => item[0] === props)) {
        this.cardBtn.getNode().textContent = 'Уже в корзине';
        this.cardBtn.getNode().setAttribute('disabled', 'true');
      }
      this.priceWrapper.appendEl(this.cardBtn);
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
      if (target.classList.contains('switch__item')) {
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
      if (e.target !== this.cardBtn?.getNode()) window.location.hash = `${props.id}`;
    };
  }
}
