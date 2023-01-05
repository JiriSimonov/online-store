import { Component, ComponentProps } from './component';

export class Input extends Component<HTMLInputElement> {
  constructor(props?: ComponentProps<HTMLInputElement>) {
    super({ ...props, tag: 'input' });

    this.node.required = true;

    if (this.node.type === 'number')
      this.node.onkeydown = (e) => {
        if (['e', 'E', '-', '+', '.', ','].includes(e.key)) e.preventDefault();
      };
  }
}
