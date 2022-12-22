import { BaseComponentProps } from '../../interfaces/interfaces';

export class BaseComponent<T extends HTMLElement = HTMLElement> {
  protected node: T;

  constructor(props: BaseComponentProps) {
    const node = document.createElement(props.tag ?? 'div');
    const { className, text, parent } = props;
    if (className) node.className = className;
    if (text) 
      if (text.includes('\n')) node.innerText = text;
      else node.textContent = text;
    
    if (parent) parent.append(node);
    this.node = node as T;
  }

  getNode() {
    return this.node;
  }

  appendEl(children: HTMLElement | BaseComponent | BaseComponent[]) {
    if (children instanceof HTMLElement) this.node.append(children);
    if (children instanceof BaseComponent) this.node.append(children.getNode());
    if (Array.isArray(children)) this.node.append(...children.map((e) => e.getNode()));
  }

  destroy(): void {
    this.node.remove();
  }

  setStyleAttr(...props: [keyof CSSStyleDeclaration, string][]) {
    Object.assign(this.node.style, Object.fromEntries(props));
  }

  setText(text: string) {
    this.node.textContent = text; 
  }
}
