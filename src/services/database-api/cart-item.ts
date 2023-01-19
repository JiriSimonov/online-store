import { Emitter, EventName } from '../emitter';
import { Keyboard } from './keyboard';
import { KeyboardSwitch } from './keyboard-switch';

export class CartItem {
  #quantity: number;
  constructor(public readonly keyboard: Keyboard, public readonly keyboardSwitch: KeyboardSwitch, quantity?: number) {
    this.#quantity = quantity ?? 1;
  }
  get key(): string {
    return `${this.keyboard.id}-${this.keyboardSwitch.id}`;
  }
  get entries(): [string, number] {
    return [this.key, this.quantity];
  }
  get quantity(): number {
    return this.#quantity;
  }
  set quantity(n: number) {
    this.#quantity = n > 0 ? n : 1;
    Emitter.emit(EventName.cart__itemUpdate, this);
  }
  set(n: number) {
    this.quantity = n;
  }
  inc() {
    this.quantity++;
  }
  dec() {
    this.quantity--;
  }
}
