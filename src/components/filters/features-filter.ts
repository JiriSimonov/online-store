import BaseComponent from '../elements/base-component';
import Filter from './filter';
import Button from '../elements/button';
import ProductsListState from '../../states/goods-state';

const btns = ['С русскими буквами', 'Программируемая', 'С подсветкой', 'HOT-SWAP', 'Мультимедиа-клавиши', 'Специально под Mac', 'Беспроводная', 'Эргономическая'];

export default class FeaturesFilter extends Filter {
  private filterWrapper: BaseComponent;

  private buttons: Button[];

  constructor(private productsState: ProductsListState) {
    super('Фичи');
    this.filterWrapper = new BaseComponent({ className: 'filter__wrapper', parent: this.node });
    this.buttons = btns.map((item) => new Button({ className: 'filter__btn', text: item, parent: this.filterWrapper.getNode() }));
    this.buttons.map((item) => item.getNode().addEventListener('click', () => {
      this.buttons.map((elem) => elem.getNode().classList.remove('active'));
      item.getNode().classList.toggle('active');
      productsState.set({ features: item.getNode().textContent as string });
    }));
  }
}
