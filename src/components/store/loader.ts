import { BaseComponent } from '../elements/base-component';

export class Loader extends BaseComponent {
  private cube: BaseComponent;

  private items: BaseComponent[];

  private title: BaseComponent;

  constructor(order: boolean) {
    super({ className: 'loader' });
    this.title = new BaseComponent({ tag: 'h2', className: 'loader__title', text: 'Заказ оформлен' });
    if (order) this.appendEl(this.title);
    this.cube = new BaseComponent({ className: 'cube', parent: this.node });
    this.items = new Array(5).fill(0).map(() => new BaseComponent({ parent: this.cube.node }));
  }
}
