import { BaseComponent } from './base-component';
import { Button } from './button';

export class Burger extends Button {
  private burgerLine = new BaseComponent({ className: 'burger__line', parent: this.node })
  constructor() {
    super({ className: 'burger' });
    this.node.ariaLabel = 'Открыть меню';
    this.node.ariaExpanded = 'false';
  }
}
