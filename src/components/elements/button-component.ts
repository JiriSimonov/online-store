import { Component, ComponentProps } from './base-component';

export class Button extends Component<HTMLButtonElement> {
  constructor(props?: ComponentProps<HTMLButtonElement>) {
    super({ ...props, tag: 'button' });
  }

  get disabled(): boolean {
    return this.node.disabled;
  }
  set disabled(value: boolean) {
    this.node.disabled = value;
  }
  click() {
    return this.node.click();
  }
}
