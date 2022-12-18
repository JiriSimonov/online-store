import { emitter } from '../event-emitter';
import { CartItem } from './cart-item';
import { DB } from './database';
import { Keyboard } from './keyboard';
import { KeyboardSwitch } from './keyboard-switch';

type CartMap = Map<string, number>;

export class Cart {
  #CART_KEY = 'kekboards__cart';

  get cartMap(): CartMap {
    return this.load();
  }
  get list(): CartItem[] {
    return this.convertList(this.cartMap);
  }
  get sumPrice() {
    return this.list.reduce((sum, item) => {
      const { keyboardSwitch, quantity } = item;
      return sum + keyboardSwitch.price * quantity;
    }, 0);
  }
  get sumQuantity() {
    let sum = 0;
    this.load().forEach((quantity) => (sum += quantity));
    return sum;
  }

  private load(): CartMap {
    const json: string | null = localStorage.getItem(this.#CART_KEY);
    if (!json) return new Map();
    return JSON.parse(json, (k, v) => (k === '' ? new Map(v) : v));
  }
  private save(cart: CartMap): void {
    localStorage.setItem(
      this.#CART_KEY,
      JSON.stringify(cart, (_, v) => (v instanceof Map ? Array.from(v) : v)),
    );
    emitter.emit('kekboards:cart__save');
  }

  private convertList(cart: CartItem[]): CartMap;
  private convertList(cart: CartMap): CartItem[];
  private convertList(cart: CartItem[] | CartMap): CartMap | CartItem[] {
    if (cart instanceof Map) {
      return Array.from(cart, (item) => {
        const [kId, sId] = item[0].split('-');
        return new CartItem(...DB.getProduct(+kId, sId), item[1]);
      });
    }
    return new Map(cart.map((item: CartItem): [string, number] => item.entries));
  }

  add(item: CartItem): void;
  add(item: [Keyboard, KeyboardSwitch]): void;
  add(input: CartItem | [Keyboard, KeyboardSwitch]): void {
    const { cartMap } = this;
    const item = input instanceof CartItem ? input : new CartItem(...input);
    cartMap.set(...item.entries);
    this.save(cartMap);
  }
  remove(item: CartItem): void {
    const { cartMap } = this;
    cartMap.delete(item.key);
    this.save(cartMap);
  }
  isInCart(keyboardId: number, keyboardSwitchId?: string): boolean {
    if (keyboardSwitchId) return this.cartMap.has(`${keyboardId}-${keyboardSwitchId}`);
    // return [...this.cartMap.keys()].some((key) => key.startsWith(`${keyboardId}`));
    for (const key of this.cartMap.keys()) {
      if (key.startsWith(`${keyboardId}`)) return true;
    }
    return false;
  }
}
