import { Component, ComponentProps } from './base-component';

export class Main extends Component {
  constructor(props?: ComponentProps) {
    super({ className: 'main', ...props, tag: 'main' });
  }
}
