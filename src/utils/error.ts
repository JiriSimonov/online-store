import { BaseComponent } from "../components/elements/base-component";

export class Error extends BaseComponent {
  private title = new BaseComponent({ tag: 'h1', className: 'error', text: 'Страница не найдена', parent: this.node });
  constructor() {
    super({ className: 'container' });
  }
}
