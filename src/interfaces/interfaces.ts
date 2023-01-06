// DOM Interfaces
export interface DescriptionFieldProps {
  key: string;
  value: string;
}

// TODO удали, если нигде не используется
export interface ProductsFilterProps {
  search: string;
  inStock: boolean;
  brand: string;
  manufacturer: string;
  size: string;
  features: string;
  switchType?: string;
}
