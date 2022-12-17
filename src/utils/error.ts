import { BaseComponent } from "../components/elements/base-component";

export class Error extends BaseComponent {
  private title: BaseComponent;
  constructor() {
    super({ className: 'container' });
    this.title = new BaseComponent({ tag: 'h1', className: 'error', text: 'Страница не найдена' });
  }

  render() {
    this.appendEl(this.title);
  }
}
