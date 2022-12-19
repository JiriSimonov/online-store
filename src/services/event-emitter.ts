/* eslint-disable @typescript-eslint/no-explicit-any */
// TODO разобраться с типизацией аргументов
class EventEmitter {
  events: { [key: string]: ((args?: any) => void)[] } = {};

  subscribe(eventName: string, callback: (args: any) => void) {
    if (eventName in this.events) this.events[eventName].push(callback);
    else this.events[eventName] = [callback];
  }

  /*   unsubscribe(eventName: string, callback: <T>(args?: T) => void) {
    this.events[eventName] = this.events[eventName].filter((listener) => listener !== callback);
  } */

  emit(eventName: string, args?: any) {
    this.events[eventName]?.forEach((callback): void => callback(args));
  }
}

export const emitter = new EventEmitter();

console.info(emitter);
