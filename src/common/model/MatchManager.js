import { makeAutoObservable } from 'mobx';

class MatchManager {
  _currentManager;

  constructor() {
    makeAutoObservable(this);
  }

  get currentManager() {
    return this._currentManager;
  }

  set currentManager(newCurrentManager) {
    this._currentManager = newCurrentManager;
  }
}

export default MatchManager;
