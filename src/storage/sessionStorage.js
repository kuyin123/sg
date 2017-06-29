function _isJSON(obj) {
  return typeof(obj) === "object" && Object.prototype.toString.call(obj).toLowerCase() === "[object object]" && !obj.length;
}

function _stringify(val) {
  return val === undefined || typeof val === "function" ? val + '' : JSON.stringify(val);
}

function _deserialize(value) {
  if (typeof value !== 'string') {
    return undefined;
  }
  try {
    return JSON.parse(value);
  } catch (e) {
    return value || undefined;
  }
}

class Store {
  constructor() {
    this.storage = window.sessionStorage
  }
  set(key, val) {
    if (key && !_isJSON(key)) {
      this.storage.setItem(key, _stringify(val));
    } else if (key && _isJSON(key) && !val) {
      for (let a in key) this.set(a, key[a]);
    }
    return this
  }
  get(key) {
    if (!key) {
      let ret = {};
      this._forEach(function(key, val) {
        ret[key] = val;
      });
      return ret;
    }
    if (key.charAt(0) === '?') {
      return this.has(key.substr(1));
    }
    return _deserialize(this.storage.getItem(key));
  }
  clear() {
    this.storage.clear();
    return this;
  }
  remove(key) {
    let val = this.get(key);
    this.storage.removeItem(key);
    return val;
  }
  has(key) {
    return ({}).hasOwnProperty.call(this.get(), key);
  }
  keys() {
    var d = [];
    this._forEach(function(k, list) {
      d.push(k);
    });
    return d;
  }
  size() {
    return this.keys().length;
  }
  _forEach(callback) {
    for (var i = 0; i < this.storage.length; i++) {
      var key = this.storage.key(i);
      if (callback(key, this.get(key)) === false) break;
    }
    return this;
  }
}

export default new Store()
