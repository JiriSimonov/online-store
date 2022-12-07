import { BaseComponentProps } from '../../interfaces/interfaces';

export default class BaseComponent {
  protected node: HTMLElement;

  constructor(props: BaseComponentProps) {
    const node = document.createElement(props.tag ?? 'div');
    const { className, text, parent } = props;
    if (className) node.className = className;
    if (text) node.textContent = text;
    if (parent) parent.append(node);
    this.node = node;
  }

  getNode<T extends HTMLElement = HTMLElement>(): T {
    return this.node as T;
  }

  appendEl(children: HTMLElement | BaseComponent | BaseComponent[]) {
    if (children instanceof HTMLElement) this.node.append(children);
    if (children instanceof BaseComponent) this.node.append(children.getNode());
    if (Array.isArray(children)) this.node.append(...children.map((e) => e.getNode()));
  }

  destroy(): void {
    this.node.remove();
  }
}
