import { BaseComponent } from '../elements/base-component';
import { Image } from '../elements/image';
import { Loader } from '../store/loader';

export class ProductImage extends BaseComponent {
  private zones: BaseComponent[];
  private images: string[] = [];

  private loader = new Loader(false);

  constructor(imageList: string[]) {
    super({ className: 'store__img' });

    const setImage = (index: number): void => this.setStyleAttr(['backgroundImage', `url(${this.images[index]})`]);

    this.zones = imageList.map((_, i) => {
      const component = new BaseComponent({ tag: 'span', className: 'store__img-item' });
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

  async getImageList(imageList: string[]): Promise<void> {
    const promises: Promise<string>[] = imageList.map(async (name) => {
      const src = `assets/images/keyboards/${name}.webp`;
      const img = new Image();
      Object.assign(img.getNode(), { src });
      await img.getNode().decode();
      return src;
    });
    this.images = await Promise.all(promises);
  }
}
