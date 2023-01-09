export enum EventName {
  'cart__save' = 'cart__save',
  'cart__itemUpdate' = 'cart__item-update',
  'cart__itemDelete' = 'cart__item-delete',
  'promo__save' = 'promo__save',
  'productCard__buyNowBtnClicked' = 'product-card__buy-now-btn_clicked',
}

class EventEmitter<Callback extends (...args: Parameters<Callback>) => void> {
  private events: Map<EventName, Callback[]> = new Map();
  subscribe(eventName: EventName, callback: Callback) {
    const eventList = this.events.get(eventName);
    if (eventList) {
      eventList.push(callback);
    } else {
      this.events.set(eventName, [callback]);
    }
  }
  unsubscribe(eventName: EventName, callback: Callback) {
    const eventList = this.events.get(eventName);
    if (eventList) {
      const filteredList = eventList.filter((listener) => listener !== callback);
      this.events.set(eventName, filteredList);
    }
  }
  emit(eventName: EventName, ...args: unknown[]) {
    this.events.get(eventName)?.forEach((listener) => listener(...(args as Parameters<Callback>)));
  }
}

export const Emitter = new EventEmitter();
