import { FilterCategory } from '../../interfaces/enums';
import { converter } from '../../utils/utils';
import { Keyboard } from './keyboard';

export class Filter {
  private searchParams = new URLSearchParams(Filter.query);

  constructor(private source: Keyboard[]) {
    window.addEventListener('hashchange', () => {
      this.searchParams = new URLSearchParams(Filter.query);
    });
  }

  private static get query(): string {
    const { hash } = window.location;
    const index: number = hash.indexOf('?');
    return index > 0 ? hash.slice(index) : '';
  }
  private static set query(str: string) {
    const [currentHash] = window.location.hash.split('?');
    let query = `?${decodeURIComponent(str)}`;
    if (query.includes('filters=true&')) {
      query = query.replace(/filters=true&/i, '').concat('&filters=true');
    }
    window.location.hash = `${currentHash}${str ? `${query}` : ''}`;
  }

  /** Возвращает отфильтрованный по конкретным `category=[value]` список
   * @param `category` категория фильтра
   * @param `value` значение фильтра (одно)
   * @param `list` список клавиатур для фильтрации
   * @returns список отфильтрованных клавиатур
   */
  getSearchSample(category: FilterCategory, value: string, list?: Keyboard[]): Keyboard[] {
    const defaultList = this.source;
    return Filter.getList(new Map([[category, new Set([value])]]), list ?? defaultList);
  }
  /** Возвращает минимальный и максимальный порог цены/количества без учёта выбранного фильтра
   * @param `category` категория фильтра
   * @returns `{min: number, max: number}`
   */
  getMinMaxValues(category: 'Price' | 'Quantity', list = this.source): Record<'min' | 'max', number | null> {
    const [defaultMin, defaultMax] = [Infinity, 0];
    const { params } = this;

    let [min, max] = [defaultMin, defaultMax];

    if (category === 'Quantity') {
      Filter.getList(params, list).forEach((keyboard) => {
        const { sumQuantity } = keyboard;
        if (sumQuantity > max) {
          max = sumQuantity;
        }
        if (sumQuantity < min) {
          min = sumQuantity;
        }
      });
    }
    if (category === 'Price') {
      Filter.getList(params, list).forEach((keyboard) => {
        const { priceMax, priceMin } = keyboard;
        if (priceMax > max) {
          max = priceMax;
        }
        if (priceMin < min) {
          min = priceMin;
        }
      });
    }

    return { min: min === defaultMin ? null : min, max: max === defaultMax ? null : max };
  }

  private static getList(filters: Map<string, Set<string>>, keyboardList: Keyboard[]): Keyboard[] {
    const isInList = (key: FilterCategory, list: string[]): boolean => {
      const query = filters.get(key);
      if (!query) {
        return true;
      }
      return list.flat().some((string) => [...query].some((value) => new RegExp(value, 'i').test(string)));
    };

    const isInRange = (minKey: FilterCategory, maxKey: FilterCategory, minValue: number, maxValue: number) => {
      const [min, max] = [filters.get(minKey) ?? [-Infinity], filters.get(maxKey) ?? [Infinity]];
      return +[...min] <= minValue && maxValue <= +[...max];
    };

    return [...keyboardList].filter((keyboard) => {
      const switchesIdList: string[] = keyboard.switches.map((keyboardSwitch) => keyboardSwitch.id);
      const switchesManufacturerList: string[] = keyboard.switches.map((keyboardSwitch) => keyboardSwitch.manufacturer);
      const fullSearchList: string[] = [
        keyboard.brands,
        keyboard.minPrice,
        keyboard.priceMax,
        keyboard.priceMin,
        Object.entries(keyboard.properties),
        keyboard.size,
        keyboard.sumQuantity,
        keyboard.title,
        switchesIdList,
        switchesManufacturerList,
      ].flat(Infinity);

      const result: boolean =
        isInList(FilterCategory.available, [`${keyboard.isAvailable}`]) &&
        isInList(FilterCategory.brand, keyboard.brands) &&
        isInList(FilterCategory.features, keyboard.features) &&
        isInRange(FilterCategory.minPrice, FilterCategory.maxPrice, keyboard.priceMin, keyboard.priceMax) &&
        isInRange(FilterCategory.minQuantity, FilterCategory.maxQuantity, keyboard.sumQuantity, keyboard.sumQuantity) &&
        isInList(FilterCategory.switches, switchesIdList) &&
        isInList(FilterCategory.size, [keyboard.size]) &&
        isInList(FilterCategory.manufacturer, switchesManufacturerList) &&
        isInList(FilterCategory.search, fullSearchList);
      return result;
    });
  }

  /** Возвращает отфильтрованный массив Keyboard */
  get list(): Keyboard[] {
    return Filter.getList(this.params, this.source);
  }

  /** Добавляет фильтр в Query */
  add(category: FilterCategory, value: string) {
    const param: string = this.searchParams.get(category) ?? '[]';
    const params: Set<string> = converter.stringToSet(param);
    if (value) {
      this.searchParams.set(category, converter.setToString(params.add(value)));
    }
    Filter.query = `${this.searchParams}`;
  }
  /** Удаляет фильтр из Query */
  remove(category: FilterCategory, value: string) {
    const param: string = this.searchParams.get(category) ?? '[]';
    const params: Set<string> = converter.stringToSet(param);
    params.delete(value);
    this.searchParams.set(category, converter.setToString(params));
    if (!params.size) {
      this.clear(category);
    }
    Filter.query = `${this.searchParams}`;
  }
  /** Очищает категорию фильтра в Query */
  clear(category: FilterCategory): this {
    this.searchParams.delete(category);
    Filter.query = `${this.searchParams}`;
    return this;
  }
  /** Очищает Query полностью */
  clearAll() {
    Object.values(FilterCategory).forEach((category) => this.clear(FilterCategory[category]));
  }

  /** Возвращает содержимое Query строки
   * @returns `Map<string, Set<string>`*/
  get params(): Map<string, Set<string>> {
    const convert = (entry: [string, string]): [string, Set<string>] => {
      const [category, values] = entry;
      return [category, converter.stringToSet(values)];
    };
    return new Map(
      Array.from(this.searchParams.entries(), (entry) => {
        try {
          return convert(entry);
        } catch {
          return [entry[0], new Set()];
        }
      }),
    );
  }

  /** Возвращает значение одиночного Query параметра */
  getParam(type: string): string {
    return this.searchParams.get(type) ?? '';
  }
  /** Устанавливает/удаляет значение одиночного Query параметра */
  setParam(type: string, value?: string): this {
    if (value) {
      this.searchParams.set(type, value);
    } else {
      this.searchParams.delete(type);
    }
    Filter.query = `${this.searchParams}`;
    return this;
  }
}
