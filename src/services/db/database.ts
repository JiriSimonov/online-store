/* eslint-disable import/no-cycle */
import { KeyboardData } from '../../interfaces/database';
import { Keyboard } from './keyboard';
import { KeyboardSwitch } from './keyboard-switch';
import keyboardsJson = require('../../data/keyboards.json');
import { Cart } from './cart';
import { emitter } from '../event-emitter';
import { CartItem } from './cart-item';

class Database {
  readonly keyboards: Keyboard[];
  readonly promoList = new Map([
    ['HESOYAM', 0.33],
    ['IDKFA', 0.66],
  ]);
  readonly cart: Cart = new Cart();
  constructor(keyboards: KeyboardData[]) {
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

  getChunk<T>(number: number, length: number, list: T[] | Keyboard[] = this.keyboards) {
    return list.slice(number * length, number * length + length);
  }
}

export const DB = new Database(keyboardsJson as KeyboardData[]);

emitter.subscribe('cart__update-item', (item: CartItem) => DB.cart.add(item));

console.info(DB);
