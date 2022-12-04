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
  title: string; // Cherry MX RGB Blue, Gateron Cap V2 Crystal Red...
  short: string; // BR, B, BL...
  quantity: number;
  isAvailable: boolean;
  manufacturer: string; // Cherry Gateron Varmilo...
}
export interface KeyboardProps {
  id: number;
  title: string; // Ducky One 3 TKL Yellow...
  minPrice: number;
  isAvailable: boolean;
  switches: SwitchProps[];
  size: string; // 100%, 90%, 80%...
  brands: string[]; // Ducky, Leopold, Geekboards, Vortex...
  features: string[]; // ФЫЧЫ
}
