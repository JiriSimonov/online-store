import BaseComponent from "../elements/base-component";

export class ProductDescription extends BaseComponent {
  constructor() {
    super({ tag:'ul', className: 'description' });
  }
}
