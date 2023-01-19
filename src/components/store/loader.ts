import { Component } from '../elements/base-component';
import { Heading } from '../elements/heading-component';

export class Loader extends Component {
  private cube: Component;
  private items: Component[];
  private title: Component;

  constructor(order: boolean) {
    super({ className: 'loader' });
    this.title = new Heading({ className: 'loader__title', textContent: 'Заказ оформлен' });
    if (order) {
      this.append(this.title);
    }
    this.cube = new Component({ className: 'cube', parent: this });
    this.items = new Array(5).fill(0).map(() => new Component({ parent: this.cube }));
  }
}
