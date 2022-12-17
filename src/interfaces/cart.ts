import { KeyboardSwitch } from '../services/db/keyboard-switch';
import { Keyboard } from '../services/db/Keyboard';

export interface CartItem {
  keyboard: Keyboard;
  keyboardSwitch: KeyboardSwitch;
  quantity: number;
}
