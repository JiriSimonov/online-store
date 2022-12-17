import { BaseComponent } from './base-component';
import { InputProps } from '../../interfaces/interfaces';

export class Input extends BaseComponent {
  constructor(props: InputProps) {
    super(Object.assign(props, { tag: 'input' }));
    const { value, type, placeholder, pattern } = props;

    const node = this.node as HTMLInputElement;

    // if (value) node.value = value;
    if (value) node.setAttribute('value', value);
    if (type) node.setAttribute('type', type);
    if (placeholder) node.setAttribute('placeholder', placeholder);
    if (pattern) node.setAttribute('pattern', pattern);
    node.setAttribute('required', 'true');
  }
}
