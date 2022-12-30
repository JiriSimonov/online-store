/* eslint-disable import/no-cycle */
import { KeyboardData } from '../../interfaces/database';
import { Keyboard } from './keyboard';
import { KeyboardSwitch } from './keyboard-switch';
import { Cart } from './cart';
import { emitter } from '../event-emitter';
import { CartItem } from './cart-item';
import { Filter } from './filter';
import { FilterCategory } from '../../interfaces/enums';
import keyboardsJson = require('../../data/keyboards.json');

class Database {
  readonly keyboards: Keyboard[];
  readonly cart: Cart = new Cart();
  readonly filter: Filter;

  constructor(keyboards: KeyboardData[]) {
    this.keyboards = keyboards.map((keyboard) => new Keyboard(keyboard));
    Object.seal(this.keyboards);
    this.filter = new Filter(this.keyboards);
    emitter.subscribe('cart__update-item', (item: CartItem) => this.cart.add(item));
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

  getVariants(category: keyof typeof FilterCategory): Set<string> {
    switch (category) {
      case 'available':
        return new Set(this.keyboards.map((k) => `${k.isAvailable}`));
      case 'manufacturer':
        return new Set(this.keyboards.flatMap((k) => k.switches.map((s) => s.manufacturer)));
      case 'switches':
        return new Set(this.keyboards.flatMap((k) => k.switches.map((s) => s.id)));
      case 'brand':
        return new Set(this.keyboards.flatMap((k) => k.brands));
      case 'size':
        return new Set(this.keyboards.map((k) => k.size));
      case 'features':
        return new Set(this.keyboards.flatMap((k) => k.features));
      default:
        return new Set();
    }
  }

  getSortedKeyboards(type: string, direction: string, list: Keyboard[] = this.keyboards): Keyboard[] {
    const options = ['sumQuantity', 'priceMin', 'title'];
    const sortType = (options.includes(type) ? type : options[0]) as keyof Keyboard;
    const xor = (a: boolean, b: boolean): boolean => (a && b) || (!a && !b);
    return [...list].sort((a, b) => (xor(a[sortType] < b[sortType], direction !== 'descending') ? -1 : 1));
  }

  buyAll() {
    this.keyboards.forEach((kb) =>
      kb.switches.forEach((sw) => {
        if (sw.isAvailable) this.cart.add([kb, sw]);
      }),
    );
  }
}

export const DB = new Database(keyboardsJson as KeyboardData[]);

console.info(DB);
