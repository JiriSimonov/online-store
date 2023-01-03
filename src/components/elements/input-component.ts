import { Component, ComponentProps } from './component';

export class Input extends Component<HTMLInputElement> {
  constructor(props?: ComponentProps<HTMLInputElement>) {
    super({ ...props, tag: 'input' });
    if (this.node.type === 'number')
      this.node.onkeydown = (e) => {
        // if (e.target instanceof HTMLInputElement && ['e', 'E', '-', '+', '.', ','].includes(e.key)) e.preventDefault();
        if (['e', 'E', '-', '+', '.', ','].includes(e.key)) e.preventDefault();
      };
  }
}
