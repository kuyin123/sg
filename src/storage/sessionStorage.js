if (!window.sessionStorage) {
  throw '浏览器不支持sessionStorage';
};
var storage = window.sessionStorage,
  store, _api, even_storage = function() {};

function isJSON(obj) {
  return typeof(obj) === "object" && Object.prototype.toString.call(obj).toLowerCase() === "[object object]" && !obj.length;
}

function stringify(val) {
  return val === undefined || typeof val === "function" ? val + '' : JSON.stringify(val);
}

function deserialize(value) {
  if (typeof value !== 'string') {
    return undefined;
  }
  try {
    return JSON.parse(value);
  } catch (e) {
    return value || undefined;
  }
}

function isFunction(value) {
  return ({}).toString.call(value) === "[object Function]";
}

function isArray(value) {
  return value instanceof Array;
}

function dealIncognito(storage) {
  var _KEY = '_Is_Incognit',
    _VALUE = 'yes';
  try { storage.setItem(_KEY, _VALUE) } catch (e) {
    if (e.name === 'QuotaExceededError') {
      var _nothing = function() {};
      storage.__proto__ = { setItem: _nothing, getItem: _nothing, removeItem: _nothing, clear: _nothing };
    }
  } finally {
    if (storage.getItem(_KEY) === _VALUE) storage.removeItem(_KEY);
  }
  return storage;
}

storage = dealIncognito(storage);

function Store() {
  if (!(this instanceof Store)) {
    return new Store();
  }
}

Store.prototype = {
  set: function(key, val) {
    even_storage('set', key, val);
    if (key && !isJSON(key)) {
      storage.setItem(key, stringify(val));
    } else if (key && isJSON(key) && !val) {
      for (var a in key) this.set(a, key[a]);
    }
    return this;
  },
  get: function(key) {
    if (!key) {
      var ret = {};
      this.forEach(function(key, val) {
        ret[key] = val;
      });
      return ret;
    }
    if (key.charAt(0) === '?') {
      return this.has(key.substr(1));
    }
    return deserialize(storage.getItem(key));
  },
  clear: function() {
    this.forEach(function(key, val) {
      even_storage('clear', key, val);
    });
    storage.clear();
    return this;
  },
  remove: function(key) {
    var val = this.get(key);
    storage.removeItem(key);
    even_storage('remove', key, val);
    return val;
  },
  has: function(key) {
    return ({}).hasOwnProperty.call(this.get(), key);
  },
  keys: function() {
    var d = [];
    this.forEach(function(k, list) {
      d.push(k);
    });
    return d;
  },
  size: function() {
    return this.keys().length;
  },
  forEach: function(callback) {
    for (var i = 0; i < storage.length; i++) {
      var key = storage.key(i);
      if (callback(key, this.get(key)) === false) break;
    }
    return this;
  },
  search: function(str) {
    var arr = this.keys(),
      dt = {};
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].indexOf(str) > -1) dt[arr[i]] = this.get(arr[i]);
    }
    return dt;
  },
  onStorage: function(cb) {
    if (cb && isFunction(cb)) even_storage = cb;
    return this;
  }
}

export default new Store()
