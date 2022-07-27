var square = (function () {
  var cache = {};
  return function (n) {
    if (!cache[n]) {
      cache[n] = n * n;
    }
    return cache[n];
  };
})();

// 单例模式
function Singleton() {
  this.data = "singleton";
}

Singleton.getInstance = (function () {
  var instance;

  return function () {
    if (instance) {
      return instance;
    } else {
      instance = new Singleton();
      return instance;
    }
  };
})();

var sa = Singleton.getInstance();
var sb = Singleton.getInstance();
console.log(sa === sb); // true
console.log(sa.data); // 'singleton'
