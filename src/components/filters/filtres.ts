import { SortFilter } from './sort-filter';
import { BaseComponent } from '../elements/base-component';
import { DB } from '../../services/db/database';
import { Button } from '../elements/button';
import { QuantityFilter } from './quantity-filter';
import { PriceFilter } from './price-filter';
import { AvFilter } from './av-filter';
import { SwitchFilter } from './switch-filter';
import { BrandFilter } from './brand-filter';
import { SizeFilter } from './size-filter';
import { FeaturesFilter } from './features-filter';
import { Filter } from './filter';

export class Filters extends BaseComponent {
  sortFilter = new SortFilter();
  availableFilter = new AvFilter();
  switchFilter = new SwitchFilter();
  priceFilter = new PriceFilter();
  quantityFilter = new QuantityFilter();
  manufacturerFiler = new BrandFilter();
  sizeFilter = new SizeFilter();
  featuresFilter = new FeaturesFilter();
  clearFilters: Button;
  copyFilters: Button;

  constructor() {
    super({ tag: 'ul', className: 'filters' });
    this.clearFilters = new Button({
      className: 'filter__clear',
      text: 'Очистить фильтры',
      onclick: () => {
        DB.filter.clearAll();
        Filter.uncheckAll(
          ...this.availableFilter.getInputs(),
          ...this.switchFilter.getInputs(),
          ...this.switchFilter.getRadioInputs(),
          ...this.manufacturerFiler.getInputs(),
          ...this.sizeFilter.getInputs(),
          ...this.featuresFilter.getInputs(),
        );
        this.availableFilter.getInputs()[0].checked = true;
        this.priceFilter.setDefaultValues();
        this.quantityFilter.setDefaultValues();
        window.scrollTo(0, 0);
      },
    });
    this.copyFilters = new Button({
      className: 'filter__clear',
      text: 'Скопировать фильтры',
      onclick: () => {
        const renderCopyAnimation = (result: 'success' | 'fail') => {
          const icon = this.copyFilters.getNode();
          icon.classList.add(`filter__clear_${result}`);
          icon.textContent = 'Скопировано!';
          icon.ontransitionend = () => {
            icon.classList.remove(`filter__clear_${result}`);
            icon.textContent = 'Скопировать фильтры';
            icon.ontransitionend = null;
          };
        };
        navigator.clipboard
          .writeText(encodeURI(window.location.href))
          .then(() => renderCopyAnimation('success'))
          .catch(() => renderCopyAnimation('fail'));
      },
    });
    this.appendEl([
      this.sortFilter,
      this.availableFilter,
      this.switchFilter,
      this.priceFilter,
      this.quantityFilter,
      this.manufacturerFiler,
      this.sizeFilter,
      this.featuresFilter,
      this.copyFilters,
      this.clearFilters,
    ]);

    //?
    this.renderFilterNumbers();
    window.addEventListener('hashchange', () => this.renderFilterNumbers());
  }

  renderFilterNumbers() {
    [
      ...this.availableFilter.getInputs(),
      ...this.switchFilter.getInputs(),
      ...this.manufacturerFiler.getInputs(),
      ...this.sizeFilter.getInputs(),
      ...this.featuresFilter.getInputs(),
    ].forEach((v) => {
      const input = v.getInputNode();
      const textNode = v.node.firstChild;

      //? не пойму че делать с текстами фильтра наличия
      /* let label: string;
      let sample: number;
      let all: number;

      if (input.name === 'available') {
        if (input.value === 'true') {
          label = 'В наличии';
          [sample, all] = [Filter.getHead(input.name, input.value), Filter.getTail(input.name, input.value)];
        } else {
          label = 'Всё';
          [sample, all] = [Filter.getHead('', ''), Filter.getTail('', '')];
        }
      } else {
        label = input.value;
        [sample, all] = [Filter.getHead(input.name, input.value), Filter.getTail(input.name, input.value)];
      } */

      //? вариант без обработки текста фильтров наличия
      if (input.name === 'available') return;
      const label = input.value;
      const [sample, all] = [Filter.getHead(input.name, input.value), Filter.getTail(input.name, input.value)];
      //?

      //? отключил дизейбл, т.к. это отменяет часть `||` фильтрации
      // input.disabled = !sample; //? возможно тут лучше поинтеривентс, но не уверен
      Object.assign(v.node.style, { opacity: sample ? 1 : 1 / 3 });

      if (textNode) textNode.textContent = `${label}: (${sample}/${all})`;
    });

    //? с этими хз. пока так (отключил, т.к. с ними тормозит)
    /* this.switchFilter.getRadioInputs().forEach((v) => {
      const { name, value } = v.getInputNode();
      const part = Filter.getHead(name, value);
      // const all = Filter.getTail(name, value);
      // const str = Filter.getHeadTail(name, value);
      // console.info(part, all, str);

      const input = v.getInputNode();
      const label = input.parentElement;
      if (!label) return;

      input.disabled = !part;
      if (part) label.classList.remove('switch__item_false');
      else label.classList.add('switch__item_false');
    }); */
  }
}
