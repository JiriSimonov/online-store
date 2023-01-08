import { FormField } from '../elements/form-field';
import { KeyboardSwitch } from '../../services/db/keyboard-switch';
import { Component } from '../elements/base-component';

export class SwitchComponent extends Component {
  private switchField: FormField;

  constructor(private keyboardSwitch: KeyboardSwitch, keyboardId: string, elemTag?: keyof HTMLElementTagNameMap) {
    super({ tag: elemTag ?? 'li', className: 'switch__item' });
    const { id, isAvailable } = keyboardSwitch;
    this.switchField = new FormField({
      className: `switch`,
      type: 'radio',
      textContent: id,
      value: id,
      name: keyboardId,
    });
    this.switchField.classList.add(id, `switch__item_${isAvailable}`);

    if (!isAvailable) {
      this.switchField.disabled = true;
    }
    this.append(this.switchField);
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
