import { DB } from './services/db/database';
import { Component } from './components/elements/base-component';
import { Header } from './components/header';
import { Main } from './components/elements/main-component';
import { Footer } from './components/footer';
import { Home } from './components/home-page/home-page';
import { Store } from './components/store';
import { Cart } from './components/cart/cart';
import { ProductPage } from './components/product-page/product-page';
import { Router } from './utils/router';
import { Error as ErrorPage } from './utils/error';
import { Keyboard } from './services/db/keyboard';
import './assets/styles/global/style.scss';

class App extends Main {
  private root = document.getElementById('root');
  private router?: Router;
  private currentPage?: Component;

  private errorPage = new ErrorPage();
  private pages: Record<string, Component> = {
    home: new Home(),
    store: new Store(),
    cart: new Cart(),
  };

  private header = new Header();
  private footer = new Footer();

  constructor() {
    super();
    if (!this.root) throw new Error('no root element');

    this.root.append(this.header.node, this.node, this.footer.node);
  }

  renderPage(page: Component): void {
    this.currentPage?.destroy();
    this.currentPage = page;
    this.append(this.currentPage);
  }

  run() {
    const routes: Router['routes'] = new Map();
    const pages: [string, Component][] = Object.entries(this.pages);
    const products: Keyboard[] = DB.keyboards;

    routes.set('', () => this.renderPage(this.pages.home));

    pages.forEach((page) => {
      const [hash, node] = page;
      routes.set(`#${hash}`, () => this.renderPage(node));
    });

    products.forEach((keyboard) => {
      routes.set(`#${keyboard.id}`, () => this.renderPage(new ProductPage(keyboard)));
    });

    this.router = new Router(routes, () => this.renderPage(this.errorPage));
  }
}

const app = new App();
app.run();

console.warn(`
  Header:
  1. Header содержит корзину товаров +10
  2. Header содержит общую сумму покупок +10
  Product Card:
    Реализованы блоки страницы +30
    Присутствуют "хлебные крошки", указывающие на путь товара относительно корня сайта +5
    Реализован блок с фотографиями товара +10
    Реализован блок с полными данными товара (название, категория, описание, цена и т.д.) +5
    Присутствует кнопка добавления товара в корзину +5
    Присутствует кнопка быстрой покупки товара +5
    Страница открывается в новом окне по ссылке с id/name товара +10
    Страница конкретного товара имеет свой маршрут +10
  Итого: 100/300
  `
)
