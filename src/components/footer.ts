import { Anchor } from './elements/anchor-component';
import { Component } from './elements/base-component';

export class Footer extends Component {
  private wrapper = new Component({ className: 'container', parent: this });
  private contentWrapper = new Component({ className: 'footer__wrapper', parent: this.wrapper });
  private linkWrapper = new Component({ className: 'footer__links', parent: this.contentWrapper });
  private rival = new Anchor({
    className: 'footer__link',
    text: '@EternalRival',
    href: 'https://github.com/EternalRival',
    target: '_blank',
    parent: this.linkWrapper,
  });
  private jiri = new Anchor({
    className: 'footer__link',
    text: '@JiriSimonov',
    href: 'https://github.com/JiriSimonov',
    target: '_blank',
    parent: this.linkWrapper,
  });
  private year = new Component({ className: 'footer__year', textContent: '2023', parent: this.contentWrapper });
  private logo = new Anchor({
    className: 'footer__logo',
    href: 'https://rs.school/js/',
    target: '_blank',
    parent: this.contentWrapper,
    ariaLabel: 'Курсы RSS JS/FE',
  });

  constructor() {
    super({ tag: 'footer', className: 'footer' });
  }
}
