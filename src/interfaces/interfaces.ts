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
export interface ButtonProps extends BaseComponentProps {
  value?: string;
  onclick?: (this: GlobalEventHandlers, ev: MouseEvent) => any;
}
export interface InputProps extends BaseComponentProps {
  value?: string;
}

/* export interface ProductCardProps extends BaseComponentProps {
  title?: string;
  price?: number;
  isAvailable: boolean;
  switchTypes: SwitchProps[];
} */

export type RoutesObj = Record<string, () => void>;

// JSON Interfaces
export interface SwitchProps {
  id: string; // BR, B, BL...
  title: string; // Cherry MX RGB Blue, Gateron Cap V2 Crystal Red...
  quantity: number;
  isAvailable: boolean;
  manufacturer: string; // Cherry Gateron Varmilo...
  price?: number;
}
export interface SwitchDecriptionProps {
  title: string; // cherry mx rgb blue, gateron cap v2 crystal red...
  props: string[];
  description: string;
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
  images: string[]; // 123456-1, 123456-2, 123456-3
}
