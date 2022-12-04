// DOM Interfaces
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

/* export interface ProductCardProps extends BaseComponentProps {
  title?: string;
  price?: number;
  isAvailable: boolean;
  switchTypes: SwitchProps[];
} */

export interface ProductImgProps {
  mid?: string;
  right?: string;
}

export type RoutesObj = Record<string, () => void>;

// JSON Interfaces
export interface SwitchProps {
  id: number;
  title: string;
  short: string;
  quantity: number;
  isAvailable: boolean;
  manufacturer: string;
}
export interface KeyboardProps {
  id: number;
  title: string;
  minPrice: number;
  isAvailable: boolean;
  switches: SwitchProps[];
  size: string;
  brands: string[];
  features: string[];
}
