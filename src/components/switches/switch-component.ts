import { SwitchProps } from '../../interfaces/interfaces';
import BaseComponent from '../elements/base-component';

export default class SwitchComponent extends BaseComponent {
  constructor(props: SwitchProps) {
    super({ tag: 'li', className: 'switch__item' });
    const { short, isAvailable } = props;
    this.node.textContent = `${short}`;
    this.node.classList.add(`${short}`);
    this.node.classList.add(`${isAvailable ? 'switch__item_true' : 'switch__item_false'}`);
  }
}
