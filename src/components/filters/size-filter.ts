import BaseComponent from '../elements/base-component';
import Filter from './filter';
import Button from '../elements/button';

export default class SizeFilter extends Filter {
  private filterWrapper: BaseComponent;

  private oh: Button; // 100

  private nt: Button; // 90

  private et: Button; // 80

  private sf: Button; // 75

  private sixf: Button; // 65

  private sixt: Button; // 60

  private ft: Button; // 40

  private tw: Button; // 20

  constructor() {
    super('Наличие');
    this.filterWrapper = new BaseComponent({ className: 'filter__wrapper', parent: this.node });
    this.oh = new Button({ className: 'filter__btn', text: '100%', parent: this.filterWrapper.getNode() });
    this.nt = new Button({ className: 'filter__btn', text: '90%', parent: this.filterWrapper.getNode() });
    this.et = new Button({ className: 'filter__btn', text: '80%', parent: this.filterWrapper.getNode() });
    this.sf = new Button({ className: 'filter__btn', text: '70%', parent: this.filterWrapper.getNode() });
    this.sixf = new Button({ className: 'filter__btn', text: '65%', parent: this.filterWrapper.getNode() });
    this.sixt = new Button({ className: 'filter__btn', text: '60%', parent: this.filterWrapper.getNode() });
    this.ft = new Button({ className: 'filter__btn', text: '40%', parent: this.filterWrapper.getNode() });
    this.tw = new Button({ className: 'filter__btn', text: '20%', parent: this.filterWrapper.getNode() });
  }
}
