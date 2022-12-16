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
  type?: string;
  pattern?: string;
  placeholder?: string;
}

export interface FormFieldProps extends InputProps {
  className: string;
  text?: string;
  modificator?: string;
}

export interface DescriptionFieldProps {
  key: string;
  value: string;
}

export type RoutesObj = Record<string, () => void>;

export interface ProductsFilterProps {
  search: string;
  inStock: boolean;
  brand: string;
  manufacturer: string;
  size: string;
  features: string;
  switchType?: string;
}

// * к удалению 👇
/*
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
export interface ProductCardProps extends BaseComponentProps {
  title?: string;
  price?: number;
  isAvailable: boolean;
  switchTypes: SwitchProps[];
}
*/
