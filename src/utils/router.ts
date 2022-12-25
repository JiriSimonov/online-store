export class Router {
  constructor(private readonly routes: Map<string, () => void>, private errorPage: () => void) {
    window.addEventListener('hashchange', this.onHashChangeHandler);
    this.onHashChangeHandler();
  }

  onHashChangeHandler = () => {
    const [hashPath] = window.location.hash.split('?');
    const callback = this.routes.get(hashPath);
    if (callback) callback();
    else this.errorPage();
  };

  destroy() {
    window.removeEventListener('hashchange', this.onHashChangeHandler);
  }
}
