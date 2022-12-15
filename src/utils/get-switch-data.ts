// * к удалению
// import { SwitchDescription } from '../interfaces/database';

// export type SwitchJson = {
//   [id: string]: SwitchDescription;
// };
// type SwitchProp = string | string[];

// const switchJson: SwitchJson = require('../data/switches.json');

// export function getSwitchData(id: keyof SwitchJson, prop: keyof SwitchDescription): SwitchProp {
//   if (!(id in switchJson)) throw new Error('❌Wrong id in getSwitchData');
//   return switchJson[id][prop];
// }

// export function setSwitchImage(id: keyof SwitchJson, node: HTMLElement) {
//   if (!(id in switchJson)) throw new Error('❌Wrong id in setSwitchImage');
//   import(`../assets/images/switches/${id}.webp`).then((image) => {
//     Object.assign(node.style, { backgroundImage: `url(${image.default})` });
//   });
// }
// export function getSwitchJson(): SwitchJson {
//   return switchJson;
// }
