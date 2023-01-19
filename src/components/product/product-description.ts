import { Component } from '../elements/base-component';

export class ProductDescription extends Component {
  constructor() {
    super({ tag: 'ul', className: 'description' });
  }
}
