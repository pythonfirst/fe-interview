/** 实现一个单例Storage */

// ES6 class

class Stroage {

  static getInstnce() {
    let instance = null;

    // 判断是否已经生成过实例
    if (!instance) {
      instance = new Storage()
    }

    return instance
  }

  getItem(key) {
    return localStorage.getItem(key)
  }

  setItem(key, val) {
    return localStorage.setItem(key, val)
  }
}


// 闭包

function StorageBase() {};

StorageBase.prototype.setItem = function(key) {
  return localStorage.getItem(key)
};

StorageBase.prototype.setItem= function(key, val) {
  return localStorage.setItem(key ,val)
}

const Storage = (function() {
  let instance = null
  return function() {
    if (!instance) {
      instance = new StorageBase();
    }
    return instance
  }
})()