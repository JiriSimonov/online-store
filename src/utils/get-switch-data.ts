import { SwitchDecriptionProps } from '../interfaces/interfaces';

type SwitchJson = {
  [id: string]: SwitchDecriptionProps;
};

const switchJson: SwitchJson = require('../data/switches.json');

export function getSwitchData(id: keyof SwitchJson, prop: keyof SwitchDecriptionProps): string {
  if (!(id in switchJson)) throw new Error('❌Wrong id in getSwitchData');
  switch (prop) {
    case 'title':
    case 'description':
      return switchJson[id][prop];
    case 'props':
      return switchJson[id][prop].join('\n');
    default:
      return prop;
  }
}

export function setSwitchImage(id: keyof SwitchJson, node: HTMLElement) {
  if (!(id in switchJson)) throw new Error('❌Wrong id in setSwitchImage');
  import(`../assets/images/switches/${id}.webp`).then((image) => {
    Object.assign(node.style, { backgroundImage: `url(${image.default})` });
  });
}
