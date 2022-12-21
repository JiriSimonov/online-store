export class Promo {
  private readonly list: Map<string, number> = new Map([
    ['greedisgood', 0.05],
    ['nwctheconstruct', 0.1],
    ['hesoyam', 0.2],
    ['idkfa', 0.4],
  ]);
  private active: Set<string> = new Set();

  /** Возвращает результат проверки наличия промокода в списке активных промокодов */
  isValid(input: string): boolean {
    return this.list.has(input.toLowerCase());
  }
  /** Добавляет промокод в список активных */
  add(input: string): void {
    this.active.add(input.toLowerCase());
  }
  /** Удаляет промокод из списка активных */
  remove(input: string): void {
    this.active.delete(input.toLowerCase());
  }
  /** Очищает список активных промокодов */
  clear(): void {
    this.active.clear();
  }
  /** Текущий модификатор скидки (0..1) */
  get discount(): number {
    return [...this.active.values()].reduce((sum, code) => sum + (this.list.get(code) ?? 0), 0);
  }
  /** Возвращает число после применения скидки
   * @param `price` число до скидки
   * @param `pow` степень округления (кол-во `0` в конце числа)
   */
  getDiscounted(price: number, pow = 0): number {
    const discounted = Math.floor(price * (1 - this.discount));
    console.warn(discounted);
    return Math.floor(discounted / 10 ** pow) * 10 ** pow;
  }
}
