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

export type RoutesObj = Record<string, () => void>;
