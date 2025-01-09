import { makeAutoObservable, runInAction } from 'mobx';
import { initUser } from '../network/restApi';
import User from './User';

class CurrentUserManager {
  _currentUser;
  _authenticated = false;
  _ready = false;

  constructor() {
    makeAutoObservable(this);
  }

  get user() {
    return this._currentUser;
  }

  get ready() {
    return this._ready;
  }

  async init() {
    runInAction(() => {
      this._ready = this._init();
    });

    return this._ready;
  }

  async _init() {
    runInAction(() => {
      this._ready = false;
    });
    // API call to get the current user
    const user = await initUser();
    if (user) {
      runInAction(() => {
        this._authenticated = true;
        this._currentUser = new User(user);
      });
      this._currentUser = new User(user);
    }
    else {
      runInAction(() => {
        this._authenticated = false;
      });
    }
  }
}

export default CurrentUserManager;
