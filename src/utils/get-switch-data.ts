import { SwitchDecriptionProps } from '../interfaces/interfaces';

type SwitchJson = {
  [id: string]: SwitchDecriptionProps;
};
type SwitchProp = string | string[];

const switchJson: SwitchJson = require('../data/switches.json');

export function getSwitchData(id: keyof SwitchJson, prop: keyof SwitchDecriptionProps): SwitchProp {
  if (!(id in switchJson)) throw new Error('❌Wrong id in getSwitchData');
  return switchJson[id][prop];
}

export function setSwitchImage(id: keyof SwitchJson, node: HTMLElement) {
  if (!(id in switchJson)) throw new Error('❌Wrong id in setSwitchImage');
  import(`../assets/images/switches/${id}.webp`).then((image) => {
    Object.assign(node.style, { backgroundImage: `url(${image.default})` });
  });
}
