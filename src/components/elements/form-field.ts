import { FormFieldProps } from '../../interfaces/interfaces';
import { BaseComponent } from './base-component';
import { Input } from './input';

export class FormField extends BaseComponent<HTMLLabelElement> {
  private fieldInput: Input;

  constructor(props: FormFieldProps) {
    super({ tag: 'label', className:  props.modificator
        ? `${props.className}__label ${props.className}__label_${props.modificator}`
        : `${props.className}__label`, text: props.text });
    this.fieldInput = new Input(
      {
      className: props.modificator
        ? `${props.className}__input ${props.className}__input_${props.modificator}`
        : `${props.className}__input`,
      parent: this.node,
      type: props.type,
      placeholder: props.placeholder,
      pattern: props.pattern,
      value: props.value,
      min: props.min,
      max: props.max,
      name: props.name,
      },
    );
  }

  getInputNode() {
    return this.fieldInput.getNode();
  }

  get disabled(): boolean {
    return this.getInputNode().disabled;
  }
  set disabled(value: boolean) {
    this.getInputNode().disabled = value;
  }
}
