export interface BaseComponentProps {
  readonly tag?: keyof HTMLElementTagNameMap;
  className?: string;
  text?: string;
  parent?: HTMLElement;
}
export interface AnchorProps extends BaseComponentProps {
  href?: string;
  target?: string;
  label?: string;
}
export interface ButtonProps extends BaseComponentProps {
  value?: string;
  onclick?: (this: GlobalEventHandlers, ev: MouseEvent) => any;
}

export type RoutesObj = Record<string, () => void>;
