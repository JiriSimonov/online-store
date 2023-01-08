import { Component } from './base-component';
import { Button } from './button-component';
import { DB } from '../../services/db/database';

export class ChangeView extends Component {
  private table: Button;

  private list: Button;

  constructor() {
    super({ className: 'view' });
    this.table = new Button({
      className: 'view__table view__table_active',
      parent: this,
      onclick: () => {
        this.parent?.classList.remove('list');
        this.table.classList.add('view__table_active');
        this.list.classList.remove('view__list_active');
        DB.filter.setParam('view', 'table');
      },
      ariaLabel: 'Отобразить в виде таблицы',
    });
    this.list = new Button({
      className: 'view__list',
      parent: this,
      onclick: () => {
        this.parent?.classList.add('list');
        this.list.classList.add('view__list_active');
        this.table.classList.remove('view__table_active');
        DB.filter.setParam('view', 'list');
      },
      ariaLabel: 'Отобразить в виде списка',
    });

    window.addEventListener('DOMContentLoaded', () => {
      if (DB.filter.getParam('view') === 'list') {
        this.list.click();
      }
    });
  }
}
