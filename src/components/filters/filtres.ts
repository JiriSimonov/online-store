import { Component } from '../elements/base-component';
import { DB } from '../../services/db/database';
import { Button } from '../elements/button-component';
import { QuantityFilter } from './quantity-filter';
import { PriceFilter } from './price-filter';
import { AvFilter } from './av-filter';
import { SwitchFilter } from './switch-filter';
import { BrandFilter } from './brand-filter';
import { SizeFilter } from './size-filter';
import { FeaturesFilter } from './features-filter';
import { Filter } from './filter';
import { FilterCategory } from '../../interfaces/enums';

export class Filters extends Component {
  private closeFilterTop = new Button({ className: 'modal__close', ariaLabel: 'Закрыть', parent: this });
  private closeFilterBottom = new Button({ className: 'filter__clear', textContent: 'Закрыть' });
  availableFilter = new AvFilter();
  switchFilter = new SwitchFilter();
  priceFilter = new PriceFilter();
  quantityFilter = new QuantityFilter();
  manufacturerFiler = new BrandFilter();
  sizeFilter = new SizeFilter();
  featuresFilter = new FeaturesFilter();
  clearFilters: Button;
  copyFilters: Button;

  constructor(elem: Component) {
    super({ tag: 'ul', className: 'filter' });
    this.closeFilterTop.onclick = () => {
      elem.classList.remove('store__wrapper_is-open');
      DB.filter.setParam('filters');
      this.destroy();
    };
    this.closeFilterBottom.onclick = () => {
      elem.classList.remove('store__wrapper_is-open');
      DB.filter.setParam('filters');
      this.destroy();
      window.scrollTo(0, 0);
    };
    this.clearFilters = new Button({
      className: 'filter__clear',
      textContent: 'Очистить фильтры',
      onclick: () => {
        DB.filter.clearAll();
        this.uncheckAllFilters();
        window.scrollTo(0, 0);
      },
    });
    this.copyFilters = new Button({
      className: 'filter__clear',
      textContent: 'Скопировать фильтры',
      onclick: () => {
        const renderCopyAnimation = (result: 'success' | 'fail') => {
          const icon = this.copyFilters;
          icon.classList.add(`filter__clear_${result}`);
          icon.text = 'Скопировано!';
          icon.node.ontransitionend = () => {
            icon.classList.remove(`filter__clear_${result}`);
            icon.text = 'Скопировать фильтры';
            icon.node.ontransitionend = null;
          };
        };
        navigator.clipboard
          .writeText(window.location.href)
          .then(() => renderCopyAnimation('success'))
          .catch(() => renderCopyAnimation('fail'));
      },
    });
    this.append(
      this.availableFilter,
      this.switchFilter,
      this.priceFilter,
      this.quantityFilter,
      this.manufacturerFiler,
      this.sizeFilter,
      this.featuresFilter,
      this.copyFilters,
      this.clearFilters,
      this.closeFilterBottom,
    );

    this.renderFilterNumbers();
    window.addEventListener('hashchange', () => {
      this.updateAllChecks();
      this.renderFilterNumbers();
    });
  }

  renderFilterNumbers() {
    [
      ...this.availableFilter.inputs,
      ...this.switchFilter.inputs,
      ...this.manufacturerFiler.inputs,
      ...this.sizeFilter.inputs,
      ...this.featuresFilter.inputs,
    ].forEach((v) => {
      const { name, value } = v.input;
      const textNode = v.node.firstChild;

      if (name === 'available') {
        return;
      }
      const label = value;
      const sample = Filter.getHead(name as FilterCategory, value);
      const all = Filter.getTail(name as FilterCategory, value);

      if (sample) {
        v.classList.remove('shadowed');
      } else {
        v.classList.add('shadowed');
      }

      if (textNode) {
        textNode.textContent = `${label}: (${sample}/${all})`;
      }
    });

    this.switchFilter.radioInputs.forEach((v) => {
      const { parent, name, value } = v.input;
      const part = Filter.getHead(name as FilterCategory, value);

      if (!parent) {
        return;
      }

      if (part) {
        parent.classList.remove('switch__item_false', 'shadowed');
      } else {
        parent.classList.add('switch__item_false', 'shadowed');
      }
    });
  }

  uncheckAllFilters() {
    Filter.uncheckAll(
      ...this.availableFilter.inputs,
      ...this.switchFilter.inputs,
      ...this.switchFilter.radioInputs,
      ...this.manufacturerFiler.inputs,
      ...this.sizeFilter.inputs,
      ...this.featuresFilter.inputs,
    );
    this.availableFilter.inputs[0].checked = !this.availableFilter.inputs[1].checked;
  }
  updateAllChecks() {
    Filter.updateChecks(this.availableFilter.category, ...this.availableFilter.inputs);
    Filter.updateChecks(this.switchFilter.categoryA, ...this.switchFilter.inputs);
    Filter.updateChecks(this.switchFilter.categoryB, ...this.switchFilter.radioInputs);
    Filter.updateChecks(this.manufacturerFiler.category, ...this.manufacturerFiler.inputs);
    Filter.updateChecks(this.sizeFilter.category, ...this.sizeFilter.inputs);
    Filter.updateChecks(this.featuresFilter.category, ...this.featuresFilter.inputs);
    this.availableFilter.inputs[0].checked = !this.availableFilter.inputs[1].checked;
  }
}
