import { BaseComponentProps } from '../../interfaces/interfaces';
import { Component } from './component';

export class BaseComponent<T extends HTMLElement = HTMLElement> {
  node: T;

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

  appendEl(children: HTMLElement | BaseComponent | Component | (HTMLElement | BaseComponent | Component)[]) {
    if (children instanceof HTMLElement) this.node.append(children);
    if (children instanceof BaseComponent) this.node.append(children.node);
    if (Array.isArray(children))
      this.node.append(
        ...children.map((component) =>
          component instanceof Component || component instanceof BaseComponent ? component.node : component,
        ),
      );
  }

  destroy(): void {
    this.node.remove();
  }

  setStyleAttr(...props: [keyof CSSStyleDeclaration, string][]): void {
    Object.assign(this.node.style, Object.fromEntries(props));
  }

  setText(text = ''): void {
    if (text.includes('\n')) this.node.innerText = text;
    else this.node.textContent = text;
  }

  clear(): void {
    this.node.replaceChildren();
  }
}
