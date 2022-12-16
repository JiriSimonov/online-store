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
  onclick?: (this: GlobalEventHandlers, ev: MouseEvent) => void; // todo: типизировать ретурн, когда понадобится
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
