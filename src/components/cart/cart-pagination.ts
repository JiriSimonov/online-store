import { BaseComponent } from '../elements/base-component';
import { FormField } from '../elements/form-field';

export class CartPagination extends BaseComponent {
  private wrapper = new BaseComponent({ className: 'dropdown__wrapper', parent: this.node });
  private selected = new FormField({
    className: 'dropdown',
    modificator: 'selected',
    value: '20',
    placeholder: '20',
  });
  private options = [
    new FormField({ className: 'dropdown', type: 'radio', name: 'pagination-size', value: '5', text: '5' }),
    new FormField({ className: 'dropdown', type: 'radio', name: 'pagination-size', value: '10', text: '10' }),
    new FormField({ className: 'dropdown', type: 'radio', name: 'pagination-size', value: '15', text: '15' }),
    new FormField({ className: 'dropdown', type: 'radio', name: 'pagination-size', value: '20', text: '20' }),
  ]

  constructor() {
    super({ className: 'dropdown' });
    this.selected.getInputNode().addEventListener('click', () => {
      this.node.classList.toggle('dropdown_is-open');
    });
    this.options.forEach((item) => {
      const elem = item;
      elem.getInputNode().onclick = (e) => {
        const { target } = e;
        if (target && target instanceof HTMLInputElement) {
          this.selected.getInputNode().value = target.value;
          this.node.classList.toggle('dropdown_is-open');
        }
      } // TODO можешь отрефачить, сделал так, что бы просто работало
    });
    this.selected.getInputNode().setAttribute('readonly', 'true');
    this.appendEl(this.selected);
    this.appendEl(this.wrapper);
    this.wrapper.appendEl(this.options);
  }
}
