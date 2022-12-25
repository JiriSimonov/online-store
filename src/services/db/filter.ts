/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable class-methods-use-this */
import { converter } from '../../utils/utils';
import { Keyboard } from './keyboard';

/*
available
switch
manufacturer
size
features
search
*/
enum FilterCategory {
  available,
  brand,
  size,
  features,
  switches,
  search,
}

export class Filter {
  private usp = new URLSearchParams(this.query);

  constructor(private source: Keyboard[]) {
    /* this.add('switches', 'T4'); */
    console.warn(this.getAll());
  }

  private get query(): string {
    const { hash } = window.location;
    const index: number = hash.indexOf('?');
    return index > 0 ? hash.slice(index) : '';
  }
  private set query(str: string) {
    const [currentHash] = window.location.hash.split('?');
    const query: string = str ? `?${decodeURIComponent(str)}` : '';
    window.location.hash = currentHash + query;
  }

  /** Возвращает отфильтрованный массив Keyboard */
  get list(): Keyboard[] {
    const filters = this.getAll();
    const isAvailable = (item: Keyboard): boolean => filters.get('available')?.has(`${item.isAvailable}`) ?? true;
    const hasSize = (item: Keyboard): boolean => filters.get('size')?.has(item.size) ?? true;
    const hasBrand = (item: Keyboard): boolean => {
      const values = filters.get('brand');
      return values ? item.brands.some((brand) => values.has(brand)) : true;
    };
    const hasFeatures = (item: Keyboard): boolean => {
      const values = filters.get('features');
      return values ? item.features.some((feature) => values.has(feature)) : true;
    };
    const hasSwitches = (item: Keyboard): boolean => {
      const values = filters.get('switches');
      const switchesIdList: string[] = item.switches.map((keyboardSwitch) => keyboardSwitch.id);
      return values ? switchesIdList.some((keyboardSwitch) => values.has(keyboardSwitch)) : true;
    };
    let search; // TODO
    const res = [...this.source].filter(
      (keyboard) =>
        isAvailable(keyboard) &&
        hasSize(keyboard) &&
        hasBrand(keyboard) &&
        hasFeatures(keyboard) &&
        hasSwitches(keyboard),
    );
    console.info(res);
    return res;
  }

  /** Добавляет фильтр в Query */
  add(category: keyof typeof FilterCategory, value: string) {
    const param: string = this.usp.get(category) ?? '[]';
    const params: Set<string> = converter.stringToSet(param);
    params.add(value);
    this.usp.set(category, converter.setToString(params));
    this.query = this.usp.toString();
  }
  /** Удаляет фильтр из Query */
  remove(category: string, value: string) {
    const param: string = this.usp.get(category) ?? '[]';
    const params: Set<string> = converter.stringToSet(param);
    params.delete(value);
    this.usp.set(category, converter.setToString(params));
    this.query = this.usp.toString();
  }
  /** Очищает категорию фильтра в Query */
  clear(category: string) {
    this.usp.delete(category);
    this.query = this.usp.toString();
  }
  /** Очищает Query полностью */
  clearAll() {
    this.query = '';
  }

  private getAll(): Map<string, Set<string>> {
    const convert = (entry: [string, string]): [string, Set<string>] => {
      const [category, values] = entry;
      return [category, converter.stringToSet(values)];
    };
    return new Map(Array.from(this.usp.entries(), convert));
  }
}