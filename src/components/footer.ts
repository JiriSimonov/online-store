import { Anchor } from './elements/anchor-component';
import { Component } from './elements/base-component';

export class Footer extends Component {
  private wrapper = new Component({ className: 'container', parent: this.node });

  private contentWrapper = new Component({ className: 'footer__wrapper', parent: this.wrapper.node });

  private linkWrapper = new Component({ className: 'footer__links', parent: this.contentWrapper.node });

  private linkOne = new Anchor({
    className: 'footer__link',
    text: '@EternalRival',
    href: 'https://github.com/EternalRival',
    target: '_blank',
    parent: this.linkWrapper.node,
  });

  private linkTwo = new Anchor({
    className: 'footer__link',
    text: '@JiriSimonov',
    href: 'https://github.com/JiriSimonov',
    target: '_blank',
    parent: this.linkWrapper.node,
  });

  private year = new Component({
    className: 'footer__year',
    textContent: '2022',
    parent: this.contentWrapper.node,
  });

  private logo = new Anchor({
    className: 'footer__logo',
    href: 'https://rs.school/js/',
    target: '_blank',
    parent: this.contentWrapper.node,
    ariaLabel: 'Курсы RSS JS/FE',
  });

  constructor() {
    super({ tag: 'footer', className: 'footer' });
  }
}
