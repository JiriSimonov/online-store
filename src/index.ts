import BaseComponent from './components/elements/base-component';
import Router from './utils/router';
import Footer from './components/footer';
import Store from './components/store';
import Header from './components/header';
import './assets/styles/global/style.scss';
import Home from './components/home-page/home-page';
import Cart from './components/cart/cart';
import ProductsListState from './states/goods-state';
import { DB } from './services/db/Database'; // ! 👈 убрать после тестов

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

  renderCart() {
    this.currentPage?.destroy();
    const cart = new Cart();
    this.currentPage = cart;
    cart.render();
    this.appendEl(cart);
  }

  runApp() {
    const root = document.getElementById('root');
    const footer = new Footer();
    const header = new Header(this.productsListState);
    header.render();
    root?.append(header.getNode());
    if (root) {
      this.router = new Router({
        '': () => this.renderHome(),
        home: () => this.renderHome(),
        store: () => this.renderStore(),
        cart: () => this.renderCart(),
      });
      root.append(this.node);
      footer.render();
      root?.append(footer.getNode());
    }
  }
}

const app = new App();
app.runApp();
