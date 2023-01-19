export class Router {
  private lashHashPath?: string;

  constructor(private readonly routes: Map<string, () => void>, private errorPage: () => void) {
    window.addEventListener('hashchange', this.onHashChangeHandler);
    this.onHashChangeHandler();
  }

  onHashChangeHandler = () => {
    const [hashPath] = window.location.hash.split('?');
    if (this.lashHashPath === hashPath) {
      return;
    }

    const callback = this.routes.get(hashPath);
    if (callback) {
      callback();
    } else {
      this.errorPage();
    }
    this.lashHashPath = hashPath;
  };

  destroy() {
    window.removeEventListener('hashchange', this.onHashChangeHandler);
  }
}
