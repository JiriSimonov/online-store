import BaseComponent from './base-component';

export default class ProductImage extends BaseComponent {
  private images: BaseComponent[] | undefined;

  constructor(imageList: string[]) {
    super({ className: 'store__img' });
    type ImagePath = { default: string }; // todo 🌼: посмотри чем можно заменить. это вставляется как T в PromiseFulfilledResult<T>, чтоб достучаться к полю default, т.к. без default мы получаем это - https://i.imgur.com/aO2HXtC.png

    const imageImports = imageList.map((v): Promise<ImagePath> => import(`../assets/images/keyboards/${v}.webp`));

    const render = async (input: Promise<ImagePath>[]): Promise<void> => {
      const setImage = (src: string): void => {
        this.node.style.backgroundImage = `url(${src})`;
      };

      const promises = await Promise.allSettled(input);
      const fulfilled = promises.filter((p): p is PromiseFulfilledResult<ImagePath> => p.status === 'fulfilled');

      this.images = fulfilled.map((v, i, a) => {
        const component = new BaseComponent({ className: 'store__img store__img_left' }); // todo 🌼: посмотри нужны ли этим спанодивам классы вообще (store__img_left). если не нужны, почисть ненужно
        const node = component.getNode();

        if (i === 0) setImage(v.value.default);

        node.onmouseover = () => setImage(v.value.default);
        node.onmouseout = () => setImage(a[0].value.default);

        return component;
      });

      this.appendEl(this.images);
    };
    render(imageImports);
  }
}
