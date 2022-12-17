class EventEmitter {
  events: { [key: string]: (() => void)[] } = {};

  subscribe(eventName: string, callback: () => void) {
    !this.events[eventName] && (this.events[eventName] = []);
    this.events[eventName].push(callback);
  }

  unsubscribe(eventName: string, callback: () => void) {
    this.events[eventName] = this.events[eventName].filter(
      (eventCallback) => callback !== eventCallback,
    );
  }

  emit(eventName: string) {
    const event = this.events[eventName];
    event && event.forEach((callback) => callback());
  }
}

export const emitter = new EventEmitter();