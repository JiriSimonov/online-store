// TODO типизация
/* eslint-disable @typescript-eslint/no-explicit-any */

class EventEmitter {
  events: Record<string, any[]> = {};
  subscribe(eventName: string, callback: unknown) {
    if (eventName in this.events) this.events[eventName].push(callback);
    else this.events[eventName] = [callback];
  }
  unsubscribe(eventName: string, callback: unknown) {
    this.events[eventName] = this.events[eventName].filter((listener) => listener !== callback);
  }
  emit(eventName: string, ...args: unknown[]) {
    this.events[eventName]?.forEach((listener) => listener(...args));
  }
}

export const emitter = new EventEmitter();

console.info(emitter);
