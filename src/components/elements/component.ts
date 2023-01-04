interface IComponent {
  parent?: HTMLElement | Component;
  tag?: keyof HTMLElementTagNameMap;
}
export type ComponentProps<T = HTMLElement> = IComponent & Partial<T>;

export class Component<T extends HTMLElement = HTMLElement> {
  readonly #node: T;
  constructor(props?: ComponentProps<T>) {
    this.#node = document.createElement(props?.tag ?? 'div') as T;
    if (props) Object.assign(this.#node, props);
    if (props?.parent)
      if (props.parent instanceof Component) props.parent.node.append(this.#node);
      else props.parent.append(this.#node);
  }

  get node(): T {
    return this.#node;
  }

  destroy(): void {
    this.node.remove();
  }
  clear(): void {
    this.node.replaceChildren();
  }

  get text(): string | null {
    return this.node.textContent;
  }
  set text(value: string | null) {
    this.node.textContent = value;
  }
  get innerText(): string {
    return this.node.innerText;
  }
  set innerText(value: string) {
    this.node.innerText = value;
  }
  setText(value: string | null): void {
    if (value?.includes('\n')) this.innerText = value;
    else this.text = value;
  }

  get style(): CSSStyleDeclaration {
    return this.node.style;
  }

  private static toNode(component: Node | Component) {
    return component instanceof Component ? component.node : component;
  }
  private insert(target: 'before' | 'prepend' | 'append' | 'after', children: (Node | Component)[]) {
    this.node[target](...children.map(Component.toNode));
  }
  before(...children: (Node | Component)[]): void {
    this.insert('before', children);
  }
  prepend(...children: (Node | Component)[]): void {
    this.insert('prepend', children);
  }
  append(...children: (Node | Component)[]): void {
    this.insert('append', children);
  }
  after(...children: (Node | Component)[]): void {
    this.insert('after', children);
  }

  get onclick() {
    return this.node.onclick;
  }
  set onclick(value) {
    this.node.onclick = value;
  }

  get addEventListener() {
    return this.node.addEventListener;
  }
}
