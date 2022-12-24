import { BaseComponent } from '../elements/base-component';
import { Image } from '../elements/image';
import { Loader } from '../store/loader';

export class ProductImage extends BaseComponent {
  private zones: BaseComponent[];
  private images: Image[] = [];

  private loader = new Loader();

  constructor(imageList: string[]) {
    super({ className: 'store__img' });

    const setImage = (index: number): void => {
      this.setStyleAttr(['backgroundImage',`url(${this.images[index].getNode().src})`])
    };

    this.zones = imageList.map((_, i) => {
      const component = new BaseComponent({ className: 'store__img-item' });
      const node = component.getNode();

      node.onmouseover = () => setImage(i);
      node.onmouseout = () => setImage(0);

      return component;
    });

    this.appendEl([this.loader, ...this.zones]);
    this.getImageList(imageList).then(() => {
      this.loader.destroy();
      setImage(0);
    });
  }

  async getImageList(imageList: string[]) {
    const getPromise = (name: string): Promise<Image> =>
      new Promise((res) => {
        const img = new Image();
        img.getNode().src = `assets/images/keyboards/${name}.webp`;
        img.getNode().onload = () => res(img);
      });
    this.images = await Promise.all(imageList.map(getPromise));
  }
}
