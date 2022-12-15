import { KeyboardSwitch } from '../../services/db/KeyboardSwitch';
import BaseComponent from '../elements/base-component';

export default class SwitchComponent extends BaseComponent {
  constructor(props: KeyboardSwitch) {
    super({ tag: 'li', className: 'switch__item' });
    const { id, isAvailable } = props;
    this.node.textContent = `${id}`;
    this.node.classList.add(`${id}`);
    this.node.classList.add(`${isAvailable ? 'switch__item_true' : 'switch__item_false'}`);
  }
}
