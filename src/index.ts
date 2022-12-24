import { DB } from './services/db/database';
import { Keyboard } from './services/db/keyboard';
import { Router } from './utils/router';
import { Header } from './components/header';
import { Home } from './components/home-page/home-page';
import { Store } from './components/store';
import { ProductPage } from './components/product-page/product-page';
import { BaseComponent } from './components/elements/base-component';
import { Cart } from './components/cart/cart';
import { ProductsListState } from './states/goods-state';
import { Footer } from './components/footer';
import { Error } from './utils/error';
import './assets/styles/global/style.scss';

class App extends BaseComponent {
  private router: Router | null;

  private productsListState: ProductsListState;

  private home = new Home();

  private store: Store;

  private cart = new Cart().subscribe();

  private currentPage: BaseComponent | null;

  constructor() {
    super({ tag: 'main', className: 'main' });
    this.productsListState = new ProductsListState(DB.keyboards);
    this.router = null;
    this.currentPage = null;
    this.store = new Store(this.productsListState);
  }

  renderHome() {
    this.currentPage?.destroy();
    this.currentPage = this.home;
    this.appendEl(this.home);
  }

  renderStore() {
    this.currentPage?.destroy();
    this.currentPage = this.store;
    this.appendEl(this.currentPage);
  }

  renderCart() {
    this.currentPage?.destroy();
    this.currentPage = this.cart.updateCart();
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
    this.currentPage?.destroy();
    this.currentPage = new ProductPage(keyboard);
    this.appendEl(this.currentPage);
  }

  runApp() {
    const root = document.getElementById('root');
    const footer = new Footer();
    const header = new Header(this.productsListState).subscribe();
    root?.append(header.getNode());
    if (root) {
      this.router = new Router(
        {
          '': () => this.renderHome(),
          'home': () => this.renderHome(),
          'store': () => this.renderStore(),
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
