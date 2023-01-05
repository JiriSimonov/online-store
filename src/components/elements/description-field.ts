import { DescriptionFieldProps } from '../../interfaces/interfaces';
import { Component } from './base-component';
import { Heading } from './heading-component';

export class DescriptionField extends Component {
  private key: Component;
  private value: Component;

  constructor(props: DescriptionFieldProps) {
    super({ tag: 'li', className: 'product__item' });
    this.key = new Heading({ tag: 'h3', className: 'product__subtitle', textContent: props.key, parent: this });
    this.value = new Component({ className: 'product__text', textContent: props.value, parent: this });
  }
}
