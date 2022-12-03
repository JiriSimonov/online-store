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

export interface ProductCardProps extends BaseComponentProps {
  title?: string;
  price?: number;
  isAvailable?: boolean;
  switchType?: string;
}

export type RoutesObj = Record<string, () => void>;
