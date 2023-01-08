import { KeyboardSwitchData, SwitchDescription, SwitchDescriptionList } from '../../interfaces/database';
import switchesJson = require('../../data/switches.json');

export class KeyboardSwitch {
  static descriptions: SwitchDescriptionList = switchesJson;

  readonly id: string;
  readonly title: string;
  quantity: number;
  readonly manufacturer: string;
  readonly price: number;
  readonly eid?: string;

  constructor(keyboardSwitch: KeyboardSwitchData) {
    this.id = keyboardSwitch.id;
    this.title = keyboardSwitch.title;
    this.quantity = keyboardSwitch.quantity;
    this.manufacturer = keyboardSwitch.manufacturer;
    this.price = keyboardSwitch.price;
    if (keyboardSwitch.eid) {
      this.eid = keyboardSwitch.eid;
    }
  }

  get isAvailable() {
    return this.quantity > 0;
  }

  changeQuantity(number: number) {
    this.quantity += number;
  }

  static getDescription(id: string, prop: keyof SwitchDescription): string | string[] {
    if (!(id in KeyboardSwitch.descriptions)) {
      throw new Error('❌Wrong id in getSwitchData');
    }
    return KeyboardSwitch.descriptions[id][prop];
  }
}
