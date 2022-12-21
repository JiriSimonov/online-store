import { Keyboard } from './services/db/keyboard';
import { ProductPage } from './components/product-page/product-page';
import { BaseComponent } from './components/elements/base-component';
import { Router } from './utils/router';
import { Store } from './components/store';
import { Header } from './components/header';
import { Footer } from './components/footer';
import { Home } from './components/home-page/home-page';
import { Cart } from './components/cart/cart';
import { ProductsListState } from './states/goods-state';
import { DB } from './services/db/database';
import { Error } from './utils/error';
import './assets/styles/global/style.scss';
import { KekStore } from './components/kekstore';

class App extends BaseComponent {
  private router: Router | null;

  private productsListState: ProductsListState;

  private currentPage: BaseComponent | null;

  constructor() {
    super({ tag: 'main', className: 'main' });
    this.productsListState = new ProductsListState(DB.keyboards);
    this.router = null;
    this.currentPage = null;
  }

  renderHome() {
    this.currentPage?.destroy();
    const home = new Home();
    this.currentPage = home;
    this.appendEl(home);
  }

  renderStore() {
    this.currentPage?.destroy();
    const store = new Store(this.productsListState);
    store.render();
    this.currentPage = store;
    this.appendEl(store);
  }

  renderKek() {
    this.currentPage?.destroy();
    this.currentPage = new KekStore(this.productsListState);
    this.appendEl(this.currentPage);
  }

  renderCart() {
    /*
    this.currentPage?.destroy();
    const cart = new Cart();
    this.currentPage = cart;
    cart.render();
    this.appendEl(cart);
    */
    this.currentPage?.destroy();
    this.currentPage = new Cart();
    this.appendEl(this.currentPage);
  }

  renderError() {
    this.currentPage?.destroy();
    const error = new Error();
    this.currentPage = error;
    error.render();
    this.appendEl(error);
    console.warn('in error');
  }

  renderProductPage(keyboard: Keyboard) {
    // TODO ЭТО ОН!!!
    this.currentPage?.destroy();
    this.currentPage = new ProductPage(keyboard);
    this.appendEl(this.currentPage);
  }

  runApp() {
    const root = document.getElementById('root');
    const footer = new Footer();
    const header = new Header(this.productsListState);
    header.render();
    root?.append(header.getNode());
    if (root) {
      this.router = new Router(
        {
          '': () => this.renderHome(),
          'home': () => this.renderHome(),
          'store': () => this.renderStore(),
          'kek': () => this.renderKek(),
          'cart': () => this.renderCart(),
          ...DB.keyboards.reduce(
            (p, c) =>
              Object.assign(p, {
                [c.id]: () => this.renderProductPage(c),
              }),
            {} as { [key: string]: (id: string) => void },
          ),
        },
        () => this.renderError(),
      );
      root.append(this.node);
    }
    footer.render();
    root?.append(footer.getNode());
  }
}

const app = new App();
app.runApp();
