import { SwitchComponent } from '../switches/switch-component';
import { FormField } from '../elements/form-field';
import { BaseComponent } from '../elements/base-component';

export class Filter extends BaseComponent {
  private filterTitle: BaseComponent;

  protected container: BaseComponent;

  constructor(title: string) {
    super({ tag: 'li', className: 'filter__item' });
    this.filterTitle = new BaseComponent({ tag: 'h2', className: 'filter__title', text: title });
    this.container = new BaseComponent({ className: 'filter__container' });
    this.appendEl([this.filterTitle, this.container]);
  }

  static uncheckAll(...labels: (FormField | SwitchComponent)[]) {
    labels.flat().forEach((item) => {Object.assign(item, { checked: false })});
  }
}
