import { FormFieldProps } from '../../interfaces/interfaces';
/* eslint-disable import/prefer-default-export */
import BaseComponent from './base-component';
import Input from './input';

export class FormField extends BaseComponent {
  private fieldInput: Input;

  constructor(props: FormFieldProps) {
    super({ tag: 'label', className: `${props.className}__label`, text: props.text });
    this.fieldInput = new Input(
      {
        className: `${props.className}__input`,
        parent: this.node,
        type: props.type,
        placeholder: props.placeholder,
        pattern: props.pattern,
        value: props.value,
      },
    );
  }
}
