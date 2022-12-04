import { SwitchProps } from '../../backend/keyboards-json/index';

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
  isAvailable: boolean;
  switchTypes: SwitchProps[];
}

export interface ProductImgProps {
  mid?: string;
  right?: string;
}

export type RoutesObj = Record<string, () => void>;
