import { DB } from '../../services/db/database';
import { BaseComponent } from '../elements/base-component';
import { FormField } from '../elements/form-field';

export class CartPagination extends BaseComponent {
  private selected = new FormField({ className: 'dropdown', modificator: 'selected', value: '20', placeholder: '20' });
  private wrapper = new BaseComponent({ className: 'dropdown__wrapper' });
  private options = ['5', '10', '15', '20'].map(
    (item) => new FormField({ className: 'dropdown', type: 'radio', name: 'pagination-size', value: item, text: item }),
  );

  constructor() {
    super({ className: 'dropdown' });
    this.selected.getInputNode().addEventListener('click', () => this.renderDropDown());
    this.selected.getInputNode().setAttribute('readonly', 'true');

    this.wrapper.node.onclick = (e) => {
      const { target } = e;
      if (!(target instanceof HTMLInputElement)) return;

      this.selected.getInputNode().value = target.value
      DB.filter.setParam('cartPageSize', target.value)

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
