/* eslint-disable import/prefer-default-export */
/* eslint-disable */
import path = require('path');
import fsp = require('fs/promises');
import { SourceKeyboard, SourceKeyboardList, SourceKeyboardVariant } from './types/SourceKeyboardData';
import { KeyboardData, KeyboardSwitchData } from './types/KeyboardData';
import { SwitchShorts } from '../src/interfaces/enums';

const PRODUCTS: SourceKeyboardList = require('./src/source.json');

const keyboardsJsonPath = path.resolve(__dirname, 'out', 'keyboards.json');

class SourceJsonController {
  constructor(private source: SourceKeyboard[]) {}

  async reassembleKeyboards(): Promise<void> {
    fsp.mkdir(path.dirname(keyboardsJsonPath), { recursive: true });
    const output: KeyboardData[] = Object.values(this.source).map(SourceJsonController.getKeyboard);
    fsp.writeFile(keyboardsJsonPath, JSON.stringify(output));
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

  static getVariant(variant: SourceKeyboardVariant): KeyboardSwitchData {
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

  static getKeyboard(keyboard: SourceKeyboard): KeyboardData {
    return {
      id: keyboard.id,
      title: keyboard.title,
      switches: keyboard.variants.map(SourceJsonController.getVariant),
      properties: keyboard.props,
      manufacturer: keyboard.manufacturer,
      minPrice: keyboard.minVisiblePrice,
      size: keyboard.size,
    };
  }
}

export const sourceJsonController = new SourceJsonController(Object.values(PRODUCTS));

/* 
sourceJsonController.getSourceTypes();

const old = new SourceJsonController(Object.values(require('../backend-old/keyboards-json/src/source.json')));

old.getSourceTypes(); */
