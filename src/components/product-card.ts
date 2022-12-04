import { SwitchProps, KeyboardProps } from '../../backend/keyboards-json/index';
import BaseComponent from './base-component';
import ProductImage from './product-img';
import SwitchComponent from './switch-component';
import SwitchModal from './switch-modal';

export default class ProductCard extends BaseComponent {
  private ProductImage: ProductImage;

  private cardTitle: BaseComponent;

  private switchList: BaseComponent;

  private switchItem: SwitchComponent[];

  private switchArr: SwitchProps[];

  private cardPrice: BaseComponent;

  private isAvialable: BaseComponent;

  private switchModal: SwitchModal;

  constructor(props: KeyboardProps) {
    super({ tag: 'li', className: 'store__item' });
    this.ProductImage = new ProductImage({});
    this.appendEl(this.ProductImage);
    this.cardTitle = new BaseComponent({
      tag: 'h3',
      className: 'store__card-title',
      text: props.title,
      parent: this.node,
    });
    this.switchList = new BaseComponent({ tag: 'ul', className: 'switch', parent: this.node });
    this.switchArr = props.switches;
    this.switchItem = this.switchArr.map((item) => new SwitchComponent(item));
    this.switchItem.forEach((e) => {
      e.getNode().addEventListener('mouseover', () => {
        this.node.classList.add('store__item_is-open');
      });
      e.getNode().addEventListener('mouseout', () => {
        this.node.classList.remove('store__item_is-open');
      });
    });
    this.switchList.appendEl(this.switchItem);
    this.cardPrice = new BaseComponent({
      className: 'store__card-price',
      text: `от ${props.minPrice} ₽`,
      parent: this.node,
    });
    this.isAvialable = new BaseComponent({
      className: `${props.isAvailable ? 'store__card-av store__card-av_true' : 'store__card-av store__card-av_false'}`,
      text: `${props.isAvailable ? 'В наличии' : 'Нет в наличии'}`,
      parent: this.node,
    });
    this.switchModal = new SwitchModal();
    this.appendEl(this.switchModal);
  }
}
