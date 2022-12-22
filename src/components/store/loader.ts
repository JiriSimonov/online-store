import { BaseComponent } from '../elements/base-component';

export class Loader extends BaseComponent {

  private cube: BaseComponent;

  private items: BaseComponent[];

  constructor() {
    super({ className: 'loader' });
    this.cube = new BaseComponent({ className: 'cube', parent: this.node });
    this.items = new Array(5).fill(0).map(() => new BaseComponent({ parent: this.cube.getNode() }));
  }
}
