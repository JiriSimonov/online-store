import { Component } from './base-component';
import { Button } from './button-component';

export class Burger extends Button {
  private burgerLine = new Component({ className: 'burger__line', parent: this.node });
  constructor() {
    super({ className: 'burger' });
    this.node.ariaLabel = 'Открыть меню';
    this.node.ariaExpanded = 'false';
  }
}
