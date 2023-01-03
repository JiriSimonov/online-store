import { Component, ComponentProps } from './component';

export class Image extends Component<HTMLImageElement> {
  constructor(props?: ComponentProps<HTMLImageElement>) {
    super({ ...props, tag: 'img' });
  }
}
