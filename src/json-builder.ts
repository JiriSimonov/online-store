/* eslint-disable @typescript-eslint/no-var-requires */
import path = require('path');
import fsp = require('fs/promises');
import {
  SourceImagesList,
  SourceKeyboard,
  SourceKeyboardVariant,
  SourceSwitch,
  SourceSwitchList,
} from './types/SourceKeyboardData';
import { KeyboardData, KeyboardSwitchData, SwitchDescription, SwitchDescriptionList } from './types/database';
import { SwitchShorts } from './types/enums';
import { download, showSettledResult } from './utils';

type Pair<T> = [T, T];

const PRODUCTS: SourceKeyboard[] = require('./src/source.json');
const KEYBOARD_IMAGES: SourceImagesList = require('./src/keyboard-images.json');
const SWITCHES: SourceSwitchList = require('./src/switches.json');

class SourceBuilder {
  private keyboardsJsonPath = path.resolve(__dirname, 'out', 'keyboards.json');

  private keyboardsImagesPath = path.resolve(__dirname, 'out', 'keyboards');

  private switchesImagesPath = path.resolve(__dirname, 'out', 'switches');

  private switchesJsonPath = path.resolve(__dirname, 'out', 'switches.json');

  constructor(
    private source: SourceKeyboard[],
    private keyboardImages: SourceImagesList,
    private switches: SourceSwitchList,
  ) {}

  async buildAll(): Promise<void> {
    await this.buildKeyboardsJson();
    // await this.downloadKeyboardImages();
    // await this.downloadSwitchImages();
    // await this.buildSwitchesJson();
  }

  async buildKeyboardsJson(): Promise<void> {
    fsp.mkdir(path.dirname(this.keyboardsJsonPath), { recursive: true });
    const output: KeyboardData[] = this.getKeyboardList();
    fsp.writeFile(this.keyboardsJsonPath, JSON.stringify(output));
  }

  async buildSwitchesJson(): Promise<void> {
    fsp.mkdir(path.dirname(this.switchesJsonPath), { recursive: true });
    const output: SwitchDescriptionList = this.getSwitchesList();
    fsp.writeFile(this.switchesJsonPath, JSON.stringify(output));
  }

  private getKeyboardList(): KeyboardData[] {
    return Object.values(this.source).map((v) => this.convertKeyboard(v));
  }

  private static convertVariant(variant: SourceKeyboardVariant): KeyboardSwitchData {
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
    const title: string = variant.switch ?? 'null';
    const result: KeyboardSwitchData = {
      id: SwitchShorts[title.toLowerCase() as keyof typeof SwitchShorts] ?? 'null',
      title,
      price: variant.price,
      quantity: variant.quantity,
      manufacturer: getManufacturer(title),
    };
    if (title === 'null') result.eid = variant.externalVariantId;
    return result;
  }

  private convertKeyboard(keyboard: SourceKeyboard): KeyboardData {
    const { id } = keyboard;
    return {
      id,
      title: keyboard.title.replace('&amp;', '&'),
      switches: keyboard.variants.reduce((acc, item) => {
        const converted = SourceBuilder.convertVariant(item);
        const duplicate = acc.find((v) => v.id === converted.id);
        if (duplicate) duplicate.quantity += item.quantity;
        else acc.push(converted);
        return acc;
      }, [] as KeyboardSwitchData[]),
      properties: keyboard.props,
      manufacturer: keyboard.manufacturer,
      minPrice: keyboard.minVisiblePrice,
      size: keyboard.size,
      images: this.keyboardImages[id].map((_, i) => SourceBuilder.getKeyboardImageName(id, i)),
    };
  }

  private getSwitchesList(): SwitchDescriptionList {
    const entries: [string, SourceSwitch][] = Object.entries(this.switches);
    const list: [SwitchShorts, SwitchDescription][] = entries.map((entry) => {
      const [title, value] = entry;
      const id: SwitchShorts = SwitchShorts[title as keyof typeof SwitchShorts];
      return [id, { title, props: value.props, description: value.description }];
    });
    return Object.fromEntries(list);
  }

  static getKeyboardImageName(id: number, i: number): string {
    return `${id}-${i + 1}`;
  }

  async downloadKeyboardImages(): Promise<void> {
    const dir = this.keyboardsImagesPath;
    const getName: (id: number, i: number) => string = SourceBuilder.getKeyboardImageName;
    const getData = (id: number, url: string, i: number): Pair<string> => [getName(id, i), url];
    const getList = (id: number): Pair<string>[] => {
      const list = this.keyboardImages[id];
      return list.map((url, i) => getData(id, url, i));
    };

    await fsp.mkdir(dir, { recursive: true });

    const list: Pair<string>[] = this.getKeyboardList().flatMap((v) => getList(v.id));

    const promises = await Promise.allSettled(list.map((data) => download(dir, ...data)));

    showSettledResult(promises, 'images');
  }

  async downloadSwitchImages(): Promise<void> {
    const dir = this.switchesImagesPath;

    await fsp.mkdir(dir, { recursive: true });

    const list: Pair<string>[] = Object.keys(this.switches).map((v): Pair<string> => {
      const key = v as keyof typeof SwitchShorts;
      return [SwitchShorts[key], this.switches[key].src];
    });

    const promises = await Promise.allSettled(list.map((data) => download(dir, ...data)));

    showSettledResult(promises, 'switch images');
  }
}

export const sourceBuilder = new SourceBuilder(Object.values(PRODUCTS), KEYBOARD_IMAGES, SWITCHES);

// TODO: остальное
// ? node --watch backend | npx tsc -w backend/index.ts
