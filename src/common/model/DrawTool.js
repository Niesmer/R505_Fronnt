import { makeAutoObservable } from 'mobx';

import localStorageManager from '../../services/LocalStorageManager';

import Pencil from './Pencil';

const POINT_SCALE_SIZE = 10000;

class DrawTool {
  _pencil;

  _canvasDom;

  _context;

  _painting = false;

  _points = [];

  constructor() {
    makeAutoObservable(this, {

      _canvasDom: false,

      canvasDom: false,

      _context: false,

    });

    this._pencil = new Pencil();
  }

  get canvasDom() {
    return this._canvasDom;
  }

  set canvasDom(canvasDom) {
    this._canvasDom = canvasDom;

    this._context = this._canvasDom.getContext('2d');

    this._pencil.context = this._context;

    this._canvasDom.addEventListener('mousedown', evt => this._setupMouseEvents(evt), { once: true, passive: true });

    this._canvasDom.addEventListener('touchstart', evt => this._setupTouchEvents(evt), { once: true, passive: true });

    this.drawAllPoints(DrawTool.loadFromStorage());
  }

  get pencil() {
    return this._pencil;
  }

  reset() {
    this._points = [];

    this._context.clearRect(0, 0, this._canvasDom.width, this._canvasDom.height);

    this._saveToStorage();
  }

  drawAllPoints(points) {
    if (points.length < 1) {
      return;
    }
    this._points = points;

    this._context.clearRect(0, 0, this._canvasDom.width, this._canvasDom.height);

    let point;
    let x;
    let y;
    for (let i = 0; i < this._points.length; i++) {
      point = this._points[i];
      x = Math.round(point[0] * this._canvasDom.width / POINT_SCALE_SIZE);
      y = Math.round(point[1] * this._canvasDom.height / POINT_SCALE_SIZE);

      if (point.length > 2) {
        this._pencil.fromJson(point[2]);
        this._context.strokeStyle = this._pencil.color;
        this._context.lineWidth = this._pencil.width;
        this._context.closePath();
        this._context.beginPath();
        this._context.moveTo(x, y);
        this._context.stroke();
      }
      else {
        this._context.lineTo(x, y);
        this._context.stroke();
      }
    }
  }

  _addNewPoint(x, y, withPencil = false) {
    const scaledX = x * POINT_SCALE_SIZE / this._canvasDom.width;
    const scaledY = y * POINT_SCALE_SIZE / this._canvasDom.height;
    const point = withPencil ? [scaledX, scaledY, this._pencil.toJson()] : [scaledX, scaledY];
    const pointsLength = this._points.push(point);

    return pointsLength;
  }

  onStartDraw(x, y) {
    this._painting = true;

    // save the point with pencil info

    const pointsLength = this._addNewPoint(x, y, true);

    // If not first point, close the stroke

    if (pointsLength > 1) {
      this._context.closePath();
    }

    // Start a path, mot to the point, start stroking

    this._context.beginPath();

    this._context.moveTo(x, y);

    this._context.stroke();
  }

  onDraw(x, y) {
    if (this._painting) {
      // save the point

      this._addNewPoint(x, y);
      this._saveToStorage();

      // Draw the line

      this._context.lineTo(x, y);

      this._context.stroke();
    }
  }

  onStopDraw() {
    this._painting = false;

    this._context.closePath();
  }

  _setupMouseEvents(evt) {
    this._canvasDom.addEventListener('mousedown', e => this.onStartDraw(e.pageX - this._canvasDom.offsetLeft, e.pageY - this._canvasDom.offsetTop), { passive: true });

    this._canvasDom.addEventListener('mousemove', e => this.onDraw(e.pageX - this._canvasDom.offsetLeft, e.pageY - this._canvasDom.offsetTop), { passive: true });

    this._canvasDom.addEventListener('mouseup', () => this.onStopDraw(), { passive: true });

    this.onStartDraw(evt.pageX - this._canvasDom.offsetLeft, evt.pageY - this._canvasDom.offsetTop);
  }

  _setupTouchEvents(evt) {
    this._canvasDom.addEventListener('touchstart', e => this.onStartDraw(e.touches[0].pageX - this._canvasDom.offsetLeft, e.touches[0].pageY - this._canvasDom.offsetTop), { passive: true });

    this._canvasDom.addEventListener('mousemove', e => this.onDraw(e.touches[0].pageX - this._canvasDom.offsetLeft, e.touches[0].pageY - this._canvasDom.offsetTop), { passive: true });

    this._canvasDom.addEventListener('mouseup', () => this.onStopDraw());

    this.onStartDraw(evt.touches[0].pageX - this._canvasDom.offsetLeft, evt.touches[0].pageY - this._canvasDom.offsetTop, { passive: true });
  }

  _saveToStorage() {
    localStorageManager.setItem('draw-points', this._points);
  }

  static loadFromStorage() {
    return localStorageManager.getItem('draw-points') || [];
  }
}

export default DrawTool;
