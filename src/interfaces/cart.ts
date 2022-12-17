import { KeyboardSwitch } from '../services/db/keyboard-switch';
import { Keyboard } from '../services/db/keyboard';

export interface CartItem {
  keyboard: Keyboard;
  keyboardSwitch: KeyboardSwitch;
  quantity: number;
}
