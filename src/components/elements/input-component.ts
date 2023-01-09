import { Component, ComponentProps } from './base-component';

export class Input extends Component<HTMLInputElement> {
  constructor(props?: ComponentProps<HTMLInputElement>) {
    super({ ...props, tag: 'input' });

    this.node.required = true;

    if (this.node.type === 'number') {
      this.addEventListener('keydown', (e) => {
        if (['e', 'E', '-', '+', '.', ','].includes(e.key)) {
          e.preventDefault();
        }
      });
    }
  }

  get value(): string {
    return this.node.value;
  }
  set value(value: string) {
    this.node.value = value;
  }
  get name(): string {
    return this.node.name;
  }
  get disabled(): boolean {
    return this.node.disabled;
  }
  set disabled(value: boolean) {
    this.node.disabled = value;
  }
  get checked(): boolean {
    return this.node.checked;
  }
  set checked(value: boolean) {
    this.node.checked = value;
  }
}
