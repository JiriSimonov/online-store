import { BaseComponent } from './base-component';
import { AnchorProps } from '../../interfaces/interfaces';

export class Anchor extends BaseComponent<HTMLAnchorElement> {
  constructor(props: AnchorProps) {
    super(Object.assign(props, { tag: 'a' }));
    const { href, target, label } = props;
    const { node } = this;

    if (href) node.href = href;
    if (label) node.ariaLabel = label;
    if (target) node.target = target;
  }
}
