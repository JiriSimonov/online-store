import { SwitchProps } from '../../interfaces/interfaces';
import BaseComponent from '../elements/base-component';
import { getSwitchData, setSwitchImage } from '../../utils/get-switch-data';

console.log(getSwitchData('CBR', 'props'));
console.log(setSwitchImage('CBR', document.body));

export default class SwitchComponent extends BaseComponent {
  constructor(props: SwitchProps) {
    super({ tag: 'li', className: 'switch__item' });
    const { id, isAvailable } = props;
    this.node.textContent = `${id}`;
    this.node.classList.add(`${id}`);
    this.node.classList.add(`${isAvailable ? 'switch__item_true' : 'switch__item_false'}`);
  }
}
