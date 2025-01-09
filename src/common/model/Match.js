import { makeAutoObservable } from 'mobx';

class Match {
  _id;
  _state;

  constructor() {
    makeAutoObservable(this);
  }

  get id() {
    return this._id;
  }

  set id(newId) {
    this.id = newId;
  }

  get state() {
    return this._state;
  }

  set state(newState) {
    this._state = newState;
  }

  get isPlaying() {
    return this._state === 'PLAYING_TURN';
  }

  get isTurnDone() {
    return this._state === 'TURN_DONE';
  }

  fromJson(data) {
    this._id = data.id ?? data.id;
    this._state = data.state ?? data.state;
  }
}
export default Match;
