import { emitter } from '../event-emitter';
import { Keyboard } from './keyboard';
import { KeyboardSwitch } from './keyboard-switch';

export class CartItem {
  #quantity: number;
  constructor(
    public readonly keyboard: Keyboard,
    public readonly keyboardSwitch: KeyboardSwitch,
    quantity?: number,
  ) { this.#quantity = quantity ?? 1; }
  get key(): string {
    return `${this.keyboard.id}-${this.keyboardSwitch.id}`;
  }
  get entries(): [string, number] {
    return [this.key, this.quantity];
  }
  get quantity(): number {
    return this.#quantity;
  }
  set quantity(n) {
    this.#quantity = n;
    emitter.emit('kekboards:cart__update-item', this);
  }
  inc() {
    this.quantity++;
  }
  dec() {
    this.quantity--;
  }
}
