import BaseComponent from '../base-component';
import Button from '../button';

export default class Home extends BaseComponent {
  private container: BaseComponent;

  private wrapper: BaseComponent;

  private title: BaseComponent;

  private subtitle: BaseComponent;

  private text: BaseComponent;

  private button: Button;

  constructor() {
    super({ tag: 'section', className: 'home' });
    this.container = new BaseComponent({ className: 'container' });
    this.wrapper = new BaseComponent({ className: 'home__wrapper' });
    this.title = new BaseComponent({ tag: 'h1', className: 'home__title', text: 'Keyboards Store' });
    this.subtitle = new BaseComponent({ tag: 'p', className: 'home__text', text: 'Keyboards Store - это магазин механических клавиатур для профессионалов. Мы продаём только то, что нравится нам самим. Каждую представленную на сайте клавиатуру мы рекомендуем.' });
    this.text = new BaseComponent({ tag: 'p', className: 'home__text', text: 'Тщательно отбирая клавиатуры и аксессуары для нашего магазина, мы не признаем компромиссов в вопросах качества и не идем на сделки с совестью. Именно поэтому вы не найдете у нас клавиатур, которыми мы сами не хотели бы пользоваться – в GeekBoards продаётся только то, что нравится нам самим и только то, что мы можем со всей ответственностью вам порекомендовать.' });
    this.button = new Button({
      className: 'home__button',
      onclick: () => {
        window.location.hash = '#store';
      },
      text: 'Выбрать клавиатуру',
    });
    this.appendEl(this.container);
    this.container.appendEl(this.wrapper);
    this.wrapper.appendEl([this.title, this.subtitle, this.text, this.button]);
  }
}
