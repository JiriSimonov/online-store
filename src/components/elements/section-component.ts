import { Component, ComponentProps } from './base-component';

export class Section extends Component {
  constructor(props?: ComponentProps) {
    super({ className: 'section', ...props, tag: 'section' });
  }
}
