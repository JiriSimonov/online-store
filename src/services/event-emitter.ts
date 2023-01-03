class EventEmitter<Callback extends (...args: Parameters<Callback>) => void> {
  events: Record<string, Callback[]> = {};
  subscribe(eventName: string, callback: Callback) {
    if (eventName in this.events) this.events[eventName].push(callback);
    else this.events[eventName] = [callback];
  }
  unsubscribe(eventName: string, callback: Callback) {
    this.events[eventName] = this.events[eventName].filter((listener) => listener !== callback);
  }
  emit(eventName: string, ...args: unknown[]) {
    this.events[eventName]?.forEach((listener) => listener(...(args as Parameters<Callback>)));
  }
}

export const emitter = new EventEmitter();

console.info(emitter);
