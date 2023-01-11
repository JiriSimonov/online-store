import { DB } from '../../services/db/database';
import { Component } from '../elements/base-component';
import { FormField } from '../elements/form-field';

export class CartPagination extends Component {
  selected = new FormField({ className: 'dropdown', modificator: 'selected' });
  private wrapper = new Component({ className: 'dropdown__wrapper' });
  private options = ['4', '10', '16', '20'].map(
    (item) =>
      new FormField({ className: 'dropdown', type: 'radio', name: 'pagination-size', value: item, textContent: item }),
  );

  constructor(currentValue: string) {
    super({ className: 'dropdown' });
    Object.assign(this.selected.input.node, {
      value: currentValue,
      placeholder: currentValue,
      readOnly: true,
      onclick: () => this.renderDropDown(),
    });

    this.wrapper.onclick = (e) => {
      const { target } = e;
      if (!(target instanceof HTMLInputElement)) {
        return;
      }

      this.selected.input.value = target.value;
      DB.filter.setParam('cartPageSize', target.value);

      this.renderDropDown();
    };
    this.append(this.selected);
    this.wrapper.append(...this.options);
  }

  renderDropDown() {
    if (this.wrapper.parent) {
      this.wrapper.destroy();
    } else {
      this.append(this.wrapper);
    }
  }
}
