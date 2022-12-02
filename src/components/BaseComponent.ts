interface BaseComponentProps {
  tag?: keyof HTMLElementTagNameMap;
  className?: string;
  text?: string;
  parent?: HTMLElement;
}

export class BaseComponent {
  protected node: HTMLElement;
  constructor({ tag = 'div', className = '', text = '', parent }: BaseComponentProps = {}) {
    this.node = document.createElement(tag);
    this.node.className = className;
    this.node.textContent = text;
    if (parent) parent.append(this.node);
  }

  getNode<T extends HTMLElement = HTMLElement>(): T {
    return this.node as T;
  }

  appendEl(children: HTMLElement | BaseComponent | BaseComponent[]) {
    if (children instanceof HTMLElement) {
      this.node.append(children);
    }
    if (children instanceof BaseComponent) {
      this.node.append(children.getNode());
    }
    if (Array.isArray(children)) {
      this.node.append(...children.map((e) => e.getNode()));
    }
  }

  /* appendComponent(component: BaseComponent) {
    this.node.append(component.getNode());
  }

  appendComponents(arr: BaseComponent[]) {
    arr.forEach((e) => {
      this.appendComponent(e);
    });
  } */
}

/* 
export class Element {
  constructor(parent, tag, className, content) {
    const element = document.createElement(tag ?? 'div');
    if (className) element.className = className;
    element.textContent = content;
    parent.append(element);
    this.el = element;
  }

  destroy() {
    this.el.remove();
  }
} */
