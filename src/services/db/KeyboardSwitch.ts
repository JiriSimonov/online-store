/* eslint-disable @typescript-eslint/lines-between-class-members */
/* eslint-disable import/prefer-default-export */
import { KeyboardSwitchData } from '../../interfaces/database';

export class KeyboardSwitch {
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
    if (keyboardSwitch.eid) this.eid = keyboardSwitch.eid;
  }

  get isAvailable() {
    return this.quantity > 0;
  }

  changeQuantity(number: number) {
    this.quantity += number;
  }
}
