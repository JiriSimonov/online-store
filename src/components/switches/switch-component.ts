import { Component } from '../elements/base-component';
import { FormField } from '../elements/form-field';
import { KeyboardSwitch } from '../../services/db/keyboard-switch';

export class SwitchComponent extends Component {
  private switchField = new FormField({
    className: 'switch',
    type: 'radio',
    textContent: this.keyboardSwitch.id,
    value: this.keyboardSwitch.id,
    name: this.keyboardId,
    parent: this,
  });

  constructor(
    private keyboardSwitch: KeyboardSwitch,
    private keyboardId: string,
    elemTag?: keyof HTMLElementTagNameMap
  ) {
    super({ tag: elemTag ?? 'li', className: 'switch__item' });
    const { id, isAvailable } = keyboardSwitch;
    this.switchField.classList.add(id, `switch__item_${isAvailable}`);
    if (!isAvailable) { this.switchField.disabled = true };
  }

  get input() {
    return this.switchField.input;
  }

  get switch() {
    return this.keyboardSwitch;
  }

  get checked(): boolean {
    return this.switchField.input.node.checked;
  }
  set checked(value: boolean) {
    this.switchField.input.node.checked = value;
  }
}
