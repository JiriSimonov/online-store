export interface SourceKeyboard {
  id: number;
  title: string;
  variants: SourceKeyboardVariant[];
  props: SourceKeyboardProps;
  manufacturer: string[];
  group: object;
  size: string;
  minVisiblePrice: number;
  hasDifferentPricesByQuantity: boolean;
  canonical_collection: number;
  instockHash: object;
  preorderHash: object;
  disabledHash: object;
}

export interface SourceKeyboardVariant {
  id: number;
  product_id: number;
  sku: string;
  externalVariantId: string;
  title: string;
  price: number;
  quantity: number;
  switch?: string;
  switchHandle?: string;
  layout?: string;
  visible?: boolean;
  preorderDate?: string;
  stockStatus: string;
  model?: string;
  backlit?: string;
  switchBrand?: string;
}

export interface SourceKeyboardProps {
  'Материал клавиш'?: string[];
  'Конструкция'?: string[];
  'Размер'?: string[];
  'Цифровой блок'?: string[];
  'Мультимедийные функции'?: string[];
  'Совместимость с MAC OS'?: string[];
  'Подсветка'?: string[];
  'Отсоединяемый кабель'?: string[];
  'Длина кабеля'?: string[];
  'USB-хаб'?: string[];
  'Интерфейс'?: string[];
  'Размеры (ДxШxВ)'?: string[];
  'Вес'?: string[];
  'Гарантия'?: string[];
  'Профиль кейкапов'?: string[];
  'Фичи'?: string[];
  'Диоды'?: string[];
  'Бренд'?: string[];
  'Светодиоды'?: string[];
  'Тип раскладки'?: string[];
  'Количество клавиш'?: string[];
  'Страна производства'?: string[];
  'Тип разъема'?: string[];
  'Стабилизаторы'?: string[];
  'Цвет'?: string[];
  'Частота опроса'?: string[];
  'Внутренняя память'?: string[];
  'Артикул'?: string[];
}

export interface SourceImagesList {
  [index: string]: string[];
}

export interface SourceSwitch {
  src: string;
  props: string[];
  description: string;
}

export interface SourceSwitchList {
  [index: string]: SourceSwitch;
}
