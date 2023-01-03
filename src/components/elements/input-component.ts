import { Component, ComponentProps } from './component';

export class Input extends Component<HTMLInputElement> {
  constructor(props?: ComponentProps<HTMLInputElement>) {
    super({ ...props, tag: 'input' });
  }
}
