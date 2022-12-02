export interface BaseComponentProps {
  readonly tag?: keyof HTMLElementTagNameMap;
  className?: string;
  text?: string;
  parent?: HTMLElement;
}

export type RoutesObj = Record<string, () => void>;
