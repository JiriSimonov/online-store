import { KeyboardData, KeyboardProperties } from '../../interfaces/database';
import { KeyboardSwitch } from './KeyboardSwitch';

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
    return this.switches.some((v) => v.isAvailable);
  }

  get features() {
    return this.properties.Фичи || [];
  }

  get brands() {
    return this.manufacturer;
  }

  getSwitch(id: string): KeyboardSwitch {
    const value: KeyboardSwitch | undefined = this.switches.find((item) => item.id === id);
    if (!value) throw new Error(`Switch ${id} not found in ${this.title}'s switches!`);
    return value;
  }
}
