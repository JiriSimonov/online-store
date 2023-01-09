import { KeyboardData } from '../../interfaces/database';
import { Keyboard } from './keyboard';
import { KeyboardSwitch } from './keyboard-switch';
import { Cart } from './cart';
import { Emitter, EventName } from '../emitter';
import { CartItem } from './cart-item';
import { Filter } from './filter';
import { FilterCategory, SortType, SortOrder } from '../../interfaces/enums';
import { xor } from '../../utils/utils';

import keyboardsJson = require('../../data/keyboards.json');

class DatabaseAPI {
  readonly keyboards: Keyboard[];
  readonly cart: Cart = new Cart((...args) => this.getProduct(...args));
  readonly filter: Filter;

  constructor(keyboards: KeyboardData[]) {
    this.keyboards = keyboards.map((keyboard) => new Keyboard(keyboard));
    Object.seal(this.keyboards);
    this.filter = new Filter(this.keyboards);
    Emitter.subscribe(EventName.cart__itemUpdate, (item: CartItem) => this.cart.add(item));
  }

  get switches(): KeyboardSwitch[] {
    const result = this.keyboards
      .flatMap((keyboard): KeyboardSwitch[] => keyboard.switches)
      .reduce((list, keyboardSwitch) => {
        const { id, quantity } = keyboardSwitch;

        if (id in list) {
          list[id].changeQuantity(quantity);
        } else {
          Object.assign(list, { [id]: new KeyboardSwitch(keyboardSwitch) });
        }

        return list;
      }, {} as Record<string, KeyboardSwitch>);

    return Object.values(result);
  }

  get switchesMap(): Map<string, KeyboardSwitch> {
    return this.keyboards
      .flatMap((keyboard): KeyboardSwitch[] => keyboard.switches)
      .reduce((list, keyboardSwitch) => {
        const { id, quantity } = keyboardSwitch;

        if (list.has(id)) {
          list.get(id).changeQuantity(quantity);
        } else {
          list.set(id, new KeyboardSwitch(keyboardSwitch));
        }

        return list;
      }, new Map());
  }

  getKeyboard(id: number, list: Keyboard[] = this.keyboards): Keyboard {
    const value: Keyboard | undefined = list.find((item) => item.id === id);
    if (!value) {
      throw new Error(`Keyboard ${id} not found in this list!`);
    }
    return value;
  }

  getSwitch(id: string, list: KeyboardSwitch[] = this.switches): KeyboardSwitch {
    const value: KeyboardSwitch | undefined = list.find((item) => item.id === id);
    if (!value) {
      throw new Error(`Switch ${id} not found in this list!`);
    }
    return value;
  }

  getProduct(keyboardId: number, switchId: string): [Keyboard, KeyboardSwitch] {
    const keyboard: Keyboard = this.getKeyboard(keyboardId);
    return [keyboard, keyboard.getSwitch(switchId)];
  }

  getChunk<T>(number: number, length: number, list: T[] | Keyboard[] = this.keyboards) {
    return list.slice(number * length, number * length + length);
  }

  getVariants(category: FilterCategory): Set<string> {
    switch (category) {
      case FilterCategory.available:
        return new Set(this.keyboards.map((keyboard) => `${keyboard.isAvailable}`));
      case FilterCategory.manufacturer:
        return new Set(this.keyboards.flatMap((keyboard) => keyboard.switches.map((s) => s.manufacturer)));
      case FilterCategory.switches:
        return new Set(this.keyboards.flatMap((keyboard) => keyboard.switches.map((s) => s.id)));
      case FilterCategory.brand:
        return new Set(this.keyboards.flatMap((keyboard) => keyboard.brands));
      case FilterCategory.size:
        return new Set(this.keyboards.map((keyboard) => keyboard.size));
      case FilterCategory.features:
        return new Set(this.keyboards.flatMap((keyboard) => keyboard.features));
      default:
        return new Set();
    }
  }

  getSortedKeyboards(sortType: SortType, sortOrder: SortOrder, keyboardList?: Keyboard[]): Keyboard[] {
    const options: (keyof Keyboard)[] = ['sumQuantity', 'priceMin', 'title'];
    const defaultList = this.keyboards;
    const defaultOrder = SortOrder.ascending;

    const list = keyboardList ?? defaultList;
    const type = options.find((v) => v === sortType);
    const order = sortOrder ?? defaultOrder;

    if (!type) {
      return list;
    }

    return [...list].sort((a, b) => (xor(a[type] < b[type], order !== SortOrder.descending) ? -1 : 1));
  }

  buyAll() {
    this.keyboards.forEach((keyboard) =>
      keyboard.switches.forEach((keyboardSwitch) => {
        if (keyboardSwitch.isAvailable) {
          this.cart.add([keyboard, keyboardSwitch]);
        }
      }),
    );
  }
}

export const DB = new DatabaseAPI(keyboardsJson as KeyboardData[]);
