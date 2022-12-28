import { BaseComponent } from '../elements/base-component';
import { Button } from '../elements/button';

export class Home extends BaseComponent {
  private container = new BaseComponent({ className: 'container', parent: this.node });
  private wrapper = new BaseComponent({ className: 'home__wrapper', parent: this.container.getNode() });
  private title = new BaseComponent({
    tag: 'h1',
    className: 'home__title',
    text: 'Keyboards Store',
    parent: this.wrapper.getNode(),
  });
  private subtitle = new BaseComponent({
    tag: 'p',
    className: 'home__text',
    // eslint-disable-next-line max-len
    text: `Keyboards Store - это магазин механических клавиатур для профессионалов. Мы продаём только то, что нравится нам самим. Каждую представленную на сайте клавиатуру мы рекомендуем.`,
    parent: this.wrapper.getNode(),
  });

  private text = new BaseComponent({
    tag: 'p',
    className: 'home__text home__text_description',
    // eslint-disable-next-line max-len
    text: `Тщательно отбирая клавиатуры и аксессуары для нашего магазина, мы не признаем компромиссов в вопросах качества и не идем на сделки с совестью. Именно поэтому вы не найдете у нас клавиатур, которыми мы сами не хотели бы пользоваться – в GeekBoards продаётся только то, что нравится нам самим и только то, что мы можем со всей ответственностью вам порекомендовать.`,
    parent: this.wrapper.getNode(),
  });

  private button = new Button({
    className: 'home__button',
    onclick: () => {
      window.location.hash = '#store';
    },
    text: 'Выбрать клавиатуру',
    parent: this.wrapper.getNode(),
  });

  constructor() {
    super({ tag: 'section', className: 'home' });
  }
}
