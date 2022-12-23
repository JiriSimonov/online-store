/* eslint-disable import/no-cycle */
import { ls } from '../../utils/utils';
import { emitter } from '../event-emitter';
import { CartItem } from './cart-item';
import { DB } from './database';
import { Keyboard } from './keyboard';
import { KeyboardSwitch } from './keyboard-switch';
import { Promo } from './promo';

type CartMap = Map<string, number>;

export class Cart {
  #CART_KEY = 'kekboards__cart';

  /** Промокоды */
  readonly promo = new Promo();

  private get cartMap(): CartMap {
    return this.load();
  }
  /** Список товаров корзины (массив экземпляров класса `CartItem`)*/
  get list(): CartItem[] {
    return Cart.convertList(this.cartMap);
  }
  /** Суммарная цена корзины */
  get sumPrice() {
    return this.list.reduce((sum, item) => {
      const { keyboardSwitch, quantity } = item;
      return sum + keyboardSwitch.price * quantity;
    }, 0);
  }
  /** Количество товаров в корзине */
  get sumQuantity() {
    let sum = 0;
    this.load().forEach((quantity) => {
      sum += quantity;
    });
    return sum;
  }

  private load(): CartMap {
    return ls.loadMap(this.#CART_KEY);
  }
  private save(cart: CartMap): void {
    ls.saveMap(this.#CART_KEY, cart);
    emitter.emit('cart__save');
  }

  private static convertList(cart: CartItem[]): CartMap;
  private static convertList(cart: CartMap): CartItem[];
  private static convertList(cart: CartItem[] | CartMap): CartMap | CartItem[] {
    if (cart instanceof Map)
      return Array.from(cart, (item) => {
        const [kId, sId] = item[0].split('-');
        return new CartItem(...DB.getProduct(+kId, sId), item[1]);
      });
    return new Map(cart.map((item: CartItem): [string, number] => item.entries));
  }

  /** @param `input` экземпляр `CartItem` или кортеж `[Keyboard, KeyboardSwitch]` */
  add(item: CartItem): void;
  add(item: [Keyboard, KeyboardSwitch]): void;
  add(input: CartItem | [Keyboard, KeyboardSwitch]): void {
    const { cartMap } = this;
    const item = input instanceof CartItem ? input : new CartItem(...input);
    cartMap.set(...item.entries);
    this.save(cartMap);
  }

  /** Удаление экземпляра `CartItem` из корзины */
  remove(item: CartItem): void {
    const { cartMap } = this;
    cartMap.delete(item.key);
    this.save(cartMap);
  }

  /** Удаление всех `CartItem` из корзины */
  clear(): void {
    const { cartMap } = this;
    cartMap.clear();
    this.save(cartMap);
  }

  /** Возвращает результат проверки наличия в корзине
   * @param `keyboardId` `Keyboard.id`
   * @param `keyboardSwitchId` `KeyboardSwitch.id`
   */
  isInCart(keyboardId: number, keyboardSwitchId?: string): boolean {
    if (keyboardSwitchId) return this.cartMap.has(`${keyboardId}-${keyboardSwitchId}`);
    return [...this.cartMap.keys()].some((key) => key.startsWith(`${keyboardId}`));
    /* for (const key of this.cartMap.keys()) {
      if (key.startsWith(`${keyboardId}`)) return true;
    }
    return false; */
  }
}
