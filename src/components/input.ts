import BaseComponent from './base-component';
import { InputProps } from '../interfaces/interfaces';

export default class extends BaseComponent {
  constructor(props: InputProps) {
    super(Object.assign(props, { tag: 'button' }));
    const { value, onclick } = props; // todo изменить это под интерфейс

    const node = this.node as HTMLInputElement;

    if (value) node.value = value; // todo изменить это под интерфейс
    if (onclick) node.onclick = onclick; // todo изменить это под интерфейс
  }
}
