import { DB } from './services/db/database';
import { Keyboard } from './services/db/keyboard';
import { Router } from './utils/router';
import { Header } from './components/header';
import { Home } from './components/home-page/home-page';
import { Store } from './components/store';
import { ProductPage } from './components/product-page/product-page';
import { Component } from './components/elements/base-component';
import { Cart } from './components/cart/cart';
/* import { ProductsListState } from './states/goods-state'; */
import { Footer } from './components/footer';
import { Error as ErrorPage } from './utils/error';
import './assets/styles/global/style.scss';

class App extends Component {
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
    super({ tag: 'main', className: 'main' });
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
