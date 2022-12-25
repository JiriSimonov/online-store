import { Anchor } from './elements/anchor';
import { BaseComponent } from './elements/base-component';

export class Footer extends BaseComponent {
  private wrapper: BaseComponent;

  private contentWrapper: BaseComponent;

  private year: BaseComponent;

  private logo: BaseComponent;

  private linkWrapper: BaseComponent;

  private linkOne: BaseComponent;

  private linkTwo: BaseComponent;

  constructor() {
    super({ tag: 'footer', className: 'footer' });
    this.wrapper = new BaseComponent({ className: 'container' });
    this.contentWrapper = new BaseComponent({ className: 'footer__wrapper' });
    this.year = new BaseComponent({ className: 'footer__year', text: '2022' });
    this.logo = new Anchor({
      tag: 'a',
      className: 'footer__logo',
      href: 'https://rs.school/js/',
      target: '_blank',
    });
    this.logo.getNode().setAttribute('aria-label', 'Курсы RSS JS/FE');
    this.linkWrapper = new BaseComponent({ className: 'footer__links' });
    this.linkOne = new Anchor({
      tag: 'a',
      className: 'footer__link',
      text: '@EternalRival',
      href: 'https://github.com/EternalRival',
      target: '_blank',
    });
    this.linkTwo = new Anchor({
      tag: 'a',
      className: 'footer__link',
      text: '@JiriSimonov',
      href: 'https://github.com/JiriSimonov',
      target: '_blank',
    });
  }

  render() {
    this.wrapper.appendEl(this.contentWrapper);
    this.linkWrapper.appendEl([this.linkOne, this.linkTwo]);
    this.contentWrapper.appendEl([this.linkWrapper, this.year, this.logo]);
    this.appendEl(this.wrapper);
    return this;
  }
}
