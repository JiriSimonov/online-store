import { Component, ComponentProps } from './component';

export class Anchor extends Component<HTMLAnchorElement> {
  constructor(props?: Omit<ComponentProps<HTMLAnchorElement>, 'toString'>) {
    super({ ...props, tag: 'a' });
  }
}
