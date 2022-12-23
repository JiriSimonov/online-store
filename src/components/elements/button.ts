import { BaseComponent } from './base-component';
import { ButtonProps } from '../../interfaces/interfaces';

export class Button extends BaseComponent<HTMLButtonElement> {
  constructor(props: ButtonProps) {
    super(Object.assign(props, { tag: 'button' }));
    const { value, onclick, aria } = props;
    const { node } = this;

    if (value) node.value = value;
    if (onclick) node.onclick = onclick;
    if (aria) node.ariaLabel = aria;
  }

  get onclick() {
    return this.node.onclick;
  }
  set onclick(value) {
    this.node.onclick = value;
  }

  get disabled(): boolean {
    return this.node.disabled;
  }
  set disabled(value: boolean) {
    this.node.disabled = value;
  }
}
