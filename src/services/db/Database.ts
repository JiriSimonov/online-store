/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/lines-between-class-members */
/* eslint-disable import/prefer-default-export */
import { KeyboardData, SwitchDescriptionList } from '../../interfaces/database';
import { Keyboard } from './Keyboard';

const switchesJson: SwitchDescriptionList = require('../../data/switches.json');
const keyboardsJson: KeyboardData[] = require('../../data/keyboards.json');

class Database {
  readonly keyboards: Keyboard[];

  constructor(keyboards: KeyboardData[], private descriptions: SwitchDescriptionList) {
    this.keyboards = keyboards.map((keyboard) => new Keyboard(keyboard));
    Object.seal(this.keyboards);
  }
}

export const DB = new Database(keyboardsJson, switchesJson);

console.log(DB);

console.log(DB);
