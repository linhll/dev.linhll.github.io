type Listener = (...args: any) => void;
export class EventEmiter {
  private readonly _events: { [event: string]: Listener[] } = {};

  public exist(event: string) {
    return this._events[event] ? true : false;
  }

  public on(event: string, listener: Listener): EventEmiter {
    this.addListener(event, listener);
    return this;
  }

  public addListener(event: string, listener: Listener): void {
    if (typeof this._events[event] !== 'object') {
      this._events[event] = [];
    }

    this._events[event].push(listener);
  }

  public removeListener(event: string, listener: Listener): void {
    if (typeof this._events[event] !== 'object') {
      return;
    }

    const idx: number = this._events[event].indexOf(listener);
    if (idx > -1) {
      this._events[event].splice(idx, 1);
    }
  }

  public removeAllListeners(): void {
    Object.keys(this._events).forEach((event: string) => (this._events[event].length = 0));
  }

  public emit(event: string, ...args: any[]): void {
    if (typeof this._events[event] !== 'object') {
      return;
    }

    [...this._events[event]].forEach((listener) => listener.apply(this, args));
  }
}
