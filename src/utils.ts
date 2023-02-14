export function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

export function classNames(...classes: (false | null | undefined | string)[]) {
  return classes.filter(Boolean).join(" "); // function to combind classNames
}

export class Timer {
  public timerId: any;
  public start: number;
  private remaining: number;
  public callback: () => void;
  constructor(Callback: () => void, Delay: number) {
    this.callback = Callback;
    this.remaining = Delay;
    this.resume();
  }

  public pause() {
    window.clearTimeout(this.timerId);
    this.timerId = null;
    this.remaining -= Date.now() - this.start;
  }
  public resume() {
    if (this.timerId) {
      return;
    }
    this.start = Date.now();
    this.timerId = window.setTimeout(this.callback, this.remaining);
  }
}
