import { BaseComponent } from '../elements/base-component';
import { Image } from '../elements/image';
import { Loader } from '../store/loader';

export class ProductImage extends BaseComponent {
  private zones: BaseComponent[];
  private image: Image = new Image();
  private images: Image[] = [];

  private loader = new Loader();

  constructor(imageList: string[]) {
    super({ className: 'store__img' });
    this.image.getNode().className = 'store__img-main';

    const setImage = (index: number): void => {
      const newImage = this.images[index];
      this.image.getNode().replaceWith(newImage.getNode());
      this.image = newImage;
    };

    this.zones = imageList.map((_, i) => {
      const component = new BaseComponent({ className: 'store__img-item' });
      const node = component.getNode();

      node.onmouseover = () => setImage(i);
      node.onmouseout = () => setImage(0);

      return component;
    });

    this.appendEl([this.image, this.loader, ...this.zones]);
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
        img.getNode().className = 'store__img-main';
        img.getNode().onload = () => res(img);
      });
    this.images = await Promise.all(imageList.map(getPromise));
  }
}
