import { ProductCardProps } from '../interfaces/interfaces';
import BaseComponent from './base-component';

export default class SwitchComponent extends BaseComponent {
  private switchNames: string[];

  private switchName: string;

  constructor(props: ProductCardProps) {
    super({ tag: 'li', className: 'switch__item' });
    const { title, isAvailable } = props;
    this.switchNames = ['br', 'b', 'r', 'sp', 'ss'];
    this.switchName = this.switchNames.filter((item) => item === title).toString();
    this.node.textContent = `${title}`;
    this.node.classList.add(`${title}`);
    this.node.classList.add(`${isAvailable ? 'switch__item_true' : 'switch__item_false'}`);
  }
}
