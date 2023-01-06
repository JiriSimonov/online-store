import { Component, ComponentProps } from './base-component';

export class Heading extends Component<HTMLHeadingElement> {
  constructor(props?: ComponentProps<HTMLHeadingElement>) {
    super({ tag: 'h2', ...props });
  }
}
