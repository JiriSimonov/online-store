import { BaseComponent } from './base-component';
import { InputProps } from '../../interfaces/interfaces';

export class Input extends BaseComponent<HTMLInputElement> {
  constructor(props: InputProps) {
    super(Object.assign(props, { tag: 'input' }));
    const { value, type, placeholder, pattern, min, max, name, step, checked } = props;
    const { node } = this;
    if (value) node.setAttribute('value', value);
    if (type) node.setAttribute('type', type);
    if (type === 'number')
      this.node.onkeydown = (e) => {
        if (e.target && e.target instanceof HTMLInputElement && ['e', 'E', '-', '+', '.', ','].includes(e.key))
          e.preventDefault();
      };
    if (placeholder) node.setAttribute('placeholder', placeholder);
    if (pattern) node.setAttribute('pattern', pattern);
    if (min)node.setAttribute('min', min);
    if (max) node.setAttribute('max', max);
    if (name) node.setAttribute('name', name);
    if (step) node.setAttribute('step', step);
    if (checked) node.checked = checked;
    node.required = true;
  }
}
