import fsp = require('fs/promises');
import fs = require('fs');
import path = require('path');
import https = require('https');
import { SwitchProps, KeyboardProps, SwitchDecriptionProps } from '../../src/interfaces/interfaces';
import { SwitchShorts } from '../../src/interfaces/enums';

type Pair<T> = [T, T];

const PRODUCTS: SourceKeyboardList = require('./src/source.json');
const KEYBOARD_IMAGES: SourceImagesList = require('./src/keyboard-images.json');
const SWITCHES: SourceSwitchList = require('./src/switches.json');

const keyboardJsonPath = path.resolve(__dirname, 'out', 'keyboards.json');
const switchesJsonPath = path.resolve(__dirname, 'out', 'switches.json');
const imagesDir = path.resolve(__dirname, 'out', 'images');

interface SourceSwitchProps {
  id: number;
  product_id?: number;
  sku?: string;
  externalVariantId?: string;
  title?: string;
  price?: number;
  quantity: number;
  switch: string;
  switchHandle: string;
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
interface SourceKeyboardList {
  [key: string]: SourceKeyboardProps;
}
interface SourceImagesList {
  [index: string]: string[];
}
interface SourceSwitchList {
  [index: string]: {
    src: string;
    props: string[];
    description: string;
  };
}

function getKBfileName(id: number, i: number): string {
  return `${id}-${i + 1}`;
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
  const { quantity, price } = sourceSwitch;
  const title = sourceSwitch.switch;
  const id = SwitchShorts[title?.toLowerCase() as keyof typeof SwitchShorts];
  return {
    id,
    title,
    quantity,
    isAvailable: quantity > 0,
    manufacturer: getManufacturer(title),
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
    images: KEYBOARD_IMAGES[id].map((_, i) => getKBfileName(id, i)),
  };
}
function getKeyboardList(source: { [s: string]: SourceKeyboardProps }): KeyboardProps[] {
  return Object.values(source).map(getKeyboard);
}

function getSwitchesList(source: SourceSwitchList): { [key: string]: SwitchDecriptionProps } {
  const entries = Object.entries(source);
  const kek = entries.map((entry) => {
    const [title, value] = entry;
    const id = SwitchShorts[title as keyof typeof SwitchShorts];
    return [id, { title, props: value.props, description: value.description }];
  });
  return Object.fromEntries(kek);
}

function download(dir: string, name: string, url: string): Promise<string> {
  return new Promise((res, rej) => {
    const filePath = path.resolve(dir, name + path.extname(url));
    https.get(url, (msg) => {
      if (msg.statusCode === 200) {
        const stream = fs.createWriteStream(filePath);
        stream.on('finish', () => {
          msg.unpipe(stream);
          stream.close();
          res(filePath);
        });
        msg.pipe(stream);
      } else {
        rej(new Error(url));
      }
    });
  });
}

export async function downloadSwitchImages(dir = imagesDir) {
  await fsp.mkdir(dir, { recursive: true });

  const list: Pair<string>[] = Object.keys(SWITCHES).map((v): Pair<string> => {
    const key = v as keyof typeof SwitchShorts;
    return [SwitchShorts[key], SWITCHES[key].src];
  });

  return Promise.allSettled(list.map((data) => download(dir, ...data)));
}

export async function downloadKeyboardImages(dir = imagesDir) {
  const getData = (id: number, url: string, i: number): Pair<string> => [getKBfileName(id, i), url];
  const getList = (id: number): Pair<string>[] => {
    const list = KEYBOARD_IMAGES[id];
    return list.map((url, i) => getData(id, url, i));
  };

  await fsp.mkdir(dir, { recursive: true });

  const list = getKeyboardList(PRODUCTS).flatMap((kb) => getList(kb.id));

  return Promise.allSettled(list.map((data) => download(dir, ...data)));
}

export async function generateKeyboardJSON(outputPath = keyboardJsonPath): Promise<void> {
  await fsp.mkdir(path.dirname(outputPath), { recursive: true });
  const list = getKeyboardList(PRODUCTS);

  return fsp.writeFile(outputPath, JSON.stringify(list));
}

export async function generateSwitchJSON(outputPath = switchesJsonPath): Promise<void> {
  await fsp.mkdir(path.dirname(outputPath), { recursive: true });
  const list = getSwitchesList(SWITCHES);

  return fsp.writeFile(outputPath, JSON.stringify(list));
}
