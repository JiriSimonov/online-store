import { BaseComponentProps } from '../../interfaces/interfaces';
import { BaseComponent } from './base-component';

export class Image extends BaseComponent<HTMLImageElement> {
  constructor(props?: BaseComponentProps & HTMLImageElement) {
    super({ ...props, tag: 'img' });
  }
}
