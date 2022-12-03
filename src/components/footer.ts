import BaseComponent from './base-component';

export default class Footer extends BaseComponent {
  private wrapper: BaseComponent;

  private contentWrapper: BaseComponent;

  private year: BaseComponent;

  private logo: BaseComponent;

  private linkWrapper: BaseComponent;

  private linkOne:BaseComponent;

  private linkTwo:BaseComponent;

  constructor() {
    super({ tag: 'footer', className: 'footer' });
    this.wrapper = new BaseComponent({ className: 'container' });
    this.contentWrapper = new BaseComponent({ className: 'footer__wrapper' });
    this.year = new BaseComponent({ className: 'footer__year', text: '2022' });
    this.logo = new BaseComponent({ tag: 'a', className: 'footer__logo' });
    this.linkWrapper = new BaseComponent({ className: 'footer__links' });
    this.linkOne = new BaseComponent({ tag: 'a', className: 'footer__logo', text: 'ссылка' });
    this.linkTwo = new BaseComponent({ tag: 'a', className: 'footer__logo', text: 'ссылка' });
  }

  render() {
    this.wrapper.appendEl(this.contentWrapper);
    this.linkWrapper.appendEl([this.linkOne, this.linkTwo]);
    this.contentWrapper.appendEl([this.linkWrapper, this.year, this.logo]);
    this.appendEl(this.wrapper);
  }
}
