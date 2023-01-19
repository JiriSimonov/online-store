import { Component } from '../elements/base-component';
import { Image } from '../elements/image-component';
import { Loader } from '../store/loader';

export class ProductImage extends Component {
  private zones: Component[];
  private images: string[] = [];

  private loader = new Loader(false);

  constructor(imageList: string[]) {
    super({ className: 'store__img' });

    const setImage = (index: number): void => {
      this.style.backgroundImage = `url(${this.images[index]})`;
    };

    this.zones = imageList.map((_, i) => {
      const component = new Component({ tag: 'span', className: 'store__img-item' });

      component.addEventListener('mouseover', () => setImage(i));
      component.addEventListener('mouseout', () => setImage(0));

      return component;
    });

    this.append(this.loader, ...this.zones);
    this.getImageList(imageList).then(() => {
      this.loader.destroy();
      setImage(0);
    });
  }

  async getImageList(imageList: string[]): Promise<void> {
    const promises: Promise<string>[] = imageList.map(async (name) => {
      const img = new Image({ src: `assets/images/keyboards/${name}.webp` });
      await img.decode();
      return img.src;
    });
    this.images = await Promise.all(promises);
  }
}
