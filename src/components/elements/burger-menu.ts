import { Component } from './base-component';
import { Button } from './button-component';

export class Burger extends Button {
  private burgerLine = new Component({ className: 'burger__line', parent: this });
  constructor() {
    super({ className: 'burger', ariaLabel: 'Открыть меню', ariaExpanded: 'false' });
  }
}
