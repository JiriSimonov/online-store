import { Component, ComponentProps } from './base-component';
import { Input } from './input-component';

export class FormField extends Component<HTMLLabelElement> {
  private fieldInput: Input;

  constructor(props?: ComponentProps<HTMLInputElement> & { modificator?: string }) {
    super({ tag: 'label' });

    const propList = { ...props };

    const name = propList.className ?? '';
    const { modificator } = propList;
    delete propList.className;
    delete propList.modificator;

    if (propList?.textContent) {
      this.text = propList.textContent;
      delete propList.textContent;
    }
    if (propList?.parent) {
      propList.parent.append(this.node);
      delete propList.parent;
    }

    this.fieldInput = new Input({ parent: this, ...propList });

    const getClassName = (tag: string) => `${name}__${tag}${modificator ? ` ${name}__${tag}_${modificator}` : ''}`;
    this.node.className = getClassName('label');
    this.fieldInput.node.className = getClassName('input');
  }

  get input() {
    return this.fieldInput;
  }

  get value() {
    return this.input.value;
  }
  set value(value) {
    this.input.value = value;
  }

  get disabled(): boolean {
    return this.input.disabled;
  }
  set disabled(value: boolean) {
    this.input.disabled = value;
  }
  get checked(): boolean {
    return this.input.checked;
  }
  set checked(value: boolean) {
    this.input.checked = value;
  }
}
