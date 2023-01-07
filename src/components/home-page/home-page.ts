import { Component } from '../elements/base-component';
import { Button } from '../elements/button-component';
import { Heading } from '../elements/heading-component';
import { Section } from '../elements/section-component';

export class Home extends Section {
  private container = new Component({ className: 'container', parent: this });
  private wrapper = new Component({ className: 'home__wrapper', parent: this.container });
  private title = new Heading({
    tag: 'h1',
    className: 'home__title',
    textContent: 'Keyboards Store',
    parent: this.wrapper,
  });
  private subtitle = new Component({
    tag: 'p',
    className: 'home__text',
    // eslint-disable-next-line max-len
    textContent: `Keyboards Store - это магазин механических клавиатур для профессионалов. Мы продаём только то, что нравится нам самим. Каждую представленную на сайте клавиатуру мы рекомендуем.`,
    parent: this.wrapper,
  });

  private mainPageText = new Component({
    tag: 'p',
    className: 'home__text home__text_description',
    // eslint-disable-next-line max-len
    textContent: `Тщательно отбирая клавиатуры и аксессуары для нашего магазина, мы не признаем компромиссов в вопросах качества и не идем на сделки с совестью. Именно поэтому вы не найдете у нас клавиатур, которыми мы сами не хотели бы пользоваться – в GeekBoards продаётся только то, что нравится нам самим и только то, что мы можем со всей ответственностью вам порекомендовать.`,
    parent: this.wrapper,
  });

  private button = new Button({
    className: 'home__button',
    onclick: () => {
      window.location.hash = '/store';
    },
    textContent: 'Выбрать клавиатуру',
    parent: this.wrapper,
  });

  constructor() {
    super({ className: 'home' });
  }
}
