import { KeyboardProps, SwitchProps } from '../interfaces/interfaces';

const keyboardsJson: KeyboardProps[] = require('../data/keyboards.json');

const currentSwitchesData /* : SwitchProps[] */ = keyboardsJson
  .flatMap((keyboard): SwitchProps[] => keyboard.switches)
  .reduce((acc: { [key: string]: SwitchProps }, item: SwitchProps) => {
    if (!item.id) return acc;

    if (!(item.id in acc)) return Object.assign(acc, { [item.id]: item });

    if (!item.quantity) {
      acc[item.id].quantity += item.quantity;
      acc[item.id].isAvailable = true;
    }

    return acc;
  }, {});

export function getKeyboardsList(): KeyboardProps[] {
  return keyboardsJson;
}

export function getAllSwitchesList(): SwitchProps[] {
  return Object.values(currentSwitchesData);
}
