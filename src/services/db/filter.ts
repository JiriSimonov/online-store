import { FilterCategory } from '../../interfaces/enums';
import { converter } from '../../utils/utils';
import { Keyboard } from './keyboard';

export class Filter {
  private usp = new URLSearchParams(Filter.query);

  constructor(private source: Keyboard[]) {
    window.addEventListener('hashchange', () => {
      this.usp = new URLSearchParams(Filter.query);
    });
  }

  private static get query(): string {
    const { hash } = window.location;
    const index: number = hash.indexOf('?');
    return index > 0 ? hash.slice(index) : '';
  }
  private static set query(str: string) {
    const [currentHash] = window.location.hash.split('?');
    const query: string = str ? `?${decodeURIComponent(str)}` : '';
    window.location.hash = currentHash + query;
  }

  /** Возвращает отфильтрованный по конкретным `category=[value]` список
   * @param `category` категория фильтра
   * @param `value` значение фильтра (одно)
   * @param `list` список клавиатур для фильтрации
   * @returns список отфильтрованных клавиатур
   */
  getSearchSample(category: string, value: string, list = this.source): Keyboard[] {
    return Filter.getList(new Map([[category, new Set([value])]]), list);
  }
  /** Возвращает минимальный и максимальный порог цены/количества без учёта выбранного фильтра
   * @param `category` категория фильтра
   * @returns `{min: number, max: number}`
   */
  getMinMaxValues(category: 'Price' | 'Quantity', list = this.source): Record<'min' | 'max', number | null> {
    const [defaultMin, defaultMax] = [Infinity, 0];
    const { params } = this;

    let [min, max] = [defaultMin, defaultMax];

    if (category === 'Quantity')
      Filter.getList(params, list).forEach((kb) => {
        const { sumQuantity } = kb;
        if (sumQuantity > max) max = sumQuantity;
        if (sumQuantity < min) min = sumQuantity;
      });
    if (category === 'Price')
      Filter.getList(params, list).forEach((kb) => {
        const { priceMax, priceMin } = kb;
        if (priceMax > max) max = priceMax;
        if (priceMin < min) min = priceMin;
      });

    return { min: min === defaultMin ? null : min, max: max === defaultMax ? null : max };
  }

  private static getList(filters: Map<string, Set<string>>, keyboardList: Keyboard[]): Keyboard[] {
    const isInList = (key: keyof typeof FilterCategory, list: string[]): boolean => {
      const query = filters.get(key);
      if (!query) return true;
      return list.flat().some((string) => [...query].some((value) => new RegExp(value, 'i').test(string)));
    };

    const isInRange = (minKey: string, maxKey: string, minValue: number, maxValue: number) => {
      const [min, max] = [filters.get(minKey) ?? [-Infinity], filters.get(maxKey) ?? [Infinity]];
      return +[...min] <= minValue && maxValue <= +[...max];
    };

    return [...keyboardList].filter((keyboard) => {
      const switchesIdList: string[] = keyboard.switches.map((v) => v.id);
      const switchesManufacturerList: string[] = keyboard.switches.map((v) => v.manufacturer);
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
        isInList('available', [`${keyboard.isAvailable}`]) &&
        isInList('brand', keyboard.brands) &&
        isInList('features', keyboard.features) &&
        isInRange('minPrice', 'maxPrice', keyboard.priceMin, keyboard.priceMax) &&
        isInRange('minQuantity', 'maxQuantity', keyboard.sumQuantity, keyboard.sumQuantity) &&
        isInList('switches', switchesIdList) &&
        isInList('size', [keyboard.size]) &&
        isInList('manufacturer', switchesManufacturerList) &&
        isInList('search', fullSearchList);
      return result;
    });
  }

  /** Возвращает отфильтрованный массив Keyboard */
  get list(): Keyboard[] {
    return Filter.getList(this.params, this.source);
  }

  /** Добавляет фильтр в Query */
  add(category: keyof typeof FilterCategory, value: string) {
    const param: string = this.usp.get(category) ?? '[]';
    const params: Set<string> = converter.stringToSet(param);
    if (value) this.usp.set(category, converter.setToString(params.add(value)));
    Filter.query = this.usp.toString();
  }
  /** Удаляет фильтр из Query */
  remove(category: string, value: string) {
    const param: string = this.usp.get(category) ?? '[]';
    const params: Set<string> = converter.stringToSet(param);
    params.delete(value);
    this.usp.set(category, converter.setToString(params));
    if (!params.size) this.clear(category);
    Filter.query = this.usp.toString();
  }
  /** Очищает категорию фильтра в Query */
  clear(category: string): this {
    this.usp.delete(category);
    Filter.query = this.usp.toString();
    return this;
  }
  /** Очищает Query полностью */
  clearAll() {
    const categories = Object.keys(FilterCategory);
    categories.slice(categories.length / 2).forEach((category) => this.clear(category));
  }

  /** Возвращает содержимое Query строки
   * @returns `Map<string, Set<string>`*/
  get params(): Map<string, Set<string>> {
    const convert = (entry: [string, string]): [string, Set<string>] => {
      const [category, values] = entry;
      return [category, converter.stringToSet(values)];
    };
    return new Map(
      Array.from(this.usp.entries(), (entry) => {
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
    return this.usp.get(type) ?? '';
  }
  /** Устанавливает/удаляет значение одиночного Query параметра */
  setParam(type: string, value?: string): this {
    if (value) this.usp.set(type, value);
    else this.usp.delete(type);
    Filter.query = this.usp.toString();
    return this;
  }
}
