class LocalStorageManager {
  _simulated;
  _storage;

  constructor() {
    this._init();
  }

  _init() {
    try {
      this._storage = window.localStorage;
      const testedKey = '__STORAGE_TEST__';
      this._storage.setItem(testedKey, testedKey);
      this._storage.removeItem(testedKey);
      this._simulated = false;
    }
    catch (e) {
      if (e instanceof DOMException
        && (e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED')
        && this._storage && this._storage.length !== 0) {
        console.warn('Max storage reached. Will simulate storage', e);
      }
      else {
        console.warn('Unavailable storage. Will simulate storage', e);
      }
      this._storage = new Map();
      this._simulated = true;
    }
  }

  getItem(key) {
    if (this._simulated) {
      return this._storage[key];
    }
    const rawValue = this._storage.getItem(key);
    return rawValue ? JSON.parse(rawValue) : null;
  }

  setItem(key, value) {
    if (!key) {
      throw new Error('Key is required');
    }
    if (this._simulated) {
      this._storage[key] = value;
    }
    else {
      this._storage.setItem(key, JSON.stringify(value, null, 0));
    }
  }

  removeItem(key) {
    if (!key) {
      throw new Error('Key is required');
    }
    if (this._simulated) {
      delete this._storage[key];
    }
    else {
      this._storage.removeItem(key);
    }
  }

  get nbItem() {
    return this._simulated ? this._storage.size() : this._storage.length;
  }

  get keys() {
    if (this._simulated) {
      return Array.from(this._storage.keys());
    }
    const keys = [];
    for (let i = 0; i < this.nbItem; i++) {
      keys.push(this._storage.key(i));
    }
    return keys;
  }

  clear() {
    if (this._simulated) {
      this._storage.clear();
    }

    else {
      this._storage.clear();
    }
  }
}

const INSTANCE = new LocalStorageManager();

export default INSTANCE;
