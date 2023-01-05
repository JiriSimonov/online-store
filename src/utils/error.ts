import { Component } from '../components/elements/base-component';

export class Error extends Component {
  private title = new Component({
    tag: 'h1',
    className: 'error',
    textContent: 'Страница не найдена',
    parent: this.node,
  });
  constructor() {
    super({ className: 'container' });
  }
}
