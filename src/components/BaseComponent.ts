import { BaseComponentProps } from '../interfaces/interfaces';
export class BaseComponent {
  protected node: HTMLElement;
  constructor({ tag = 'div', className = '', text = '', parent }: BaseComponentProps = {}) {
    this.node = document.createElement(tag);
    if (className) this.node.className = className;
    if (text) this.node.textContent = text;
    if (parent) parent.append(this.node);
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
