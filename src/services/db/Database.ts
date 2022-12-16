import { KeyboardData, SwitchDescription, SwitchDescriptionList } from '../../interfaces/database';
import { Keyboard } from './Keyboard';
import { KeyboardSwitch } from './KeyboardSwitch';

const switchesJson: SwitchDescriptionList = require('../../data/switches.json');
const keyboardsJson: KeyboardData[] = require('../../data/keyboards.json');

class Database {
  readonly keyboards: Keyboard[];

  readonly cart?: [Keyboard, KeyboardSwitch, number][];

  constructor(keyboards: KeyboardData[], readonly descriptions: SwitchDescriptionList) {
    this.keyboards = keyboards.map((keyboard) => new Keyboard(keyboard));
    Object.seal(this.keyboards);
  }

  get switches(): KeyboardSwitch[] {
    const result = this.keyboards
      .flatMap((v): KeyboardSwitch[] => v.switches)
      .reduce((list, _switch) => {
        const { id, quantity } = _switch;

        if (id in list) list[id].changeQuantity(quantity);
        else Object.assign(list, { [id]: new KeyboardSwitch(_switch) });

        return list;
      }, {} as { [key: string]: KeyboardSwitch });

    return Object.values(result);
  }

  get switchesMap(): Map<string, KeyboardSwitch> {
    return this.keyboards
      .flatMap((v): KeyboardSwitch[] => v.switches)
      .reduce((list, _switch) => {
        const { id, quantity } = _switch;

        if (list.has(id)) list.get(id).changeQuantity(quantity);
        else list.set(id, new KeyboardSwitch(_switch));

        return list;
      }, new Map());
  }

  // TODO пересмотреть можно ли переписать на вызов от самого экземпляра
  getSwitchData(id: string, prop: keyof SwitchDescription): string | string[] {
    if (!(id in this.descriptions)) throw new Error('❌Wrong id in getSwitchData');
    return this.descriptions[id][prop];

  }

  get CartPriceSum() { 
    
  }
  get CartKolichestrvoTovarov(){ }
  
/* 
  getKeyboard(id) {
    return DB.keyboards.find((item) => item.id === id);
  }

  getProduct(id: Pick<Keyboard, 'id'>, id: Pick<KeyboardSwitch, 'id'>): [Keyboard, KeyboardSwitch] {
    return [DB.keyboards[id], DB.keyboards[id]];
  } */
}

export const DB = new Database(keyboardsJson, switchesJson);

console.log(DB);

// ? почему удаление этого ни на что не повлияло?
/*
export function setSwitchImage(id: keyof SwitchJson, node: HTMLElement) {
  if (!(id in switchJson)) throw new Error('❌Wrong id in setSwitchImage');
  import(`../assets/images/switches/${id}.webp`).then((image) => {
    Object.assign(node.style, { backgroundImage: `url(${image.default})` });
  });
}
*/
