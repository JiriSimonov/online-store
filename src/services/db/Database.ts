import { KeyboardData, SwitchDescription, SwitchDescriptionList } from '../../interfaces/database';
import { Keyboard } from './Keyboard';
import { KeyboardSwitch } from './KeyboardSwitch';

import switchesJson = require('../../data/switches.json');
import keyboardsJson = require('../../data/keyboards.json');

type CartList = [Keyboard, KeyboardSwitch, number][];
type CartMap = Map<string, number>;

class Database {
  #CART_KEY = 'kekboards__cart';
  readonly keyboards: Keyboard[];
  readonly promoList = new Map([
    ['HESOYAM', 0.33],
    ['IDKFA', 0.66],
  ]);

  constructor(keyboards: KeyboardData[], readonly descriptions: SwitchDescriptionList) {
    this.keyboards = keyboards.map((keyboard) => new Keyboard(keyboard));
    Object.seal(this.keyboards);
  }

  get switches(): KeyboardSwitch[] {
    const result = this.keyboards
      .flatMap((v): KeyboardSwitch[] => v.switches)
      .reduce((list, _switch) => {
        const { id, quantity } = _switch;

        if (id in list) list[id].changeQuantity(quantity);
        else Object.assign(list, { [id]: new KeyboardSwitch(_switch) });

        return list;
      }, {} as { [key: string]: KeyboardSwitch });

    return Object.values(result);
  }

  get switchesMap(): Map<string, KeyboardSwitch> {
    return this.keyboards
      .flatMap((v): KeyboardSwitch[] => v.switches)
      .reduce((list, _switch) => {
        const { id, quantity } = _switch;

        if (list.has(id)) list.get(id).changeQuantity(quantity);
        else list.set(id, new KeyboardSwitch(_switch));

        return list;
      }, new Map());
  }

  // TODO пересмотреть можно ли переписать на вызов от самого экземпляра
  getSwitchData(id: string, prop: keyof SwitchDescription): string | string[] {
    if (!(id in this.descriptions)) throw new Error('❌Wrong id in getSwitchData');
    return this.descriptions[id][prop];
  }

  get cartPriceSum() {
    return this.cart.reduce((sum, item) => {
      const [, keyboardSwitch, quantity] = item;
      return sum + keyboardSwitch.price * quantity;
    }, 0);
  }
  get cartProductsQuantity() {
    let sum = 0;
    this.load().forEach((quantity) => (sum += quantity));
    return sum;
  }

  getKeyboard(id: number, list: Keyboard[] = this.keyboards): Keyboard {
    const value: Keyboard | undefined = list.find((item) => item.id === id);
    if (!value) throw new Error(`Keyboard ${id} not found in this list!`);
    return value;
  }

  getSwitch(id: string, list: KeyboardSwitch[] = this.switches): KeyboardSwitch {
    const value: KeyboardSwitch | undefined = list.find((item) => item.id === id);
    if (!value) throw new Error(`Switch ${id} not found in this list!`);
    return value;
  }

  getProduct(keyboardId: number, switchId: string): [Keyboard, KeyboardSwitch] {
    const keyboard: Keyboard = this.getKeyboard(keyboardId);
    return [keyboard, keyboard.getSwitch(switchId)];
  }

  private save(cart: CartMap) {
    localStorage.setItem(
      this.#CART_KEY,
      JSON.stringify(cart, (_, v) => (v instanceof Map ? Array.from(v) : v)),
    );
  }
  private load(): CartMap {
    const data = localStorage.getItem(this.#CART_KEY);
    return data ? JSON.parse(data, (k, v) => (k === '' ? new Map(v) : v)) : new Map();
  }

  private convertCart(cart: CartList): CartMap;
  private convertCart(cart: CartMap): CartList;
  private convertCart(cart: CartMap | CartList): CartList | CartMap {
    if (cart instanceof Map) {
      return Array.from(cart, (item) => {
        const [key, quantity] = item;
        const [keyboardId, switchId] = key.split('-');
        return [...this.getProduct(+keyboardId, switchId), quantity];
      });
    }
    return new Map(
      cart.map((tuple) => {
        const [keyboard, keyboardSwitch, quantity] = tuple;
        return [`${keyboard.id}-${keyboardSwitch.id}`, quantity];
      }),
    );
  }

  get cart(): [Keyboard, KeyboardSwitch, number][] {
    return this.convertCart(this.load());
  }

  addToCart(product: [Keyboard, KeyboardSwitch], quantity: number) {
    const [keyboard, keyboardSwitch] = product;
    const cart = this.load();
    cart.set(`${keyboard.id}-${keyboardSwitch.id}`, quantity);
    this.save(cart);
  }

  removeFromCart(product: [Keyboard, KeyboardSwitch]) {
    const [keyboard, keyboardSwitch] = product;
    const cart = this.load();
    cart.delete(`${keyboard.id}-${keyboardSwitch.id}`);
    this.save(cart);
  }
}

export const DB = new Database(
  keyboardsJson as KeyboardData[],
  switchesJson as SwitchDescriptionList,
);

console.log(DB);
// console.log('DB.cart', DB);

// ? почему удаление этого ни на что не повлияло?
/*
export function setSwitchImage(id: keyof SwitchJson, node: HTMLElement) {
  if (!(id in switchJson)) throw new Error('❌Wrong id in setSwitchImage');
  import(`../assets/images/switches/${id}.webp`).then((image) => {
    Object.assign(node.style, { backgroundImage: `url(${image.default})` });
  });
}
*/
