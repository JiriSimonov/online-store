import fs = require('fs/promises');
import path = require('path');
import { SwitchProps, KeyboardProps } from '../../src/interfaces/interfaces';

const PRODUCTS: {} = require('./src/source.json');
const IMAGES: {} = require('./src/keyboard-images.json');

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
  const { id, quantity, price } = sourceSwitch;
  const title = sourceSwitch.switch;
  const short = SwitchShorts[title as keyof typeof SwitchShorts];
  return {
    id,
    title,
    quantity,
    isAvailable: quantity > 0,
    manufacturer: getManufacturer(title),
    short,
    price,
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

function downloadImages(imagesList: {}, keyboardList: KeyboardProps[]) {
  // todo ! keyboardList.map()
}

export default async (): Promise<void[]> => {
  await fs.mkdir(path.dirname(outPathTest), { recursive: true });
  await fs.mkdir(path.dirname(outPathDev), { recursive: true });
  const list = getKeyboardList(PRODUCTS);
  // console.log(new Set(list.map((v) => v.switches.map((c) => c.title)).flat()));
  downloadImages(IMAGES, list);
  return Promise.all([outPathTest, outPathDev].map((v) => fs.writeFile(v, JSON.stringify(list))));
};

/* не вижу способа автоматически добраться до DOM и парсить через него без сторонних библиотек
function getSourcePage(url: string): Promise<string> {
  return new Promise((res): void => {
    let data = '';
    https.get(url, (msg): void => {
      msg.on('data', (chunk): void => { data += chunk; });
      msg.on('end', (): void => res(data));
    }).on('error', (): never => { throw new Error('getSourcePage > Request failed! Check URL'); });
  });
}

async function getKeyboardImages(keyboardId: number) {
  const url = 'https://geekboards.ru/collection/keyboards';
  const page = await getSourcePage(url);

  // temp
  const filePath = path.resolve(__dirname, `${keyboardId}.html`);
  await fs.writeFile(filePath, page);
  cp.execFile(`open ${filePath}`);
}
getKeyboardImages(getKeyboardList(sourceJSON)[0].id);
*/

/* ts */
/* const getURLs = (id: number | string): string[] => {
  const selector = `.product_id_${id} .product-card__slider-img`;
  const list: NodeListOf<HTMLImageElement> = document.querySelectorAll(selector);
  return [...list].map((node): string => node.src);
};

const getImagesList = (obj: { [s: string]: SourceKeyboardProps }): [string, string[]][] => {
  const keys = Object.keys(obj);
  return keys.map((id): [string, string[]] => [id, getURLs(id)]);
};

const keyboardImages = getImagesList(PRODUCTS);

const snatch = (list: { [key: string]: string[] }) => {
  const json = JSON.stringify(list, null, '\t');
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([json], { type: 'application/json' }));
  a.download = 'keyboard-images.json';
  a.click();
};

snatch(Object.fromEntries(keyboardImages)); */

/* js
{
  const selector
  const getURLs=id=>{
  const selector = `.product_id_${id} .product-card__slider-img`
    return [...document.querySelectorAll(selector)].map(v=>v.src)}

  const keyboardImages = Object.keys(PRODUCTS).map(id=>[id,getURLs(id)])

  const snatch=list=>{
    const json = JSON.stringify(list, null, '\t')
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([json], {type: "application/json"}))
    a.download='keyboard-images.json'
    a.click();
  }

  snatch(Object.fromEntries(keyboardImages))
}
*/
