import { FormField } from '../elements/form-field';
import { KeyboardSwitch } from '../../services/db/keyboard-switch';
import { BaseComponent } from '../elements/base-component';

export class SwitchComponent extends BaseComponent {
  private switchField: FormField;

  constructor(private keyboardSwitch: KeyboardSwitch, keyboardId: string, elemTag?: keyof HTMLElementTagNameMap) {
    super({ tag: elemTag ?? 'li', className: 'switch__item' });
    const { id, isAvailable } = keyboardSwitch;
    this.switchField = new FormField({
      className: `switch`,
      type: 'radio',
      text: id,
      value: id,
      name: keyboardId,
    });
    this.switchField.getNode().classList.add(id, `switch__item_${isAvailable}`);

    if (!isAvailable) this.switchField.disabled = true;
    this.appendEl(this.switchField);
  }

  getInputNode() {
    return this.switchField.getInputNode();
  }

  getSwitch() {
    return this.keyboardSwitch;
  }

  get checked(): boolean {
    return this.switchField.getInputNode().checked;
  }
  set checked(value: boolean) {
    this.switchField.getInputNode().checked = value;
  }
}
