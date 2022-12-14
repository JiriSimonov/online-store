## TODO

### формат данных обязательно должен включать
    Имя/брэнд товара.
    Категорию товара.
    Описание товара.
    Цену товара.
    Количество товара на складе
    Не менее двух фотографий товара.

```json 
{
  "id": 1,
  "title": "iPhone 9",
  "description": "An apple mobile which is nothing like apple",
  "price": 549,
  "discountPercentage": 12.96,
  "rating": 4.69,
  "stock": 94,
  "brand": "Apple",
  "category": "smartphones",
  "thumbnail": "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
  "images": [
    "https://i.dummyjson.com/data/products/1/1.jpg",
    "https://i.dummyjson.com/data/products/1/2.jpg",
    "https://i.dummyjson.com/data/products/1/3.jpg",
    "https://i.dummyjson.com/data/products/1/4.jpg",
    "https://i.dummyjson.com/data/products/1/thumbnail.jpg"
  ]
}
```

> Не вижу способа автоматически добраться до DOM и парсить через него без сторонних библиотек, поэтому накидал скрипты для браузера 😢

<details>
  <summary><b>Черновик</b></summary>

```js
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
const filePath = path.resolve(\_\_dirname, `${keyboardId}.html`);
await fs.writeFile(filePath, page);
cp.execFile(`open ${filePath}`);
}
getKeyboardImages(getKeyboardList(sourceJSON)[0].id);
```

</details>

<details>
  <summary><b>ts</b></summary>

```ts
const getURLs = (id: number | string): string[] => {
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

snatch(Object.fromEntries(keyboardImages));
```

</details>
<details>
  <summary><b>js keyboard images</b></summary>

```js
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
```

</details>
<details>
  <summary><b>js switches</b></summary>

```js
{
  const switches = document.querySelectorAll('.filter-switcher-tooltip');
  const switchesData = [...switches].reduce((p, c) => {
    const { src } = c.querySelector('img');
    const title = c.querySelector('.filter-switcher-tooltip__title').textContent;
    const props = c.querySelector('p:nth-child(2)').innerHTML.split('<br>');
    const description = c.querySelector('p:nth-child(3)').innerText.trim();
    p[title] = { src, props, description };
    return p;
  }, {});
  const snatch = (list) => {
    const json = JSON.stringify(list, null, '\t');
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([json], { type: 'application/json' }));
    a.download = 'keyboard-images.json';
    a.click();
  };

  snatch(switchesData);
}
```

</details>
