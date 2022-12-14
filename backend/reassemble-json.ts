/* eslint-disable import/prefer-default-export */

import path = require('path');
import fsp = require('fs/promises');
import {
  SourceImagesList,
  SourceKeyboard,
  SourceKeyboardList,
  SourceKeyboardVariant,
  //  SourceSwitchList,
} from './types/SourceKeyboardData';
import { KeyboardData, KeyboardSwitchData } from './types/KeyboardData';
import { SwitchShorts } from '../src/interfaces/enums';
import { download, showSettledResult } from './utils';

type Pair<T> = [T, T];

const PRODUCTS: SourceKeyboardList = require('./src/source.json');
const KEYBOARD_IMAGES: SourceImagesList = require('./src/keyboard-images.json');
// const SWITCHES: SourceSwitchList = require('./src/switches.json');

// const switchesJsonPath = path.resolve(__dirname, 'out', 'switches.json');

class SourceJsonController {
  private keyboardsJsonPath = path.resolve(__dirname, 'out', 'keyboards.json');

  private keyboardsImagesPath = path.resolve(__dirname, 'out', 'keyboards');

  constructor(private source: SourceKeyboard[]) {}

  async reassembleKeyboardsJson(): Promise<void> {
    fsp.mkdir(path.dirname(this.keyboardsJsonPath), { recursive: true });
    const output: KeyboardData[] = this.getKeyboardList();
    fsp.writeFile(this.keyboardsJsonPath, JSON.stringify(output));
  }

  getKeyboardList(): KeyboardData[] {
    return Object.values(this.source).map(SourceJsonController.convertKeyboard);
  }

  static convertVariant(variant: SourceKeyboardVariant): KeyboardSwitchData {
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

  static convertKeyboard(keyboard: SourceKeyboard): KeyboardData {
    const { id } = keyboard;
    return {
      id,
      title: keyboard.title,
      switches: keyboard.variants.map(SourceJsonController.convertVariant),
      properties: keyboard.props,
      manufacturer: keyboard.manufacturer,
      minPrice: keyboard.minVisiblePrice,
      size: keyboard.size,
      images: KEYBOARD_IMAGES[id].map((_, i) => SourceJsonController.getKeyboardFileName(id, i)),
    };
  }

  static getKeyboardFileName(id: number, i: number): string {
    return `${id}-${i + 1}`;
  }

  async downloadKeyboardImages(): Promise<void> {
    const dir = this.keyboardsImagesPath;
    const getName: (id: number, i: number) => string = SourceJsonController.getKeyboardFileName;
    const getData = (id: number, url: string, i: number): Pair<string> => [getName(id, i), url];
    const getList = (id: number): Pair<string>[] => {
      const list = KEYBOARD_IMAGES[id];
      return list.map((url, i) => getData(id, url, i));
    };

    await fsp.mkdir(dir, { recursive: true });

    const list: Pair<string>[] = this.getKeyboardList().flatMap((v) => getList(v.id));

    const promises = await Promise.allSettled(list.map((data) => download(dir, ...data)));

    showSettledResult(promises, 'images');
  }

  /* getSourceTypes(): void {
    const { source } = this;
    const data = { keyboard: { variants: null, props: null } };

    // data.keyboard = source.reduce((acc, keyboard) => {
    //   Object.entries(keyboard).forEach((v) => {
    //     const [key, value] = v;
    //     if (key in acc) return;
    //     acc[key] = typeof value;
    //   });
    //   return acc;
    // }, {});
    // data.keyboard.props = source.reduce((acc, keyboard) => {
    //   Object.entries(keyboard.props).forEach((v) => {
    //     const [key, value] = v;
    //     Object.assign(acc, { [key]: typeof value });
    //   });
    //   return acc;
    // }, {});
    // data.keyboard.variants = source
    //   .flatMap((v) => v.variants)
    //   .reduce((acc, keyboard) => {
    //     Object.entries(keyboard).forEach((v) => {
    //       const [key, value] = v;

    //       Object.assign(acc, { [key]: typeof value });
    //     });
    //     return acc;
    //   }, {});

    const props = [
      'Материал клавиш',
      'Конструкция',
      'Размер',
      'Цифровой блок',
      'Мультимедийные функции',
      'Совместимость с MAC OS',
      'Подсветка',
      'Отсоединяемый кабель',
      'Длина кабеля',
      'USB-хаб',
      'Интерфейс',
      'Размеры (ДxШxВ)',
      'Вес',
      'Гарантия',
      'Профиль кейкапов',
      'Фичи',
      'Диоды',
      'Бренд',
      'Светодиоды',
      'Тип раскладки',
      'Количество клавиш',
      'Страна производства',
      'Тип разъема',
      'Стабилизаторы',
      'Цвет',
      'Частота опроса',
      'Внутренняя память',
      'Артикул',
    ];
    const keyboardprops = [
      'id',
      'title',
      'variants',
      'props',
      'manufacturer',
      'group',
      'size',
      'minVisiblePrice',
      'hasDifferentPricesByQuantity',
      'canonical_collection',
      'instockHash',
      'preorderHash',
      'disabledHash',
    ];
    const variantprops = [
      'id',
      'product_id',
      'sku',
      'externalVariantId',
      'title',
      'price',
      'quantity',
      'switch',
      'switchHandle',
      'layout',
      'visible',
      'preorderDate',
      'stockStatus',
      'model',
      'backlit',
      'switchBrand',
    ];

    const propsCounter = source.reduce((p, c) => {
      keyboardprops.forEach((v) => {
        if (v in c) {
          if (v in p) p[v]++;
          else p[v] = 1;
        }
      });
      return p;
    }, {});
    const propspropsCounter = source.reduce((p, c) => {
      props.forEach((v) => {
        if (v in c.props) {
          if (v in p) p[v]++;
          else p[v] = 1;
        }
      });
      return p;
    }, {});
    const variantsCounter = source
      .flatMap((v) => v.variants)
      .reduce((p, c) => {
        variantprops.forEach((v) => {
          if (v in c) {
            if (v in p) p[v]++;
            else p[v] = 1;
          }
        });
        return p;
      }, {});

    console.log(source.flatMap((v) => v.variants).length);
  } */
}

export const sourceJsonController = new SourceJsonController(Object.values(PRODUCTS));

// TODO: генерация описания свичей (json)
// TODO: загрузка картинок свичей (имя===id)
// TODO: остальное

/*
sourceJsonController.getSourceTypes();

const old =
new SourceJsonController(Object.values(require('../backend-old/keyboards-json/src/source.json')));

old.getSourceTypes(); */
/* export async function downloadKeyboardImages(dir = keyboardsImagesPath) {
  const getData = (id: number, url: string, i: number): Pair<string> => [getKBfileName(id, i), url];
  const getList = (id: number): Pair<string>[] => {
    const list = KEYBOARD_IMAGES[id];
    return list.map((url, i) => getData(id, url, i));
  };

  await fsp.mkdir(dir, { recursive: true });

  const list = getKeyboardList(PRODUCTS).flatMap((kb) => getList(kb.id));

  return Promise.allSettled(list.map((data) => download(dir, ...data)));
}
 */
