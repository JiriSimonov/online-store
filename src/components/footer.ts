import { Anchor } from './elements/anchor';
import { BaseComponent } from './elements/base-component';

export class Footer extends BaseComponent {
  private wrapper = new BaseComponent({ className: 'container', parent: this.node });

  private contentWrapper = new BaseComponent({ className: 'footer__wrapper', parent: this.wrapper.getNode() });

  private linkWrapper = new BaseComponent({ className: 'footer__links', parent: this.contentWrapper.getNode() });

  private linkOne = new Anchor({
    className: 'footer__link',
    text: '@EternalRival',
    href: 'https://github.com/EternalRival',
    target: '_blank',
    parent: this.linkWrapper.getNode(),
  });

  private linkTwo = new Anchor({
    className: 'footer__link',
    text: '@JiriSimonov',
    href: 'https://github.com/JiriSimonov',
    target: '_blank',
    parent: this.linkWrapper.getNode(),
  });

  private year = new BaseComponent({ className: 'footer__year', text: '2022', parent: this.contentWrapper.getNode() });

  private logo = new Anchor({
    className: 'footer__logo',
    href: 'https://rs.school/js/',
    target: '_blank',
    parent: this.contentWrapper.getNode(),
    ariaLabel: 'Курсы RSS JS/FE',
  });

  constructor() {
    super({ tag: 'footer', className: 'footer' });
  }
}
