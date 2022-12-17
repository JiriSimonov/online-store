import { BaseComponent } from '../elements/base-component';
import { Filter } from './filter';
import { Button } from '../elements/button';
import { ProductsListState } from '../../states/goods-state';

const brandsArr = [
  'Ducky',
  'Leopold',
  'Geekboards',
  'Vortex',
  'Mistel',
  'Durgod',
  'Tex',
  'Shurikey Gear',
  'Keychron',
  'Varmilo',
  'NuPhy',
  'Topre Realforce',
  'HHKB',
  'Kinesis',
];

export class BrandFilter extends Filter {
  private filterWrapper: BaseComponent;

  private brands: Button[];

  constructor(private productsState: ProductsListState) {
    super('Бренд');
    this.filterWrapper = new BaseComponent({ className: 'filter__wrapper', parent: this.node });
    this.brands = brandsArr.map(
      (item) =>
        new Button({
          className: 'filter__btn',
          text: `${item}`,
          parent: this.filterWrapper.getNode(),
        }),
    );
    this.brands.map((item) =>
      item.getNode().addEventListener('click', () => {
        // TODO REFACTOR
        this.brands.map((elem) => elem.getNode().classList.remove('active'));
        item.getNode().classList.add('active');
        productsState.set({ brand: item.getNode().textContent as string });
      }),
    );
  }
}
