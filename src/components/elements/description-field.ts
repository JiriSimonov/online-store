import { DescriptionFieldProps } from '../../interfaces/interfaces';
import { BaseComponent } from './base-component';

export class DescriptionField extends BaseComponent {
  private key: BaseComponent;
  private value: BaseComponent;

  constructor(props: DescriptionFieldProps) {
    super({ tag: 'li', className: 'product__item' });
    this.key = new BaseComponent({ tag: 'h4', className: 'product__subtitle', text: props.key, parent: this.node }); 
    this.value = new BaseComponent({ className: 'product__text', text: props.value, parent: this.node }); 
  }
}
  