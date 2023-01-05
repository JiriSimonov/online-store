import { Component } from '../components/elements/base-component';
import { Heading } from '../components/elements/heading-component';

export class Error extends Component {
  private title = new Heading({ tag: 'h1', className: 'error', textContent: 'Страница не найдена', parent: this });
  constructor() {
    super({ className: 'container' });
  }
}
