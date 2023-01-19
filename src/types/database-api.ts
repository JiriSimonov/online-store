export interface KeyboardData {
  id: number;
  title: string;
  switches: KeyboardSwitchData[];
  properties: KeyboardProperties;
  manufacturer: string[];
  size: string;
  minPrice: number;
  images: string[];
}

export interface KeyboardSwitchData {
  id: string;
  title: string;
  quantity: number;
  manufacturer: string;
  price: number;
  eid?: string;
}

export interface KeyboardProperties {
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

export interface SwitchDescription {
  title: string;
  props: string[];
  description: string;
}

export type SwitchDescriptionList = Record<string, SwitchDescription>;
