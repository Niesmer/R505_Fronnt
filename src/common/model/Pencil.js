import { makeAutoObservable } from 'mobx';

class Pencil {
  _erasing = false;

  _width = 3;

  _color = '#000';

  _context;

  constructor() {
    makeAutoObservable(this, {

      _context: false,

      context: false,

      toJson: false,

    });
  }

  get erasing() {
    return this._erasing;
  }

  switchErase() {
    this._erasing = !this._erasing;
  }

  get width() {
    return this._width;
  }

  set width(t) {
    this._width = t;

    this.updateCanvasContext();
  }

  get color() {
    return this._color;
  }

  set color(c) {
    this._color = c;

    this.updateCanvasContext();
  }

  get context() {
    return this._context;
  }

  set context(c) {
    this._context = c;

    this.updateCanvasContext();
  }

  updateCanvasContext() {
    if (!this._context) {
      return;
    }

    this._context.lineJoin = 'round';
    this._context.lineCap = 'round';
    this._context.lineWidth = this._width;
    this._context.shadowColor = '#000000';
    this._context.strokeStyle = this._color;
  }

  toJson() {
    return {
      w: this._width,
      c: this._color,
    };
  }
}

export default Pencil;
