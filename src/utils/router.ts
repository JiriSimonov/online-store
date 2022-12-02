import { RoutesObj } from "../interfaces/interfaces";

export class Router {
  constructor(
    private readonly routes: RoutesObj,
    private errorCallback: () => void,
  ) {
    window.addEventListener('hashchange', this.onHashChangeHandler);
    this.onHashChangeHandler();
  }

  onHashChangeHandler = () => {
    const hashPath = window.location.hash.slice(1);
    if (Object.keys(this.routes).includes(hashPath)) {
      this.routes[hashPath]();
    } else {
      this.errorCallback();
    }
  };

  destroy() {
    window.removeEventListener('hashchange', this.onHashChangeHandler);
  }
}
