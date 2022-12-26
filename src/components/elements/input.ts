import { BaseComponent } from './base-component';
import { InputProps } from '../../interfaces/interfaces';

export class Input extends BaseComponent<HTMLInputElement> {
  constructor(props: InputProps) {
    super(Object.assign(props, { tag: 'input' }));
    const { value, type, placeholder, pattern, min, max, name, step } = props;
    const { node } = this;
    if (value) node.value = value;
    if (type) node.type = type;
    if (placeholder) node.placeholder = placeholder;
    if (pattern) node.pattern = pattern;
    if (min) node.min = min;
    if (max) node.max = max;
    if (name) node.name = name;
    if (step) node.step = step;
    node.required = true;
  }
}
