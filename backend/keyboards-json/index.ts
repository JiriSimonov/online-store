import fs = require('fs/promises');
import path = require('path');
import { SwitchProps, KeyboardProps } from '../../src/interfaces/interfaces';

const sourceJSON: {} = require('./src/source.json');

const outPathTest = path.resolve(__dirname, 'out', 'keyboards.json');
const outPathDev = path.resolve('src', 'data', 'keyboards.json');

enum SwitchShorts {
  'Cherry MX RGB Brown' = 'BR',
  'Cherry MX Brown' = 'BR',
  'Cherry MX Blue' = 'B',
  'Cherry MX RGB Blue' = 'B',
  'Cherry MX RGB Black' = 'BL',
  'Cherry MX Black' = 'BL',
  'Cherry MX RGB Clear' = 'CL',
  'Cherry MX Clear' = 'CL',
  'Cherry MX RGB Silent Red' = 'SR',
  'Cherry MX Silent Red' = 'SR',
  'Cherry MX RGB Red' = 'R',
  'Cherry MX Red' = 'R',
  'Cherry MX Speed Silver' = 'SS',
  'Cherry MX RGB Speed Silver' = 'SS',
  'Cherry MX Silent Black' = 'SB',
  'Gateron CAP V2 Crystal Brown' = 'CBR',
  'Gateron CAP V2 Crystal Blue' = 'CB',
  'Gateron CAP V2 Crystal Red' = 'CR',
  'Gateron CAP V2 Crystal Yellow' = 'CY',
  'Gateron CAP V2 Crystal Silent Red' = 'CSR',
  'Gateron CAP V2 Crystal Speed Silver' = 'CSS',
  'Gateron CAP v2 Crystal Speed Silver' = 'CSS',
  'Cherry MX Green' = 'GR',
  'Varmilo EC Daisy V2' = 'ED',
  'Varmilo EC Sakura V2' = 'ES',
  'Varmilo EC Rose V2' = 'ER',
  'Varmilo EC Ivy V2' = 'EI',
  'Gateron G Pro Red' = 'GPR',
  'Gateron G Pro Brown' = 'GPBR',
  'Gateron G Pro Blue' = 'GPB',
  'Kailh Prestige Red' = 'KPR',
  'Kailh Prestige Clicky' = 'KPC',
  'Gateron G Pro 2 Silver' = 'GPS',
  'Gateron G Pro 2 White' = 'GPW',
  'Gateron G Pro 2 Yellow' = 'GPY',
  'Gateron G Pro 2 Red' = 'GPR',
  'Gateron G Pro 2 Brown' = 'GPBR',
  'Varmilo EC V2 Iris' = 'EIR',
  'Varmilo EC V2 Violet' = 'EV',
  'TTC Speed Silver' = 'TSS',
  'Keychron Optical Low Profile Brown' = 'KBR',
  'Keychron Optical Low Profile Red' = 'KLR',
  'Keychron Optical Low Profile Mint' = 'KLM',
  'Keychron Optical Low Profile Banana' = 'KLN',
  'Keychron Optical Low Profile Blue' = 'KLB',
  'Topre 45g' = 'T',
  'Topre 45g Silent' = 'TS',
  'Topre 30g' = 'T',
  'Topre Variable' = 'TV',
  'Topre Variable Silent' = 'TVS',
  'Gateron G Pro Yellow' = 'GPY',
  'Zeal PC Zilents V2 67g' = 'ZI',
  'Zeal PC Tealios V2' = 'TE',
  'Zeal PC Zealios v2 67g' = 'ZE',
  'Novelkeys X Kailh BOX Crystal Navy' = 'NA',
  'Novelkeys X Kailh BOX Crystal Royal' = 'KRO',
  'Gateron Low Profile Blue' = 'GLB',
  'Gateron Low Profile Brown' = 'GLBR',
  'Gateron Low Profile Red' = 'GLR',
  'Akko CS Jelly Pink' = 'AJP',
  'Akko CS Jelly Purple' = 'AJR',
  'Varmilo EC V2 Jasmine' = 'EJ',
}
interface SourceSwitchProps {
  id: number;
  product_id?: number;
  sku?: string;
  externalVariantId?: string;
  title?: string;
  price?: number;
  quantity: number;
  switch: string;
  switchHandle?: string;
  layout?: string;
  visible?: boolean;
  preorderDate?: null;
  stockStatus?: string;
}

interface SourceKeyboardProps {
  id: number;
  minVisiblePrice: number;
  title: string;
  instockHash: {};
  variants: SourceSwitchProps[];
  size: string;
  manufacturer: string[];
  props: { Фичи?: string[] };
}

function getSwitch(sourceSwitch: SourceSwitchProps): SwitchProps {
  const getManufacturer = (title: string): string => {
    const head = (title || '').split(' ')[0];
    switch (head) {
      case 'Zeal':
        return 'Gateron';
      case 'Novelkeys':
        return 'Kailh';
      default:
        return head;
    }
  };
  const { id, quantity } = sourceSwitch;
  const title = sourceSwitch.switch;
  const short = SwitchShorts[title as keyof typeof SwitchShorts];
  return {
    id,
    title,
    quantity,
    isAvailable: quantity > 0,
    manufacturer: getManufacturer(title),
    short,
  };
}

function getKeyboard(sourceKeyboard: SourceKeyboardProps): KeyboardProps {
  const { id, title, size } = sourceKeyboard;
  const switches = sourceKeyboard.variants.map((v: SourceSwitchProps): SwitchProps => getSwitch(v));

  return {
    id,
    title,
    minPrice: sourceKeyboard.minVisiblePrice,
    isAvailable: switches.some((item) => item.quantity),
    switches,
    size,
    brands: sourceKeyboard.manufacturer,
    features: sourceKeyboard.props?.Фичи || [],
  };
}

function getKeyboardList(source: { [s: string]: SourceKeyboardProps }): KeyboardProps[] {
  return Object.values(source).map(getKeyboard);
}

export default async (): Promise<void[]> => {
  await fs.mkdir(path.dirname(outPathTest), { recursive: true });
  await fs.mkdir(path.dirname(outPathDev), { recursive: true });
  const list = getKeyboardList(sourceJSON);
  // console.log(new Set(list.map((v) => v.switches.map((c) => c.title)).flat()));
  return Promise.all([outPathTest, outPathDev].map((v) => fs.writeFile(v, JSON.stringify(list))));
};
