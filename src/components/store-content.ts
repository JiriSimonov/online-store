import { BaseComponent } from './elements/base-component';

export class StoreContent extends BaseComponent {
  constructor() {
    super({ tag: 'ul', className: 'store__list' });
  }
}
