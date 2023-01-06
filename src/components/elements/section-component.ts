import { Component, ComponentProps } from './base-component';

export class Section extends Component {
  // wrapper = new Component({ parent: this, className: 'wrapper' });
  // container = new Component({ parent: this.wrapper, className: 'container' });

  constructor(props?: ComponentProps) {
    super({ className: 'section', ...props, tag: 'section' });
  }
}
