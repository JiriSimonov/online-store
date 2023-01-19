import { LS } from '../../utils/utils';
import { Emitter, EventName } from '../emitter';

type PromoMap = Map<string, number>;

export class Promo {
  #PROMO_KEY = 'kekboards__promo';

  private readonly valid: PromoMap = new Map([
    ['greedisgood', 0.05],
    ['garrett', 0.1],
    ['hesoyam', 0.2],
    ['idkfa', 0.4],
  ]);
  private get active(): PromoMap {
    return this.load();
  }

  /** Возвращает список доступных промокодов */
  get available(): string[] {
    return Array.from(this.valid.keys());
  }

  /** Возвращает количество активных промокодов */
  get size(): number {
    return this.active.size;
  }

  /** Возвращает список активных промокодов */
  get list(): [string, number][] {
    return Array.from(this.active);
  }

  /** Возвращает результат проверки наличия промокода в списке активных промокодов */
  isValid(input: string): boolean {
    return this.valid.has(input.toLowerCase());
  }

  /** Добавляет промокод в список активных */
  add(input: string): void {
    const code = input.toLowerCase();
    const modifier = this.valid.get(code);
    if (modifier) {
      const { active } = this;
      active.set(code, modifier);
      this.save(active);
    }
  }

  /** Удаляет промокод из списка активных */
  remove(input: string): void {
    const { active } = this;
    active.delete(input.toLowerCase());
    this.save(active);
  }

  /** Очищает список активных промокодов */
  clear(): void {
    const { active } = this;
    active.clear();
    this.save(active);
  }

  /** Текущий модификатор скидки (0..1) */
  get discount(): number {
    return [...this.active.values()].reduce((sum, code) => sum + code, 0);
  }

  /** Возвращает число после применения скидки
   * @param `price` число до скидки
   * @param `pow` степень округления (кол-во `0` в конце числа)
   */
  getDiscounted(price: number, pow = 0): number {
    const discounted = Math.floor(price * (1 - this.discount));
    return Math.floor(discounted / 10 ** pow) * 10 ** pow;
  }

  private load(): PromoMap {
    return LS.loadMap(this.#PROMO_KEY);
  }
  private save(list: PromoMap): void {
    LS.saveMap(this.#PROMO_KEY, list);
    Emitter.emit(EventName.promo__save);
  }
}
