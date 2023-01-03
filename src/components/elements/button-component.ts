import { Component, ComponentProps } from './component';

export class Button extends Component<HTMLButtonElement> {
  constructor(props?: ComponentProps<HTMLButtonElement>) {
    super({ ...props, tag: 'button' });
  }
}
