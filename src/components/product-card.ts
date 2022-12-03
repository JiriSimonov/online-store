import { ProductCardProps } from '../interfaces/interfaces';
import BaseComponent from './base-component';

export default class ProductCard extends BaseComponent {
  private imgWrapper: BaseComponent;

  private cardTitle: BaseComponent;

  private cardPrice: BaseComponent;

  private isAvialable: BaseComponent;

  constructor(props: ProductCardProps) {
    super({ tag: 'li', className: 'store__item' });
    const { title, price, isAvailable } = props;
    this.imgWrapper = new BaseComponent({ className: 'store__img', parent: this.node });
    this.cardTitle = new BaseComponent({
      tag: 'h3',
      className: 'store__card-title',
      text: title,
      parent: this.node,
    });
    this.cardPrice = new BaseComponent({
      className: 'store__card-price',
      text: `от ${price} ₽`,
      parent: this.node,
    });
    this.isAvialable = new BaseComponent({
      className: `${isAvailable ? 'store__card-av store__card-av_true' : 'store__card-av store__card-av_false'}`,
      text: `${isAvailable ? 'В наличии' : 'Нет в наличии'}`,
      parent: this.node,
    });
  }
}
