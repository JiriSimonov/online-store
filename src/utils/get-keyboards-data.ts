// * к удалению
// import { KeyboardSwitchData } from '../interfaces/database';
// import { Keyboard } from '../services/db/Keyboard';

// const keyboardsJson: Keyboard[] = require('../data/keyboards.json');

// const currentSwitchesData /* : SwitchProps[] */ = keyboardsJson
//   .flatMap((keyboard): KeyboardSwitchData[] => keyboard.switches)
//   .reduce((acc: { [key: string]: KeyboardSwitchData }, item: KeyboardSwitchData) => {
//     if (!item.id) return acc;

//     if (!(item.id in acc)) return Object.assign(acc, { [item.id]: item });

//     if (!item.quantity) {
//       acc[item.id].quantity += item.quantity;
//       acc[item.id].isAvailable = true;
//     }

//     return acc;
//   }, {});

// export function getKeyboardsList(): Keyboard[] {
//   return keyboardsJson;
// }

// export function getAllSwitchesList(): KeyboardSwitchData[] {
//   return Object.values(currentSwitchesData);
// }
