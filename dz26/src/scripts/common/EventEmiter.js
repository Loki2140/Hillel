export class EventEmitter {
  constructor() {
    this._subscribers = {};

  }
  on(eventName, cb) {
    this._subscribers[eventName] = this._subscribers[eventName] || [];
    this._subscribers[eventName].push(cb);
  }

  trigger(eventName, payload) {
    const callbecks = this._subscribers[eventName];
    callbecks?.forEach((cb) => {
      cb(payload);
    });
  }

  off(eventName, cb) {
    const callbecks = this._subscribers[eventName];
    this._subscribers[eventName] = callbecks.filter((clean) => clean !== cb);
  }
}
