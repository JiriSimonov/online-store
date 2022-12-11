import BaseComponent from '../elements/base-component';
import Filter from './filter';
import Button from '../elements/button';

export default class BrandFilter extends Filter {
  private filterWrapper: BaseComponent;

  private ducky: Button;

  private leopold: Button;

  private geekboards: Button;

  private vortex: Button;

  private mistel: Button;

  private durgod: Button;

  private tex: Button;

  private shurikey: Button;

  private keychron: Button;

  private varmillo: Button;

  private nuPhy: Button;

  private topre: Button;

  private hhkb: Button;

  private kinesis: Button;

  constructor() {
    super('Бренд');
    this.filterWrapper = new BaseComponent({ className: 'filter__wrapper', parent: this.node });
    this.ducky = new Button({ className: 'filter__btn', text: 'Ducky', parent: this.filterWrapper.getNode() });
    this.leopold = new Button({ className: 'filter__btn', text: 'Leopold', parent: this.filterWrapper.getNode() });
    this.geekboards = new Button({ className: 'filter__btn', text: 'Geekboards', parent: this.filterWrapper.getNode() });
    this.vortex = new Button({ className: 'filter__btn', text: 'Vortex', parent: this.filterWrapper.getNode() });
    this.mistel = new Button({ className: 'filter__btn', text: 'Mistel', parent: this.filterWrapper.getNode() });
    this.durgod = new Button({ className: 'filter__btn', text: 'Durgod', parent: this.filterWrapper.getNode() });
    this.tex = new Button({ className: 'filter__btn', text: 'Tex', parent: this.filterWrapper.getNode() });
    this.shurikey = new Button({ className: 'filter__btn', text: 'Shurikey Gear', parent: this.filterWrapper.getNode() });
    this.keychron = new Button({ className: 'filter__btn', text: 'Keychron', parent: this.filterWrapper.getNode() });
    this.varmillo = new Button({ className: 'filter__btn', text: 'Varmilo', parent: this.filterWrapper.getNode() });
    this.nuPhy = new Button({ className: 'filter__btn', text: 'NuPhy', parent: this.filterWrapper.getNode() });
    this.topre = new Button({ className: 'filter__btn', text: 'Topre Realforce', parent: this.filterWrapper.getNode() });
    this.hhkb = new Button({ className: 'filter__btn', text: 'HHKB', parent: this.filterWrapper.getNode() });
    this.kinesis = new Button({ className: 'filter__btn', text: 'Kinesis', parent: this.filterWrapper.getNode() });
  }
}
