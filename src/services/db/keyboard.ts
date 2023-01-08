import { KeyboardData, KeyboardProperties } from '../../interfaces/database';
import { KeyboardSwitch } from './keyboard-switch';

export class Keyboard {
  readonly id: number;
  readonly title: string;
  readonly switches: KeyboardSwitch[];
  readonly properties: KeyboardProperties;
  readonly manufacturer: string[];
  readonly size: string;
  readonly minPrice: number;
  readonly images: string[];

  constructor(keyboard: KeyboardData) {
    this.id = keyboard.id;
    this.title = keyboard.title;
    this.switches = keyboard.switches.map((keyboardSwitch) => new KeyboardSwitch(keyboardSwitch));
    this.properties = keyboard.properties;
    this.manufacturer = keyboard.manufacturer;
    this.size = keyboard.size;
    this.minPrice = keyboard.minPrice;
    this.images = keyboard.images;
    Object.seal(this.switches);
  }

  get isAvailable() {
    return this.switches.some((keyboardSwitch) => keyboardSwitch.isAvailable);
  }

  get features() {
    return this.properties['Фичи'] || [];
  }

  get brands() {
    return this.manufacturer;
  }

  get sumQuantity() {
    return this.switches.reduce((sum, keyboardSwitch) => sum + keyboardSwitch.quantity, 0);
  }

  get priceMax() {
    return this.switches.reduce((max, keyboardSwitch) => {
      const { isAvailable, price } = keyboardSwitch;
      return isAvailable && price > max ? price : max;
    }, this.minPrice);
  }
  get priceMin() {
    return this.switches.reduce((min, keyboardSwitch) => {
      const { isAvailable, price } = keyboardSwitch;
      return isAvailable && price < min ? price : min;
    }, this.minPrice);
  }

  getSwitch(id: string): KeyboardSwitch {
    const value: KeyboardSwitch | undefined = this.switches.find((item) => item.id === id);
    if (!value) {
      throw new Error(`Switch ${id} not found in ${this.title}'s switches!`);
    }
    return value;
  }
}
