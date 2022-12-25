/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable class-methods-use-this */
import { converter } from '../../utils/utils';
import { Keyboard } from './keyboard';

export class Filter {
  private usp = new URLSearchParams(this.query);

  constructor(private source: Keyboard[]) {
    this.add('brand', 'Ducky');
    this.add('brand', 'TTC');
    this.add('size', '80');
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
    return [...this.source];
  }

  /** Добавляет фильтр в Query */
  add(category: string, value: string) {
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
