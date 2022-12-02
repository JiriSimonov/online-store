import { BaseComponent } from './components/base-component';
import { Router } from './utils/router';
class App extends BaseComponent {
  private router: Router | null;
  private currentPage: BaseComponent | null;

  constructor() {
    super({ tag: 'main', className: 'main' });
    this.router = null;
    this.currentPage = null;
  }

  renderHome() {
    this.currentPage?.destroy();
    const home = new BaseComponent({ className: 'container-home' });
    this.currentPage = home;
    this.appendEl(home);
  }

  renderStore() {
    this.currentPage?.destroy();
    const store = new BaseComponent({ className: 'container-store' });
    this.currentPage = store;
    this.appendEl(store);
  }

  runApp() {
    const root = document.getElementById('root');
    if (root) {
      this.router = new Router({
        '': () => this.renderHome(),
        home: () => this.renderHome(),
        store: () => this.renderStore(),
      });
      root.append(this.node);
    }
  }
}

const app = new App();
app.runApp();
