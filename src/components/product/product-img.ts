import { BaseComponent } from '../elements/base-component';

export class ProductImage extends BaseComponent {
  private images: BaseComponent[] | undefined;

  constructor(imageList: string[]) {
    super({ className: 'store__img' });

    const setImage = (fileName: string): void => {
      this.node.style.backgroundImage = `url(assets/images/keyboards/${fileName}.webp)`;
    };

    this.images = imageList.map((v, i, a) => {
      const component = new BaseComponent({ className: 'store__img' });
      const node = component.getNode();

      if (i === 0) setImage(v);

      node.onmouseover = () => setImage(v);
      node.onmouseout = () => setImage(a[0]);

      return component;
    });

    this.appendEl(this.images);
  }
}
