import { DB } from '../../services/db/database';
import { BaseComponent } from '../elements/base-component';
import { FormField } from '../elements/form-field';

export class CartPagination extends BaseComponent {
  selected = new FormField({ className: 'dropdown', modificator: 'selected' });
  private wrapper = new BaseComponent({ className: 'dropdown__wrapper' });
  private options = ['4', '10', '16', '20'].map(
    (item) => new FormField({ className: 'dropdown', type: 'radio', name: 'pagination-size', value: item, text: item }),
  );

  constructor(currentValue: string) {
    super({ className: 'dropdown' });
    Object.assign(this.selected.getInputNode(), {
      value: currentValue,
      placeholder: currentValue,
      readOnly: true,
      onclick: () => this.renderDropDown(),
    });

    this.wrapper.node.onclick = (e) => {
      const { target } = e;
      if (!(target instanceof HTMLInputElement)) return;

      this.selected.getInputNode().value = target.value;
      DB.filter.setParam('cartPageSize', target.value);

      this.renderDropDown();
    };

    this.appendEl(this.selected);
    this.wrapper.appendEl(this.options);
  }

  renderDropDown() {
    if (this.wrapper.node.parentElement) this.wrapper.destroy();
    else this.appendEl(this.wrapper);
  }
}
