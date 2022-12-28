import { BaseComponent } from './base-component';
import { Button } from './button';
import { DB } from '../../services/db/database';

export class ChangeView extends BaseComponent {
  private table: Button;

  private list: Button;

  constructor() {
    super({ className: 'view' });
    this.table = new Button({ className: 'view__table view__table_active', parent: this.node, onclick: () => {
      this.node.parentElement?.classList.remove('list');
      this.table.getNode().classList.add('view__table_active');
      this.list.getNode().classList.remove('view__list_active');
      DB.filter.setParam('view', 'table');
    },
    aria: 'Отобразить в виде таблицы',
  });
    this.list = new Button({ className: 'view__list', parent: this.node, onclick: () => {
      this.node.parentElement?.classList.add('list');
      this.list.getNode().classList.add('view__list_active');
      this.table.getNode().classList.remove('view__table_active');
      DB.filter.setParam('view', 'list');
    },
    aria: 'Отобразить в виде списка',
  });
  if (DB.filter.getParam('view') === 'list') this.list.getNode().click();
  }
}
