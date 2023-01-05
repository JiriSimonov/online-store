import { Component } from './elements/base-component';

export class StoreContent extends Component {
  constructor() {
    super({ tag: 'ul', className: 'store__list' });
  }
}
