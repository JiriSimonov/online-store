import { FormField } from './../elements/form-field';
import { KeyboardSwitch } from '../../services/db/keyboard-switch';
import { BaseComponent } from '../elements/base-component';

export class SwitchComponent extends BaseComponent {
  private switchField: FormField;

  constructor(private props: KeyboardSwitch, keyboardId: string) {
    super({ tag: 'li', className: 'switch__item' });
    const { id, isAvailable } = props;
    this.switchField = new FormField({ className: 'switch', type: 'radio', text: id, value: id, name: `${keyboardId}` });
    this.switchField.getNode().classList.add(id);
    this.switchField.getNode().classList.add(`${isAvailable ? 'switch__item_true' : 'switch__item_false'}`);
    if (!isAvailable) this.switchField.getInputNode().setAttribute('disabled', 'false');
    this.appendEl(this.switchField);
  }

  getInputNode() {
    return this.switchField.getInputNode();
  }

  getSwitch() {
    return this.props;
  }
}
