import BaseComponent from './base-component';
import { InputProps } from '../../interfaces/interfaces';

export default class Input extends BaseComponent {
  constructor(props: InputProps) {
    super(Object.assign(props, { tag: 'input' }));
    const { value } = props; // todo изменить при добавлении полей

    const node = this.node as HTMLInputElement;

    // if (value) node.value = value;
    if (value) node.setAttribute('value', value);
  }
}
